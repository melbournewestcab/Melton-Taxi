import React, { useState, useMemo } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  HelpCircle,
  CreditCard,
  MapPin,
  CalendarCheck,
  Plane,
  Phone,
  MessageCircle,
  Search,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Car,
  ChevronDown,
  ChevronRight,
  Baby,
  Users,
} from "lucide-react";

export interface FAQItem {
  id: string;
  category: "booking" | "airport" | "coverage" | "pricing" | "fleet";
  categoryLabel: string;
  question: string;
  answer: string;
  bullets?: string[];
  actionLink?: {
    label: string;
    href: string;
  };
}

export const FAQ_DATA: FAQItem[] = [
  // ── 1. Booking Procedures ──
  {
    id: "how-to-book",
    category: "booking",
    categoryLabel: "Booking Procedures",
    question: "How do I book a taxi in Melton and Bacchus Marsh?",
    answer: "Booking your ride is fast, simple, and available 24 hours a day through three easy methods:",
    bullets: [
      "Instant Online Booking: Use our live fare calculator on this page to enter your pickup and drop-off addresses, select your vehicle type, and receive an instant fixed-fare confirmation.",
      "Direct Phone Call: Call 0401 134 074 directly to speak with our local team for immediate on-demand pickups or advance reservations.",
      "WhatsApp Messaging: Send a quick message to 0401 134 074 with your travel date, time, and addresses for prompt confirmation and live driver ETA updates."
    ],
    actionLink: {
      label: "Book Your Taxi Online Now",
      href: "/book"
    }
  },
  {
    id: "advance-booking-notice",
    category: "booking",
    categoryLabel: "Booking Procedures",
    question: "How far in advance should I book my taxi?",
    answer: "We accommodate both spontaneous on-demand requests and pre-scheduled journeys:",
    bullets: [
      "Local Trips Across Melton & Bacchus Marsh: Typically dispatched in 10 to 15 minutes across town.",
      "Airport Transfers: We strongly recommend booking at least 12 to 24 hours in advance, especially for early morning departures (3:00 AM – 6:00 AM), so a dedicated driver is pre-allocated.",
      "Maxi Taxis & Group Bookings: For 6 to 11 passenger vehicles, booking 24–48 hours ahead ensures guaranteed vehicle availability for weddings, parties, or corporate events."
    ]
  },
  {
    id: "booking-cancellation-changes",
    category: "booking",
    categoryLabel: "Booking Procedures",
    question: "Can I change or cancel my booking without penalty?",
    answer: "Yes. We understand travel schedules change unexpectedly. You can modify your pickup time or cancel your reservation free of charge by calling or messaging our local team on 0401 134 074 ahead of your scheduled pickup time. There are no surprise cancellation penalties."
  },

  // ── 2. Airport Transfers ──
  {
    id: "melbourne-airport-transfers",
    category: "airport",
    categoryLabel: "Airport Transfers",
    question: "How much does a taxi from Melton or Bacchus Marsh to Melbourne Airport (Tullamarine) cost?",
    answer: "We offer competitive, transparent fixed rates for direct door-to-door airport transfers to Melbourne Airport (Tullamarine):",
    bullets: [
      "Melton to Tullamarine Airport: Approximately $85 – $115 depending on specific pickup suburb, vehicle size, and standard day/night travel times.",
      "Bacchus Marsh to Tullamarine Airport: Approximately $120 – $155 via the Western Freeway and Western Ring Road / Calder corridor.",
      "All-Inclusive Fares: Our upfront fixed quotes include CityLink / freeway tolls and airport access fees, with zero hidden extras or surge multipliers."
    ],
    actionLink: {
      label: "View Airport Transfer Rates & Info",
      href: "/services/airport"
    }
  },
  {
    id: "early-morning-airport-pickups",
    category: "airport",
    categoryLabel: "Airport Transfers",
    question: "Do you guarantee early morning airport pickups at 3:00 AM or 4:00 AM?",
    answer: "Yes, 100% guaranteed. Early morning airport runs are our core specialty. When you pre-book an early airport transfer, your driver is assigned the evening prior. We arrive 5 to 10 minutes before your scheduled pickup so you depart on time and never stress about catching your flight."
  },
  {
    id: "avalon-airport-transfers",
    category: "airport",
    categoryLabel: "Airport Transfers",
    question: "Do you provide taxi services to Avalon Airport?",
    answer: "Yes! We provide direct transfers to Avalon Airport (AVV) from both Melton and Bacchus Marsh. Travel time is typically 50 to 65 minutes via Geelong-Bacchus Marsh Road, offering a comfortable, direct journey without train or bus connections."
  },
  {
    id: "airport-return-flight-tracking",
    category: "airport",
    categoryLabel: "Airport Transfers",
    question: "How does return airport pickup work if my flight is delayed?",
    answer: "When booking an airport pickup from Tullamarine or Avalon, simply provide your flight number. Our operations team monitors your flight in real time using live radar tracking. If your arrival is delayed or lands early, your pickup time is automatically synchronized at no extra cost. Your driver will meet you at the designated terminal passenger pickup zone."
  },

  // ── 3. Melton & Bacchus Marsh Coverage ──
  {
    id: "melton-suburbs-serviced",
    category: "coverage",
    categoryLabel: "Coverage Areas",
    question: "Which suburbs around Melton do you service?",
    answer: "We provide comprehensive 24/7 door-to-door cab coverage across all suburbs throughout the City of Melton, including:",
    bullets: [
      "Melton Central & Melton South (including Melton Railway Station and High Street commercial hub)",
      "Melton West, Kurunjang, and Brookfield",
      "Cobblebank (Cobblebank Station, Cobblebank Village, and stadium) & Strathtulloh",
      "Thornhill Park, Rockbank, Aintree (Woodlea Estate), and Toolern Vale"
    ],
    actionLink: {
      label: "Browse All Melton Suburbs",
      href: "/service-areas"
    }
  },
  {
    id: "bacchus-marsh-regions-serviced",
    category: "coverage",
    categoryLabel: "Coverage Areas",
    question: "Do you service Bacchus Marsh township and Moorabool Shire?",
    answer: "Yes! Bacchus Marsh is one of our primary operating hubs. We service all localities across Moorabool Shire:",
    bullets: [
      "Bacchus Marsh town centre, Main Street, and Avenue of Honour",
      "Darley, Maddingley (train station & surrounding estates), and Halletts Way",
      "Eynesbury township & heritage golf estate",
      "Ballan, Myrniong, Merrimu, and Hopetoun Park",
      "Direct transfers connecting Bacchus Marsh to Melton, Ballarat, Geelong, and Melbourne CBD"
    ],
    actionLink: {
      label: "Bacchus Marsh Taxi Services",
      href: "/service-areas/bacchus-marsh"
    }
  },
  {
    id: "medical-hospital-transfers",
    category: "coverage",
    categoryLabel: "Coverage Areas",
    question: "Can I book a taxi for hospital visits and medical appointments?",
    answer: "Yes. We frequently provide compassionate, reliable transportation for non-emergency medical appointments. We service local clinics in Melton and Bacchus Marsh, as well as major metropolitan medical facilities including Sunshine Hospital, Footscray Hospital, and Royal Melbourne Hospital. Wheelchair-accessible vehicles and driver assistance can be arranged upon request."
  },

  // ── 4. Pricing & Payment ──
  {
    id: "surge-pricing-policy",
    category: "pricing",
    categoryLabel: "Pricing & Payment",
    question: "Do you charge surge pricing during peak hours or bad weather?",
    answer: "Never. Unlike rideshare platforms that multiply prices during rain, busy weekend nights, or major events, Melton Taxi operates under regulated Safe Transport Victoria commercial standards. Our upfront fixed quotes are locked in with zero surge multipliers, surge fees, or unexpected price spikes."
  },
  {
    id: "payment-methods-accepted",
    category: "pricing",
    categoryLabel: "Pricing & Payment",
    question: "What payment methods are accepted in your cabs?",
    answer: "Every taxi in our fleet is equipped with modern, secure payment terminals supporting all major payment options:",
    bullets: [
      "Cash: Pay your driver directly in Australian Dollars (AUD).",
      "Credit & Debit Cards: Visa, MasterCard, and American Express (AMEX) with contactless tap-and-go.",
      "Mobile Wallets: Apple Pay, Google Pay, and Samsung Pay.",
      "Cabcharge: Official Cabcharge FASTCARD, digital e-Tickets, and vouchers.",
      "Official Tax Invoices: Digital email receipts and printed tax receipts compliant with the Australian Taxation Office (ATO) for business expense claims."
    ]
  },
  {
    id: "corporate-accounts",
    category: "pricing",
    categoryLabel: "Pricing & Payment",
    question: "Can local businesses set up a corporate travel account?",
    answer: "Yes. We partner with companies, schools, healthcare providers, and professional practices across Melton and Bacchus Marsh. Corporate accounts include consolidated monthly invoicing, priority booking access, and customized reporting.",
    actionLink: {
      label: "Explore Corporate Travel Solutions",
      href: "/services/corporate"
    }
  },

  // ── 5. Fleet & Special Requests ──
  {
    id: "maxi-taxi-group-travel",
    category: "fleet",
    categoryLabel: "Fleet & Vehicles",
    question: "Do you have Maxi Taxis for large groups and excess luggage?",
    answer: "Yes! Our fleet includes 7 to 11 passenger Toyota HiAce Maxi Taxis and spacious People Movers. These vehicles are ideal for family airport transfers with 6+ suitcases, wedding guest transport, sports team travel, and corporate events.",
    actionLink: {
      label: "View Fleet Specifications",
      href: "/fleet"
    }
  },
  {
    id: "child-baby-safety-seats",
    category: "fleet",
    categoryLabel: "Fleet & Vehicles",
    question: "Can I request a child safety seat or baby capsule for my trip?",
    answer: "Yes. Family safety is a top priority. When submitting your booking, you can specify your requirement for rear-facing baby capsules, forward-facing child seats, or booster seats. Our vehicles feature certified ISOFIX and tether anchorage points for secure, compliant installation."
  },
  {
    id: "parcel-courier-delivery",
    category: "fleet",
    categoryLabel: "Fleet & Vehicles",
    question: "Do you offer same-day parcel delivery and courier services?",
    answer: "Yes. We provide express point-to-point parcel delivery across the western suburbs and Melbourne. Whether you need urgent legal documents, medical supplies, automotive spare parts, or sensitive keys delivered, our drivers deliver directly from door to door with instant proof of delivery.",
    actionLink: {
      label: "Learn About Parcel Delivery",
      href: "/services/parcel"
    }
  }
];

