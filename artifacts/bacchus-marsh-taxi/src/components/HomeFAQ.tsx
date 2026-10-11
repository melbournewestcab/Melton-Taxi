import React, { useState, useMemo } from "react";
import { Link } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  ChevronRight,
} from "lucide-react";

export interface FAQItem {
  id: string;
  category: "booking" | "payment" | "coverage" | "airport";
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
  // ── Booking Processes ──
  {
    id: "booking-how-to",
    category: "booking",
    categoryLabel: "Booking Process",
    question: "How do I book a taxi in Melton & Bacchus Marsh?",
    answer: "Booking is fast, straightforward, and available 24/7 through three convenient options:",
    bullets: [
      "Online Fare Calculator: Enter your pickup and drop-off addresses above for an instant fixed-rate estimate and instant confirmation.",
      "Direct 24/7 Phone Dispatch: Call 0401 134 074 directly to speak with our local operations team for on-demand dispatch or pre-bookings.",
      "WhatsApp Instant Booking: Message us on WhatsApp with your pickup time and destination for rapid confirmation and driver ETA updates."
    ],
    actionLink: {
      label: "Open Online Booking Form",
      href: "/book"
    }
  },
  {
    id: "booking-advance-notice",
    category: "booking",
    categoryLabel: "Booking Process",
    question: "How far in advance should I book my ride?",
    answer: "We accommodate both immediate on-demand pickups and scheduled advance reservations:",
    bullets: [
      "Local On-Demand Trips: Usually dispatched within 10 to 15 minutes across Melton and Bacchus Marsh.",
      "Airport Transfers: We strongly recommend booking at least 12 to 24 hours in advance, especially for early morning flights (3:00 AM – 6:00 AM) to ensure guaranteed on-time vehicle arrival.",
      "Maxi Taxis (Group Travel): For 6–11 passenger vans, advance booking guarantees vehicle availability for sporting events, weddings, and group transfers."
    ]
  },
  {
    id: "booking-fare-estimates",
    category: "booking",
    categoryLabel: "Booking Process",
    question: "Can I get an exact fixed fare quote before travelling?",
    answer: "Yes! Unlike rideshare apps that leave prices uncertain, Melton Taxi provides 100% upfront fixed fares for all airport transfers and point-to-point journeys. What you see is what you pay—with zero surge pricing during peak hours, bad weather, or public holidays."
  },
  {
    id: "booking-baby-seats",
    category: "booking",
    categoryLabel: "Booking Process",
    question: "Do you supply child safety seats or carry bulky luggage?",
    answer: "Yes, family safety is a core priority across our fleet:",
    bullets: [
      "Baby & Booster Seats: Front-facing, rear-facing baby capsules, and booster seats can be requested in the booking form.",
      "Bulky Luggage & Prams: Our spacious SUVs and high-roof Toyota HiAce Maxi Taxis comfortably fit oversized suitcases, foldable wheelchairs, prams, and golf bags."
    ],
    actionLink: {
      label: "View Fleet & Luggage Capacities",
      href: "/fleet"
    }
  },

  // ── Accepted Payment Methods ──
  {
    id: "payment-methods-accepted",
    category: "payment",
    categoryLabel: "Payment Methods",
    question: "What payment methods are accepted in your taxis?",
    answer: "Every vehicle in our Melton & Bacchus Marsh fleet is equipped with modern, encrypted payment terminals supporting:",
    bullets: [
      "Cash: Pay your driver directly in AUD at the conclusion of your trip.",
      "Debit & Credit Cards: Visa, MasterCard, and American Express (AMEX) with contactless tap & go.",
      "Mobile Wallets: Apple Pay, Google Pay, and Samsung Pay.",
      "Cabcharge: Official Cabcharge FASTCARD, digital e-Tickets, and gift cards.",
      "Tax Invoices: Instant digital receipts and printed tax receipts compliant with the ATO for business tax deductions."
    ]
  },
  {
    id: "payment-surge-pricing",
    category: "payment",
    categoryLabel: "Payment Methods",
    question: "Do you ever charge surge pricing or cancellation fees?",
    answer: "Never. Melton Taxi operates under strict Safe Transport Victoria taxi accreditation. We never multiply fares due to rain, high demand, major Melbourne concerts, or rail replacement disruptions. Upfront quotes remain fixed and honoured."
  },
  {
    id: "payment-cabcharge-corporate",
    category: "payment",
    categoryLabel: "Payment Methods",
    question: "Can businesses set up corporate accounts or use Cabcharge?",
    answer: "Yes. We partner with local western businesses, healthcare facilities, legal practices, and corporate travellers across Melton and Bacchus Marsh. We offer monthly invoicing, consolidated billing, and seamless priority corporate dispatch.",
    actionLink: {
      label: "Learn About Corporate Travel",
      href: "/services/corporate"
    }
  },

