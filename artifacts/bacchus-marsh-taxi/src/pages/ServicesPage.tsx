import React from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Plane, Building2, Briefcase, Calendar, Package, MapPin, ArrowRight, ShieldCheck, Clock, CheckCircle2, Navigation } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SEO } from "@/components/SEO";

const services = [
  {
    href: "/services/airport",
    icon: <Plane className="w-10 h-10 text-primary" />,
    title: "Melton & Bacchus Marsh Airport Transfers",
    desc: "Fixed-price transfers from Melton, Bacchus Marsh, and western suburbs to Melbourne Airport (Tullamarine) & Avalon Airport. Real-time flight tracking included.",
  },
  {
    href: "/services/a-to-b",
    icon: <MapPin className="w-10 h-10 text-primary" />,
    title: "Melton Local & Point-to-Point Cabs",
    desc: "24/7 on-demand and advance booked taxi rides across Melton, Melton South, Melton West, Kurunjang, Brookfield, and Cobblebank.",
  },
  {
    href: "/service-areas/bacchus-marsh",
    icon: <Navigation className="w-10 h-10 text-primary" />,
    title: "Bacchus Marsh Taxi (bacchusmarsh)",
    desc: "Dedicated daily taxi service for Bacchus Marsh township, Darley, Maddingley, Eynesbury, and Ballan with express freeway connections.",
  },
  {
    href: "/services/corporate",
    icon: <Briefcase className="w-10 h-10 text-primary" />,
    title: "Corporate Travel & Silver Service",
    desc: "Executive chauffeur-grade Lexus and luxury sedans driven by professional suited drivers for meetings, summits, and VIP guests.",
  },
  {
    href: "/services/event",
    icon: <Calendar className="w-10 h-10 text-primary" />,
    title: "Event & Maxi Taxi Group Transfers",
    desc: "11-seater Maxi Taxi transport for AFL matches at the MCG and Marvel Stadium, Flemington races, wedding guest shuttles, and party transport.",
  },
  {
    href: "/services/parcel",
    icon: <Package className="w-10 h-10 text-primary" />,
    title: "Same-Day Courier & Urgent Parcel Delivery",
    desc: "Rapid point-to-point document and package courier across Melton, Bacchus Marsh, and Greater Melbourne with direct dispatch.",
  },
];

export default function ServicesPage() {
  const [, navigate] = useLocation();

  return (
    <div className="w-full bg-background min-h-screen pb-24">
      <SEO
        title="Melton Taxi Services | Airport Transfers & Bacchus Marsh Taxi | 0401 134 074"
        description="Explore Melton Taxi services: 24/7 airport transfers to Tullamarine & Avalon, local Melton cabs, Bacchus Marsh taxi (bacchusmarsh taxi), 11-seat Maxi Cabs, and corporate travel. Call 0401 134 074."
        keywords={[
          "melton taxi services",
          "airport transfers",
          "bacchusmarsh taxi",
          "bacchus marsh taxi",
          "melton airport transfers",
          "taxi melton",
          "taxi bacchus marsh",
          "maxi taxi melton",
        ]}
        canonicalPath="/services"
      />
      {/* ── Header ── */}
      <div className="bg-secondary py-20 border-b border-border">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <span className="text-xs font-black uppercase tracking-widest text-primary block mb-3">Safe Transport Victoria Accredited</span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4 text-white">
            Melton Taxi &amp; <span className="text-primary">Transfer Services</span>
          </h1>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Professional 24/7 taxi transport across Melton, Bacchus Marsh, and direct airport transfers with fixed rates, flight tracking, and pristine modern vehicles.
          </p>
        </div>
      </div>

      {/* ── Services Grid ── */}
      <div className="container max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, i) => (
            <Card key={i} className="bg-card border-border hover:border-primary/60 transition-all flex flex-col justify-between group">
              <CardContent className="p-8">
                <div className="mb-5">{service.icon}</div>
                <h2 className="text-xl font-bold uppercase tracking-wide mb-3 text-white group-hover:text-primary transition-colors">
                  {service.title}
                </h2>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {service.desc}
                </p>
                <Link href={service.href} className="text-primary font-bold uppercase text-xs tracking-wider inline-flex items-center gap-1.5 group-hover:underline">
                  View Service Details <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Service Highlights ── */}
        <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-6 text-center">
            Why Choose Melton Taxi?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <Clock className="w-8 h-8 text-primary shrink-0 mt-1" />
              <div>
                <h4 className="font-bold uppercase text-sm text-white mb-1">Guaranteed Punctuality</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">Early morning airport runs or late night returns — our drivers arrive ahead of time.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-8 h-8 text-primary shrink-0 mt-1" />
              <div>
                <h4 className="font-bold uppercase text-sm text-white mb-1">Zero Surge Pricing</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">Unlike rideshare apps that double or triple prices during rain or peak hours, our fares remain regulated and honest.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-8 h-8 text-primary shrink-0 mt-1" />
              <div>
                <h4 className="font-bold uppercase text-sm text-white mb-1">All Payment Methods</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">Pay conveniently via Cash, Visa, Mastercard, AMEX, Apple Pay, Google Pay, or Cabcharge.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Booking Banner ── */}
        <div className="mt-12 text-center">
          <Button asChild size="default" className="font-bold uppercase tracking-wider text-xs sm:text-sm h-10 px-6 rounded-full shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
            <Link href="/book">Calculate Fare &amp; Book Online</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
