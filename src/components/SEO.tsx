/* SEO Component — Reusable meta tags, Open Graph, Twitter Cards, and JSON-LD structured data */
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  children?: React.ReactNode;
}

const SITE_NAME = "Towman Ghana";
const BASE_URL = "https://towmanghana.com";
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;

const SEO = ({
  title,
  description,
  canonical,
  ogImage = DEFAULT_IMAGE,
  ogType = "website",
  noIndex = false,
  jsonLd,
  children,
}: SEOProps) => {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined;

  const jsonLdArray = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Structured Data */}
      {jsonLdArray.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}

      {children}
    </Helmet>
  );
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