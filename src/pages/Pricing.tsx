import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const tiers = [
  {
    name: "Free",
    price: "GH₵ 0",
    period: "/month",
    description: "Get started and list your tow truck for free",
    icon: Zap,
    features: [
      "1 vehicle listing",
      "Basic profile page",
      "Receive tow requests",
      "Customer reviews",
      "Standard search placement",
    ],
    excluded: [
      "Priority listing placement",
      "Featured badge",
      "Analytics dashboard",
      "Dedicated phone support",
    ],
    cta: "Current Plan",
    popular: false,
    color: "border-border",
  },
  {
    name: "Pro",
    price: "GH₵ 99",
    period: "/month",
    description: "Grow your business with better visibility",
    icon: Star,
    features: [
      "Up to 5 vehicle listings",
      "Enhanced profile with gallery",
      "Priority in search results",
      "Basic analytics dashboard",
      "Customer reviews",
      "Email support",
    ],
    excluded: [
      "Featured gold badge",
      "Dedicated phone support",
    ],
    cta: "Upgrade to Pro",
    popular: true,
    color: "border-secondary",
  },
  {
    name: "Premium",
    price: "GH₵ 249",
    period: "/month",
    description: "Maximum exposure and premium features",
    icon: Crown,
    features: [
      "Unlimited vehicle listings",
      "Featured gold badge on profile",
      "Pinned to top of listings",
      "Highlighted card in search",
      "Advanced analytics & reports",
      "Priority customer matching",
      "Dedicated phone support",
      "Custom profile branding",
    ],
    excluded: [],
    cta: "Go Premium",
    popular: false,
    color: "border-primary",
  },
];

const Pricing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSelect = (tierName: string) => {
    if (tierName === "Free") return;
    toast({
      title: `${tierName} plan selected`,
      description: "Stripe payment integration coming soon. You'll be redirected to checkout.",
    });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />

      <div className="bg-primary pt-20 sm:pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge className="bg-secondary/20 text-secondary border-secondary/30 mb-4 animate-reveal-up">
            Pricing Plans
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-primary-foreground mb-4 animate-reveal-up" style={{ animationDelay: "0.05s" }}>
            Choose your plan
          </h1>
          <p className="text-primary-foreground/60 max-w-xl mx-auto text-lg animate-reveal-up" style={{ animationDelay: "0.1s" }}>
            Get more visibility, attract more customers, and grow your towing business across Ghana
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-6 -mt-8 pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <div
              key={tier.name}
              className={`relative bg-card rounded-2xl border-2 ${tier.color} p-6 flex flex-col animate-reveal-up ${
                tier.popular ? "shadow-xl shadow-secondary/10 ring-1 ring-secondary/20" : "shadow-sm"
              }`}
              style={{ animationDelay: `${0.15 + i * 0.08}s` }}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-secondary text-secondary-foreground font-semibold px-3 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <tier.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-display text-foreground">{tier.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{tier.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold font-display text-foreground">{tier.price}</span>
                <span className="text-muted-foreground text-sm">{tier.period}</span>
              </div>

              <div className="flex-1 space-y-3 mb-6">
                {tier.features.map((f) => (
                  <div key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground">{f}</span>
                  </div>
                ))}
                {tier.excluded.map((f) => (
                  <div key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className="w-4 h-4 text-muted-foreground/30 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground/50 line-through">{f}</span>
                  </div>
                ))}
              </div>

              <Button
                className="w-full"
                variant={tier.popular ? "default" : tier.name === "Premium" ? "hero" : "outline"}
                onClick={() => handleSelect(tier.name)}
                disabled={tier.name === "Free"}
              >
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground text-sm">
            All plans include a 14-day free trial. Cancel anytime. Need a custom plan?{" "}
            <button onClick={() => navigate("/contact")} className="text-primary underline underline-offset-2 hover:text-primary/80">
              Contact us
            </button>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;
