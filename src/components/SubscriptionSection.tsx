import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Star, Zap, ArrowUpRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const plans = [
  { name: "Free", icon: Zap, color: "text-muted-foreground" },
  { name: "Pro", icon: Star, color: "text-secondary" },
  { name: "Premium", icon: Crown, color: "text-primary" },
];

interface SubscriptionSectionProps {
  currentPlan?: string;
}

const SubscriptionSection = ({ currentPlan = "Free" }: SubscriptionSectionProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const plan = plans.find((p) => p.name === currentPlan) || plans[0];

  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold font-display text-foreground flex items-center gap-2">
        <plan.icon className={`w-5 h-5 ${plan.color}`} /> Your Plan
      </h2>
      <div className="bg-card rounded-xl border border-border p-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <plan.icon className={`w-5 h-5 ${plan.color}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">{plan.name} Plan</span>
                <Badge variant={currentPlan === "Premium" ? "default" : "secondary"} className="text-[10px]">
                  Active
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {currentPlan === "Free" && "Upgrade for better visibility and more features"}
                {currentPlan === "Pro" && "Enhanced visibility and up to 5 vehicles"}
                {currentPlan === "Premium" && "Featured badge, top placement, unlimited vehicles"}
              </p>
            </div>
          </div>
          {currentPlan !== "Premium" && (
            <Button size="sm" onClick={() => navigate("/pricing")} className="gap-1.5">
              Upgrade <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionSection;
