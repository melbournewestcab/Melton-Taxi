import React, { useState, useMemo } from "react";
import { Link } from "wouter";
import { MapPin, ArrowRight, Search, Plane, Car, Shield, Clock, Phone, Navigation } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SUBURBS_DATA, MELBOURNE_REGIONS, SuburbInfo } from "@/data/suburbsData";
import { SEO } from "@/components/SEO";

const CORE_PRIORITY_AREAS = [
  {
    id: "melton",
    name: "Melton",
    postcode: "3337",
    role: "Primary Hub",
    desc: "Central Melton, High Street shopping precinct, Woodgrove Shopping Centre, medical centres, and local schools. 24/7 doorstep dispatch.",
    airportTime: "25–35 min",
    airportFare: "$85–$110",
  },
  {
    id: "melton-south",
    name: "Melton South",
    postcode: "3338",
    role: "Local Hub",
    desc: "Melton South Railway Station (V/Line transport hub), Coburns Road, Ferris Road, and surrounding residential communities.",
    airportTime: "28–38 min",
    airportFare: "$88–$112",
  },
  {
    id: "bacchus-marsh",
    name: "Bacchus Marsh",
    postcode: "3340",
    role: "Local Hub",
    desc: "Bacchus Marsh township, The Avenue of Honour, local train station, orchards, and direct Western Freeway connections.",
    airportTime: "35–45 min",
    airportFare: "$120–$145",
  },
];

const NEARBY_AREAS = [
  { id: "melton-west", name: "Melton West", postcode: "3337", tag: "Nearby Area" },
  { id: "kurunjang", name: "Kurunjang", postcode: "3337", tag: "Nearby Area" },
  { id: "cobblebank", name: "Cobblebank & Brookfield", postcode: "3338", tag: "Nearby Area" },
  { id: "thornhill-park", name: "Thornhill Park", postcode: "3335", tag: "Nearby Area" },
  { id: "rockbank", name: "Rockbank & Aintree", postcode: "3335", tag: "Nearby Area" },
  { id: "darley", name: "Darley", postcode: "3340", tag: "Nearby Area" },
  { id: "maddingley", name: "Maddingley", postcode: "3340", tag: "Nearby Area" },
  { id: "eyensbury", name: "Eynesbury", postcode: "3338", tag: "Nearby Area" },
  { id: "ballan", name: "Ballan", postcode: "3342", tag: "Nearby Area" },
  { id: "deanside", name: "Deanside", postcode: "3336", tag: "Nearby Area" },
  { id: "fraser-rise", name: "Fraser Rise", postcode: "3336", tag: "Nearby Area" },
  { id: "plumpton", name: "Plumpton", postcode: "3335", tag: "Nearby Area" },
  { id: "diggers-rest", name: "Diggers Rest", postcode: "3427", tag: "Nearby Area" },
  { id: "caroline-springs", name: "Caroline Springs", postcode: "3023", tag: "Nearby Area" },
  { id: "tullamarine", name: "Melbourne Airport (MEL)", postcode: "3045", tag: "Airport Transfer" },
  { id: "geelong-avalon", name: "Avalon Airport (AVV)", postcode: "3220", tag: "Airport Transfer" },
];

