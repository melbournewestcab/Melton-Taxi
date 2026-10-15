import { Router } from "express";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { CreateBookingBody, EstimateFareBody } from "../../../../lib/api-zod/src";

const router = Router();

const SETTINGS_FILE = path.join(process.cwd(), "dispatch-settings.json");

export interface DispatchSettings {
  ownerEmails: string;
  dispatchPhone: string;
  whatsappNumber: string;
  emailUser?: string;
  emailPass?: string;
  smtpHost?: string;
  smtpPort?: number;
  updatedAt?: string;
}

export function loadDispatchSettings(): DispatchSettings {
  const fallbackEmails = process.env.OWNER_EMAIL || "info@meltontaxi.au";
  const defaultSettings: DispatchSettings = {
    ownerEmails: fallbackEmails,
    dispatchPhone: process.env.DISPATCH_PHONE || "0401134074",
    whatsappNumber: process.env.WHATSAPP_NUMBER || "61401134074",
    emailUser: process.env.EMAIL_USER || "info@meltontaxi.au",
    emailPass: process.env.EMAIL_PASS || "",
    smtpHost: process.env.SMTP_HOST || "smtp.gmail.com",
    smtpPort: Number(process.env.SMTP_PORT) || 465,
  };

  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf-8"));
      return { ...defaultSettings, ...parsed };
    }
  } catch (err) {
    console.warn("Could not read dispatch-settings.json:", err);
  }
  return defaultSettings;
}

export function saveDispatchSettings(settings: Partial<DispatchSettings>): DispatchSettings {
  const current = loadDispatchSettings();
  const merged: DispatchSettings = {
    ...current,
    ...settings,
    updatedAt: new Date().toISOString(),
  };
  try {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(merged, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not save dispatch-settings.json:", err);
  }
  return merged;
}

const PHONE = "0401134074";
const WHATSAPP_NUMBER = "61401134074";
const TARGET_BOOKING_EMAIL = "info@meltontaxi.au";
const OWNER_EMAIL = process.env.OWNER_EMAIL || TARGET_BOOKING_EMAIL;

/**
 * Generates an easy-to-read, professional booking reference number (e.g. MT-749201).
 * Directly identifies Melton Taxi and is convenient for passengers and dispatchers to quote over the phone.
 */
export function generateBookingReference(): string {
  const randomSixDigits = Math.floor(100000 + Math.random() * 900000);
  return `MT-${randomSixDigits}`;
}

// ── Safe Transport Victoria regulated taxi meter rates (2025/2026) ────────────
// Source: Safe Transport Victoria "UNBOOKED SERVICE FARES" schedule for Metropolitan Melbourne,
// Frankston, Dandenong & Mornington Peninsula.
// Time or distance tariff structure (crossover speed: 21 km/h):
// - Distance charges apply while vehicle speed > 21 km/h
// - Time/detention charges apply while vehicle speed < 21 km/h

const CPV_LEVY = 1.40; // CPV government levy recovery fee (with GST)

const RATES = {
  // Day rate: 9am to 5pm (Safe Transport Victoria regulated schedule)
  day: {
    flagFall: 5.25,
    perKm: 2.037,
    perMin: 0.713,
    label: "Day Rate (9am - 5pm)",
  },
  // Overnight rate: 5pm to 9am (excluding peak)
  overnight: {
    flagFall: 6.55,
    perKm: 2.265,
    perMin: 0.792,
    label: "Overnight Rate (5pm - 9am)",
  },
  // Peak rate: 10pm to 4am Friday & Saturday night, plus Victorian public holidays
  peak: {
    flagFall: 7.80,
    perKm: 2.493,
    perMin: 0.872,
    label: "Peak / Weekend Night Rate (10pm - 4am)",
  },
};

// Extras & Surcharges (Safe Transport Victoria regulated schedule)
// High occupancy fee ($21.50): taxis carrying 5+ passengers or where larger vehicle is required (Maxi / 6-seater)
const HIGH_OCCUPANCY_FEE = 21.50;

const SURCHARGES: Record<string, number> = {
  sedan: 0,
  suv: 15.00,
  silver_service: 11.00,
  six_seater: HIGH_OCCUPANCY_FEE,
  maxi_taxi: HIGH_OCCUPANCY_FEE,
};

const VEHICLE_LABELS: Record<string, string> = {
  sedan: "Sedan",
  suv: "SUV",
  silver_service: "Silver Service",
  six_seater: "6 Seater People Mover",
  maxi_taxi: "Maxi Taxi",
};

// Minimum fare: $25 flat, applies when calculated total is under $25 or trips under 5 km
const MINIMUM_FARE = 25.00;
const MINIMUM_FARE_DISTANCE_KM = 5.0;

// ── Toll section rates (Linkt / ConnectEast 2025/2026) ─────────────────────────
const TOLL_SECTIONS: Record<string, { car: number; heavy: number; label: string }> = {
  m80:             { car: 3.73, heavy: 5.60, label: "CityLink (Western Ring Rd)" },
  m2_tullamarine:  { car: 3.73, heavy: 5.60, label: "CityLink (Tullamarine Fwy)" },
  domain_tunnel:   { car: 2.74, heavy: 4.11, label: "CityLink (Domain Tunnel)" },
  burnley_tunnel:  { car: 2.74, heavy: 4.11, label: "CityLink (Burnley Tunnel)" },
  monash_cl:       { car: 3.69, heavy: 5.54, label: "CityLink (Monash Fwy)" },
  eastlink:        { car: 5.04, heavy: 7.56, label: "EastLink (M3)" },
  westgate_tunnel: { car: 6.13, heavy: 9.20, label: "Westgate Tunnel" },
};

function isHoliday(dateStr?: string | null): boolean {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return false;
  const m = d.getMonth() + 1; // 1-12
  const day = d.getDate();
  // Christmas Day (Dec 25), Boxing Day (Dec 26), New Year's Day (Jan 1)
  if ((m === 12 && (day === 25 || day === 26 || day === 31)) || (m === 1 && day === 1)) {
    return true;
  }
  return false;
}

function determineRate(pickupDate?: string | null, pickupTime?: string | null) {
  if (!pickupTime) return RATES.day;

  const [hourStr, minStr] = pickupTime.split(":");
  const hour = parseInt(hourStr, 10);
  const min = parseInt(minStr || "0", 10);
  const totalMins = hour * 60 + min;

  let dayOfWeek = -1;
  if (pickupDate) {
    const parts = pickupDate.split("-").map(Number);
    if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
      // Use local noon to determine the day of week reliably
      dayOfWeek = new Date(parts[0], parts[1] - 1, parts[2], 12, 0, 0).getDay();
    }
  }
  if (dayOfWeek === -1) {
    dayOfWeek = new Date().getDay();
  }

  // Check holiday peak rate (e.g. Christmas, Boxing Day, NYE 6pm+)
  if (isHoliday(pickupDate)) {
    if (pickupDate?.endsWith("-12-31")) {
      if (totalMins >= 18 * 60) return RATES.peak;
    } else {
      return RATES.peak;
    }
  }

  // Peak rates apply:
  // - 10pm Friday to 4am Saturday
  // - 10pm Saturday to 4am Sunday
  const isFriNightPeak = dayOfWeek === 5 && totalMins >= 22 * 60;
  const isSatEarlyPeak = dayOfWeek === 6 && totalMins < 4 * 60;
  const isSatNightPeak = dayOfWeek === 6 && totalMins >= 22 * 60;
  const isSunEarlyPeak = dayOfWeek === 0 && totalMins < 4 * 60;

  if (isFriNightPeak || isSatEarlyPeak || isSatNightPeak || isSunEarlyPeak) {
    return RATES.peak;
  }

  // Day rate: 9am to 5pm (9:00 to 17:00)
  if (totalMins >= 9 * 60 && totalMins < 17 * 60) {
    return RATES.day;
  }

  // Overnight rate: 5pm to 9am (excluding peak hours above)
  return RATES.overnight;
}

