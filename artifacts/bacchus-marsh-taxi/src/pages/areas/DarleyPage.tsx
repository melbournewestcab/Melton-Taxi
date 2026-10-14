import React from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MapPin, Phone } from "lucide-react";
import { SEO } from "@/components/SEO";

export default function DarleyPage() {
  const [, navigate] = useLocation();

  const faqs = [
    {
      q: "How fast can I get a taxi in Darley?",
      a: "Because Darley is right next to Bacchus Marsh, our drivers are constantly in the area. Typical pickup time is 10 to 15 minutes."
    },
    {
      q: "Do you offer airport transfers from Darley to Melbourne Airport?",
      a: "Yes, we specialize in direct fixed-rate airport transfers from Darley to Melbourne Airport (Tullamarine) and Avalon with flight tracking."
    },
    {
      q: "Can I book a Maxi Taxi in Darley for group travel?",
      a: "Yes, our 7 to 11 seater Maxi Taxis are available for family trips, weddings, sports events, and excess luggage."
    }
  ];

  return (
    <div className="w-full bg-background min-h-screen pb-24">
      <SEO
        title="Taxi Service in Darley VIC 3340 | Bacchus Marsh Taxi | 0401 134 074"
        description="Book a taxi in Darley VIC 3340. Fast local cabs across Darley Plaza, Bacchus Marsh Hospital & fixed-fare airport transfers to Melbourne Airport. Call 0401 134 074."
        canonicalPath="/service-areas/darley"
        suburbName="Darley"
        postcode="3340"
        geoCoordinates={{ latitude: -37.6533, longitude: 144.4331 }}
        keywords={[
          "taxi darley",
          "darley taxi",
          "bacchus marsh taxi darley",
          "taxi from darley to melbourne airport",
          "darley cab",
          "melton bacchus marsh taxi"
        ]}
        faqs={faqs}
      />
      <div className="bg-secondary py-16 border-b border-border mb-12">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background border border-border text-sm font-bold uppercase tracking-wide text-primary mb-6">
            <MapPin className="w-4 h-4" /> VIC 3340
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6">
            Taxi Service in Darley
          </h1>
          <p className="text-xl text-muted-foreground">
            Fast dispatch for Darley's residential neighborhoods and parks.
          </p>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4">
        <div className="prose prose-invert prose-orange max-w-none mb-16">
          <p className="text-lg leading-relaxed mb-6">
            Located just north of the Bacchus Marsh town center, Darley is a major residential suburb characterized by beautiful views and proximity to the Lerderderg River. Melton Taxi provides rapid, reliable service to all Darley residents.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Because Darley is deeply integrated with Bacchus Marsh, our drivers are constantly in the area. We can provide extremely fast response times for local trips to the Darley Plaza, Bacchus Marsh Hospital, or the local sporting reserves. We are the trusted transport provider for local school runs and community events.
          </p>
          <p className="text-lg leading-relaxed">
            Heading further out? We offer fixed-price airport transfers from Darley direct to Tullamarine, ensuring you start your holiday or business trip in comfort without worrying about parking fees.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-16">
          <Button onClick={() => navigate("/book")} size="lg" className="font-bold uppercase tracking-wider">
            Book a Taxi in Darley
          </Button>
          <Button asChild size="lg" variant="outline" className="font-bold uppercase tracking-wider">
            <a href="tel:0401134074"><Phone className="w-4 h-4 mr-2" /> Call 0401 134 074</a>
          </Button>
        </div>

        <h2 className="text-2xl font-bold uppercase tracking-tight mb-6 text-foreground">
          Frequently Asked Questions - Darley Cabs
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-bold">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
