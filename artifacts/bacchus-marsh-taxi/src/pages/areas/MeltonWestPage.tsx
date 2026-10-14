import React from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { MapPin, Phone } from "lucide-react";
import { SEO } from "@/components/SEO";

export default function MeltonWestPage() {
  const [, navigate] = useLocation();

  const faqs = [
    {
      q: "How do I book a taxi in Melton West?",
      a: "Book online using our instant fixed-fare calculator, call our local desk directly on 0401 134 074, or message on WhatsApp for fast driver pickup."
    },
    {
      q: "How much is an airport transfer from Melton West to Tullamarine?",
      a: "Melton West to Melbourne Airport is typically $85 – $115 fixed upfront fare with zero surge pricing and all freeway tolls included."
    }
  ];

  return (
    <div className="w-full bg-background min-h-screen pb-24">
      <SEO
        title="Taxi Service in Melton West VIC 3337 | 24/7 Melton Taxi | 0401 134 074"
        description="Book a taxi in Melton West VIC 3337. 24/7 reliable local cab service, airport transfers to Tullamarine & Avalon, fixed fares & Maxi Taxis. Call 0401 134 074."
        canonicalPath="/service-areas/melton-west"
        suburbName="Melton West"
        postcode="3337"
        geoCoordinates={{ latitude: -37.6789, longitude: 144.5511 }}
        keywords={[
          "taxi melton west",
          "melton west taxi",
          "melton west cab",
          "taxi to melbourne airport from melton west",
          "melton taxi"
        ]}
        faqs={faqs}
      />
      <div className="bg-secondary py-16 border-b border-border mb-12">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background border border-border text-sm font-bold uppercase tracking-wide text-primary mb-6">
            <MapPin className="w-4 h-4" /> VIC 3337
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6">Taxi Service in Melton West</h1>
          <p className="text-xl text-muted-foreground">Fast and affordable taxi service for Melton West — available 24/7.</p>
        </div>
      </div>
      <div className="container max-w-4xl mx-auto px-4">
        <div className="prose prose-invert prose-orange max-w-none mb-12">
          <p className="text-lg leading-relaxed mb-6">Melton West is a well-established suburb with strong community ties, excellent schools, and convenient access to Melton Town Centre. Melton Taxi services all of Melton West for local trips, shopping runs, medical appointments, and long-distance Melbourne transfers.</p>
          <p className="text-lg leading-relaxed mb-6">We provide frequent transfers to Melton Station, Melbourne Airport (Tullamarine), and hospitals including Western Health campuses in Footscray and Sunshine. Large-group transport via our Maxi Taxi and 6-seater vehicles is also available for Melton West residents.</p>
          <p className="text-lg leading-relaxed">Whether you need an early-morning airport run or a late-night return trip from Melbourne, our Melton West drivers are ready around the clock. Call 0401 134 074 or book online today.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => navigate("/book")} size="lg" className="font-bold uppercase tracking-wider">Book a Taxi in Melton West</Button>
          <Button asChild size="lg" variant="outline" className="font-bold uppercase tracking-wider">
            <a href="tel:0401134074"><Phone className="w-4 h-4 mr-2" /> Call 0401 134 074</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
