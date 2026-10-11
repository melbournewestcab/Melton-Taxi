import React, { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { SEO } from "@/components/SEO";

export default function AtoBPage() {
  const [, navigate] = useLocation();

  return (
    <div className="w-full bg-background min-h-screen pb-24">
      <SEO
        title="Melton Taxi Local Cabs | Bacchus Marsh Taxi & Transfers | 0401 134 074"
        description="Fast local Melton taxi service and Bacchus Marsh taxi cabs. 24/7 point-to-point trips across Melton South, Kurunjang, Brookfield, Darley, and Melbourne. Call 0401 134 074."
        keywords={[
          "melton taxi",
          "bacchusmarsh taxi",
          "bacchus marsh taxi",
          "local taxi melton",
          "taxi melton south",
          "taxi kurunjang",
          "taxi darley",
          "cabs in melton",
        ]}
        canonicalPath="/services/a-to-b"
      />
      <div className="bg-secondary py-20 border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <MapPin className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 text-white">
            Melton Local &amp; <span className="text-primary">Point-to-Point Cabs</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Direct, reliable local taxi transfers across Melton, Bacchus Marsh, and surrounding regions. Available 24 hours a day, 7 days a week.
          </p>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-16 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: <Clock className="w-8 h-8 text-primary" />, label: "Fast Local Dispatch", desc: "Average pickup times under 10–15 minutes across Melton and Bacchus Marsh." },
            { icon: <CheckCircle2 className="w-8 h-8 text-primary" />, label: "No Surge Pricing", desc: "Regulated meter rates and upfront fixed price options without unexpected spikes." },
            { icon: <ShieldCheck className="w-8 h-8 text-primary" />, label: "Safe Transport Accredited", desc: "Experienced, fully accredited professional drivers and clean modern vehicles." },
          ].map((item, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-6 text-center shadow-sm">
              <div className="flex justify-center mb-3">{item.icon}</div>
              <p className="font-bold uppercase tracking-wide text-sm mb-1 text-white">{item.label}</p>
              <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
          Everyday Taxi Transport in Melton &amp; Bacchus Marsh
        </h2>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
          Whether you need a quick ride down to Woodgrove Shopping Centre, a safe lift home after dinner, transport to Melton Health or medical appointments, or a trip connecting Melton and Bacchus Marsh, <strong className="text-white">Melton Taxi</strong> is your trusted travel partner.
        </p>

        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
          Our extensive fleet of modern hybrid sedans, spacious SUVs, and 11-seater Maxi Taxis operates around the clock. We cater to everyday commuters, students, families, and seniors with courteous, professional assistance every step of the way.
        </p>

        <div className="pt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="default" className="font-bold uppercase tracking-wider text-xs sm:text-sm px-6 h-10 rounded-full shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
            <Link href="/book">Book Point-to-Point Taxi</Link>
          </Button>
          <Button asChild size="default" variant="outline" className="font-bold uppercase tracking-wider text-xs sm:text-sm px-6 h-10 rounded-full border-primary/80 text-primary hover:bg-primary hover:text-black transition-all active:scale-[0.98]">
            <a href="tel:0401134074">Call 0401 134 074</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
