import React from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { MapPin, Phone } from "lucide-react";
import { SEO } from "@/components/SEO";

export default function CoblebankPage() {
  const [, navigate] = useLocation();

  const faqs = [
    {
      q: "How fast is taxi pickup in Cobblebank?",
      a: "Our local drivers arrive in Cobblebank in approximately 10 to 15 minutes. Call 0401 134 074 or book online."
    },
    {
      q: "Do you service Cobblebank Train Station and Stadium?",
      a: "Yes, we regularly pick up and drop off passengers at Cobblebank Railway Station and Cobblebank Stadium."
    },
    {
      q: "Can I book a fixed-fare airport transfer from Cobblebank?",
      a: "Yes, fixed-rate airport transfers from Cobblebank to Melbourne Airport (Tullamarine) and Avalon Airport are available 24/7 with flight tracking."
    }
  ];

  return (
    <div className="w-full bg-background min-h-screen pb-24">
      <SEO
        title="Taxi Service in Cobblebank VIC 3338 | 24/7 Melton Taxi | 0401 134 074"
        description="Book a taxi in Cobblebank VIC 3338. Prompt local pickups, Cobblebank Station connections & fixed-fare airport transfers to Melbourne Airport. Call 0401 134 074."
        canonicalPath="/service-areas/cobblebank"
        suburbName="Cobblebank"
        postcode="3338"
        geoCoordinates={{ latitude: -37.7025, longitude: 144.6067 }}
        keywords={[
          "taxi cobblebank",
          "cobblebank taxi",
          "taxi cobblebank station",
          "cobblebank cab",
          "taxi from cobblebank to melbourne airport",
          "melton taxi"
        ]}
        faqs={faqs}
      />
      <div className="bg-secondary py-16 border-b border-border mb-12">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background border border-border text-sm font-bold uppercase tracking-wide text-primary mb-6">
            <MapPin className="w-4 h-4" /> VIC 3338
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6">Taxi Service in Cobblebank</h1>
          <p className="text-xl text-muted-foreground">Modern taxi service for Cobblebank's growing community — on time, every time.</p>
        </div>
      </div>
      <div className="container max-w-4xl mx-auto px-4">
        <div className="prose prose-invert prose-orange max-w-none mb-12">
          <p className="text-lg leading-relaxed mb-6">Cobblebank is one of Melton's newest and most rapidly expanding suburbs, attracting young families and professionals seeking space within reach of Melbourne. Melton Taxi has extended its coverage to serve all of Cobblebank with prompt, professional taxi transport.</p>
          <p className="text-lg leading-relaxed mb-6">Common trips from Cobblebank include commuter connections to Cobblebank & Melton Station, airport transfers to Melbourne Tullamarine, and evening returns from Melbourne's CBD entertainment precinct. We also operate parcel and courier deliveries for local businesses.</p>
          <p className="text-lg leading-relaxed">Book a Cobblebank taxi online 24/7 or call 0401 134 074 for immediate dispatch. All vehicles are metered, fully licensed, and clean.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => navigate("/book")} size="lg" className="font-bold uppercase tracking-wider">Book a Taxi in Cobblebank</Button>
          <Button asChild size="lg" variant="outline" className="font-bold uppercase tracking-wider">
            <a href="tel:0401134074"><Phone className="w-4 h-4 mr-2" /> Call 0401 134 074</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
