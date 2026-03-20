import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 px-6 bg-primary">
      <div className="container mx-auto max-w-3xl text-center space-y-8">
        <div
          className={`inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary text-sm font-semibold tracking-wide mb-4 ${
            isVisible ? "animate-reveal-up" : "opacity-0"
          }`}
        >
          ✦ 100% Free Registration
        </div>
        <h2
          className={`text-3xl sm:text-4xl font-bold font-display text-primary-foreground ${
            isVisible ? "animate-reveal-up" : "opacity-0"
          }`}
        >
          Own a tow truck?{" "}
          <span className="text-gradient-gold">Join Towman Ghana</span>
        </h2>
        <p
          className={`text-primary-foreground/70 max-w-lg mx-auto leading-relaxed ${
            isVisible ? "animate-reveal-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.1s" }}
        >
          Register your fleet for free, reach customers across the country, and grow your
          towing business with Ghana's largest tow truck directory.
        </p>
        <div
          className={`flex flex-col sm:flex-row gap-3 justify-center ${
            isVisible ? "animate-reveal-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.2s" }}
        >
          <Button variant="hero" size="lg">
            Register for Free
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
          <Button variant="heroOutline" size="lg">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
