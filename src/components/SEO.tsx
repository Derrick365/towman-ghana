/* SEO Component — Lightweight meta tags, Open Graph, Twitter Cards, and JSON-LD structured data.
   Uses direct DOM manipulation instead of react-helmet to avoid dual-React-instance issues. */
import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE_NAME = "Towman Ghana";
const BASE_URL = "https://towmanghana.com";
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;

/* Helper: set or create a <meta> tag */
function setMeta(attr: string, key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

const SEO = ({
  title,
  description,
  canonical,
  ogImage = DEFAULT_IMAGE,
  ogType = "website",
  noIndex = false,
  jsonLd,
}: SEOProps) => {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined;

  useEffect(() => {
    /* Title */
    document.title = fullTitle;

    /* Standard meta */
    setMeta("name", "description", description);
    if (noIndex) setMeta("name", "robots", "noindex,nofollow");

    /* Canonical */
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonicalUrl) {
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonicalUrl);
    }

    /* Open Graph */
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:site_name", SITE_NAME);
    if (canonicalUrl) setMeta("property", "og:url", canonicalUrl);

    /* Twitter */
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

    /* JSON-LD */
    const jsonLdArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
    const scripts: HTMLScriptElement[] = [];
    jsonLdArray.forEach((data) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.textContent = JSON.stringify(data);
      document.head.appendChild(s);
      scripts.push(s);
    });

    return () => {
      scripts.forEach((s) => s.remove());
    };
  }, [fullTitle, description, canonicalUrl, ogImage, ogType, noIndex, jsonLd]);

  return null;
};

export default SEO;

/* ── Structured Data Helpers ── */

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Towman Ghana",
  url: "https://towmanghana.com",
  logo: "https://towmanghana.com/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+233-24-120-4040",
    contactType: "customer service",
    areaServed: "GH",
    availableLanguage: "English",
  },
  sameAs: [],
};

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Towman Ghana",
  description:
    "Ghana's #1 tow truck directory. Find verified tow operators across all 16 regions.",
  url: "https://towmanghana.com",
  telephone: "+233-24-120-4040",
  email: "hello@towmanghana.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Accra",
    addressCountry: "GH",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 5.6037,
    longitude: -0.187,
  },
  areaServed: {
    "@type": "Country",
    name: "Ghana",
  },
  priceRange: "GH₵250 - GH₵950+",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
};

export const serviceJsonLd = (city?: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Towing Service",
  provider: {
    "@type": "Organization",
    name: "Towman Ghana",
  },
  areaServed: city
    ? { "@type": "City", name: city }
    : { "@type": "Country", name: "Ghana" },
  description: city
    ? `Professional towing and roadside assistance services in ${city}, Ghana.`
    : "Professional towing and roadside assistance across all 16 regions of Ghana.",
});

export const faqJsonLd = (
  items: { question: string; answer: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

export const breadcrumbJsonLd = (
  items: { name: string; url: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: `https://towmanghana.com${item.url}`,
  })),
});