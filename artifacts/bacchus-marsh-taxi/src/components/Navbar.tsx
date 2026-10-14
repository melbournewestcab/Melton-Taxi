import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, ChevronDown, ChevronRight, Phone, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";
import { BrandLogo } from "./BrandLogo";

const FEATURED_SUBURBS = [
  { href: "/service-areas/melton", label: "Melton" },
  { href: "/service-areas/melton-south", label: "Melton South" },
  { href: "/service-areas/bacchus-marsh", label: "Bacchus Marsh" },
  { href: "/service-areas/melton-west", label: "Melton West" },
  { href: "/service-areas/kurunjang", label: "Kurunjang" },
  { href: "/service-areas/cobblebank", label: "Cobblebank & Brookfield" },
  { href: "/service-areas/rockbank", label: "Rockbank & Aintree" },
  { href: "/service-areas/thornhill-park", label: "Thornhill Park" },
  { href: "/service-areas/darley", label: "Darley" },
  { href: "/service-areas/maddingley", label: "Maddingley" },
  { href: "/service-areas/eyensbury", label: "Eynesbury" },
  { href: "/service-areas/ballan", label: "Ballan" },
  { href: "/service-areas/tullamarine", label: "Melbourne Airport (MEL)" },
  { href: "/service-areas/geelong-avalon", label: "Avalon Airport (AVV)" },
];

const SERVICES = [
  { href: "/services/airport", label: "Airport Transfers (MEL & AVV)" },
  { href: "/services/a-to-b", label: "Melton Local & Point-to-Point Cabs" },
  { href: "/services/corporate", label: "Corporate & Silver Service" },
  { href: "/services/hotel", label: "Hotel & City Transfers" },
  { href: "/services/event", label: "Event & Maxi Taxi Transfers" },
  { href: "/services/parcel", label: "Same-Day Courier & Parcel" },
];

