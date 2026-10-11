import React from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Plane, Clock, CheckCircle2, Luggage, Shield, MapPin, Navigation } from "lucide-react";
import { SEO } from "@/components/SEO";

export default function AirportPage() {
  const [, navigate] = useLocation();

  return (
    <div className="w-full bg-background min-h-screen pb-24">
      <SEO
        title="Airport Transfers | Melton & Bacchus Marsh Taxi to Melbourne Airport | 0401 134 074"
        description="Book 24/7 airport transfers with Melton Taxi & Bacchus Marsh Melton cab taxi service. Direct transfers to Melbourne Airport (Tullamarine) & Avalon. Call 0401 134 074."
        keywords={[
          "airport transfers",
          "melton taxi",
          "melton bacchus marsh taxi",
          "bacchus marsh melton cab taxi service",
          "bacchus marsh taxi",
          "bacchusmarsh taxi",
          "melton airport transfers",
          "taxi melton to melbourne airport",
          "bacchus marsh taxi to airport",
          "melton to tullamarine airport taxi",
          "bacchus marsh airport transfer",
          "maxi taxi melton airport",
          "fixed price taxi melton to airport",
        ]}
        canonicalPath="/services/airport"
        suburbName="Melton & Bacchus Marsh Airport Transfers"
        geoCoordinates={{ latitude: -37.6833, longitude: 144.5833 }}
      />
      <div className="bg-secondary py-20 border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <Plane className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 text-white">
            Melton &amp; Bacchus Marsh <span className="text-primary">Airport Transfers</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Direct, door-to-terminal airport transfers connecting Melton, Bacchus Marsh, and surrounding western suburbs to Melbourne Airport (Tullamarine MEL) and Avalon Airport (AVV). Guaranteed on-time 24/7.
          </p>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-16 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: <Clock className="w-8 h-8 text-primary" />, label: "Flight Tracking", desc: "We track your inbound flight in real time and automatically adjust pickup times for early or delayed arrivals." },
            { icon: <CheckCircle2 className="w-8 h-8 text-primary" />, label: "Fixed Airport Rates", desc: "Transparent upfront fixed fares from Melton & Bacchus Marsh with zero surge pricing or hidden toll charges." },
            { icon: <Plane className="w-8 h-8 text-primary" />, label: "All Terminals Covered", desc: "Express drop-offs and passenger pickup at T1, T2, T3 & T4 at Tullamarine and passenger curb at Avalon." },
          ].map((item, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-6 text-center shadow-sm">
              <div className="flex justify-center mb-3">{item.icon}</div>
              <p className="font-bold uppercase tracking-wide text-sm mb-1 text-white">{item.label}</p>
              <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
          Why Choose Melton Taxi for Your Airport Transfers?
        </h2>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
          Catching an early morning domestic flight or arriving late from an overseas holiday? <strong className="text-white">Melton Taxi</strong> provides Victoria's most dependable <strong className="text-white">airport transfers</strong> for residents in Melton, Melton South, Melton West, Kurunjang, Brookfield, Cobblebank, Rockbank, and <strong className="text-white">Bacchus Marsh (bacchusmarsh taxi)</strong>.
        </p>

        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
          Unlike rideshare apps that frequently cancel rides at 4:00 AM or spike prices with 2.5x surge pricing, our airport transfers are confirmed in advance with 100% guaranteed driver allocation. Your professional driver arrives 5–10 minutes early, assists you with heavy bags, and navigates the fastest route directly to your departure terminal.
        </p>

        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
          Travelling with family, bulky prams, or large luggage sets? Our versatile fleet includes spacious SUVs, 6-seater people movers, and high-capacity 11-seater Maxi Taxis with generous cargo compartments.
        </p>

        <h2 className="text-2xl font-black uppercase tracking-tight text-white mt-12 mb-4">
          Melton &amp; Bacchus Marsh Airport Transfer Estimates
        </h2>
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead className="bg-secondary text-xs uppercase font-bold text-muted-foreground border-b border-border">
                <tr>
                  <th className="py-3.5 px-5">Departure Suburb</th>
                  <th className="py-3.5 px-5">To Airport</th>
                  <th className="py-3.5 px-5">Approx Drive Time</th>
                  <th className="py-3.5 px-5">Est. Fixed Fare</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {[
                  ["Melton Central", "Melbourne Airport (MEL)", "35–45 min", "$85 – $105"],
                  ["Melton South", "Melbourne Airport (MEL)", "35–45 min", "$88 – $110"],
                  ["Melton West", "Melbourne Airport (MEL)", "38–48 min", "$90 – $115"],
                  ["Kurunjang", "Melbourne Airport (MEL)", "34–42 min", "$85 – $105"],
                  ["Cobblebank & Strathtulloh", "Melbourne Airport (MEL)", "32–42 min", "$80 – $100"],
                  ["Rockbank & Aintree (Woodlea)", "Melbourne Airport (MEL)", "28–36 min", "$75 – $95"],
                  ["Bacchus Marsh (bacchusmarsh taxi)", "Melbourne Airport (MEL)", "45–55 min", "$120 – $145"],
                  ["Darley", "Melbourne Airport (MEL)", "45–52 min", "$118 – $140"],
                  ["Maddingley & Eynesbury", "Melbourne Airport (MEL)", "48–58 min", "$125 – $150"],
                  ["Ballan", "Melbourne Airport (MEL)", "55–65 min", "$140 – $170"],
                  ["Melton to Avalon Airport (AVV)", "Avalon Airport (AVV)", "50–60 min", "$135 – $165"],
                  ["Bacchus Marsh to Avalon Airport", "Avalon Airport (AVV)", "55–65 min", "$145 – $175"],
                ].map(([from, to, time, fare], i) => (
                  <tr key={i} className="hover:bg-secondary/30 transition-colors">
                    <td className="py-3.5 px-5 font-semibold text-white">{from}</td>
                    <td className="py-3.5 px-5 text-primary font-bold">{to}</td>
                    <td className="py-3.5 px-5 text-muted-foreground">{time}</td>
                    <td className="py-3.5 px-5 font-mono text-muted-foreground">{fare}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="default" className="font-bold uppercase tracking-wider text-xs sm:text-sm px-6 h-10 rounded-full shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
            <Link href="/book?service=airport">Book Airport Taxi Now</Link>
          </Button>
          <Button asChild size="default" variant="outline" className="font-bold uppercase tracking-wider text-xs sm:text-sm px-6 h-10 rounded-full border-primary/80 text-primary hover:bg-primary hover:text-black transition-all active:scale-[0.98]">
            <a href="tel:0401134074">Call 0401 134 074</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
