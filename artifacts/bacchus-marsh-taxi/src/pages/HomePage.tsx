import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  Plane,
  Car,
  Users,
  Star,
  ArrowRight,
  Shield,
  Phone,
  MessageCircle,
} from "lucide-react";
import { SEO } from "@/components/SEO";

// Lazy-load HomeFAQ so below-the-fold content does not block mobile first-paint
const HomeFAQ = React.lazy(() =>
  import("@/components/HomeFAQ").then((m) => ({ default: m.HomeFAQ }))
);

const HOME_FAQS_SUMMARY = [
  { q: "How do I book a taxi in Melton and Bacchus Marsh?", a: "Book instantly online with fixed fares on our website, call 0401 134 074 24/7, or message us on WhatsApp." },
  { q: "Do you offer fixed price airport transfers to Melbourne Tullamarine and Avalon?", a: "Yes, we guarantee transparent fixed-rate airport transfers 24/7 with zero surge pricing." },
  { q: "Are child booster seats and baby capsules available?", a: "Yes, rear-facing baby capsules, forward-facing child seats, and booster seats are available upon request." },
  { q: "Which areas in Western Melbourne do you service?", a: "Melton, Bacchus Marsh, Melton South, Melton West, Kurunjang, Brookfield, Cobblebank, Rockbank, Thornhill Park, Darley, Maddingley, Eynesbury, Ballan, and all surrounding areas." },
  { q: "What payment methods are accepted?", a: "We accept Cash, EFTPOS, Visa, MasterCard, AMEX, Apple Pay, Google Pay, and Cabcharge." },
];

// Lazy-load BookingForm to keep initial page bundle ultra-light and render under 1 second
const BookingForm = React.lazy(() =>
  import("@/components/BookingForm").then((m) => ({ default: m.BookingForm }))
);

function BookingFormSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-card border border-border rounded-2xl p-6 md:p-8 animate-pulse shadow-xl">
      <div className="h-6 w-44 bg-muted/60 rounded mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div className="h-4 w-28 bg-muted/60 rounded" />
          <div className="h-12 w-full bg-muted/40 rounded-xl" />
          <div className="h-4 w-28 bg-muted/60 rounded" />
          <div className="h-12 w-full bg-muted/40 rounded-xl" />
        </div>
        <div className="space-y-4">
          <div className="h-4 w-28 bg-muted/60 rounded" />
          <div className="h-12 w-full bg-muted/40 rounded-xl" />
          <div className="h-4 w-28 bg-muted/60 rounded" />
          <div className="h-12 w-full bg-muted/40 rounded-xl" />
        </div>
      </div>
      <div className="h-14 w-full bg-primary/20 rounded-xl" />
    </div>
  );
}

