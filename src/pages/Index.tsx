import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SEO, { localBusinessJsonLd, organizationJsonLd, serviceJsonLd } from "@/components/SEO";
import HowItWorks from "@/components/HowItWorks";
import ServiceCategories from "@/components/ServiceCategories";
import FeaturedOperators from "@/components/FeaturedOperators";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import StickyTowButton from "@/components/StickyTowButton";
import IdleTowPrompt from "@/components/IdleTowPrompt";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Towman Ghana — Find Tow Trucks Anywhere in Ghana"
        description="Ghana's #1 tow truck directory. Find verified tow operators across all 16 regions for breakdowns, recoveries, and heavy haulage. 24/7 availability."
        canonical="/"
        jsonLd={[localBusinessJsonLd, organizationJsonLd, serviceJsonLd()]}
      />
      <Navbar />
      <Hero />
      <ServiceCategories />
      <FeaturedOperators />
      <HowItWorks />
      <CTASection />
      <Footer />
      <StickyTowButton />
      <IdleTowPrompt page="home" />
    </div>
  );
};

export default Index;
