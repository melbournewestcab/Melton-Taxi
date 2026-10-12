import React from "react";
import { Link } from "wouter";
import { Phone, MapPin, ShieldCheck, Clock, Plane } from "lucide-react";
import { BrandLogo } from "./BrandLogo";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <BrandLogo size="md" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Melton Taxi provides 24/7 dependable local cabs across Melton &amp; Bacchus marsh, and all nearby areas with guaranteed on-time arrivals, fixed pricing, and clean fleet vehicles.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <a href="tel:0401134074" className="text-2xl font-black text-primary hover:text-white transition-colors flex items-center gap-2">
                <Phone className="w-5 h-5" /> 0401 134 074
              </a>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-primary" /> 24/7 Melton &amp; Bacchus marsh Service
              </span>
            </div>
          </div>

          {/* Quick Links & Services */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/book" className="text-muted-foreground hover:text-primary transition-colors">Book Melton Taxi Online</Link></li>
              <li><Link href="/services/airport" className="text-muted-foreground hover:text-primary transition-colors">Airport Transfers (MEL &amp; AVV)</Link></li>
              <li><Link href="/services/a-to-b" className="text-muted-foreground hover:text-primary transition-colors">Point-to-Point Local Cabs</Link></li>
              <li><Link href="/services/corporate" className="text-muted-foreground hover:text-primary transition-colors">Silver Service &amp; Corporate</Link></li>
              <li><Link href="/fleet" className="text-muted-foreground hover:text-primary transition-colors">Maxi Cabs &amp; Fleet</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">All Taxi Services</Link></li>
            </ul>
          </div>

          {/* Melton & Western Suburbs */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-4">Melton Local Areas</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/service-areas/melton" className="text-muted-foreground hover:text-primary transition-colors">Melton Taxi</Link></li>
              <li><Link href="/service-areas/melton-south" className="text-muted-foreground hover:text-primary transition-colors">Melton South Taxi</Link></li>
              <li><Link href="/service-areas/melton-west" className="text-muted-foreground hover:text-primary transition-colors">Melton West Taxi</Link></li>
              <li><Link href="/service-areas/kurunjang" className="text-muted-foreground hover:text-primary transition-colors">Kurunjang Taxi</Link></li>
              <li><Link href="/service-areas/cobblebank" className="text-muted-foreground hover:text-primary transition-colors">Cobblebank Taxi</Link></li>
              <li><Link href="/service-areas/rockbank" className="text-muted-foreground hover:text-primary transition-colors">Rockbank &amp; Aintree Taxi</Link></li>
              <li><Link href="/service-areas/thornhill-park" className="text-muted-foreground hover:text-primary transition-colors">Thornhill Park Taxi</Link></li>
              <li><Link href="/service-areas/caroline-springs" className="text-muted-foreground hover:text-primary transition-colors">Caroline Springs Taxi</Link></li>
            </ul>
          </div>

          {/* Bacchus Marsh & Regional */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-4">Bacchus Marsh &amp; Airports</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/service-areas/bacchus-marsh" className="text-muted-foreground hover:text-primary transition-colors">Bacchus Marsh Taxi</Link></li>
              <li><Link href="/service-areas/darley" className="text-muted-foreground hover:text-primary transition-colors">Darley Taxi</Link></li>
              <li><Link href="/service-areas/maddingley" className="text-muted-foreground hover:text-primary transition-colors">Maddingley Taxi</Link></li>
              <li><Link href="/service-areas/eyensbury" className="text-muted-foreground hover:text-primary transition-colors">Eynesbury Taxi</Link></li>
              <li><Link href="/service-areas/ballan" className="text-muted-foreground hover:text-primary transition-colors">Ballan Taxi</Link></li>
              <li><Link href="/service-areas/tullamarine" className="text-muted-foreground hover:text-primary transition-colors">Tullamarine Airport Taxi</Link></li>
              <li><Link href="/service-areas/geelong-avalon" className="text-muted-foreground hover:text-primary transition-colors">Avalon Airport Taxi</Link></li>
              <li><Link href="/service-areas" className="text-primary font-bold hover:underline">All Service Areas →</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} MELTON TAXI &amp; Bacchus Marsh. All Rights Reserved. Safe Transport Victoria Accredited.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <span>Fixed &amp; Metered Fares</span>
            <span>·</span>
            <span>No Surge Pricing</span>
            <span>·</span>
            <span>Cash, Card, Apple Pay, Cabcharge</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
