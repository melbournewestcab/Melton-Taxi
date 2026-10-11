import React from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MapPin } from "lucide-react";
import { SEO } from "@/components/SEO";

export default function MeltonPage() {
  const [, navigate] = useLocation();

  const faqs = [
    {
      q: "How do I book a Melton taxi?",
      a: "Book online using our instant fare calculator, call our 24/7 local dispatch directly on 0401 134 074, or message us on WhatsApp for fast driver pickup."
    },
    {
      q: "How much is a taxi from Melton to Melbourne Airport (Tullamarine)?",
      a: "Melton to Melbourne Airport is typically $85 – $110 fixed upfront fare with zero surge pricing and all tolls included."
    },
    {
      q: "Do you provide Melton Bacchus Marsh taxi services?",
      a: "Yes, we connect Melton, Melton South, and Bacchus Marsh 24 hours a day with local cabs, sedans, and high-capacity Maxi Taxis."
    }
  ];

  return (
    <div className="w-full bg-background min-h-screen pb-24">
      <SEO
        title="Melton Taxi | Melton Bacchus Marsh Taxi & Airport Transfers | 0401 134 074"
        description="Book your Melton taxi 24/7. Trusted Melton Bacchus Marsh taxi service with fixed-rate airport transfers to Melbourne Airport (Tullamarine & Avalon). Call 0401 134 074."
        keywords={[
          "melton taxi",
          "melton bacchus marsh taxi",
          "airport transfers",
          "bacchus marsh melton cab taxi service",
          "taxi melton",
          "melton south taxi",
          "maxi taxi melton",
          "melton airport transfers",
          "taxi melton to melbourne airport"
        ]}
        canonicalPath="/service-areas/melton"
        suburbName="Melton"
        postcode="3337"
        geoCoordinates={{ latitude: -37.6833, longitude: 144.5833 }}
        faqs={faqs}
      />
      <div className="bg-secondary py-16 border-b border-border mb-12">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background border border-border text-sm font-bold uppercase tracking-wide text-primary mb-6">
            <MapPin className="w-4 h-4" /> VIC 3337 · City of Melton
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 text-white">
            Melton <span className="text-primary">Taxi</span> Service
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            24/7 Melton taxi &amp; Melton Bacchus Marsh taxi service, local pickups &amp; fixed-rate airport transfers.
          </p>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4">
        <div className="prose prose-invert prose-orange max-w-none mb-16">
          <p className="text-lg leading-relaxed mb-6">
            Located just 35km from the Melbourne CBD, Melton is a massive growth corridor. Melton Taxi has expanded its operations to provide comprehensive coverage across the entire Melton area, including Melton South, Melton West, Kurunjang, and the newer estates in Strathtulloh and Weir Views.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Our service in Melton is designed to bridge the gap between suburban living and the city. We facilitate hundreds of weekly transfers to the Melton Train Station, Woodgrove Shopping Centre, and medical facilities. As the population grows, so does our fleet, ensuring we can meet the high demand for reliable point-to-point transport.
          </p>
          <p className="text-lg leading-relaxed">
            For businesses operating in the Melton industrial areas, we offer corporate accounts and courier parcel delivery services. Whether it's a short trip across town or a luxury transfer to the airport, our Melton drivers deliver exceptional service.
          </p>
        </div>

        <h2 className="text-2xl font-black uppercase tracking-wide mb-6">Key Routes & Estimates</h2>
        <div className="bg-card border border-border rounded-lg overflow-hidden mb-16">
          <table className="w-full text-left">
            <thead className="bg-secondary border-b border-border">
              <tr>
                <th className="px-6 py-4 font-bold uppercase text-sm tracking-wide">Destination</th>
                <th className="px-6 py-4 font-bold uppercase text-sm tracking-wide">Est. Distance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr><td className="px-6 py-4 text-muted-foreground">Woodgrove Shopping Centre</td><td className="px-6 py-4 font-mono">~ 3 km</td></tr>
              <tr><td className="px-6 py-4 text-muted-foreground">Melbourne Airport</td><td className="px-6 py-4 font-mono">~ 40 km</td></tr>
              <tr><td className="px-6 py-4 text-muted-foreground">Melbourne CBD</td><td className="px-6 py-4 font-mono">~ 38 km</td></tr>
              <tr><td className="px-6 py-4 text-muted-foreground">Bacchus Marsh</td><td className="px-6 py-4 font-mono">~ 15 km</td></tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-black uppercase tracking-wide mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="mb-16">
          <AccordionItem value="item-1" className="border-border">
            <AccordionTrigger className="text-lg font-bold hover:text-primary">Do you service the new estates in Melton South and Weir Views?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base">
              Yes! Our navigation systems are constantly updated. If your street is brand new, providing intersection cross-streets or landmarks in the booking notes helps our drivers find you quickly.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-border">
            <AccordionTrigger className="text-lg font-bold hover:text-primary">Can I get a Maxi Taxi in Melton?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base">
              Yes, our Maxi Taxi fleet actively operates in Melton. They are very popular for weekend group travel to the city or local events, so pre-booking is highly recommended.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="bg-primary/10 border border-primary/30 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-black uppercase tracking-tight mb-4">Need a ride in Melton?</h3>
          <p className="text-muted-foreground mb-8">Book online instantly or speak with our dispatch team.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/book")}
              size="lg"
              className="font-bold uppercase tracking-wider"
            >
              Book Online Now
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-black font-bold uppercase tracking-wider">
              <a href="tel:0401134074">Call 0401 134 074</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
