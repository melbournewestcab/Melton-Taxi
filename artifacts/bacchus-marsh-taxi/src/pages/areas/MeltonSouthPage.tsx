import React from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Plane, ShieldCheck, CheckCircle2 } from "lucide-react";
import { SEO } from "@/components/SEO";

export default function MeltonSouthPage() {
  const [, navigate] = useLocation();

  const faqs = [
    {
      q: "How fast can I get a taxi in Melton South?",
      a: "Average pickup time in Melton South is 10 to 15 minutes. Call 0401 134 074 or book online for immediate driver allocation."
    },
    {
      q: "Do you provide airport transfers from Melton South to Melbourne Airport?",
      a: "Yes! We provide fixed-price airport transfers connecting Melton South directly to Melbourne Airport (Tullamarine) and Avalon Airport with 24/7 flight tracking and all tolls included."
    },
    {
      q: "Do you service Melton Railway Station?",
      a: "Yes, we regularly meet commuters at Melton Train Station on Staughton Street for seamless connections to home or work."
    }
  ];

  return (
    <div className="w-full bg-background min-h-screen pb-24">
      <SEO
        title="Taxi Service in Melton South VIC 3338 | 24/7 Melton Taxi | 0401 134 074"
        description="Book a taxi in Melton South VIC 3338. 24/7 fast cabs across Melton Train Station, Coburns Rd & direct airport transfers to Melbourne Airport. Call 0401 134 074."
        canonicalPath="/service-areas/melton-south"
        suburbName="Melton South"
        postcode="3338"
        geoCoordinates={{ latitude: -37.7058, longitude: 144.5772 }}
        keywords={[
          "taxi melton south",
          "melton south taxi",
          "melton south cab",
          "taxi to melton train station",
          "taxi melton south to melbourne airport",
          "melton taxi"
        ]}
        faqs={faqs}
      />
      <div className="bg-secondary py-16 border-b border-border mb-12">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background border border-border text-sm font-bold uppercase tracking-wide text-primary mb-6">
            <MapPin className="w-4 h-4" /> VIC 3338
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6">Taxi Service in Melton South</h1>
          <p className="text-xl text-muted-foreground">Reliable, on-time taxi service for Melton South residents — 24 hours a day.</p>
        </div>
      </div>
      <div className="container max-w-4xl mx-auto px-4">
        <div className="prose prose-invert prose-orange max-w-none mb-12">
          <p className="text-lg leading-relaxed mb-6">Melton South is one of the busiest residential areas in the City of Melton, home to Woodgrove Shopping Centre, Melton South Primary School, and a wide range of medical and allied health services. Melton Taxi provides comprehensive taxi and transfer services across all Melton South streets.</p>
          <p className="text-lg leading-relaxed mb-6">We regularly transport Melton South residents to Melton Train Station for Melbourne commutes, Melbourne Airport for early-morning flights, and Sunshine, Footscray and Melbourne CBD for hospital appointments and work travel.</p>
          <p className="text-lg leading-relaxed">Our Melton South service covers every street including Coburns Road, Ferris Road, and the surrounding estates. Call 0401 134 074 for same-day bookings or use our online form for advance scheduling.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => navigate("/book")} size="lg" className="font-bold uppercase tracking-wider">Book a Taxi in Melton South</Button>
          <Button asChild size="lg" variant="outline" className="font-bold uppercase tracking-wider">
            <a href="tel:0401134074"><Phone className="w-4 h-4 mr-2" /> Call 0401 134 074</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
