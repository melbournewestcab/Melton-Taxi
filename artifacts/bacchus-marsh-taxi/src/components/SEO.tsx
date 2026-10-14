import React, { useEffect } from "react";
import { SuburbInfo } from "@/data/suburbsData";

export interface SEOProps {
  suburb?: SuburbInfo;
  canonicalPath?: string;
  title?: string;
  description?: string;
  canonicalUrl?: string;
  keywords?: string[];
  ogType?: "website" | "article" | "business.business";
  ogImage?: string;
  suburbName?: string;
  postcode?: string;
  faqs?: Array<{ q: string; a: string }>;
  breadcrumbs?: Array<{ name: string; url: string }>;
  geoCoordinates?: { latitude: number; longitude: number };
}

// ── Master Geographic & Postal Database for Western Suburbs & Airport Corridors ──
export const SUBURB_GEO_DATABASE: Record<string, { lat: number; lon: number; postcode: string; district: string }> = {
  "melton": { lat: -37.6833, lon: 144.5833, postcode: "3337", district: "City of Melton" },
  "melton-south": { lat: -37.7058, lon: 144.5772, postcode: "3338", district: "City of Melton" },
  "melton-west": { lat: -37.6789, lon: 144.5511, postcode: "3337", district: "City of Melton" },
  "bacchus-marsh": { lat: -37.6749, lon: 144.4387, postcode: "3340", district: "Shire of Moorabool" },
  "darley": { lat: -37.6533, lon: 144.4331, postcode: "3340", district: "Shire of Moorabool" },
  "maddingley": { lat: -37.6914, lon: 144.4356, postcode: "3340", district: "Shire of Moorabool" },
  "cobblebank": { lat: -37.7025, lon: 144.6067, postcode: "3338", district: "City of Melton" },
  "brookfield": { lat: -37.7022, lon: 144.5558, postcode: "3338", district: "City of Melton" },
  "kurunjang": { lat: -37.6586, lon: 144.5908, postcode: "3337", district: "City of Melton" },
  "eynesbury": { lat: -37.7889, lon: 144.5619, postcode: "3338", district: "City of Melton / Moorabool" },
  "rockbank": { lat: -37.7347, lon: 144.6539, postcode: "3335", district: "City of Melton" },
  "thornhill-park": { lat: -37.7222, lon: 144.6306, postcode: "3335", district: "City of Melton" },
  "aintree": { lat: -37.7194, lon: 144.6644, postcode: "3336", district: "City of Melton" },
  "woodlea": { lat: -37.7194, lon: 144.6644, postcode: "3336", district: "City of Melton" },
  "ballan": { lat: -37.6000, lon: 144.2333, postcode: "3342", district: "Shire of Moorabool" },
  "diggers-rest": { lat: -37.6289, lon: 144.7208, postcode: "3427", district: "City of Melton" },
  "fraser-rise": { lat: -37.7083, lon: 144.7333, postcode: "3336", district: "City of Melton" },
  "plumpton": { lat: -37.7278, lon: 144.7222, postcode: "3335", district: "City of Melton" },
  "deanside": { lat: -37.7306, lon: 144.7083, postcode: "3336", district: "City of Melton" },
  "toolern-vale": { lat: -37.6000, lon: 144.5833, postcode: "3337", district: "City of Melton" },
  "strathtulloh": { lat: -37.7139, lon: 144.5889, postcode: "3338", district: "City of Melton" },
  "sunbury": { lat: -37.5811, lon: 144.7289, postcode: "3429", district: "City of Hume" },
  "gisborne": { lat: -37.4883, lon: 144.5917, postcode: "3437", district: "Shire of Macedon Ranges" },
  "melbourne-airport": { lat: -37.6690, lon: 144.8410, postcode: "3045", district: "City of Hume" },
  "tullamarine": { lat: -37.7033, lon: 144.8822, postcode: "3043", district: "City of Hume" },
  "avalon-airport": { lat: -38.0394, lon: 144.4694, postcode: "3212", district: "City of Greater Geelong" },
  "melbourne-cbd": { lat: -37.8136, lon: 144.9631, postcode: "3000", district: "City of Melbourne" },
  "werribee": { lat: -37.9000, lon: 144.6667, postcode: "3030", district: "City of Wyndham" },
  "tarneit": { lat: -37.8333, lon: 144.6667, postcode: "3029", district: "City of Wyndham" },
  "caroline-springs": { lat: -37.7333, lon: 144.7333, postcode: "3023", district: "City of Melton" },
  "sunshine": { lat: -37.7833, lon: 144.8333, postcode: "3020", district: "City of Brimbank" },
  "footscray": { lat: -37.8000, lon: 144.9000, postcode: "3011", district: "City of Maribyrnong" },
};