  // ── Coverage Areas for Melton & Bacchus Marsh ──
  {
    id: "coverage-melton-suburbs",
    category: "coverage",
    categoryLabel: "Coverage Areas",
    question: "Which areas in and around Melton are covered?",
    answer: "We provide comprehensive 24/7 door-to-door coverage across all City of Melton suburbs including:",
    bullets: [
      "Melton & Melton South (including Melton Railway Station & High Street hub)",
      "Melton West, Kurunjang, and Brookfield",
      "Cobblebank (Cobblebank Stadium, train station, and shopping precinct) & Strathtulloh",
      "Thornhill Park, Rockbank, Aintree (Woodlea estate), and Toolern Vale"
    ],
    actionLink: {
      label: "Browse Service Area Directory",
      href: "/service-areas"
    }
  },
  {
    id: "coverage-bacchus-marsh-regions",
    category: "coverage",
    categoryLabel: "Coverage Areas",
    question: "Do you service Bacchus Marsh township and surrounding regional towns?",
    answer: "Yes! Bacchus Marsh is one of our two primary operating headquarters. We service the entire Moorabool Shire corridor:",
    bullets: [
      "Bacchus Marsh central township, The Avenue of Honour, and Main Street",
      "Darley, Maddingley (train station & surrounding estates), and Halletts Way",
      "Eynesbury township & heritage golf estate",
      "Ballan, Myrniong, Merrimu, and Hopetoun Park",
      "Direct transfers connecting Bacchus Marsh to Melton, Ballarat, and Melbourne"
    ],
    actionLink: {
      label: "Bacchus Marsh Taxi Details",
      href: "/service-areas/bacchus-marsh"
    }
  },
  {
    id: "coverage-long-distance-cbd",
    category: "coverage",
    categoryLabel: "Coverage Areas",
    question: "Can I book a trip from Melton or Bacchus Marsh to Melbourne CBD or hospitals?",
    answer: "Absolutely. We routinely provide comfortable, non-stop transfers from Melton and Bacchus Marsh into Melbourne CBD (Southern Cross Station, Crown, Flinders St), medical centers (The Royal Melbourne, Footscray Hospital, Sunshine Hospital), and regional centers like Geelong and Ballarat."
  },

  // ── Airport Transfers ──
  {
    id: "airport-transfers-mel-avv",
    category: "airport",
    categoryLabel: "Airport Transfers",
    question: "How do airport transfers to Tullamarine & Avalon work?",
    answer: "We provide express private airport transfers without crowded shuttle delays or parking hassles:",
    bullets: [
      "Direct to Terminal: Picked up right from your doorstep in Melton or Bacchus Marsh and dropped directly at Terminal 1, 2, 3 or Terminal 4 departure doors.",
      "Fixed Rates: Pre-agreed pricing inclusive of all highway tolls and airport access levies.",
      "Live Flight Tracking: For incoming flights, our dispatch radar tracks your flight number in real time, adjusting driver arrival automatically if your flight is delayed."
    ],
    actionLink: {
      label: "Airport Transfer Rates & Info",
      href: "/services/airport"
    }
  },
  {
    id: "airport-early-morning-reliability",
    category: "airport",
    categoryLabel: "Airport Transfers",
    question: "Can I rely on a driver arriving for an early 4:00 AM airport pickup?",
    answer: "Yes, 100%. Early morning airport transfers are our specialty. When you book an airport transfer in advance, a dedicated driver is assigned and confirmed ahead of time. You will receive driver contact details so you never have to worry about missing your flight."
  }
];

export function HomeFAQ() {
  const [activeCategory, setActiveCategory] = useState<"all" | "booking" | "payment" | "coverage" | "airport">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "All Questions", icon: <HelpCircle className="w-3.5 h-3.5" /> },
    { id: "booking", label: "Booking Process", icon: <CalendarCheck className="w-3.5 h-3.5" /> },
    { id: "payment", label: "Payment & Rates", icon: <CreditCard className="w-3.5 h-3.5" /> },
    { id: "coverage", label: "Melton & Bacchus Marsh Coverage", icon: <MapPin className="w-3.5 h-3.5" /> },
    { id: "airport", label: "Airport Transfers", icon: <Plane className="w-3.5 h-3.5" /> },
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

  return (
    <section className="py-24 bg-card/60 border-b border-border" id="faq" aria-labelledby="faq-heading">
      <div className="container max-w-5xl mx-auto px-4">
        
        {/* ── Section Header ── */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-bold uppercase tracking-wider text-primary mb-3">
            <HelpCircle className="w-3.5 h-3.5" /> Customer Help &amp; FAQs
          </div>
          <h2 id="faq-heading" className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Quick answers regarding booking procedures, payment options, and 24/7 service coverage across <strong className="text-white">Melton &amp; Bacchus Marsh</strong> and direct airport transfers.
          </p>
        </div>

        {/* ── Search Input ── */}
        <div className="max-w-md mx-auto mb-8 relative">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search queries (e.g., payment, airport, child seat, Bacchus Marsh)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 h-10 rounded-full bg-background border-border text-xs sm:text-sm focus-visible:ring-primary shadow-xs"
            aria-label="Search FAQs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* ── Category Filter Tabs (Round & Compact) ── */}
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
          <Accordion type="single" collapsible className="space-y-3 mb-12">
            {filteredFaqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="bg-background border border-border rounded-xl px-5 py-0.5 shadow-xs transition-all hover:border-primary/40 data-[state=open]:border-primary/60 data-[state=open]:bg-secondary/30"
              >
                <AccordionTrigger className="text-left font-bold text-sm sm:text-base text-white hover:no-underline py-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-left pr-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-secondary text-primary w-fit border border-primary/20 shrink-0">
                      {faq.categoryLabel}
                    </span>
                    <span className="leading-snug">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-xs sm:text-sm leading-relaxed pb-5 pt-1 border-t border-border/40 space-y-3">
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
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        {/* ── Direct Dispatch Call / WhatsApp Help Card ── */}
        <div className="bg-secondary/80 border border-border rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="text-center md:text-left space-y-1.5">
            <div className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> 24/7 Local Melton &amp; Bacchus Marsh Help
            </div>
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
              Have Another Question or Need an Immediate Cab?
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm max-w-xl leading-relaxed">
              Our 24-hour dispatch staff are based locally in the western suburbs. Call directly or message on WhatsApp for instant rate quotes and fast driver dispatch.
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
