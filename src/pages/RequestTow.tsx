import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Truck, AlertTriangle, CheckCircle2, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const operators = [
  { id: 1, name: "Kwame's Tow Services", location: "Accra", type: "Flatbed", price: "GH₵ 350/trip", available: true },
  { id: 2, name: "Ashanti Heavy Haul", location: "Kumasi", type: "Heavy Duty", price: "GH₵ 800/trip", available: true },
  { id: 4, name: "Volta Towing Co.", location: "Ho", type: "Flatbed", price: "GH₵ 400/trip", available: true },
  { id: 5, name: "Tema Port Haulers", location: "Tema", type: "Carrier", price: "GH₵ 600/trip", available: true },
  { id: 6, name: "Northern Star Recovery", location: "Tamale", type: "Rollback", price: "GH₵ 450/trip", available: true },
  { id: 8, name: "Koforidua Quick Tow", location: "Koforidua", type: "Wheel-Lift", price: "GH₵ 250/trip", available: true },
  { id: 9, name: "Sunyani Express Tow", location: "Sunyani", type: "Flatbed", price: "GH₵ 320/trip", available: true },
  { id: 10, name: "Obuasi Road Rescue", location: "Obuasi", type: "Rollback", price: "GH₵ 380/trip", available: true },
  { id: 12, name: "Bolga Breakdown Aid", location: "Bolgatanga", type: "Flatbed", price: "GH₵ 300/trip", available: true },
];

const issueTypes = ["Flat Tire / Cannot Move", "Engine Failure", "Accident / Collision", "Stuck in Ditch", "Battery Dead", "Overheating", "Other"];

const RequestTow = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const preselectedOp = searchParams.get("operator");

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    operatorId: preselectedOp || "",
    issueType: "",
    description: "",
    pickupLocation: "",
    dropoffLocation: "",
    name: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const selectedOp = operators.find((o) => o.id.toString() === form.operatorId);

  const canProceedStep1 = form.operatorId && form.issueType;
  const canProceedStep2 = form.pickupLocation && form.name && form.phone;

  const handleSubmit = () => {
    if (!canProceedStep2) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-32 px-6">
          <div className="text-center space-y-4 max-w-md">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold font-display text-foreground">Request Submitted!</h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your tow request has been sent to <strong className="text-foreground">{selectedOp?.name}</strong>.
              They will contact you shortly at <strong className="text-foreground">{form.phone}</strong>.
            </p>
            <div className="bg-card rounded-xl border border-border p-4 text-left text-sm space-y-2">
              <div className="flex justify-between"><span className="text-muted-foreground">Issue</span><span className="font-medium text-foreground">{form.issueType}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Pickup</span><span className="font-medium text-foreground">{form.pickupLocation}</span></div>
              {form.dropoffLocation && <div className="flex justify-between"><span className="text-muted-foreground">Drop-off</span><span className="font-medium text-foreground">{form.dropoffLocation}</span></div>}
              <div className="flex justify-between"><span className="text-muted-foreground">Est. Price</span><span className="font-semibold text-secondary">{selectedOp?.price}</span></div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => navigate("/listings")}>Browse Operators</Button>
              <Button className="flex-1" onClick={() => navigate("/")}>Back to Home</Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="bg-primary pt-20 pb-12 px-6">
        <div className="container mx-auto max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-primary-foreground animate-reveal-up">
            Request a Tow
          </h1>
          <p className="text-primary-foreground/60 mt-2 animate-reveal-up" style={{ animationDelay: "0.1s" }}>
            Tell us what happened and we'll connect you with help
          </p>
          {/* Steps */}
          <div className="flex gap-2 mt-6">
            {[1, 2].map((s) => (
              <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${step >= s ? "bg-secondary" : "bg-primary-foreground/20"}`} />
            ))}
          </div>
        </div>
      </div>

      <section className="py-12 px-6">
        <div className="container mx-auto max-w-2xl">
          {step === 1 && (
            <div className="space-y-6 animate-reveal-up">
              <h2 className="text-lg font-semibold font-display text-foreground flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary" /> Select Operator & Issue
              </h2>

              {/* Operator select */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Choose an Operator *</label>
                <div className="relative">
                  <select
                    value={form.operatorId}
                    onChange={(e) => setForm({ ...form, operatorId: e.target.value })}
                    className="w-full h-11 pl-4 pr-9 rounded-lg border border-input bg-background text-foreground text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select an operator...</option>
                    {operators.map((o) => (
                      <option key={o.id} value={o.id}>{o.name} — {o.location} ({o.type}) — {o.price}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Issue type */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">What happened? *</label>
                <div className="grid grid-cols-2 gap-2">
                  {issueTypes.map((issue) => (
                    <button
                      key={issue}
                      onClick={() => setForm({ ...form, issueType: issue })}
                      className={`text-left text-sm px-4 py-3 rounded-lg border transition-colors ${
                        form.issueType === issue
                          ? "border-primary bg-primary/5 text-foreground font-medium"
                          : "border-border bg-card text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      {issue}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Additional Details</label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Any other details the operator should know..."
                  rows={3}
                />
              </div>

              <Button onClick={() => setStep(2)} disabled={!canProceedStep1} className="w-full">
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-reveal-up">
              <h2 className="text-lg font-semibold font-display text-foreground flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" /> Location & Contact
              </h2>

              {/* Selected operator summary */}
              {selectedOp && (
                <div className="bg-card rounded-xl border border-border p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{selectedOp.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedOp.type} • {selectedOp.location}</p>
                  </div>
                  <span className="text-sm font-semibold text-secondary">{selectedOp.price}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Pickup Location *</label>
                <Input
                  value={form.pickupLocation}
                  onChange={(e) => setForm({ ...form, pickupLocation: e.target.value })}
                  placeholder="e.g. Accra Mall parking lot, East Legon"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Drop-off Location (optional)</label>
                <Input
                  value={form.dropoffLocation}
                  onChange={(e) => setForm({ ...form, dropoffLocation: e.target.value })}
                  placeholder="Where should the vehicle be towed to?"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Your Name *</label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Phone Number *</label>
                  <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+233 XX XXX XXXX" />
                </div>
              </div>

              <div className="bg-secondary/10 rounded-lg p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  By submitting this request, the operator will receive your contact details and location.
                  They will call you to confirm the service and provide an estimated arrival time.
                </p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
                <Button onClick={handleSubmit} disabled={!canProceedStep2} className="flex-1">Submit Request</Button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RequestTow;