export function Navbar() {
  const [location] = useLocation();
  const [areasOpen, setAreasOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const isActive = (path: string) => location === path || location.startsWith(path + "/");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/98 backdrop-blur-md border-b border-border shadow-lg" role="navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 lg:h-24 gap-4">

          {/* Logo */}
          <Link href="/" className="shrink-0" data-testid="link-home-logo">
            <BrandLogo size="md" />
          </Link>

          {/* Computer / Desktop Full Navigation Menu Bar */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 bg-secondary/40 border border-border/80 rounded-xl p-1.5 shadow-inner">
            <Link
              href="/"
              className={`px-4 py-2.5 rounded-lg text-sm font-black uppercase tracking-wider transition-all duration-200 ${
                location === "/"
                  ? "bg-primary text-black shadow-md"
                  : "text-foreground hover:text-primary hover:bg-secondary/70"
              }`}
              data-testid="link-nav-home"
            >
              Home
            </Link>

            {/* Services Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-black uppercase tracking-wider transition-all duration-200 outline-none ${
                  isActive("/services")
                    ? "bg-primary text-black shadow-md"
                    : "text-foreground hover:text-primary hover:bg-secondary/70"
                }`}
                data-testid="link-nav-services"
              >
                Services <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border-border w-64 p-2 shadow-2xl rounded-xl">
                <DropdownMenuItem asChild>
                  <Link href="/services" className="w-full cursor-pointer font-black text-primary p-2.5 rounded-lg text-sm bg-primary/10 mb-1">
                    All Melton &amp; Airport Services →
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-1" />
                {SERVICES.map((s) => (
                  <DropdownMenuItem key={s.href} asChild>
                    <Link href={s.href} className="w-full cursor-pointer text-xs font-bold py-2 px-2.5 rounded-md hover:bg-secondary/80">
                      {s.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Fleet */}
            <Link
              href="/fleet"
              className={`px-4 py-2.5 rounded-lg text-sm font-black uppercase tracking-wider transition-all duration-200 ${
                isActive("/fleet")
                  ? "bg-primary text-black shadow-md"
                  : "text-foreground hover:text-primary hover:bg-secondary/70"
              }`}
              data-testid="link-nav-fleet"
            >
              Our Fleet
            </Link>

            {/* Service Areas Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-black uppercase tracking-wider transition-all duration-200 outline-none ${
                  isActive("/service-areas")
                    ? "bg-primary text-black shadow-md"
                    : "text-foreground hover:text-primary hover:bg-secondary/70"
                }`}
                data-testid="link-nav-areas"
              >
                Service Areas <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border-border w-72 max-h-[75vh] overflow-y-auto p-2 shadow-2xl rounded-xl">
                <DropdownMenuItem asChild>
                  <Link href="/service-areas" className="w-full cursor-pointer font-black text-primary uppercase text-xs p-2.5 rounded-lg bg-primary/10 mb-1">
                    Browse All Service Areas →
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-1" />
                {FEATURED_SUBURBS.map((a) => (
                  <DropdownMenuItem key={a.href} asChild>
                    <Link href={a.href} className="w-full cursor-pointer text-xs font-bold py-2 px-2.5 rounded-md hover:bg-secondary/80">
                      {a.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Book Online button inside menu bar */}
            <Link
              href="/book"
              className={`px-4 py-2.5 rounded-lg text-sm font-black uppercase tracking-wider transition-all duration-200 ${
                isActive("/book")
                  ? "bg-primary text-black shadow-md"
                  : "text-foreground hover:text-primary hover:bg-secondary/70"
              }`}
              data-testid="link-nav-book-text"
            >
              Book Online
            </Link>
          </div>

          {/* Desktop Direct Call & Book CTA */}
          <div className="hidden lg:flex items-center gap-2.5">
            <a
              href="tel:0401134074"
              className="flex items-center gap-2 px-3.5 h-9 rounded-full border border-primary/40 bg-secondary/80 hover:bg-primary/20 text-foreground font-bold text-xs tracking-wide transition-all shadow-xs hover:shadow-sm group"
              data-testid="link-nav-call"
            >
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-black text-primary">0401 134 074</span>
            </a>
            <Button asChild size="default" className="font-bold uppercase tracking-wider bg-primary hover:bg-primary/90 text-black shadow-xs hover:shadow-md rounded-full h-9 px-4 text-xs transition-all">
              <Link href="/book">Book Now</Link>
            </Button>
          </div>

          {/* Mobile version: Quick Call + Hamburger Menu */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <a
              href="tel:0401134074"
              className="h-9 px-3 rounded-full border border-primary/50 bg-secondary/90 flex items-center gap-1.5 text-xs font-bold text-primary hover:bg-primary hover:text-black transition-all shadow-xs"
              aria-label="Call 0401 134 074"
            >
              <Phone className="w-3.5 h-3.5 text-primary" />
              <span>0401 134 074</span>
            </a>
            {/* Hamburger button */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="text-foreground h-9 w-9 rounded-full border border-primary/50 bg-secondary/80 hover:bg-primary hover:text-black shadow-xs flex items-center justify-center active:scale-95 transition-all"
                  aria-label="Open Navigation Menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background border-l border-border w-[88vw] sm:w-[420px] flex flex-col gap-0 pt-8 px-0 overflow-y-auto">

                {/* Header in mobile sheet */}
                <div className="px-6 pb-6 border-b border-border flex items-center justify-between">
                  <BrandLogo size="md" />
                </div>

                {/* Double sized menu navigation list */}
                <div className="flex flex-col divide-y divide-border/60">
                  <Link
                    href="/"
                    onClick={() => setSheetOpen(false)}
                    className="flex items-center justify-between px-6 py-5 text-lg font-black uppercase tracking-wider hover:text-primary hover:bg-secondary/40 transition-colors"
                  >
                    <span>Home</span>
                    <ChevronRight className="w-6 h-6 text-muted-foreground" />
                  </Link>

                  {/* Services accordion - Double size */}
                  <div>
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className="flex items-center justify-between w-full px-6 py-5 text-lg font-black uppercase tracking-wider hover:text-primary hover:bg-secondary/40 transition-colors"
                    >
                      <span>Our Services</span>
                      <ChevronRight className={`w-6 h-6 transition-transform duration-200 ${servicesOpen ? "rotate-90 text-primary" : "text-muted-foreground"}`} />
                    </button>
                    {servicesOpen && (
                      <div className="pb-3 flex flex-col bg-secondary/25 divide-y divide-border/30">
                        <Link
                          href="/services"
                          onClick={() => setSheetOpen(false)}
                          className="px-8 py-3.5 text-sm font-black text-primary hover:text-white transition-colors bg-primary/10"
                        >
                          All Services Overview →
                        </Link>
                        {SERVICES.map((s) => (
                          <Link
                            key={s.href}
                            href={s.href}
                            onClick={() => setSheetOpen(false)}
                            className="px-8 py-3.5 text-base font-bold text-muted-foreground hover:text-primary transition-colors"
                          >
                            {s.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Fleet */}
                  <Link
                    href="/fleet"
                    onClick={() => setSheetOpen(false)}
                    className="flex items-center justify-between px-6 py-5 text-lg font-black uppercase tracking-wider hover:text-primary hover:bg-secondary/40 transition-colors"
                  >
                    <span>Our Fleet</span>
                    <ChevronRight className="w-6 h-6 text-muted-foreground" />
                  </Link>

                  {/* Service Areas accordion - Double size */}
                  <div>
                    <button
                      onClick={() => setAreasOpen(!areasOpen)}
                      className="flex items-center justify-between w-full px-6 py-5 text-lg font-black uppercase tracking-wider hover:text-primary hover:bg-secondary/40 transition-colors"
                    >
                      <span>Melton &amp; Service Areas</span>
                      <ChevronRight className={`w-6 h-6 transition-transform duration-200 ${areasOpen ? "rotate-90 text-primary" : "text-muted-foreground"}`} />
                    </button>
                    {areasOpen && (
                      <div className="pb-3 flex flex-col bg-secondary/25 max-h-72 overflow-y-auto divide-y divide-border/30">
                        <Link
                          href="/service-areas"
                          onClick={() => setSheetOpen(false)}
                          className="px-8 py-3.5 text-sm font-black text-primary hover:text-white transition-colors bg-primary/10"
                        >
                          All Suburbs Directory →
                        </Link>
                        {FEATURED_SUBURBS.map((a) => (
                          <Link
                            key={a.href}
                            href={a.href}
                            onClick={() => setSheetOpen(false)}
                            className="px-8 py-3 text-base font-bold text-muted-foreground hover:text-primary transition-colors"
                          >
                            {a.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Book Online */}
                  <Link
                    href="/book"
                    onClick={() => setSheetOpen(false)}
                    className="flex items-center justify-between px-6 py-5 text-lg font-black uppercase tracking-wider text-primary hover:bg-secondary/40 transition-colors"
                  >
                    <span>Book Online</span>
                    <ChevronRight className="w-6 h-6 text-primary" />
                  </Link>
                </div>

                {/* Mobile Bottom CTA Action Bar - Rounded and Attractive */}
                <div className="mt-auto px-6 py-5 flex flex-col gap-2.5 border-t border-border bg-card/60">
                  <Button asChild size="default" className="w-full h-10 text-xs font-bold text-black bg-primary hover:bg-primary/90 uppercase tracking-wider rounded-full shadow-md">
                    <Link href="/book" onClick={() => setSheetOpen(false)}>Book a Melton Taxi</Link>
                  </Button>
                  <a
                    href="tel:0401134074"
                    className="flex items-center justify-center gap-2 w-full h-10 text-xs font-bold text-white border border-primary/70 rounded-full hover:bg-primary hover:text-black transition-all shadow-xs"
                  >
                    <Phone className="w-4 h-4 text-primary" />
                    Call 0401 134 074
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </nav>
  );
}
