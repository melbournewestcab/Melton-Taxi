import React, { useEffect } from "react";
import { BookingForm } from "@/components/BookingForm";
import { SEO } from "@/components/SEO";

export default function BookPage() {
  const initialVehicle = new URLSearchParams(window.location.search).get("vehicle") || "";

  return (
    <div className="w-full bg-background min-h-screen pb-24">
      <SEO
        title="Book Melton Taxi Online | 24/7 Airport Transfers & Bacchus Marsh Cabs | 0401 134 074"
        description="Book a Melton Taxi online in seconds. Instant fixed fare estimates for Melton local trips, Bacchus Marsh cabs, and Melbourne Airport (Tullamarine & Avalon) transfers. Call 0401 134 074."
        keywords={[
          "book melton taxi",
          "melton taxi booking",
          "airport transfers melton",
          "bacchusmarsh taxi booking",
          "bacchus marsh taxi online",
          "taxi melton to airport",
          "melton taxi quote",
        ]}
        canonicalPath="/book"
      />
      <div className="bg-secondary py-16 border-b border-border mb-12">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
            Book Melton Taxi <span className="text-primary">Online</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get an instant fixed fare estimate and secure your ride in Melton, Bacchus Marsh, or direct to Melbourne Airport. Fast, transparent, and reliable 24/7.
          </p>
        </div>
      </div>
      <div className="container max-w-6xl mx-auto px-4">
        <BookingForm initialVehicle={initialVehicle} />
      </div>
    </div>
  );
}