function calcTollCharges(
  vehicleType: string,
  tollRoads: string[],
): { total: number; used: string[] } {
  const isHeavy = vehicleType === "maxi_taxi";
  let total = 0;
  const used: string[] = [];
  const seen = new Set<string>();
  for (const section of tollRoads) {
    const key = section.toLowerCase().trim().replace(/\s+/g, "_").replace(/[^a-z_]/g, "");
    if (seen.has(key)) continue;
    seen.add(key);
    const rate = TOLL_SECTIONS[key];
    if (rate) {
      total += isHeavy ? rate.heavy : rate.car;
      used.push(rate.label);
    }
  }
  return { total: Math.round(total * 100) / 100, used };
}

export function calcFare(
  distanceKm: number,
  vehicleType: string,
  passengers?: number | null,
  pickupDate?: string | null,
  pickupTime?: string | null,
  tollRoads?: string[] | null,
  trafficRatio?: number | null,
  durationMinutes?: number | null,
  durationInTrafficMinutes?: number | null,
) {
  const rate = determineRate(pickupDate, pickupTime);
  const numPassengers = passengers || (vehicleType === "maxi_taxi" ? 6 : 1);

  // High occupancy fee applies for 5+ passengers or maxi/6-seater
  let vehicleSurcharge = SURCHARGES[vehicleType] ?? 0;
  if (numPassengers >= 5 && vehicleSurcharge < HIGH_OCCUPANCY_FEE) {
    vehicleSurcharge = HIGH_OCCUPANCY_FEE;
  }

  const { total: tollCharges, used: usedTolls } = calcTollCharges(vehicleType, tollRoads ?? []);

  // Time vs Distance live traffic calculation:
  // In Safe Transport Victoria's regulated tariff structure:
  // - Distance rate applies when vehicle speed is above 21 km/h
  // - Time rate applies when vehicle speed is below 21 km/h (traffic lights, stops, congestion)
  const baseDurationMins = durationMinutes || (distanceKm / 50) * 60;
  const trafficDurationMins = durationInTrafficMinutes || (trafficRatio ? baseDurationMins * trafficRatio : baseDurationMins);
  
  // Live traffic delay beyond normal free-flow driving duration
  const trafficDelayMins = Math.max(0, trafficDurationMins - baseDurationMins);
  
  // Stop-and-go / slow detention time (< 21 km/h) at traffic lights & intersections
  // Typically 10-14% of urban trip duration, capped reasonably for high-speed freeway journeys
  const estimatedStopGoMins = Math.max(1, Math.min(baseDurationMins * 0.12, 10));
  const totalSlowMins = Math.round((estimatedStopGoMins + trafficDelayMins) * 10) / 10;

  // Cruising distance charged at distance rate
  const cruisingDistanceKm = Math.max(0.5, distanceKm);

  // Meter components
  const flagFall = rate.flagFall;
  const distanceCharge = cruisingDistanceKm * rate.perKm;
  const timeCharge = totalSlowMins * rate.perMin;
  const cpvLevy = CPV_LEVY;

  const standardMeter = flagFall + distanceCharge + timeCharge + cpvLevy;
  const isShortTrip = distanceKm < MINIMUM_FARE_DISTANCE_KM;

  let totalFare: number;
  let minimumFareCharge = 0;

  if (isShortTrip || standardMeter < MINIMUM_FARE) {
    minimumFareCharge = MINIMUM_FARE;
    const baseTripFare = Math.max(standardMeter, MINIMUM_FARE);
    totalFare = baseTripFare + vehicleSurcharge + tollCharges;
  } else {
    totalFare = standardMeter + vehicleSurcharge + tollCharges;
  }

  const trafficLevel = trafficDelayMins > 8 ? "Heavy Traffic" : trafficDelayMins > 3 ? "Moderate Traffic" : "Normal Flow";

  return {
    flagFall: Math.round(flagFall * 100) / 100,
    distanceCharge: Math.round(distanceCharge * 100) / 100,
    timeCharge: Math.round(timeCharge * 100) / 100,
    cpvLevy: Math.round(cpvLevy * 100) / 100,
    minimumFare: minimumFareCharge > 0 ? MINIMUM_FARE : 0,
    vehicleSurcharge: Math.round(vehicleSurcharge * 100) / 100,
    tollCharges: Math.round(tollCharges * 100) / 100,
    totalFare: Math.round(totalFare * 100) / 100,
    tollRoads: usedTolls,
    rateLabel: rate.label,
    rateType: rate === RATES.peak ? "peak" : rate === RATES.overnight ? "overnight" : "day",
    durationMinutes: Math.round(trafficDurationMins),
    trafficDelayMinutes: Math.round(trafficDelayMins),
    slowMinutes: Math.round(totalSlowMins),
    trafficLevel,
    ratesSchedule: {
      flagFall: rate.flagFall,
      perKm: rate.perKm,
      perMin: rate.perMin,
    },
  };
}

