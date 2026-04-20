/* City-specific SEO landing page — programmatic local SEO */
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO, { serviceJsonLd, breadcrumbJsonLd, localBusinessJsonLd } from "@/components/SEO";
import { getCityBySlug, cities } from "@/lib/seo-cities";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Shield, Truck, Star } from "lucide-react";
import StickyTowButton from "@/components/StickyTowButton";
import IdleTowPrompt from "@/components/IdleTowPrompt";

const CityLanding = () => {
  const { city } = useParams<{ city: string }>();
  const data = getCityBySlug(city || "");

  if (!data) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-6 py-32 text-center">
          <h1 className="text-3xl font-bold font-display">City Not Found</h1>
          <p className="text-muted-foreground mt-4">
            We don't have a dedicated page for this city yet.
          </p>
          <Button asChild className="mt-6">
            <Link to="/listings">Browse All Operators</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Towing Services", url: "/listings" },
    { name: data.name, url: `/towing/${data.slug}` },
  ];

  const cityBusinessLd = {
    ...localBusinessJsonLd,
    name: `Towman Ghana — ${data.name}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: data.name,
      addressRegion: data.region,
      addressCountry: "GH",
    },
    geo: { "@type": "GeoCoordinates", latitude: data.lat, longitude: data.lng },
  };

  return (
    <div className="min-h-screen">
      <SEO
        title={data.metaTitle}
        description={data.metaDescription}
        canonical={`/towing/${data.slug}`}
        jsonLd={[cityBusinessLd, serviceJsonLd(data.name), breadcrumbJsonLd(breadcrumbs)]}
      />
      <Navbar />

      {/* Hero */}
      <section className="bg-primary pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-primary-foreground/50">
              {breadcrumbs.map((b, i) => (
                <li key={b.url} className="flex items-center gap-2">
                  {i > 0 && <span>/</span>}
                  {i < breadcrumbs.length - 1 ? (
                    <Link to={b.url} className="hover:text-primary-foreground transition-colors">
                      {b.name}
                    </Link>
                  ) : (
                    <span className="text-primary-foreground">{b.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-primary-foreground leading-tight">
            {data.heroHeading}
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/70 max-w-2xl leading-relaxed">
            {data.heroSubheading}
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Button variant="hero" size="lg" asChild>
              <Link to="/request-tow">Request a Tow in {data.name}</Link>
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to={`/listings?q=${encodeURIComponent(data.name)}`}>
                View {data.name} Operators
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Clock, label: "24/7 Availability", desc: `Round-the-clock towing in ${data.name}` },
              { icon: Shield, label: "Verified Operators", desc: "Licensed, insured & background-checked" },
              { icon: Truck, label: "All Vehicle Types", desc: "Flatbed, wheel-lift & heavy-duty trucks" },
              { icon: MapPin, label: data.region + " Coverage", desc: `Serving ${data.name} and surrounding areas` },
              { icon: Star, label: "Rated & Reviewed", desc: "Real reviews from real customers" },
              { icon: Phone, label: "Instant Contact", desc: "Call or request online in minutes" },
            ].map((f) => (
              <div key={f.label} className="p-6 bg-card rounded-xl border border-border">
                <f.icon className="w-8 h-8 text-secondary mb-3" />
                <h3 className="font-semibold text-foreground">{f.label}</h3>
                <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* SEO Content */}
          <article className="prose prose-sm max-w-none">
            <h2 className="text-2xl font-bold font-display text-foreground">
              About Towing Services in {data.name}
            </h2>
            <p className="text-muted-foreground leading-relaxed mt-4">
              {data.description}
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Whether you need emergency roadside assistance after a breakdown, accident recovery, 
              or scheduled vehicle transport, Towman Ghana connects you with the most reliable tow 
              truck operators in {data.name} and the wider {data.region} Region. All operators on 
              our platform are verified with valid licenses, insurance documentation, and positive 
              customer ratings.
            </p>
            <h3 className="text-xl font-semibold text-foreground mt-8">
              Types of Towing Services Available in {data.name}
            </h3>
            <ul className="text-muted-foreground space-y-2 mt-4 list-disc list-inside">
              <li><strong>Emergency Towing</strong> — 24/7 rapid response for breakdowns and accidents</li>
              <li><strong>Flatbed Towing</strong> — Safe transport for luxury and damaged vehicles</li>
              <li><strong>Heavy-Duty Towing</strong> — Commercial trucks, buses, and oversize loads</li>
              <li><strong>Roadside Assistance</strong> — Jump-starts, tyre changes, and fuel delivery</li>
              <li><strong>Vehicle Recovery</strong> — Off-road, ditch, and rollover recoveries</li>
            </ul>
          </article>
        </div>
      </section>

      {/* Other Cities */}
      <section className="py-12 px-6 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-xl font-bold font-display text-foreground mb-6">
            Towing Services in Other Cities
          </h2>
          <div className="flex flex-wrap gap-3">
            {cities
              .filter((c) => c.slug !== data.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  to={`/towing/${c.slug}`}
                  className="px-4 py-2 bg-card border border-border rounded-lg text-sm text-foreground hover:border-secondary transition-colors"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
      <StickyTowButton />
      <IdleTowPrompt page={`city-${data.slug}`} />
    </div>
  );
};

export default CityLanding;