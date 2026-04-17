import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import ServiceCategories from "@/components/ServiceCategories";
import FeaturedOperators from "@/components/FeaturedOperators";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import StickyTowButton from "@/components/StickyTowButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ServiceCategories />
      <FeaturedOperators />
      <HowItWorks />
      <CTASection />
      <Footer />
      <StickyTowButton />
    </div>
  );
};

export default Index;