// Bookings store with persistent file backup (zero third-party dependencies)
export interface BookingRecord {
  bookingId: string;
  createdAt: string;
  name: string;
  phone: string;
  email?: string;
  pickupAddress: string;
  dropoffAddress: string;
  pickupDate: string;
  pickupTime: string;
  isReturn?: boolean;
  returnDate?: string;
  returnTime?: string;
  vehicleType: string;
  passengers: number;
  distanceKm?: number;
  estimatedFare?: number;
  paymentMethod: string;
  notes?: string;
  status: "dispatched" | "confirmed" | "completed" | "cancelled";
}

const BOOKINGS_FILE = path.join(process.cwd(), "bookings-store.json");

function loadBookings(): BookingRecord[] {
  try {
    if (fs.existsSync(BOOKINGS_FILE)) {
      const content = fs.readFileSync(BOOKINGS_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (err) {
    console.warn("Could not load bookings-store.json:", err);
  }
  return [];
}

function persistBookings(records: BookingRecord[]) {
  try {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(records, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not write bookings-store.json:", err);
  }
}

const internalBookingsStore: BookingRecord[] = loadBookings();

function createTransporter(settings?: DispatchSettings) {
  const cfg = settings || loadDispatchSettings();
  const user = cfg.emailUser || process.env.EMAIL_USER;
  const rawPass = cfg.emailPass || process.env.EMAIL_PASS;
  if (!user || !rawPass) return null;
  const pass = rawPass.replace(/\s+/g, "");

  const host = cfg.smtpHost || process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(cfg.smtpPort) || Number(process.env.SMTP_PORT) || 465;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

function buildCustomerConfirmationHtml(data: any, bookingId: string) {
  const payLabel = data.paymentMethod === "cabcharge"
    ? "Cabcharge (eTicket / FASTCARD)"
    : data.paymentMethod === "card"
    ? "Credit / Debit Card (In-Car Contactless)"
    : "Cash (Pay Driver on Arrival)";

  const vehicleLabel = VEHICLE_LABELS[data.vehicleType] || data.vehicleType;
  const cleanPhone = (data.phone || "").replace(/[^0-9+]/g, "");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Booking Confirmation ${bookingId}</title>
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    body { margin: 0; padding: 0; width: 100% !important; background-color: #0b0f17; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
  </style>
</head>
<body style="margin:0;padding:20px 10px;background-color:#0b0f17;color:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <center style="width:100%;background-color:#0b0f17;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;margin:0 auto;background-color:#151c28;border:1px solid #334155;border-radius:14px;overflow:hidden;box-shadow:0 12px 32px rgba(0,0,0,0.6);">
      
      <!-- Premium Brand Header -->
      <tr>
        <td style="padding:28px 24px 22px;background:linear-gradient(135deg, #1e293b 0%, #0f172a 100%);border-bottom:3px solid #f59e0b;text-align:center;">
          <div style="display:inline-block;background-color:#f59e0b;color:#0b0f17;font-size:11px;font-weight:900;letter-spacing:1.5px;padding:4px 12px;border-radius:20px;text-transform:uppercase;margin-bottom:10px;">
            MELTON TAXI &amp; AIRPORT TRANSFERS
          </div>
          <div style="font-size:24px;line-height:30px;font-weight:800;color:#ffffff;letter-spacing:0.5px;margin:0;">
            Booking Confirmation
          </div>
          <div style="font-size:13px;line-height:18px;color:#94a3b8;margin-top:6px;">
            Thank you for booking with us. Your journey is confirmed with dispatch.
          </div>
          
          <!-- Distinct Reference Number Badge -->
          <div style="margin-top:16px;display:inline-block;background-color:#0b0f17;border:2px solid #f59e0b;border-radius:10px;padding:10px 24px;">
            <span style="font-size:11px;line-height:14px;font-weight:700;color:#94a3b8;text-transform:uppercase;display:block;letter-spacing:1.5px;">Booking Reference</span>
            <span style="font-size:26px;line-height:32px;font-weight:900;color:#f59e0b;letter-spacing:2px;font-family:'Courier New',Courier,monospace;">${bookingId}</span>
          </div>
        </td>
      </tr>

      <!-- Body Content -->
      <tr>
        <td style="padding:24px 20px;">
          
          <!-- Personal Greeting -->
          <div style="font-size:15px;line-height:22px;color:#e2e8f0;margin-bottom:18px;">
            Hello <strong>${data.name}</strong>,<br>
            Your taxi reservation has been successfully registered directly with our 24/7 Melton &amp; Bacchus Marsh dispatch center. Below are your journey details:
          </div>

          <!-- SECTION 1: JOURNEY ROUTE -->
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:16px;background-color:#0f172a;border:1px solid #334155;border-radius:10px;overflow:hidden;">
            <tr>
              <td style="padding:14px 16px;border-bottom:1px solid #1e293b;vertical-align:top;">
                <div style="font-size:11px;line-height:16px;font-weight:800;color:#22c55e;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">
                  🟢 PICKUP LOCATION
                </div>
                <div style="font-size:15px;line-height:22px;font-weight:700;color:#ffffff;word-break:break-word;">
                  ${data.pickupAddress}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 16px;vertical-align:top;">
                <div style="font-size:11px;line-height:16px;font-weight:800;color:#f59e0b;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">
                  🏁 DESTINATION
                </div>
                <div style="font-size:15px;line-height:22px;font-weight:700;color:#ffffff;word-break:break-word;">
                  ${data.dropoffAddress}
                </div>
              </td>
            </tr>
          </table>

          <!-- SECTION 2: SCHEDULE & TIMING -->
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:16px;background-color:#1e293b;border-left:4px solid #f59e0b;border-radius:8px;">
            <tr>
              <td style="padding:14px 18px;">
                <div style="font-size:11px;line-height:16px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;">
                  📅 SCHEDULED PICKUP TIME
                </div>
                <div style="font-size:18px;line-height:26px;font-weight:800;color:#f59e0b;margin-top:4px;">
                  ${data.pickupDate} &nbsp;•&nbsp; ${data.pickupTime}
                </div>
                ${data.isReturn ? `
                <div style="margin-top:10px;padding-top:10px;border-top:1px dashed #334155;">
                  <span style="font-size:11px;line-height:16px;font-weight:800;color:#38bdf8;text-transform:uppercase;letter-spacing:1px;">🔄 RETURN JOURNEY:</span>
                  <span style="font-size:15px;line-height:22px;font-weight:700;color:#ffffff;margin-left:8px;">${data.returnDate} at ${data.returnTime}</span>
                </div>` : ''}
              </td>
            </tr>
          </table>

          <!-- SECTION 3: TRIP & PASSENGER SPECIFICATIONS -->
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:20px;background-color:#0f172a;border:1px solid #334155;border-radius:10px;">
            <tr>
              <td style="padding:16px 18px;">
                <div style="font-size:11px;line-height:16px;font-weight:800;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;border-bottom:1px solid #1e293b;padding-bottom:6px;">
                  🚕 TRIP &amp; VEHICLE SPECIFICATIONS
                </div>
                
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="padding:6px 0;font-size:13px;color:#94a3b8;width:130px;font-weight:600;">Passenger:</td>
                    <td style="padding:6px 0;font-size:14px;color:#ffffff;font-weight:700;">${data.name}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;font-size:13px;color:#94a3b8;font-weight:600;">Contact Phone:</td>
                    <td style="padding:6px 0;font-size:14px;color:#38bdf8;font-weight:700;"><a href="tel:${cleanPhone}" style="color:#38bdf8;text-decoration:none;">${data.phone}</a></td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;font-size:13px;color:#94a3b8;font-weight:600;">Vehicle Class:</td>
                    <td style="padding:6px 0;font-size:14px;color:#ffffff;font-weight:700;">${vehicleLabel} (${data.passengers} Passenger${Number(data.passengers) > 1 ? 's' : ''})</td>
                  </tr>
                  ${data.distanceKm ? `
                  <tr>
                    <td style="padding:6px 0;font-size:13px;color:#94a3b8;font-weight:600;">Est. Distance:</td>
                    <td style="padding:6px 0;font-size:14px;color:#ffffff;font-weight:700;">${Number(data.distanceKm).toFixed(1)} km</td>
                  </tr>` : ''}
                  ${data.estimatedFare ? `
                  <tr>
                    <td style="padding:8px 0;font-size:13px;color:#22c55e;font-weight:700;">Est. Total Fare:</td>
                    <td style="padding:8px 0;font-size:19px;color:#22c55e;font-weight:900;">$${Number(data.estimatedFare).toFixed(2)} AUD <span style="font-size:11px;color:#94a3b8;font-weight:normal;">(Regulated Taxi Tariff)</span></td>
                  </tr>` : ''}
                  <tr>
                    <td style="padding:6px 0;font-size:13px;color:#94a3b8;font-weight:600;">Payment Method:</td>
                    <td style="padding:6px 0;font-size:14px;color:#ffffff;font-weight:700;">${payLabel}</td>
                  </tr>
                  ${data.notes ? `
                  <tr>
                    <td style="padding:8px 0 0;font-size:13px;color:#f59e0b;font-weight:700;vertical-align:top;">Special Requests:</td>
                    <td style="padding:8px 0 0;font-size:14px;color:#fde68a;font-weight:600;vertical-align:top;">${data.notes}</td>
                  </tr>` : ''}
                </table>
              </td>
            </tr>
          </table>

          <!-- SECTION 4: PEACE OF MIND & NEXT STEPS -->
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:20px;background-color:#1e293b;border-radius:10px;padding:16px;">
            <tr>
              <td>
                <div style="font-size:12px;font-weight:800;color:#f59e0b;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">
                  ✅ WHAT HAPPENS NEXT:
                </div>
                <ul style="margin:0;padding-left:18px;font-size:13px;line-height:20px;color:#cbd5e1;">
                  <li style="margin-bottom:4px;"><strong>Driver Assignment:</strong> Our dispatch team coordinates your driver for punctual arrival.</li>
                  <li style="margin-bottom:4px;"><strong>Airport Monitoring:</strong> For airport pickups at Melbourne (MEL) or Avalon (AVV), we monitor live flight landing times.</li>
                  <li><strong>Need Help or Changes?</strong> Call dispatch directly 24/7 or reply to this email.</li>
                </ul>
              </td>
            </tr>
          </table>

          <!-- SECTION 5: ONE-TOUCH DISPATCH SUPPORT BUTTONS -->
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td align="center" style="padding-bottom:10px;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center" style="border-radius:8px;background-color:#f59e0b;padding:12px 28px;">
                      <a href="tel:0401134074" style="font-size:15px;font-weight:800;color:#0b0f17;text-decoration:none;display:inline-block;letter-spacing:0.5px;">
                        📞 &nbsp; CALL DISPATCH 24/7 (0401 134 074)
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center">
                <a href="mailto:info@meltontaxi.au" style="font-size:13px;font-weight:600;color:#38bdf8;text-decoration:none;">
                  ✉️ Email Support: info@meltontaxi.au
                </a>
              </td>
            </tr>
          </table>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="padding:18px 20px;background-color:#0b0f17;border-top:1px solid #1e293b;text-align:center;">
          <div style="font-size:12px;line-height:18px;color:#94a3b8;font-weight:600;">
            Melton Taxi &amp; Airport Transfers • 24/7 Direct Service
          </div>
          <div style="font-size:11px;line-height:16px;color:#64748b;margin-top:4px;">
            Servicing Melton, Bacchus Marsh, Rockbank, Diggers Rest, Melbourne Airport &amp; Avalon<br>
            Official Contact: <a href="mailto:info@meltontaxi.au" style="color:#f59e0b;text-decoration:none;">info@meltontaxi.au</a> • Phone: <a href="tel:0401134074" style="color:#f59e0b;text-decoration:none;">0401 134 074</a>
          </div>
        </td>
      </tr>

    </table>
  </center>
</body>
</html>`;
}

function buildCustomerConfirmationText(data: any, bookingId: string) {
  const vehicle = VEHICLE_LABELS[data.vehicleType] || data.vehicleType;
  const payLabel = data.paymentMethod === "cabcharge"
    ? "Cabcharge (eTicket / FASTCARD)"
    : data.paymentMethod === "card"
    ? "Credit / Debit Card"
    : "Cash (Pay Driver on Arrival)";

  let text = `=================================================\n`;
  text += `  MELTON TAXI & AIRPORT TRANSFERS — BOOKING CONFIRMATION\n`;
  text += `=================================================\n\n`;
  text += `Dear ${data.name},\n`;
  text += `Thank you for booking with Melton Taxi. Your journey has been registered with our 24/7 dispatch team.\n\n`;
  text += `BOOKING REFERENCE: ${bookingId}\n\n`;
  text += `--- TRIP SCHEDULE ---\n`;
  text += `Pickup Date & Time: ${data.pickupDate} at ${data.pickupTime}\n`;
  if (data.isReturn) {
    text += `Return Journey:     ${data.returnDate} at ${data.returnTime}\n`;
  }
  text += `\n--- ROUTE DETAILS ---\n`;
  text += `Pickup Location:    ${data.pickupAddress}\n`;
  text += `Destination:        ${data.dropoffAddress}\n`;
  text += `\n--- VEHICLE & PASSENGERS ---\n`;
  text += `Vehicle Class:      ${vehicle}\n`;
  text += `Passengers:         ${data.passengers}\n`;
  if (data.distanceKm) text += `Est. Distance:      ${Number(data.distanceKm).toFixed(1)} km\n`;
  if (data.estimatedFare) text += `Est. Total Fare:    $${Number(data.estimatedFare).toFixed(2)} AUD (Regulated Tariff)\n`;
  text += `Payment Method:     ${payLabel}\n`;
  if (data.notes) text += `Special Requests:   ${data.notes}\n`;
  text += `\n--- 24/7 DISPATCH SUPPORT ---\n`;
  text += `Phone: 0401 134 074\n`;
  text += `Email: info@meltontaxi.au\n`;
  text += `Website: https://meltontaxi.com.au\n`;
  text += `=================================================\n`;
  return text;
}

function buildDispatchAlertHtml(data: any, bookingId: string) {
  const payLabel = data.paymentMethod === "cabcharge"
    ? "Cabcharge (eTicket / FASTCARD)"
    : data.paymentMethod === "card"
    ? "Credit / Debit Card"
    : "Cash (Pay Driver)";

  const vehicleLabel = VEHICLE_LABELS[data.vehicleType] || data.vehicleType;
  const cleanPhone = (data.phone || "").replace(/[^0-9+]/g, "");
  const whatsappClean = cleanPhone.startsWith("0") ? `61${cleanPhone.slice(1)}` : cleanPhone.replace(/^\+/, "");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Booking Dispatch ${bookingId}</title>
</head>
<body style="margin:0;padding:16px 8px;background-color:#0b0f17;color:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <center style="width:100%;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:580px;margin:0 auto;background-color:#151c28;border:2px solid #f59e0b;border-radius:12px;overflow:hidden;">
      
      <!-- Dispatch Header -->
      <tr>
        <td style="padding:22px 20px;background-color:#1e293b;border-bottom:2px solid #f59e0b;text-align:center;">
          <div style="font-size:22px;line-height:28px;font-weight:900;color:#f59e0b;letter-spacing:1px;text-transform:uppercase;">
            🚖 NEW ONLINE BOOKING DISPATCH
          </div>
          <div style="font-size:12px;color:#94a3b8;font-weight:700;letter-spacing:1.5px;margin-top:4px;">
            TARGET DISPATCH: info@meltontaxi.au
          </div>
          <div style="margin-top:12px;display:inline-block;background-color:#0b0f17;border:1px solid #f59e0b;border-radius:8px;padding:8px 20px;">
            <span style="font-size:10px;color:#94a3b8;text-transform:uppercase;display:block;letter-spacing:1px;">Booking Reference</span>
            <span style="font-size:24px;font-weight:900;color:#f59e0b;letter-spacing:2px;font-family:monospace;">${bookingId}</span>
          </div>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:20px 16px;">
          
          <!-- Immediate Action Buttons for Driver/Dispatcher -->
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:18px;">
            <tr>
              <td align="center" style="padding-bottom:8px;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="center" style="border-radius:8px;background-color:#f59e0b;padding:12px 16px;">
                      <a href="tel:${cleanPhone}" style="font-size:15px;font-weight:900;color:#000000;text-decoration:none;display:block;">
                        📞 &nbsp; CALL PASSENGER: ${data.phone}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            ${whatsappClean ? `
            <tr>
              <td align="center">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="center" style="border-radius:8px;background-color:#22c55e;padding:10px 16px;">
                      <a href="https://wa.me/${whatsappClean}" style="font-size:14px;font-weight:800;color:#ffffff;text-decoration:none;display:block;">
                        💬 &nbsp; WhatsApp Passenger
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>` : ''}
          </table>

          <!-- Route Box -->
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:16px;background-color:#0f172a;border:1px solid #334155;border-radius:10px;">
            <tr>
              <td style="padding:14px 16px;border-bottom:1px solid #1e293b;">
                <div style="font-size:11px;font-weight:800;color:#22c55e;text-transform:uppercase;letter-spacing:1px;">🟢 PICKUP</div>
                <div style="font-size:15px;font-weight:700;color:#ffffff;margin-top:4px;">${data.pickupAddress}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 16px;">
                <div style="font-size:11px;font-weight:800;color:#f59e0b;text-transform:uppercase;letter-spacing:1px;">🏁 DROP-OFF</div>
                <div style="font-size:15px;font-weight:700;color:#ffffff;margin-top:4px;">${data.dropoffAddress}</div>
              </td>
            </tr>
          </table>

          <!-- Schedule -->
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:16px;background-color:#1e293b;border-left:4px solid #f59e0b;border-radius:6px;padding:12px 16px;">
            <tr>
              <td>
                <div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;">📅 PICKUP SCHEDULE</div>
                <div style="font-size:18px;font-weight:800;color:#f59e0b;margin-top:4px;">${data.pickupDate} at ${data.pickupTime}</div>
                ${data.isReturn ? `<div style="font-size:13px;color:#38bdf8;margin-top:6px;font-weight:700;">🔄 Return: ${data.returnDate} at ${data.returnTime}</div>` : ''}
              </td>
            </tr>
          </table>

          <!-- Details Table -->
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#0f172a;border:1px solid #334155;border-radius:10px;padding:14px 16px;margin-bottom:16px;">
            <tr>
              <td>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr><td style="padding:5px 0;color:#94a3b8;font-size:13px;width:120px;">Passenger:</td><td style="padding:5px 0;color:#fff;font-weight:700;">${data.name}</td></tr>
                  <tr><td style="padding:5px 0;color:#94a3b8;font-size:13px;">Phone:</td><td style="padding:5px 0;color:#38bdf8;font-weight:700;"><a href="tel:${cleanPhone}" style="color:#38bdf8;">${data.phone}</a></td></tr>
                  <tr><td style="padding:5px 0;color:#94a3b8;font-size:13px;">Email:</td><td style="padding:5px 0;color:#fff;">${data.email || 'Not provided'}</td></tr>
                  <tr><td style="padding:5px 0;color:#94a3b8;font-size:13px;">Vehicle:</td><td style="padding:5px 0;color:#fff;font-weight:700;">${vehicleLabel} (${data.passengers} pax)</td></tr>
                  ${data.distanceKm ? `<tr><td style="padding:5px 0;color:#94a3b8;font-size:13px;">Est. Distance:</td><td style="padding:5px 0;color:#fff;">${Number(data.distanceKm).toFixed(1)} km</td></tr>` : ''}
                  ${data.estimatedFare ? `<tr><td style="padding:5px 0;color:#22c55e;font-size:13px;font-weight:700;">Est. Fare:</td><td style="padding:5px 0;color:#22c55e;font-size:17px;font-weight:900;">$${Number(data.estimatedFare).toFixed(2)} AUD</td></tr>` : ''}
                  <tr><td style="padding:5px 0;color:#94a3b8;font-size:13px;">Payment:</td><td style="padding:5px 0;color:#fff;">${payLabel}</td></tr>
                  ${data.notes ? `<tr><td style="padding:5px 0;color:#f59e0b;font-size:13px;font-weight:700;">Special Notes:</td><td style="padding:5px 0;color:#fde68a;">${data.notes}</td></tr>` : ''}
                </table>
              </td>
            </tr>
          </table>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="padding:14px;background-color:#0b0f17;border-top:1px solid #1e293b;text-align:center;font-size:11px;color:#64748b;">
          Melton Taxi Dispatch Engine • Deliveries strictly routed to <strong>info@meltontaxi.au</strong>
        </td>
      </tr>

    </table>
  </center>
</body>
</html>`;
}

function buildDispatchAlertText(data: any, bookingId: string) {
  const vehicle = VEHICLE_LABELS[data.vehicleType] || data.vehicleType;
  const payLabel = data.paymentMethod === "cabcharge"
    ? "Cabcharge"
    : data.paymentMethod === "card"
    ? "Credit / Debit Card"
    : "Cash (Pay Driver)";

  let text = `========================================\n`;
  text += `  🚖 NEW BOOKING DISPATCH ALERT\n`;
  text += `========================================\n\n`;
  text += `Booking Reference: ${bookingId}\n`;
  text += `Target Dispatch: info@meltontaxi.au\n\n`;
  text += `Pickup Date & Time: ${data.pickupDate} at ${data.pickupTime}\n`;
  if (data.isReturn) {
    text += `Return Journey:     ${data.returnDate} at ${data.returnTime}\n`;
  }
  text += `\n--- PASSENGER ---\n`;
  text += `Name:     ${data.name}\n`;
  text += `Phone:    ${data.phone}\n`;
  text += `Email:    ${data.email || "Not provided"}\n`;
  text += `\n--- ROUTE ---\n`;
  text += `Pickup:   ${data.pickupAddress}\n`;
  text += `Dropoff:  ${data.dropoffAddress}\n`;
  text += `\n--- VEHICLE & FARE ---\n`;
  text += `Vehicle:      ${vehicle}\n`;
  text += `Passengers:   ${data.passengers}\n`;
  if (data.distanceKm) text += `Est Distance: ${Number(data.distanceKm).toFixed(1)} km\n`;
  if (data.estimatedFare) text += `Est Fare:     $${Number(data.estimatedFare).toFixed(2)} AUD\n`;
  text += `Payment:      ${payLabel}\n`;
  if (data.notes) text += `Notes:        ${data.notes}\n`;
  text += `\nDirect Call: tel:${data.phone}\n`;
  text += `========================================\n`;
  return text;
}

function buildEmailHtml(data: any, bookingId: string, targetEmailDisplay?: string) {
  return buildDispatchAlertHtml(data, bookingId);
}

function buildEmailText(data: any, bookingId: string) {
  return buildDispatchAlertText(data, bookingId);
}

function buildWhatsAppMessage(data: any, bookingId: string) {
  const vehicle = VEHICLE_LABELS[data.vehicleType] || data.vehicleType;
  let msg = `🚖 *NEW BOOKING — Melton Taxi & Airport Transfers*\n\n`;
  msg += `📋 Booking ID: ${bookingId}\n`;
  msg += `👤 Passenger: ${data.name}\n`;
  msg += `📞 Phone: ${data.phone}\n`;
  msg += `📧 Email: ${data.email || "N/A"}\n\n`;
  msg += `📍 Pickup: ${data.pickupAddress}\n`;
  msg += `🏁 Dropoff: ${data.dropoffAddress}\n\n`;
  msg += `🚗 Vehicle: ${vehicle}\n`;
  msg += `👥 Passengers: ${data.passengers}\n`;
  msg += `📅 Date: ${data.pickupDate}\n`;
  msg += `🕐 Time: ${data.pickupTime}\n`;
  if (data.isReturn) {
    msg += `🔄 Return: ${data.returnDate} at ${data.returnTime}\n`;
  }
  if (data.distanceKm) msg += `📏 Distance: ${Number(data.distanceKm).toFixed(1)} km\n`;
  if (data.estimatedFare) msg += `💰 Est. Fare: $${Number(data.estimatedFare).toFixed(2)}\n`;
  const payLabel = data.paymentMethod === "cabcharge"
    ? "Cabcharge (eTicket / FASTCARD)"
    : data.paymentMethod === "card"
    ? "Credit / Debit Card"
    : "Cash (Pay Driver)";
  msg += `💳 Payment: ${payLabel}\n`;
  if (data.notes) msg += `📝 Notes: ${data.notes}\n`;
  return msg;
}

async function dispatchBookingEmail(data: any, bookingId: string, logger: any) {
  const settings = loadDispatchSettings();
  
  // Explicit requirement: Submitted booking must come ONLY to email info@meltontaxi.au
  // Any other admin/owner emails are strictly filtered out and removed.
  const targetDispatchEmail = "info@meltontaxi.au";
  const recipientList = [targetDispatchEmail];

  let sentViaSmtp = false;
  const transporter = createTransporter(settings);

  if (transporter) {
    try {
      const dispatchHtml = buildDispatchAlertHtml(data, bookingId);
      const dispatchText = buildDispatchAlertText(data, bookingId);
      const fromAddress = settings.emailUser
        ? `Melton Taxi Dispatch <${settings.emailUser}>`
        : `Melton Taxi Dispatch <${targetDispatchEmail}>`;

      // 1. Send dispatch notification STRICTLY and ONLY to info@meltontaxi.au
      await transporter.sendMail({
        from: fromAddress,
        to: targetDispatchEmail,
        subject: `🚖 NEW BOOKING [${bookingId}] — ${data.name} — ${data.pickupDate} ${data.pickupTime}`,
        text: dispatchText,
        html: dispatchHtml,
      });
      logger.info({ bookingId, recipient: targetDispatchEmail }, "Submitted booking successfully dispatched strictly to " + targetDispatchEmail);
      sentViaSmtp = true;

      // 2. If customer supplied their email, send the enhanced customer booking confirmation & receipt
      if (data.email && typeof data.email === "string" && data.email.includes("@")) {
        const customerHtml = buildCustomerConfirmationHtml(data, bookingId);
        const customerText = buildCustomerConfirmationText(data, bookingId);
        await transporter.sendMail({
          from: settings.emailUser
            ? `Melton Taxi & Airport Transfers <${settings.emailUser}>`
            : `Melton Taxi & Airport Transfers <${targetDispatchEmail}>`,
          to: data.email.trim(),
          subject: `🚖 Booking Confirmation [${bookingId}] — Melton Taxi & Airport Transfers`,
          text: customerText,
          html: customerHtml,
        }).catch((e: any) => logger.warn({ err: e.message }, "Customer confirmation email delivery warning"));
      }
    } catch (smtpErr: any) {
      logger.error({ err: smtpErr.message, bookingId }, "First-party SMTP delivery failed");
    }
  } else {
    logger.info({ bookingId, recipient: targetDispatchEmail }, "Booking saved in internal store; dispatch configured strictly for info@meltontaxi.au");
  }

  return { sentViaSmtp, recipients: recipientList };
}

// GET /api/bookings - Retrieve internally stored bookings directly from the server
router.get("/", (_req, res) => {
  res.json({
    success: true,
    count: internalBookingsStore.length,
    bookings: internalBookingsStore,
  });
});

router.post("/", async (req, res) => {
  const parsed = CreateBookingBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid booking data: " + parsed.error.message });
    return;
  }

  const data = parsed.data;
  const bookingId = generateBookingReference();

  // Save directly to internal server storage (100% first-party, zero third party)
  const bookingRecord: BookingRecord = {
    bookingId,
    createdAt: new Date().toISOString(),
    name: data.name,
    phone: data.phone,
    email: data.email,
    pickupAddress: data.pickupAddress,
    dropoffAddress: data.dropoffAddress,
    pickupDate: data.pickupDate,
    pickupTime: data.pickupTime,
    isReturn: data.isReturn,
    returnDate: data.returnDate,
    returnTime: data.returnTime,
    vehicleType: data.vehicleType,
    passengers: data.passengers,
    distanceKm: data.distanceKm,
    estimatedFare: data.estimatedFare,
    paymentMethod: data.paymentMethod,
    notes: data.notes,
    status: "dispatched",
  };
  internalBookingsStore.unshift(bookingRecord);
  persistBookings(internalBookingsStore);

  req.log.info({ bookingId, name: data.name, vehicleType: data.vehicleType }, "New booking received and stored internally");

  const settings = loadDispatchSettings();
  const phone = settings.dispatchPhone || PHONE;
  const waNum = settings.whatsappNumber || WHATSAPP_NUMBER;
  const whatsappMsg = buildWhatsAppMessage(data, bookingId);
  const waUrl = `https://wa.me/${waNum}?text=${encodeURIComponent(whatsappMsg)}`;

  // Direct first-party SMTP dispatch strictly to info@meltontaxi.au (plus customer confirmation if provided)
  const emailResult = await dispatchBookingEmail(data, bookingId, req.log);

  res.json({
    success: true,
    message: `Booking ${bookingId} received directly by our dispatch system. We will contact you shortly. For immediate service call ${phone}.`,
    bookingId,
    targetEmail: "info@meltontaxi.au",
    whatsappUrl: waUrl,
    storedInternally: true,
    emailDispatched: emailResult.sentViaSmtp,
  });
});

// GET /api/bookings/settings - get current dispatch configuration
router.get("/settings", (_req, res) => {
  const settings = loadDispatchSettings();
  res.json({
    success: true,
    settings: {
      ownerEmails: settings.ownerEmails,
      dispatchPhone: settings.dispatchPhone,
      whatsappNumber: settings.whatsappNumber,
      emailUser: settings.emailUser,
      hasEmailPass: Boolean(settings.emailPass),
      smtpHost: settings.smtpHost,
      smtpPort: settings.smtpPort,
      updatedAt: settings.updatedAt,
    },
  });
});

// POST /api/bookings/settings - update dispatch configuration in file
router.post("/settings", (req, res) => {
  const { ownerEmails, dispatchPhone, whatsappNumber, emailUser, emailPass, smtpHost, smtpPort } = req.body || {};
  const updated = saveDispatchSettings({
    ...(ownerEmails ? { ownerEmails: String(ownerEmails).trim() } : {}),
    ...(dispatchPhone ? { dispatchPhone: String(dispatchPhone).trim() } : {}),
    ...(whatsappNumber ? { whatsappNumber: String(whatsappNumber).trim() } : {}),
    ...(emailUser ? { emailUser: String(emailUser).trim() } : {}),
    ...(emailPass !== undefined ? { emailPass: String(emailPass).trim() } : {}),
    ...(smtpHost ? { smtpHost: String(smtpHost).trim() } : {}),
    ...(smtpPort ? { smtpPort: Number(smtpPort) } : {}),
  });

  res.json({
    success: true,
    message: "Dispatch settings saved to file successfully",
    settings: {
      ownerEmails: updated.ownerEmails,
      dispatchPhone: updated.dispatchPhone,
      whatsappNumber: updated.whatsappNumber,
      emailUser: updated.emailUser,
      hasEmailPass: Boolean(updated.emailPass),
      smtpHost: updated.smtpHost,
      smtpPort: updated.smtpPort,
      updatedAt: updated.updatedAt,
    },
  });
});

// POST /api/bookings/test-email - verify Gmail SMTP credentials with a test dispatch
router.post("/test-email", async (req, res) => {
  const settings = loadDispatchSettings();
  const transporter = createTransporter(settings);

  if (!transporter) {
    return res.status(400).json({
      success: false,
      error: "SMTP credentials not configured. Please supply emailUser and emailPass.",
    });
  }

  const recipientList = settings.ownerEmails
    .split(",")
    .map(e => e.trim())
    .filter(Boolean);

  try {
    // Verify transporter connection
    await transporter.verify();

    // Send a test dispatch email
    const fromAddress = settings.emailUser ? `Melbourne Taxis <${settings.emailUser}>` : recipientList[0];
    const targetEmail = recipientList[0] || "info@meltontaxi.au";

    await transporter.sendMail({
      from: fromAddress,
      to: targetEmail,
      subject: "🚖 Melbourne Taxis — Dispatch SMTP Connected Successfully!",
      html: `
        <div style="font-family:Arial,sans-serif;background:#111;color:#fff;padding:24px;border-radius:10px;border:2px solid #f97316;max-width:550px">
          <h2 style="color:#f97316;margin-top:0">🚖 Dispatch System Online</h2>
          <p>This confirms that your Google App Password for <strong>${settings.emailUser}</strong> is verified and working!</p>
          <p>Every time a customer submits a booking online, full details will be dispatched immediately to:</p>
          <p style="background:#222;padding:10px;border-radius:6px;font-family:monospace;color:#f97316">${settings.ownerEmails}</p>
          <p style="color:#888;font-size:12px">Sent via direct first-party TLS SMTP (${settings.smtpHost}:${settings.smtpPort})</p>
        </div>
      `,
    });

    req.log?.info({ target: targetEmail }, "Test dispatch email sent successfully via SMTP");

    res.json({
      success: true,
      message: `Test email sent successfully to ${targetEmail}! Check your inbox.`,
    });
  } catch (err: any) {
    req.log?.error({ err: err.message }, "SMTP Verification failed");
    res.status(500).json({
      success: false,
      error: `SMTP Error: ${err.message}`,
    });
  }
});

// PATCH /api/bookings/:id/status - update booking status
router.patch("/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const valid = ["dispatched", "confirmed", "completed", "cancelled"];
  if (!valid.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const booking = internalBookingsStore.find(b => b.bookingId === id);
  if (!booking) {
    return res.status(404).json({ error: "Booking not found" });
  }

  booking.status = status;
  persistBookings(internalBookingsStore);
  res.json({ success: true, booking });
});

// DELETE /api/bookings/:id - remove booking
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = internalBookingsStore.findIndex(b => b.bookingId === id);
  if (index === -1) {
    return res.status(404).json({ error: "Booking not found" });
  }

  const [removed] = internalBookingsStore.splice(index, 1);
  persistBookings(internalBookingsStore);
  res.json({ success: true, removed });
});

router.post("/estimate", (req, res) => {
  const parsed = EstimateFareBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { distanceKm, vehicleType, pickupDate, pickupTime, tollRoads, trafficRatio } = parsed.data;
  const rawBody = req.body || {};
  const passengers = typeof rawBody.passengers === "number" ? rawBody.passengers : undefined;
  const durationMinutes = typeof rawBody.durationMinutes === "number" ? rawBody.durationMinutes : undefined;
  const durationInTrafficMinutes = typeof rawBody.durationInTrafficMinutes === "number" ? rawBody.durationInTrafficMinutes : undefined;

  const fareResult = calcFare(
    distanceKm,
    vehicleType,
    passengers,
    pickupDate,
    pickupTime,
    tollRoads,
    trafficRatio,
    durationMinutes,
    durationInTrafficMinutes
  );

  res.json({
    ...fareResult,
    vehicleType,
    distanceKm,
  });
});

export default router;
