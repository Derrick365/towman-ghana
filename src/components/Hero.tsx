import { useState } from "react";
import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-tow.jpg";

const Hero = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Tow truck on a Ghanaian road at golden hour"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-foreground/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-24">
        <div className="max-w-2xl space-y-8">
          <div className="animate-reveal-up" style={{ animationDelay: "0.1s" }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary text-sm font-medium tracking-wide">
              Ghana's #1 Towing Directory
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-[1.08] tracking-tight animate-reveal-up"
            style={{ animationDelay: "0.2s" }}
          >
            Find a tow truck{" "}
            <span className="text-gradient-gold">anywhere</span> in Ghana
          </h1>

          <p
            className="text-lg text-primary-foreground/70 max-w-lg leading-relaxed animate-reveal-up"
            style={{ animationDelay: "0.35s" }}
          >
            Connecting you with verified tow truck operators across all 16
            regions. Breakdowns, recoveries, or heavy haulage — help is never
            far away.
          </p>

          {/* Search bar */}
          <div
            className="flex flex-col sm:flex-row gap-3 animate-reveal-up"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Enter your location (e.g. Accra, Kumasi)"
                className="w-full h-12 pl-12 pr-4 rounded-lg bg-background/95 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
              />
            </div>
            <Button variant="hero" size="lg" className="h-12 px-6" asChild>
              <Link to="/listings">
                <Search className="w-4 h-4 mr-2" />
                Find Tow Trucks
              </Link>
            </Button>
          </div>

          <div
            className="flex items-center gap-6 text-primary-foreground/50 text-sm animate-reveal-up"
            style={{ animationDelay: "0.65s" }}
          >
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              200+ operators
            </span>
            <span>16 regions covered</span>
            <span>24/7 available</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
