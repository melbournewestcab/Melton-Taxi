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

export function updateMetaTag(attributeName: "name" | "property", attributeValue: string, content: string) {
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

export function updateCanonicalLink(url: string) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

export function SEO({
  suburb,
  canonicalPath,
  title: propTitle,
  description: propDescription,
  canonicalUrl: propCanonicalUrl,
  keywords: propKeywords,
  ogType = "website",
  ogImage = "/images/hero-taxi.png",
  suburbName: propSuburbName,
  postcode: propPostcode,
  faqs: propFaqs,
  breadcrumbs: propBreadcrumbs,
  geoCoordinates,
}: SEOProps) {
  const title = propTitle || (suburb ? suburb.metaTitle : "Melton Taxi | Melton Bacchus Marsh Taxi & Airport Transfers | 0401 134 074");
  const description = propDescription || (suburb ? suburb.metaDesc : "Melton Taxi & Bacchus Marsh Melton cab taxi service. 24/7 reliable airport transfers to Tullamarine & Avalon, fixed fares & Maxi Taxis. Call 0401 134 074.");
  const suburbName = propSuburbName || (suburb ? suburb.name : undefined);
  const postcode = propPostcode || (suburb ? suburb.postcode : undefined);

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
    suburbName ? `Taxi to Melbourne Airport from ${suburbName}` : null,
    suburbName ? `Taxi from ${suburbName} to Melbourne Airport` : null,
    suburbName ? `Taxi ${suburbName}` : null,
    suburbName ? `Taxi in ${suburbName}` : null,
    suburbName ? `Cabs in ${suburbName}` : null,
    suburbName ? `Airport transfers ${suburbName}` : null,
    ...rawKeywords,
  ].filter(Boolean) as string[];
  const keywords = Array.from(new Set(areaKeywords));

  const faqs = propFaqs || (suburb ? suburb.faqs : []);
  const breadcrumbs = propBreadcrumbs || (suburb ? [
    { name: "Home", url: "/" },
    { name: "Service Areas", url: "/service-areas" },
    { name: suburb.name, url: `/service-areas/${suburb.id}` }
  ] : []);

  useEffect(() => {
    // 1. Page Title
    document.title = title;

    // 2. Standard Meta Tags
    updateMetaTag("name", "description", description);
    if (keywords && keywords.length > 0) {
      updateMetaTag("name", "keywords", keywords.join(", "));
    }
    updateMetaTag("name", "robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");

    // 3. Local Search & Geo-Targeting Tags
    updateMetaTag("name", "geo.region", "AU-VIC");
    updateMetaTag("name", "geo.placename", suburbName ? `${suburbName}, Melton, Victoria, Australia` : "Melton, Bacchus Marsh, Victoria, Australia");
    if (geoCoordinates) {
      updateMetaTag("name", "geo.position", `${geoCoordinates.latitude};${geoCoordinates.longitude}`);
      updateMetaTag("name", "ICBM", `${geoCoordinates.latitude}, ${geoCoordinates.longitude}`);
    } else {
      updateMetaTag("name", "geo.position", "-37.6833;144.5833");
      updateMetaTag("name", "ICBM", "-37.6833, 144.5833");
    }
    updateMetaTag("name", "target_area", suburbName ? `Melton Taxi, Airport Transfers, Bacchus Marsh Taxi, Taxi in ${suburbName}` : "Melton Taxi, Airport Transfers, Bacchus Marsh Taxi, Western Suburbs, Victoria");
    updateMetaTag("name", "coverage", `Melton Taxi, Airport Transfers, Bacchus Marsh Taxi, ${suburbName || "Melton"}, Victoria, Australia`);
    updateMetaTag("name", "city", suburbName || "Melton");
    updateMetaTag("name", "state", "Victoria");
    updateMetaTag("name", "country", "Australia");

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
    updateMetaTag("property", "og:site_name", "Melton Taxi");
    updateMetaTag("property", "og:locale", "en_AU");
    updateMetaTag("property", "og:locality", suburbName || "Melton");
    updateMetaTag("property", "og:region", "Victoria");
    updateMetaTag("property", "og:country-name", "Australia");

    // 5. Twitter Card Tags
    updateMetaTag("name", "twitter:card", "summary_large_image");
    updateMetaTag("name", "twitter:title", title);
    updateMetaTag("name", "twitter:description", description);
    updateMetaTag("name", "twitter:image", absoluteImageUrl);
    updateMetaTag("name", "twitter:image:alt", `${title} - Melton Taxi & Airport Transfers`);

    // 6. Canonical URL Link
    updateCanonicalLink(fullUrl);

    // 7. Structured Data (Schema.org JSON-LD Graph)
    const scriptId = "page-seo-schema-ld";
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    const schemaGraph: any[] = [
      {
        "@type": "TaxiService",
        "@id": `${fullUrl}#service`,
        name: suburbName ? `Melton Taxi - Taxi in ${suburbName}` : "Melton Taxi",
        alternateName: [
          "Melton Bacchus Marsh Taxi",
          "Bacchus Marsh Melton Cab Taxi Service",
          "Melton Taxi Service",
          "Airport Transfers"
        ],
        description: description,
        url: fullUrl,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "438",
          bestRating: "5",
          worstRating: "1"
        },
        provider: {
          "@type": "LocalBusiness",
          name: "Melton Taxi",
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
            postalCode: postcode ? postcode.replace(/[^0-9]/g, "") : "3337",
            addressCountry: "AU",
          },
          ...(geoCoordinates && {
            geo: {
              "@type": "GeoCoordinates",
              latitude: geoCoordinates.latitude,
              longitude: geoCoordinates.longitude,
            },
          }),
        },
        areaServed: [
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
            name: "Melton West (VIC 3337)",
          },
          {
            "@type": "AdministrativeArea",
            name: "Kurunjang",
          },
          {
            "@type": "AdministrativeArea",
            name: "Cobblebank & Brookfield",
          },
          {
            "@type": "AdministrativeArea",
            name: "Melbourne Airport (Tullamarine)",
          },
          {
            "@type": "AdministrativeArea",
            name: "Avalon Airport",
          },
          {
            "@type": "AdministrativeArea",
            name: suburbName || "Western Suburbs & Regional Victoria",
          },
        ],
        serviceType: [
          "Melton Taxi",
          "Melton Bacchus Marsh Taxi",
          "Airport Transfers (Tullamarine & Avalon)",
          "Bacchus Marsh Melton Cab Taxi Service",
          "Melton South Taxi",
          "Bacchus Marsh Taxi (bacchusmarsh taxi)",
          suburbName ? `Taxi in ${suburbName}` : "Local Suburb Cabs",
          "Maxi Taxi Group Transport",
          "Silver Service Executive Chauffeur",
          "Door to Door 24/7 Cab Service",
        ],
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

    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": schemaGraph,
    });
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
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
    faqs,
    breadcrumbs,
    geoCoordinates,
  ]);

  return null;
}
