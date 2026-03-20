import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Truck, Container, Wrench, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    icon: Truck,
    label: "Flatbed Towing",
    count: 84,
    description: "Safe transport for all vehicle types",
  },
  {
    icon: Container,
    label: "Heavy Haulage",
    count: 37,
    description: "Containers, machinery & oversized loads",
  },
  {
    icon: Wrench,
    label: "Roadside Recovery",
    count: 62,
    description: "Breakdowns, accidents & stuck vehicles",
  },
  {
    icon: Shield,
    label: "Accident Towing",
    count: 55,
    description: "Insured & certified crash recovery",
  },
];

const ServiceCategories = () => {
  const { ref, isVisible } = useScrollReveal();
  const navigate = useNavigate();

  return (
    <section ref={ref} className="py-24 px-6 bg-muted/50">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16 space-y-4">
          <h2
            className={`text-3xl sm:text-4xl font-bold font-display text-foreground ${
              isVisible ? "animate-reveal-up" : "opacity-0"
            }`}
          >
            Browse by Service
          </h2>
          <p
            className={`text-muted-foreground max-w-md mx-auto ${
              isVisible ? "animate-reveal-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            Find the right tow operator for your specific needs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <button
              key={service.label}
              className={`group text-left p-6 rounded-xl bg-background border border-border hover:border-secondary/50 hover:shadow-md transition-all duration-300 active:scale-[0.97] ${
                isVisible ? "animate-reveal-scale" : "opacity-0"
              }`}
              style={{ animationDelay: `${0.15 + i * 0.08}s` }}
            >
              <div className="w-11 h-11 rounded-lg bg-gold-light flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                <service.icon className="w-5 h-5 text-earth" />
              </div>
              <h3 className="font-semibold font-display text-foreground mb-1">
                {service.label}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {service.description}
              </p>
              <span className="text-xs font-medium text-secondary tabular-nums">
                {service.count} operators
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
