import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

const Login = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone.trim()) {
      toast({
        title: "Phone required",
        description: "Please enter your registered phone number.",
        variant: "destructive",
      });
      return;
    }

    // Prototype: check sessionStorage for matching operator
    const data = sessionStorage.getItem("towman_operator");
    if (data) {
      const operator = JSON.parse(data);
      if (operator.phone === phone.trim()) {
        toast({ title: "Welcome back!", description: `Logged in as ${operator.fullName}.` });
        navigate("/dashboard");
        return;
      }
    }

    toast({
      title: "Account not found",
      description: "No operator found with that phone number. Please register first.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto max-w-sm px-6 py-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-muted-foreground">
            Log in with your registered phone number
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="e.g. 024 123 4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <Button type="submit" variant="hero" size="lg" className="w-full">
            Log In
          </Button>
        </form>

        <p className="text-sm text-center text-muted-foreground mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary font-medium hover:underline">
            Register for free
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
