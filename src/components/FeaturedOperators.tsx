import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const operators = [
  {
    name: "Kwame's Tow Services",
    location: "Accra, Greater Accra",
    rating: 4.8,
    reviews: 124,
    services: ["Flatbed", "Recovery"],
    available: true,
    initials: "KT",
  },
  {
    name: "Ashanti Heavy Haul",
    location: "Kumasi, Ashanti Region",
    rating: 4.6,
    reviews: 89,
    services: ["Heavy Haulage", "Flatbed"],
    available: true,
    initials: "AH",
  },
  {
    name: "Cape Coast Rescue",
    location: "Cape Coast, Central Region",
    rating: 4.9,
    reviews: 67,
    services: ["Accident Towing", "Recovery"],
    available: false,
    initials: "CR",
  },
];

const FeaturedOperators = () => {
  const { ref, isVisible } = useScrollReveal();
  const navigate = useNavigate();

  return (
    <section ref={ref} className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div className="space-y-3">
            <h2
              className={`text-3xl sm:text-4xl font-bold font-display text-foreground ${
                isVisible ? "animate-reveal-left" : "opacity-0"
              }`}
            >
              Featured Operators
            </h2>
            <p
              className={`text-muted-foreground ${
                isVisible ? "animate-reveal-left" : "opacity-0"
              }`}
              style={{ animationDelay: "0.1s" }}
            >
              Top-rated tow truck professionals across Ghana.
            </p>
          </div>
          <Button
            variant="outline"
            className={`self-start sm:self-auto ${
              isVisible ? "animate-reveal-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.15s" }}
            asChild
          >
            <Link to="/listings">View All Operators</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {operators.map((op, i) => (
            <div
              key={op.name}
              className={`rounded-xl border border-border bg-card p-6 hover:shadow-lg hover:shadow-gold/5 transition-shadow duration-300 group ${
                isVisible ? "animate-reveal-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${0.15 + i * 0.1}s` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-sm shrink-0">
                  {op.initials}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold font-display text-foreground truncate">
                    {op.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{op.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-secondary text-secondary" />
                  <span className="text-sm font-medium tabular-nums">
                    {op.rating}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({op.reviews} reviews)
                </span>
                <span
                  className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full ${
                    op.available
                      ? "bg-green-100 text-green-700"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {op.available ? "Available" : "Busy"}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {op.services.map((s) => (
                  <span
                    key={s}
                    className="text-xs px-2.5 py-1 rounded-md bg-forest-light text-primary font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <Button variant="outline" className="w-full" size="sm" onClick={() => navigate(`/operator/${i + 1}`)}>
                View Operator
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedOperators;