function DeferredBookingForm() {
  const [shouldLoad, setShouldLoad] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#book") {
      setShouldLoad(true);
      return;
    }

    if ("IntersectionObserver" in window && containerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        },
        { rootMargin: "400px" }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    } else {
      const timer = setTimeout(() => setShouldLoad(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div ref={containerRef}>
      {shouldLoad ? (
        <React.Suspense fallback={<BookingFormSkeleton />}>
          <BookingForm />
        </React.Suspense>
      ) : (
        <BookingFormSkeleton />
      )}
    </div>
  );
}

function DeferredHomeFAQ() {
  const [shouldLoad, setShouldLoad] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#faq") {
      setShouldLoad(true);
      return;
    }

    if ("IntersectionObserver" in window && containerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        },
        { rootMargin: "600px" }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    } else {
      const timer = setTimeout(() => setShouldLoad(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div ref={containerRef}>
      {shouldLoad ? (
        <React.Suspense fallback={<div className="py-24 text-center text-muted-foreground">Loading FAQs...</div>}>
          <HomeFAQ />
        </React.Suspense>
      ) : (
        <div className="py-24" />
      )}
    </div>
  );
}

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <SEO
        title="Melton Taxi | Melton Bacchus Marsh Taxi & Airport Transfers | 0401 134 074"
        description="Melton Taxi & Bacchus Marsh Melton cab taxi service. 24/7 reliable airport transfers to Tullamarine & Avalon, fixed fares & Maxi Taxis. Call 0401 134 074."
        keywords={[
          "melton taxi",
          "melton bacchus marsh taxi",
          "airport transfers",
          "bacchus marsh melton cab taxi service",
          "melton airport transfers",
          "bacchus marsh taxi",
          "bacchusmarsh taxi",
          "taxi melton",
          "taxi melton south",
          "taxi bacchus marsh",
          "melton cab",
          "bacchus marsh cab",
          "taxi to melbourne airport",
          "maxi taxi melton",
          "cheap taxi melton",
          "24/7 melton taxi",
          "taxi kurunjang",
          "taxi brookfield",
          "taxi cobblebank",
          "taxi darley",
          "taxi rockbank",
        ]}
        canonicalPath="/"
        faqs={HOME_FAQS_SUMMARY}
      />

      {/* ── Hero Section ── */}
      <section className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden bg-background py-16 md:py-24">
        <div className="absolute inset-0 z-0">
          <picture>
            <source media="(max-width: 640px)" srcSet="/images/hero-taxi-mobile.webp" type="image/webp" />
            <img
              src="/images/hero-taxi.webp"
              alt="Melton Taxi servicing Melton &amp; Bacchus marsh and all nearby areas"
              className="w-full h-full object-cover opacity-35"
              decoding="async"
              {...{ fetchpriority: "high" }}
              width="1400"
              height="800"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background" />
        </div>

        <div className="relative z-10 container max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-3 leading-tight">
            MELTON <span className="text-primary">TAXI</span> <span className="text-primary/90 font-extrabold">&amp; Bacchus Marsh</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg font-black uppercase tracking-widest text-primary mb-5">
            Melton Bacchus Marsh Taxi &amp; Airport Transfers
          </p>

          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 font-medium leading-relaxed">
            Fast, reliable 24/7 <strong className="text-white font-bold">Bacchus Marsh Melton cab taxi service</strong> across Melton, Bacchus Marsh, and all nearby areas, plus direct fixed-rate <strong className="text-white font-bold">airport transfers</strong> to Melbourne Airport (Tullamarine) &amp; Avalon.
          </p>

          {/* CTAs with updated phone number */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button asChild size="default" className="w-full sm:w-auto h-11 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-full shadow-md hover:shadow-lg bg-primary text-black hover:bg-primary/90 transition-all duration-200 active:scale-[0.98]">
              <Link href="/book" data-testid="btn-hero-book">Book Melton Taxi Online</Link>
            </Button>
            <Button asChild size="default" variant="outline" className="w-full sm:w-auto h-11 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-full bg-background/60 backdrop-blur-sm border-2 border-white/80 text-white hover:bg-white hover:text-black transition-all duration-200 active:scale-[0.98] shadow-md">
              <a href="tel:0401134074" data-testid="btn-hero-call">Call 0401 134 074</a>
            </Button>
            <a
              href="https://wa.me/61401134074?text=Hi%2C%20I%20would%20like%20to%20book%20a%20taxi%20with%20Melton%20Taxi."
              target="_blank"
              rel="noopener noreferrer"
              data-testid="btn-hero-whatsapp"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-full transition-all duration-200 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg text-white"
              style={{ background: "#25D366" }}
            >
              <WhatsAppIcon />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* ── Trust Badges ── */}
      <section className="py-10 bg-secondary border-y border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <Clock className="w-8 h-8 text-primary" />
              <span className="font-bold uppercase tracking-wide text-sm">24/7 Local Dispatch</span>
              <span className="text-xs text-muted-foreground">Melton &amp; Bacchus marsh</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Plane className="w-8 h-8 text-primary" />
              <span className="font-bold uppercase tracking-wide text-sm">Airport Transfers</span>
              <span className="text-xs text-muted-foreground">Tullamarine &amp; Avalon (Fixed Fares)</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck className="w-8 h-8 text-primary" />
              <span className="font-bold uppercase tracking-wide text-sm">Safe Transport VIC</span>
              <span className="text-xs text-muted-foreground">Accredited &amp; Insured Fleet</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <CheckCircle2 className="w-8 h-8 text-primary" />
              <span className="font-bold uppercase tracking-wide text-sm">Zero Surge Pricing</span>
              <span className="text-xs text-muted-foreground">Regulated &amp; Upfront Rates</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Instant Fare Calculator & Booking Form ── */}
      <section className="py-20 bg-background border-b border-border" id="book">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">Accurate &amp; Transparent</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">
              Book Your <span className="text-primary">Melton Taxi</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base">
              Enter your pickup and drop-off addresses anywhere across Melton &amp; Bacchus marsh, and surrounding areas for an instant fare estimate, then confirm online or call 0401 134 074.
            </p>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mt-6" />
          </div>
          <DeferredBookingForm />
        </div>
      </section>

      {/* ── Primary Service Areas Section ── */}
      <section className="py-20 bg-card border-b border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">Core Service Areas</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
              Melton &amp; Bacchus marsh &amp; All Nearby Areas
            </h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto text-base">
              Melton Taxi provides rapid doorstep dispatch across all neighbouring townships, railway stations, shopping precincts, and direct airport transfer corridors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Pillar 1: Melton & Melton South */}
            <div className="bg-background border border-border rounded-xl p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <Car className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3">
                  Melton &amp; Melton South
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Fast 10–15 minute pickups for Woodgrove Shopping Centre, Melton Railway Station, High Street dining, schools, and residential estates across Melton South, Melton West, Kurunjang, Brookfield, and Cobblebank.
                </p>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Melton &amp; Melton South Railway Stations</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Woodgrove &amp; Cobblebank shopping runs</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> 24/7 availability — call 0401 134 074</li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-border flex gap-4">
                <Link href="/service-areas/melton" className="text-primary font-bold text-xs uppercase tracking-wider hover:underline">
                  Melton Details →
                </Link>
                <Link href="/service-areas/melton-south" className="text-primary font-bold text-xs uppercase tracking-wider hover:underline">
                  Melton South →
                </Link>
              </div>
            </div>

            {/* Pillar 2: Bacchus Marsh */}
            <div className="bg-background border border-primary/40 rounded-xl p-8 shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-6">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3">
                  Bacchus Marsh &amp; Surrounds
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Dedicated local taxis serving Bacchus Marsh township, Darley, Maddingley, Eynesbury, and Ballan. Express travel via the Western Highway corridor connecting directly into Melton, Ballarat, and Melbourne.
                </p>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Bacchus Marsh town, Darley &amp; Maddingley</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Eynesbury estate &amp; Ballan township</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Hospital visits, school runs &amp; V/Line connections</li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-border flex gap-4">
                <Link href="/service-areas/bacchus-marsh" className="text-primary font-bold text-xs uppercase tracking-wider hover:underline">
                  Bacchus Marsh Info →
                </Link>
                <Link href="/service-areas/darley" className="text-primary font-bold text-xs uppercase tracking-wider hover:underline">
                  Darley Info →
                </Link>
              </div>
            </div>

            {/* Pillar 3: Airport Transfers */}
            <div className="bg-background border border-border rounded-xl p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <Plane className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3">
                  Airport Transfers (MEL &amp; AVV)
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Guaranteed fixed-price airport transfers from Melton &amp; Bacchus marsh, and all nearby areas to Melbourne Airport (Tullamarine) and Avalon Airport. Early morning 4 AM pickups guaranteed on time with live flight radar tracking.
                </p>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Fixed price upfront — zero surge pricing</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Live flight tracking for delayed arrivals</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> Sedans, SUVs &amp; 11-seat Maxi Taxis</li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-border">
                <Link href="/services/airport" className="text-primary font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 hover:underline">
                  Airport Booking Info <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Services Overview ── */}
      <section className="py-24 bg-background border-b border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">Full Suite of Services</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 text-white">
              Melton Taxi Services
            </h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Airport Transfers (MEL & AVV)",
                desc: "Direct, stress-free transfers to Melbourne Airport (Tullamarine) & Avalon Airport with live flight tracking and zero surge fees.",
                href: "/services/airport",
                icon: <Plane className="w-7 h-7 text-primary mb-3" />
              },
              {
                title: "Melton & Melton South Local Cabs",
                desc: "Fast pickups across Melton, Melton South, Melton West, Kurunjang, Brookfield, Cobblebank, and Woodgrove.",
                href: "/services/a-to-b",
                icon: <Car className="w-7 h-7 text-primary mb-3" />
              },
              {
                title: "Bacchus Marsh Taxi (bacchusmarsh)",
                desc: "Round-the-clock taxi service for Bacchus Marsh, Darley, Maddingley, Eynesbury, Ballan, and regional western areas.",
                href: "/service-areas/bacchus-marsh",
                icon: <MapPin className="w-7 h-7 text-primary mb-3" />
              },
              {
                title: "Maxi Taxi Melton (Up to 11 Pax)",
                desc: "High-capacity Toyota HiAce vans for family airport departures, sporting matches, race days, and group events.",
                href: "/fleet",
                icon: <Users className="w-7 h-7 text-primary mb-3" />
              },
              {
                title: "Corporate & Silver Service",
                desc: "Executive chauffeur-grade Lexus and luxury sedans for business meetings, corporate invoicing, and VIP client arrivals.",
                href: "/services/corporate",
                icon: <Car className="w-7 h-7 text-primary mb-3" />
              },
              {
                title: "Same-Day Courier & Parcel",
                desc: "Urgent package and document courier delivery across Melton, Bacchus Marsh, and Greater Melbourne with direct dispatch.",
                href: "/services/parcel",
                icon: <Clock className="w-7 h-7 text-primary mb-3" />
              }
            ].map((service, i) => (
              <Card key={i} className="bg-card border-border hover:border-primary/60 transition-all group flex flex-col justify-between">
                <CardContent className="p-8">
                  {service.icon}
                  <h3 className="text-xl font-bold uppercase tracking-wide mb-3 group-hover:text-primary transition-colors text-white">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {service.desc}
                  </p>
                  <Link href={service.href} className="text-primary font-bold uppercase text-xs tracking-wider inline-flex items-center gap-1.5 group-hover:underline">
                    View Details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fleet Showcase ── */}
      <section className="py-24 bg-card border-b border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="mb-14 text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">Modern &amp; Well-Maintained</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 text-white">Our Taxi Fleet</h2>
            <div className="w-24 h-1.5 bg-primary rounded-full mx-auto mb-4" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Clean, reliable, and air-conditioned vehicles for every journey — from local Melton errands to 11-seat group airport transfers to Tullamarine &amp; Avalon.
            </p>
          </div>

          {(() => {
            const vehicles = [
              { type: "Standard Sedan",       img: "fleet-sedan.webp",          pax: "1–4",      id: "sedan", desc: "Toyota Camry hybrid sedans for everyday Melton rides, shopping runs & airport transfers." },
              { type: "Premium SUV",           img: "fleet-suv.webp",            pax: "1–5",      id: "suv", desc: "Elevated comfort with abundant luggage room for family airport departures from Melton & Bacchus Marsh." },
              { type: "Silver Service",        img: "fleet-silver-service.webp", pax: "1–4",      id: "silver_service", desc: "Luxury executive Lexus sedans driven by experienced suited chauffeurs for corporate travel." },
              { type: "6 Seater People Mover", img: "fleet-six-seater.webp",     pax: "5–6",      id: "six_seater", desc: "Spacious Kia Carnival people movers designed for mid-sized family airport trips." },
              { type: "Maxi Taxi (11 Seater)", img: "fleet-maxi-taxi.webp",      pax: "Up to 11", id: "maxi_taxi", desc: "High-capacity Toyota HiAce vans for sports events, wedding guests, and oversized luggage." },
            ];
            const FleetCard = ({ v, i }: { v: typeof vehicles[0]; i: number }) => (
              <Link
                key={i}
                href={`/book?vehicle=${v.id}`}
                className="group cursor-pointer flex flex-col justify-between w-full h-full bg-background border border-border/80 hover:border-primary/80 rounded-2xl p-4 sm:p-5 text-center shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Symmetrical Photo Frame */}
                <div className="w-full aspect-[16/9] rounded-xl overflow-hidden bg-secondary/60 border border-border/60 relative flex items-center justify-center mb-4">
                  <img
                    src={`/images/${v.img}`}
                    alt={`${v.type} - Melton Taxi`}
                    loading="lazy"
                    decoding="async"
                    width="500"
                    height="281"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Symmetrically Centered Passenger Badge */}
                  <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 bg-black/85 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-black text-primary border border-primary/40 uppercase tracking-wider shadow whitespace-nowrap">
                    {v.pax} Passengers
                  </div>
                </div>

                {/* Symmetrically Centered Content */}
                <div className="flex flex-col items-center flex-grow">
                  <h3 className="text-lg font-black uppercase tracking-wide group-hover:text-primary transition-colors text-white mb-2">
                    {v.type}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 max-w-xs mx-auto mb-4">
                    {v.desc}
                  </p>
                </div>

                {/* Centered CTA Action */}
                <div className="w-full pt-2">
                  <div className="w-full py-2 px-4 rounded-full text-xs font-bold uppercase tracking-wider bg-secondary/80 group-hover:bg-primary group-hover:text-black border border-border text-foreground transition-all duration-200 shadow-xs group-hover:shadow-sm">
                    Select &amp; Book Online →
                  </div>
                </div>
              </Link>
            );
            return (
              <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
                {vehicles.map((v, i) => (
                  <div key={i} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm flex">
                    <FleetCard v={v} i={i} />
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </section>

      {/* ── Suburbs & Coverage Area ── */}
      <section className="py-24 bg-secondary/50 border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">Regional &amp; Suburban Coverage</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 text-white">
            Melton &amp; Bacchus marsh &amp; All Nearby Areas
          </h2>
          <p className="text-muted-foreground mb-10 max-w-2xl mx-auto text-base">
            From every street in Melton &amp; Bacchus marsh to Darley, Maddingley, Eynesbury, Rockbank, Thornhill Park, and direct airport routes. Click any area for instant rates.
          </p>

          <div className="flex flex-wrap justify-center gap-2.5 max-w-5xl mx-auto mb-8">
            {[
              { id: "melton", name: "Melton" },
              { id: "melton-south", name: "Melton South" },
              { id: "bacchus-marsh", name: "Bacchus Marsh" },
              { id: "melton-west", name: "Melton West" },
              { id: "kurunjang", name: "Kurunjang" },
              { id: "cobblebank", name: "Cobblebank & Brookfield" },
              { id: "rockbank", name: "Rockbank & Aintree" },
              { id: "thornhill-park", name: "Thornhill Park" },
              { id: "darley", name: "Darley" },
              { id: "maddingley", name: "Maddingley" },
              { id: "eyensbury", name: "Eynesbury" },
              { id: "ballan", name: "Ballan" },
              { id: "tullamarine", name: "Melbourne Airport (MEL)" },
              { id: "geelong-avalon", name: "Avalon Airport (AVV)" },
              { id: "caroline-springs", name: "Caroline Springs" },
            ].map((area) => (
              <Link
                key={area.id}
                href={`/service-areas/${area.id}`}
                className="px-4 py-2 rounded-full bg-card border border-border hover:border-primary hover:text-primary font-bold uppercase tracking-wider text-xs transition-colors shadow-sm"
              >
                {area.name}
              </Link>
            ))}
          </div>

          <Button asChild size="default" variant="outline" className="font-bold uppercase tracking-wider text-xs border-primary text-primary hover:bg-primary hover:text-black rounded-full h-9 px-5">
            <Link href="/service-areas">Explore Full Service Area Directory →</Link>
          </Button>
        </div>
      </section>

      {/* ── SEO Authority Section: Melton Taxi, Melton Bacchus Marsh Taxi & Airport Transfers ── */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">Victoria Taxi Service</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
              Why Choose Our <span className="text-primary">Melton Bacchus Marsh Taxi</span> Service?
            </h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-4" />
            <p className="text-muted-foreground text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
              When you need a reliable <strong className="text-white">Melton taxi</strong>, a dedicated <strong className="text-white">Melton Bacchus Marsh taxi</strong>, or express <strong className="text-white">airport transfers</strong>, Melton Taxi delivers prompt 24/7 service backed by Safe Transport Victoria accredited drivers and transparent, fixed upfront pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Card 1: Melton & Bacchus Marsh Local Connectivity */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm hover:border-primary/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Car className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                Bacchus Marsh Melton Cab Taxi Service
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                As the leading <strong className="text-white">Bacchus Marsh Melton cab taxi service</strong>, we bridge the Western Highway corridor connecting the City of Melton and the Shire of Moorabool. Our drivers know every route, residential estate, and rural road across Melton South, Melton West, Kurunjang, Brookfield, Cobblebank, Darley, Maddingley, Eynesbury, and Ballan.
              </p>
              <ul className="space-y-2 text-xs text-muted-foreground pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Doorstep pickup in Melton &amp; Bacchus Marsh within 10 to 15 minutes</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Direct connections to Melton &amp; Bacchus Marsh V/Line train stations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Medical appointments, school runs &amp; shopping trips (Woodgrove &amp; Village)</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link href="/service-areas/bacchus-marsh" className="text-xs font-bold text-primary hover:underline uppercase tracking-wider inline-flex items-center gap-1">
                  Explore Bacchus Marsh Taxi Coverage →
                </Link>
              </div>
            </div>

            {/* Card 2: 24/7 Airport Transfers */}
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm hover:border-primary/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Plane className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                Airport Transfers (Tullamarine &amp; Avalon)
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Skip stressful airport parking and unreliable rideshare cancellations. Our 24/7 <strong className="text-white">airport transfers</strong> guarantee on-time arrival for every departure. Pre-book an early 4:00 AM transfer from Melton or Bacchus Marsh and receive an upfront fixed rate quote with all tolls and terminal access fees included.
              </p>
              <ul className="space-y-2 text-xs text-muted-foreground pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Melbourne Airport (Tullamarine MEL) &amp; Avalon Airport (AVV)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Free live flight radar tracking for incoming delayed flights</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Zero surge pricing guarantee during peak hours &amp; holidays</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link href="/services/airport" className="text-xs font-bold text-primary hover:underline uppercase tracking-wider inline-flex items-center gap-1">
                  View Fixed Airport Transfer Rates →
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Keyword Links Footer Bar */}
          <div className="bg-secondary/40 border border-border rounded-xl p-5 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 font-semibold">
              <span className="text-white font-bold uppercase tracking-wider">Popular Searches:</span>
              <Link href="/service-areas/melton" className="hover:text-primary transition-colors underline decoration-primary/40 underline-offset-4">Melton Taxi</Link>
              <span className="text-border">•</span>
              <Link href="/service-areas/bacchus-marsh" className="hover:text-primary transition-colors underline decoration-primary/40 underline-offset-4">Melton Bacchus Marsh Taxi</Link>
              <span className="text-border">•</span>
              <Link href="/services/airport" className="hover:text-primary transition-colors underline decoration-primary/40 underline-offset-4">Airport Transfers</Link>
              <span className="text-border">•</span>
              <Link href="/services/a-to-b" className="hover:text-primary transition-colors underline decoration-primary/40 underline-offset-4">Bacchus Marsh Melton Cab Taxi Service</Link>
            </div>
            <a href="tel:0401134074" className="font-bold text-primary hover:underline flex items-center gap-1">
              Direct Call: 0401 134 074
            </a>
          </div>
        </div>
      </section>

      {/* ── Frequently Asked Questions (FAQ) Section ── */}
      <DeferredHomeFAQ />

      {/* ── Bottom Call To Action ── */}
      <section className="py-20 bg-primary text-black text-center">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4">
            Need a Melton Taxi or Airport Transfer?
          </h2>
          <p className="text-lg sm:text-xl font-medium mb-8 max-w-2xl mx-auto">
            Book online in seconds for an instant fixed fare, or call our local team directly on 0401 134 074. Servicing Melton &amp; Bacchus marsh, and all nearby areas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button asChild size="default" className="w-full sm:w-auto h-11 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider bg-black text-white hover:bg-gray-900 rounded-full shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
              <Link href="/book" data-testid="btn-bottom-book">Book Online Now</Link>
            </Button>
            <Button asChild size="default" className="w-full sm:w-auto h-11 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider bg-transparent border-2 border-black text-black hover:bg-black hover:text-white rounded-full transition-all active:scale-[0.98]">
              <a href="tel:0401134074" data-testid="btn-bottom-call">Call 0401 134 074</a>
            </Button>
            <a
              href="https://wa.me/61401134074?text=Hi%2C%20I%20would%20like%20to%20book%20a%20taxi%20with%20Melton%20Taxi."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-full transition-all duration-200 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg text-white"
              style={{ background: "#25D366" }}
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