export default function ServiceAreasPage() {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("All");

  const filteredSuburbs = useMemo(() => {
    return SUBURBS_DATA.filter((suburb) => {
      const matchesSearch =
        suburb.name.toLowerCase().includes(search.toLowerCase()) ||
        suburb.postcode.toLowerCase().includes(search.toLowerCase()) ||
        suburb.tagline.toLowerCase().includes(search.toLowerCase()) ||
        suburb.keywords.some((k) => k.toLowerCase().includes(search.toLowerCase()));

      const matchesRegion = selectedRegion === "All" || suburb.region === selectedRegion;

      return matchesSearch && matchesRegion;
    });
  }, [search, selectedRegion]);

  return (
    <div className="w-full bg-background min-h-screen pb-24">
      <SEO
        title="Melton Bacchus Marsh Taxi Service Areas | Airport Transfers | 0401 134 074"
        description="Melton Taxi & Bacchus Marsh Melton cab taxi service areas. 24/7 fast dispatch across Melton & Bacchus Marsh and all nearby areas, plus direct airport transfers. Call 0401 134 074."
        keywords={[
          "melton taxi",
          "melton bacchus marsh taxi",
          "airport transfers",
          "bacchus marsh melton cab taxi service",
          "bacchus marsh taxi",
          "melton south taxi",
          "taxi melton",
          "taxi bacchus marsh",
          "melton airport transfers",
          "maxi taxi melton"
        ]}
        canonicalPath="/service-areas"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Service Areas", url: "/service-areas" }
        ]}
      />
      {/* ── Hero Section ── */}
      <div className="bg-secondary py-16 md:py-20 border-b border-border mb-12">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-bold uppercase tracking-wider text-primary mb-4">
            <MapPin className="w-3.5 h-3.5" /> 24/7 Local Taxi Coverage
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4 text-white">
            Melton Taxi <span className="text-primary">Service Areas</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 font-medium">
            Servicing <strong className="text-white">Melton &amp; Bacchus marsh</strong>, and all nearby areas with prompt 24/7 door-to-door cabs, Maxi Taxis, and fixed-price airport transfers.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Button asChild size="default" className="h-10 px-6 font-bold uppercase tracking-wider text-xs sm:text-sm bg-primary text-black hover:bg-primary/90 rounded-full shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
              <Link href="/book">Book Taxi Online</Link>
            </Button>
            <Button asChild size="default" variant="outline" className="h-10 px-6 font-bold uppercase tracking-wider text-xs sm:text-sm border-2 border-white/80 text-white hover:bg-white hover:text-black rounded-full transition-all active:scale-[0.98] shadow-sm">
              <a href="tel:0401134074">
                <Phone className="w-3.5 h-3.5 mr-2 text-primary" /> Call 0401 134 074
              </a>
            </Button>
          </div>

          {/* Search bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
            <Input
              type="text"
              placeholder="Search suburb or postcode (e.g. Melton South, Bacchus Marsh, 3337)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 pr-4 h-12 bg-background border-border text-foreground rounded-full text-base focus-visible:ring-primary shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* ── Core Service Areas Highlight ── */}
      <div className="container max-w-6xl mx-auto px-4 mb-16">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">Primary Operating Hubs</span>
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white mb-3">
            Melton &amp; Bacchus marsh
          </h2>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
            Our highest concentration of active taxis and drivers operate across Melton &amp; Bacchus marsh and surrounding districts 24 hours a day, 7 days a week.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {CORE_PRIORITY_AREAS.map((core) => (
            <Link key={core.id} href={`/service-areas/${core.id}`}>
              <Card className="h-full bg-card hover:bg-secondary/70 border-2 border-primary/40 hover:border-primary transition-all cursor-pointer group relative overflow-hidden flex flex-col justify-between shadow-lg">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-150" />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-primary text-black">
                      {core.role}
                    </span>
                    <span className="text-xs font-mono font-bold text-primary">VIC {core.postcode}</span>
                  </div>

                  <h3 className="text-2xl font-black uppercase tracking-wide text-white group-hover:text-primary transition-colors mb-2">
                    {core.name}
                  </h3>

                  <p className="text-muted-foreground text-xs leading-relaxed mb-5">
                    {core.desc}
                  </p>

                  <div className="bg-secondary/70 rounded-lg p-3 text-xs mb-4 space-y-1.5 border border-border/50">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Airport Duration:</span>
                      <span className="font-bold text-foreground">{core.airportTime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Fixed Airport Fare:</span>
                      <span className="font-black text-primary">{core.airportFare}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-primary font-bold uppercase tracking-wider text-xs group-hover:translate-x-1 transition-transform">
                    Explore {core.name} Taxi Rates
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* ── All Nearby Areas Grid ── */}
        <div className="bg-secondary/40 border border-border rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-white">
                All Nearby Areas Serviced 24/7
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Fast pickups across all surrounding western suburbs and regional corridors.
              </p>
            </div>
            <Button asChild size="sm" className="font-black uppercase tracking-wider text-xs shrink-0 bg-primary text-black hover:bg-primary/90">
              <a href="tel:0401134074">Call 0401 134 074</a>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {NEARBY_AREAS.map((area) => (
              <Link
                key={area.id}
                href={`/service-areas/${area.id}`}
                className="group flex flex-col p-3 rounded-xl bg-card border border-border/80 hover:border-primary hover:bg-secondary/80 transition-all"
              >
                <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
                  <span>{area.tag}</span>
                  <span className="font-mono text-primary font-semibold">{area.postcode}</span>
                </div>
                <span className="font-black text-xs uppercase tracking-wide text-foreground group-hover:text-primary transition-colors">
                  {area.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Region Filters & Full Directory ── */}
      <div className="container max-w-6xl mx-auto px-4 mb-8">
        <div className="text-center mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-1">Suburbs Directory</span>
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white">
            Full Suburb &amp; Airport Route Directory
          </h2>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button
            variant={selectedRegion === "All" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedRegion("All")}
            className="rounded-full text-xs font-bold uppercase tracking-wide"
          >
            All Suburbs ({SUBURBS_DATA.length})
          </Button>
          {MELBOURNE_REGIONS.map((region) => {
            const count = SUBURBS_DATA.filter((s) => s.region === region).length;
            return (
              <Button
                key={region}
                variant={selectedRegion === region ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRegion(region)}
                className="rounded-full text-xs font-bold uppercase tracking-wide"
              >
                {region} ({count})
              </Button>
            );
          })}
        </div>
      </div>

      {/* ── Suburb Cards Grid ── */}
      <div className="container max-w-6xl mx-auto px-4">
        {filteredSuburbs.length === 0 ? (
          <div className="text-center py-16 bg-card border border-border rounded-xl p-8">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold uppercase mb-2">No Suburbs Found</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
              We cover Melton &amp; Bacchus marsh, and all surrounding areas. Call our 24/7 dispatch desk directly for immediate bookings.
            </p>
            <Button asChild>
              <a href="tel:0401134074">Call 0401 134 074</a>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSuburbs.map((area) => (
              <Link key={area.id} href={`/service-areas/${area.id}`}>
                <Card className="h-full bg-card hover:bg-secondary/70 border-border hover:border-primary transition-all cursor-pointer group relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150" />
                  
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <MapPin className="text-primary w-5 h-5 shrink-0" />
                        <div>
                          <h2 className="text-xl font-black uppercase tracking-wide group-hover:text-primary transition-colors">
                            {area.name}
                          </h2>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono text-primary font-bold">{area.postcode}</span>
                            <span className="text-[10px] text-muted-foreground uppercase">{area.region}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm mb-5 line-clamp-2">
                      {area.tagline}
                    </p>

                    {/* Quick route preview */}
                    <div className="bg-secondary/60 rounded-lg p-3 text-xs mb-4 space-y-1.5 border border-border/40">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Airport (Tullamarine):</span>
                        <span className="font-semibold text-foreground">
                          {area.popularRoutes[0]?.time || "Direct"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Est. Airport Fare:</span>
                        <span className="font-bold text-primary">
                          {area.popularRoutes[0]?.approxFare || "$65+"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center text-primary font-bold uppercase tracking-wider text-xs group-hover:translate-x-1 transition-transform">
                      View {area.name} Taxi Info
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* ── Airport & Regional Transport Banner ── */}
        <div className="mt-16 bg-card border border-primary/30 rounded-2xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-black uppercase tracking-widest text-primary">24/7 Melton Taxi Service</span>
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
              Need a Taxi in Melton &amp; Bacchus marsh?
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              We provide fixed-price airport transfers, local door-to-door cabs, 11-seat Maxi Taxis, and executive travel across Melton &amp; Bacchus marsh, and all nearby areas 24 hours a day, 7 days a week.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Button asChild size="default" className="h-10 px-6 font-bold uppercase tracking-wider text-xs sm:text-sm bg-primary text-black hover:bg-primary/90 rounded-full shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
              <Link href="/book">Book Online</Link>
            </Button>
            <Button asChild size="default" variant="outline" className="h-10 px-6 font-bold uppercase tracking-wider text-xs sm:text-sm border-2 border-white/80 text-white hover:bg-white hover:text-black rounded-full transition-all active:scale-[0.98]">
              <a href="tel:0401134074">Call 0401 134 074</a>
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
