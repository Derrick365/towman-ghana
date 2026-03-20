import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { UserPlus, Truck, PhoneCall } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Register Your Service",
    description:
      "Create your operator account, upload your fleet details, and set your service area across Ghana.",
  },
  {
    icon: Truck,
    title: "List Your Vehicles",
    description:
      "Add your tow trucks, flatbeds, and carriers with photos, capacity specs, and pricing.",
  },
  {
    icon: PhoneCall,
    title: "Get Called",
    description:
      "Customers in need find you by location and service type. Accept jobs and grow your business.",
  },
];

const HowItWorks = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="how-it-works" ref={ref} className="py-16 md:py-24 px-6 bg-background">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-8 md:mb-16 space-y-3">
          <h2
            className={`text-2xl sm:text-4xl font-bold font-display text-foreground ${
              isVisible ? "animate-reveal-up" : "opacity-0"
            }`}
          >
            How It Works
          </h2>
          <p
            className={`text-muted-foreground text-sm max-w-md mx-auto ${
              isVisible ? "animate-reveal-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            Whether you're a tow operator or someone in need, we keep it simple.
          </p>
        </div>

        {/* Mobile: compact horizontal rows */}
        <div className="flex flex-col gap-3 md:hidden">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`flex items-center gap-4 p-4 rounded-xl bg-card border border-border ${
                isVisible ? "animate-reveal-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${0.15 + i * 0.1}s` }}
            >
              <div className="w-10 h-10 rounded-lg bg-forest-light flex items-center justify-center shrink-0">
                <step.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold font-display text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-snug mt-0.5">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: original card grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`relative p-8 rounded-xl bg-card border border-border hover:shadow-lg hover:shadow-gold/5 transition-shadow duration-300 group ${
                isVisible ? "animate-reveal-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${0.15 + i * 0.1}s` }}
            >
              <span className="absolute top-6 right-6 text-5xl font-display font-bold text-border">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="w-12 h-12 rounded-lg bg-forest-light flex items-center justify-center mb-5 group-hover:bg-gold-light transition-colors duration-300">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold font-display text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
