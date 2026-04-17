import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, CheckCircle, Truck } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

const ghanaRegions = [
  "Greater Accra",
  "Ashanti",
  "Central",
  "Western",
  "Eastern",
  "Northern",
  "Volta",
  "Upper East",
  "Upper West",
  "Bono",
  "Bono East",
  "Ahafo",
  "Western North",
  "Oti",
  "Savannah",
  "North East",
];

const Register = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [acceptedCompliance, setAcceptedCompliance] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    region: "",
    city: "",
    about: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.fullName.trim() || !form.phone.trim() || !form.region || !form.city.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!acceptedCompliance) {
      toast({
        title: "Compliance acceptance required",
        description: "You must agree to the terms and compliance policies.",
        variant: "destructive",
      });
      return;
    }

    // Store mock operator in sessionStorage for prototype
    const operatorId = `op-${Date.now()}`;
    const operator = { ...form, id: operatorId, vehicles: [] };
    sessionStorage.setItem("towman_operator", JSON.stringify(operator));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6 animate-reveal-up">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Registration Successful!
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Welcome to Towman Ghana, <strong>{form.fullName}</strong>. You can now add your vehicles and start receiving requests.
          </p>
          <div className="flex flex-col gap-3 pt-2">
            <Button variant="hero" size="lg" onClick={() => navigate("/dashboard")} className="w-full">
              <Truck className="w-4 h-4 mr-2" />
              Upload Your Vehicle
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/dashboard")} className="w-full">
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto max-w-lg px-6 py-8">
        <h1 className="text-2xl font-display font-bold text-foreground mb-1">Operator Registration</h1>
        <p className="text-sm text-muted-foreground mb-6">100% Free — No charges</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="fullName"
              placeholder="e.g. Kwame Asante"
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="e.g. 024 123 4567"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-muted-foreground text-xs">(optional)</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="e.g. kwame@email.com"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>

          {/* Region */}
          <div className="space-y-2">
            <Label>
              Region <span className="text-destructive">*</span>
            </Label>
            <Select value={form.region} onValueChange={(v) => update("region", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your region" />
              </SelectTrigger>
              <SelectContent>
                {ghanaRegions.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* City / Town */}
          <div className="space-y-2">
            <Label htmlFor="city">
              City / Town <span className="text-destructive">*</span>
            </Label>
            <Input
              id="city"
              placeholder="e.g. Tema, East Legon"
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
            />
          </div>

          {/* About */}
          <div className="space-y-2">
            <Label htmlFor="about">
              Short Bio <span className="text-muted-foreground text-xs">(optional)</span>
            </Label>
            <Textarea
              id="about"
              placeholder="Tell customers a bit about your services…"
              rows={3}
              value={form.about}
              onChange={(e) => update("about", e.target.value)}
            />
          </div>

          {/* Compliance acceptance */}
          <div className="flex items-start gap-3 p-4 rounded-lg border border-border bg-muted/30">
            <Checkbox
              id="compliance"
              checked={acceptedCompliance}
              onCheckedChange={(c) => setAcceptedCompliance(c === true)}
              className="mt-0.5"
            />
            <Label htmlFor="compliance" className="text-sm font-normal leading-relaxed cursor-pointer">
              I confirm I hold a valid DVLA licence, roadworthy certificate, and insurance,
              and I agree to Towman Ghana&apos;s{" "}
              <Link to="/terms" className="text-secondary underline">Terms</Link>,{" "}
              <Link to="/privacy" className="text-secondary underline">Privacy Policy</Link>, and{" "}
              <Link to="/legal-compliance" className="text-secondary underline">Legal Compliance</Link>{" "}
              requirements. <span className="text-destructive">*</span>
            </Label>
          </div>

          <Button type="submit" variant="hero" size="lg" className="w-full mt-4">
            Register for Free
          </Button>

          <p className="text-xs text-center text-muted-foreground pt-2">
            No fees, ever. Operators must comply with Ghana Road Traffic Act (Act 683).
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