export function HomeFAQ() {
  const [activeCategory, setActiveCategory] = useState<"all" | "booking" | "airport" | "coverage" | "pricing" | "fleet">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All Questions", icon: <HelpCircle className="w-3.5 h-3.5" /> },
    { id: "booking", label: "Booking Procedures", icon: <CalendarCheck className="w-3.5 h-3.5" /> },
    { id: "airport", label: "Airport Transfers", icon: <Plane className="w-3.5 h-3.5" /> },
    { id: "coverage", label: "Melton & Bacchus Marsh", icon: <MapPin className="w-3.5 h-3.5" /> },
    { id: "pricing", label: "Pricing & Payment", icon: <CreditCard className="w-3.5 h-3.5" /> },
    { id: "fleet", label: "Fleet & Baby Seats", icon: <Car className="w-3.5 h-3.5" /> },
  ] as const;

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      if (!searchQuery.trim()) return matchesCategory;

      const q = searchQuery.toLowerCase();
      const matchesText =
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        (item.bullets && item.bullets.some((b) => b.toLowerCase().includes(q))) ||
        item.categoryLabel.toLowerCase().includes(q);

      return matchesCategory && matchesText;
    });
  }, [activeCategory, searchQuery]);

  // Schema.org FAQPage structured data for Google rich snippets
  const faqSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQ_DATA.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.bullets && faq.bullets.length > 0
            ? `${faq.answer} ${faq.bullets.join("; ")}`
            : faq.answer,
        },
      })),
    };
  }, []);

  return (
    <section className="py-24 bg-card/60 border-b border-border relative" id="faq" aria-labelledby="faq-heading">
      {/* ── JSON-LD Structured Data for Local SEO Rich Snippets ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container max-w-5xl mx-auto px-4">
        
        {/* ── Section Header ── */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-bold uppercase tracking-wider text-primary mb-3">
            <HelpCircle className="w-3.5 h-3.5" /> Local Taxi Guide &amp; FAQs
          </div>
          <h2 id="faq-heading" className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Essential information regarding booking procedures, fixed airport fares, fleet options, and 24/7 service coverage across <strong className="text-white">Melton, Bacchus Marsh, and Moorabool Shire</strong>.
          </p>
        </div>

        {/* ── Quick Highlights Metric Bar ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 max-w-3xl mx-auto">
          <div className="bg-background border border-border rounded-xl p-3 text-center">
            <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
            <div className="text-xs font-bold text-white">24/7 Service</div>
            <div className="text-[10px] text-muted-foreground">Day &amp; Night Availability</div>
          </div>
          <div className="bg-background border border-border rounded-xl p-3 text-center">
            <ShieldCheck className="w-4 h-4 text-primary mx-auto mb-1" />
            <div className="text-xs font-bold text-white">Zero Surge</div>
            <div className="text-[10px] text-muted-foreground">Fixed Fare Guarantee</div>
          </div>
          <div className="bg-background border border-border rounded-xl p-3 text-center">
            <Plane className="w-4 h-4 text-primary mx-auto mb-1" />
            <div className="text-xs font-bold text-white">MEL &amp; AVV</div>
            <div className="text-[10px] text-muted-foreground">Express Airport Runs</div>
          </div>
          <div className="bg-background border border-border rounded-xl p-3 text-center">
            <Users className="w-4 h-4 text-primary mx-auto mb-1" />
            <div className="text-xs font-bold text-white">1–11 Seats</div>
            <div className="text-[10px] text-muted-foreground">Sedans, SUVs &amp; Maxis</div>
          </div>
        </div>

        {/* ── Search Input ── */}
        <div className="max-w-md mx-auto mb-8 relative">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search queries (e.g., airport, baby seat, payment, Bacchus Marsh)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-14 h-10 rounded-full bg-background border-border text-xs sm:text-sm focus-visible:ring-primary shadow-xs"
            aria-label="Search FAQs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-white transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {/* ── Category Filter Tabs ── */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  active
                    ? "bg-primary text-black shadow-sm scale-[1.02]"
                    : "bg-background border border-border text-muted-foreground hover:text-white hover:border-primary/50 shadow-xs"
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── Accordion List ── */}
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 px-4 bg-background border border-border rounded-2xl mb-12">
            <p className="text-muted-foreground text-sm mb-3">
              No matching questions found for &ldquo;{searchQuery}&rdquo;.
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="rounded-full text-xs font-bold"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="space-y-3 mb-12">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`bg-background border rounded-xl px-5 py-0.5 shadow-xs transition-colors ${
                    isOpen ? "border-primary/60 bg-secondary/30" : "border-border hover:border-primary/40"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqId((prev) => (prev === faq.id ? null : faq.id))}
                    className="w-full flex items-center justify-between text-left font-bold text-sm sm:text-base text-white hover:no-underline py-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-left pr-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-secondary text-primary w-fit border border-primary/20 shrink-0">
                        {faq.categoryLabel}
                      </span>
                      <span className="leading-snug">{faq.question}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="text-muted-foreground text-xs sm:text-sm leading-relaxed pb-5 pt-1 border-t border-border/40 space-y-3">
                      <p>{faq.answer}</p>
                      
                      {faq.bullets && faq.bullets.length > 0 && (
                        <ul className="space-y-1.5 pl-2">
                          {faq.bullets.map((b, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {faq.actionLink && (
                        <div className="pt-2">
                          <Link
                            href={faq.actionLink.href}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline uppercase tracking-wider"
                          >
                            {faq.actionLink.label} <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── Direct Support / Booking Action Card ── */}
        <div className="bg-secondary/80 border border-border rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="text-center md:text-left space-y-1.5">
            <div className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> Local Melton &amp; Bacchus Marsh Team
            </div>
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
              Have Another Question or Need an Immediate Taxi?
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm max-w-xl leading-relaxed">
              Our local customer support team is based in the western suburbs. Call directly or message on WhatsApp for instant fixed fare estimates and driver allocation.
            </p>
          </div>
          <div className="flex flex-wrap sm:flex-nowrap gap-2.5 w-full md:w-auto justify-center shrink-0">
            <Button asChild size="default" className="h-10 px-5 rounded-full font-bold uppercase tracking-wider text-xs bg-primary text-black hover:bg-primary/90 shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
              <a href="tel:0401134074">
                <Phone className="w-3.5 h-3.5 mr-1.5" /> 0401 134 074
              </a>
            </Button>
            <Button asChild size="default" variant="outline" className="h-10 px-5 rounded-full font-bold uppercase tracking-wider text-xs border-border text-white hover:bg-white hover:text-black transition-all active:scale-[0.98]">
              <a
                href="https://wa.me/61401134074?text=Hi%2C%20I%20have%20a%20question%20about%20booking%20a%20taxi%20in%20Melton%20or%20Bacchus%20Marsh."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-3.5 h-3.5 mr-1.5 text-green-500" /> WhatsApp
              </a>
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
