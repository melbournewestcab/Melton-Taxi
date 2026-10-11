import React from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MapPin, Phone, Plane, ShieldCheck, CheckCircle2 } from "lucide-react";
import { SEO } from "@/components/SEO";

export default function BacchusMarshPage() {
  const [, navigate] = useLocation();

  const faqs = [
    {
      q: "How fast can I get a Melton Bacchus Marsh taxi?",
      a: "For immediate pickups in central Bacchus Marsh, Darley, and Maddingley, our average dispatch time is 10 to 15 minutes. Call 0401 134 074 or book online."
    },
    {
      q: "Do you provide airport transfers from Bacchus Marsh to Melbourne Airport?",
      a: "Yes! We specialize in fixed-price airport transfers connecting Bacchus Marsh directly to Melbourne Airport (Tullamarine MEL) and Avalon Airport (AVV) with 24/7 flight tracking and zero surge fees."
    },
    {
      q: "Does your Bacchus Marsh Melton cab taxi service operate 24/7?",
      a: "Yes, our accredited Melton and Bacchus Marsh taxi fleet operates 24 hours a day, 7 days a week, including public holidays and early morning airport runs."
    }
  ];

  return (
    <div className="w-full bg-background min-h-screen pb-24">
      <SEO
        title="Melton Bacchus Marsh Taxi | Bacchus Marsh Melton Cab Taxi Service | 0401 134 074"
        description="Book Melton Bacchus Marsh taxi and Bacchus Marsh Melton cab taxi service 24/7. Prompt local pickups, Maxi Taxis & direct airport transfers to Melbourne Airport. Call 0401 134 074."
        keywords={[
          "melton bacchus marsh taxi",
          "bacchus marsh melton cab taxi service",
          "bacchus marsh taxi",
          "melton taxi",
          "airport transfers",
          "taxi bacchus marsh",
          "taxi melton to bacchus marsh",
          "bacchus marsh airport transfers",
          "bacchus marsh cab",
          "maxi taxi bacchus marsh"
        ]}
        canonicalPath="/service-areas/bacchus-marsh"
        suburbName="Bacchus Marsh"
        postcode="3340"
        geoCoordinates={{ latitude: -37.6749, longitude: 144.4387 }}
        faqs={faqs}
      />
      <div className="bg-secondary py-16 border-b border-border mb-12">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background border border-border text-sm font-bold uppercase tracking-wide text-primary mb-6">
            <MapPin className="w-4 h-4" /> VIC 3340 · Moorabool Shire
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 text-white">
            Melton Bacchus Marsh <span className="text-primary">Taxi Service</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            24/7 Bacchus Marsh Melton cab taxi service, local pickups &amp; guaranteed direct airport transfers.
          </p>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4">
        <div className="prose prose-invert prose-orange max-w-none mb-16">
          <p className="text-lg leading-relaxed mb-6">
            Welcome to Melton Taxi, the premier transport provider for the historic town of Bacchus Marsh. Located approximately 55 kilometers west of the Melbourne CBD, Bacchus Marsh is a vibrant community that demands reliable, 24/7 transport solutions. Whether you're a local resident, a commuter heading to the station, or a visitor exploring the famous Avenue of Honour, our fleet is ready to serve you.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Our deep roots in the community mean our drivers possess unmatched local knowledge. We navigate the busy Main Street during the Strawberry and Cherry Festival with ease, and we know the fastest routes to the surrounding rural properties. From standard sedans for your everyday errands to Maxi Taxis for group outings to the local wineries, we have a vehicle for every occasion.
          </p>
          <p className="text-lg leading-relaxed">
            We are fully licensed, insured, and committed to passenger safety. Our vehicles are rigorously maintained and cleaned daily. When you book with Melton Taxi, you're not just getting a ride; you're getting a professional service that guarantees punctuality, transparent pricing, and a comfortable journey across the Moorabool Shire.
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
              <tr><td className="px-6 py-4 text-muted-foreground">Bacchus Marsh Train Station</td><td className="px-6 py-4 font-mono">~ 2.5 km</td></tr>
              <tr><td className="px-6 py-4 text-muted-foreground">Melbourne Airport (Tullamarine)</td><td className="px-6 py-4 font-mono">~ 55 km</td></tr>
              <tr><td className="px-6 py-4 text-muted-foreground">Melbourne CBD</td><td className="px-6 py-4 font-mono">~ 55 km</td></tr>
              <tr><td className="px-6 py-4 text-muted-foreground">Melton</td><td className="px-6 py-4 font-mono">~ 15 km</td></tr>
              <tr><td className="px-6 py-4 text-muted-foreground">Werribee Gorge State Park</td><td className="px-6 py-4 font-mono">~ 8 km</td></tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-black uppercase tracking-wide mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="mb-16">
          <AccordionItem value="item-1" className="border-border">
            <AccordionTrigger className="text-lg font-bold hover:text-primary">How fast can I get a taxi in Bacchus Marsh?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base">
              For immediate bookings in the central Bacchus Marsh area, our standard dispatch time is typically between 10-15 minutes. During peak hours or extreme weather, this may vary. We highly recommend booking online in advance for critical trips.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-border">
            <AccordionTrigger className="text-lg font-bold hover:text-primary">Do you service the rural areas around town?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base">
              Yes, we provide service to the surrounding rural and semi-rural properties in the Moorabool Shire. For remote pickups, we advise booking at least 30 minutes in advance.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-border">
            <AccordionTrigger className="text-lg font-bold hover:text-primary">Are your prices fixed?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base">
              We operate on standard Victorian taxi meter rates. However, you can generate a highly accurate fare estimate using our online booking system before you commit to the ride.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="bg-primary/10 border border-primary/30 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-black uppercase tracking-tight mb-4">Need a ride in Bacchus Marsh?</h3>
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