function resolveGeoData(name?: string, id?: string): { lat: number; lon: number; postcode: string; district: string } | null {
  if (id) {
    const cleanId = id.toLowerCase().trim();
    if (SUBURB_GEO_DATABASE[cleanId]) return SUBURB_GEO_DATABASE[cleanId];
  }
  if (name) {
    const normalized = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    if (SUBURB_GEO_DATABASE[normalized]) return SUBURB_GEO_DATABASE[normalized];
    for (const key of Object.keys(SUBURB_GEO_DATABASE)) {
      if (normalized.includes(key) || key.includes(normalized)) {
        return SUBURB_GEO_DATABASE[key];
      }
    }
  }
  return null;
}

export function updateMetaTag(attributeName: "name" | "property", attributeValue: string, content: string) {
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  if (element.getAttribute("content") !== content) {
    element.setAttribute("content", content);
  }
}

export function updateCanonicalLink(url: string) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  if (link.getAttribute("href") !== url) {
    link.setAttribute("href", url);
  }
}

export function SEO({
  suburb,
  canonicalPath,
  title: propTitle,
  description: propDescription,
  canonicalUrl: propCanonicalUrl,
  keywords: propKeywords,
  ogType = "website",
  ogImage = "/images/hero-taxi.webp",
  suburbName: propSuburbName,
  postcode: propPostcode,
  faqs: propFaqs,
  breadcrumbs: propBreadcrumbs,
  geoCoordinates: propGeoCoordinates,
}: SEOProps) {
  const suburbName = propSuburbName || (suburb ? suburb.name : undefined);
  const geoResolved = resolveGeoData(suburbName, suburb?.id);

  const title = propTitle || (suburb ? suburb.metaTitle : (suburbName ? `${suburbName} Taxi | 24/7 Melton & Bacchus Marsh Cabs | 0401 134 074` : "MELTON TAXI & Bacchus Marsh | 24/7 Cabs & Airport Transfers | 0401 134 074"));
  const description = propDescription || (suburb ? suburb.metaDesc : (suburbName ? `Book a reliable taxi in ${suburbName} VIC. 24/7 fixed fare cabs, airport transfers to Tullamarine & Avalon, and Maxi Taxis. Call 0401 134 074.` : "MELTON TAXI & Bacchus Marsh 24/7 taxi cab service. Reliable airport transfers to Tullamarine & Avalon, fixed fares & Maxi Taxis. Call 0401 134 074."));
  
  const postcode = propPostcode || (suburb ? suburb.postcode.replace(/[^0-9]/g, "") : (geoResolved ? geoResolved.postcode : "3337"));
  const coordinates = propGeoCoordinates || (geoResolved ? { latitude: geoResolved.lat, longitude: geoResolved.lon } : { latitude: -37.6833, longitude: 144.5833 });

  const rawKeywords = propKeywords || (suburb ? suburb.keywords : []);
  const areaKeywords = [
    "melton taxi",
    "melton bacchus marsh taxi",
    "airport transfers",
    "bacchus marsh melton cab taxi service",
    "melton south taxi",
    "bacchus marsh taxi",
    "bacchusmarsh taxi",
    "melton airport transfers",
    "taxi melton",
    "taxi melton south",
    "taxi bacchus marsh",
    "melton cab",
    "bacchus marsh cab",
    "maxi taxi melton",
    "Taxi to Melbourne Airport",
    "Taxi to Melbourne Airport Tullamarine",
    "Taxi to Avalon Airport",
    suburbName ? `Taxi ${suburbName}` : null,
    suburbName ? `Taxi in ${suburbName}` : null,
    suburbName ? `Cabs in ${suburbName}` : null,
    suburbName ? `Cab service ${suburbName}` : null,
    suburbName ? `Airport transfers ${suburbName}` : null,
    suburbName ? `Taxi from ${suburbName} to Melbourne Airport` : null,
    suburbName ? `Taxi from ${suburbName} to Tullamarine` : null,
    suburbName ? `Maxi taxi ${suburbName}` : null,
    ...rawKeywords,
  ].filter(Boolean) as string[];
  const keywords = Array.from(new Set(areaKeywords));

  const faqs = propFaqs || (suburb ? suburb.faqs : []);
  const breadcrumbs = propBreadcrumbs || (suburb ? [
    { name: "Home", url: "/" },
    { name: "Service Areas", url: "/service-areas" },
    { name: suburb.name, url: `/service-areas/${suburb.id}` }
  ] : (suburbName ? [
    { name: "Home", url: "/" },
    { name: "Service Areas", url: "/service-areas" },
    { name: suburbName, url: canonicalPath || "/service-areas" }
  ] : []));

  useEffect(() => {
    // 1. Page Title
    document.title = title;

    // 2. Standard Meta Tags
    updateMetaTag("name", "description", description);
    if (keywords && keywords.length > 0) {
      updateMetaTag("name", "keywords", keywords.join(", "));
    }
    updateMetaTag("name", "robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");

    // 3. Local Search & Geo-Targeting Tags for Location SEO
    updateMetaTag("name", "geo.region", "AU-VIC");
    updateMetaTag("name", "geo.placename", suburbName ? `${suburbName}, Victoria, Australia` : "Melton, Bacchus Marsh, Victoria, Australia");
    updateMetaTag("name", "geo.position", `${coordinates.latitude};${coordinates.longitude}`);
    updateMetaTag("name", "ICBM", `${coordinates.latitude}, ${coordinates.longitude}`);
    updateMetaTag("name", "target_area", suburbName ? `Melton Taxi, Bacchus Marsh Taxi, Airport Transfers, Taxi in ${suburbName}, Cabs in ${suburbName}` : "Melton Taxi, Airport Transfers, Bacchus Marsh Taxi, Western Suburbs, Victoria");
    updateMetaTag("name", "coverage", `${suburbName || "Melton"}, Victoria, Australia`);
    updateMetaTag("name", "city", suburbName || "Melton");
    updateMetaTag("name", "postal-code", postcode);
    updateMetaTag("name", "state", "Victoria");
    updateMetaTag("name", "country", "Australia");
    updateMetaTag("name", "DC.coverage", `${suburbName || "Melton"}, Victoria, Australia`);
    updateMetaTag("name", "DC.title", title);

    // 4. Open Graph Tags
    const origin = typeof window !== "undefined" ? window.location.origin : "https://meltontaxi.com.au";
    const fullUrl = propCanonicalUrl || (canonicalPath ? `${origin}${canonicalPath}` : (typeof window !== "undefined" ? window.location.href : "https://meltontaxi.com.au"));
    const absoluteImageUrl = ogImage.startsWith("http") ? ogImage : `${origin}${ogImage}`;

    updateMetaTag("property", "og:title", title);
    updateMetaTag("property", "og:description", description);
    updateMetaTag("property", "og:type", ogType);
    updateMetaTag("property", "og:url", fullUrl);
    updateMetaTag("property", "og:image", absoluteImageUrl);
    updateMetaTag("property", "og:image:alt", `${title} - Melton Taxi & Airport Transfers`);
    updateMetaTag("property", "og:site_name", "MELTON TAXI & Bacchus Marsh");
    updateMetaTag("property", "og:locale", "en_AU");
    updateMetaTag("property", "og:locality", suburbName || "Melton");
    updateMetaTag("property", "og:region", "Victoria");
    updateMetaTag("property", "og:postal-code", postcode);
    updateMetaTag("property", "og:country-name", "Australia");
    updateMetaTag("property", "business:contact_data:locality", suburbName || "Melton");
    updateMetaTag("property", "business:contact_data:region", "Victoria");
    updateMetaTag("property", "business:contact_data:postal_code", postcode);
    updateMetaTag("property", "business:contact_data:country_name", "Australia");
    updateMetaTag("property", "business:contact_data:phone_number", "+61401134074");
    updateMetaTag("property", "place:location:latitude", String(coordinates.latitude));
    updateMetaTag("property", "place:location:longitude", String(coordinates.longitude));

    // 5. Twitter Card Tags
    updateMetaTag("name", "twitter:card", "summary_large_image");
    updateMetaTag("name", "twitter:title", title);
    updateMetaTag("name", "twitter:description", description);
    updateMetaTag("name", "twitter:image", absoluteImageUrl);
    updateMetaTag("name", "twitter:image:alt", `${title} - MELTON TAXI & Bacchus Marsh`);

    // 6. Canonical URL Link
    updateCanonicalLink(fullUrl);

    // 7. Structured Data (Schema.org JSON-LD Graph for Specific Service Area)
    const scriptId = "page-seo-schema-ld";

    const localServiceName = suburbName
      ? `Melton Taxi - Taxi Service in ${suburbName}`
      : "MELTON TAXI & Bacchus Marsh Taxi Service";

    const localBusinessName = suburbName
      ? `Melton Taxi - ${suburbName} Station & Service Hub`
      : "Melton Taxi - Melton & Bacchus Marsh Hub";

    const schemaGraph: any[] = [
      {
        "@type": "TaxiService",
        "@id": `${fullUrl}#service`,
        name: localServiceName,
        alternateName: [
          suburbName ? `Taxi ${suburbName}` : "Melton Taxi",
          suburbName ? `${suburbName} Cabs` : "Bacchus Marsh Taxi",
          suburbName ? `Airport Transfers ${suburbName}` : "Melton Airport Transfers",
          "Melton Bacchus Marsh Taxi",
          "Bacchus Marsh Melton Cab Taxi Service"
        ],
        description: description,
        url: fullUrl,
        telephone: "+61401134074",
        email: "p2839582@gmail.com",
        priceRange: "$$",
        currenciesAccepted: "AUD",
        paymentAccepted: "Cash, Credit Card, EFTPOS, Apple Pay, Google Pay, Cabcharge",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "438",
          bestRating: "5",
          worstRating: "1"
        },
        provider: {
          "@type": "LocalBusiness",
          "@id": `${fullUrl}#localbusiness`,
          name: localBusinessName,
          telephone: "+61401134074",
          email: "p2839582@gmail.com",
          priceRange: "$$",
          image: absoluteImageUrl,
          currenciesAccepted: "AUD",
          paymentAccepted: "Cash, Credit Card, EFTPOS, Apple Pay, Google Pay, Cabcharge",
          address: {
            "@type": "PostalAddress",
            addressLocality: suburbName || "Melton",
            addressRegion: "VIC",
            postalCode: postcode,
            addressCountry: "AU",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          },
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: "00:00",
            closes: "23:59",
          },
        },
        areaServed: [
          {
            "@type": "AdministrativeArea",
            name: suburbName || "Melton",
            postalCode: postcode,
            containedInPlace: { "@type": "State", "name": "Victoria, Australia" },
            geo: {
              "@type": "GeoCoordinates",
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
            },
          },
          {
            "@type": "AdministrativeArea",
            name: "Melton (VIC 3337)",
          },
          {
            "@type": "AdministrativeArea",
            name: "Melton South (VIC 3338)",
          },
          {
            "@type": "AdministrativeArea",
            name: "Bacchus Marsh (VIC 3340)",
          },
          {
            "@type": "AdministrativeArea",
            name: "Melbourne Airport (Tullamarine MEL)",
          },
          {
            "@type": "AdministrativeArea",
            name: "Avalon Airport (AVV)",
          },
        ],
        serviceArea: {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          },
          geoRadius: "50000",
        },
        serviceType: [
          suburbName ? `Taxi in ${suburbName}` : "Melton Taxi",
          suburbName ? `Airport Transfers from ${suburbName} to Melbourne Airport` : "Melbourne Airport Transfers (Tullamarine)",
          suburbName ? `${suburbName} to Avalon Airport Taxi` : "Avalon Airport Transfers",
          suburbName ? `Maxi Taxi in ${suburbName} (1-11 Seats)` : "Maxi Taxi Melton (1-11 Seats)",
          "Melton Bacchus Marsh Taxi",
          "Bacchus Marsh Melton Cab Taxi Service",
          "Silver Service Luxury Chauffeur",
          "Door to Door 24/7 Cab Service",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: suburbName ? `Taxi Services in ${suburbName}` : "Melton & Bacchus Marsh Taxi Fares",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: suburbName ? `Direct Melbourne Airport Transfer from ${suburbName}` : "Melbourne Airport (Tullamarine) Transfer",
                description: `Fixed upfront fare door-to-door transfer connecting ${suburbName || "Melton"} directly to Tullamarine Airport Terminals with flight tracking.`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: suburbName ? `Local Door-to-Door Taxi in ${suburbName}` : "Local Door-to-Door Taxi Service",
                description: `24/7 on-demand local cab service across ${suburbName || "Melton & Bacchus Marsh"} with clean vehicles and zero surge pricing.`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: `Maxi Taxi Group Transport in ${suburbName || "Melton"}`,
                description: "Spacious 7 to 11 seater Maxi Taxis for large family airport runs, events, and excess luggage.",
              },
            },
          ],
        },
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "00:00",
          closes: "23:59",
        },
      },
    ];

    // Add Breadcrumb schema if provided
    if (breadcrumbs.length > 0) {
      schemaGraph.push({
        "@type": "BreadcrumbList",
        "@id": `${fullUrl}#breadcrumbs`,
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: crumb.name,
          item: crumb.url.startsWith("http") ? crumb.url : `${origin}${crumb.url}`,
        })),
      });
    }

    // Add FAQ schema if provided
    if (faqs.length > 0) {
      schemaGraph.push({
        "@type": "FAQPage",
        "@id": `${fullUrl}#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      });
    }

    const newJson = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": schemaGraph,
    });
    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (existingScript) {
      if (existingScript.textContent !== newJson) {
        existingScript.textContent = newJson;
      }
    } else {
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      script.text = newJson;
      document.head.appendChild(script);
    }
  }, [
    title,
    description,
    canonicalPath,
    propCanonicalUrl,
    keywords,
    ogType,
    ogImage,
    suburbName,
    postcode,
    coordinates.latitude,
    coordinates.longitude,
    faqs,
    breadcrumbs,
  ]);

  return null;
}
