import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 px-6 py-4 bg-primary">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-display font-bold text-primary-foreground">
          Towman<span className="text-secondary">Ghana</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/listings" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
            Find Operators
          </Link>
          <Link to="/request-tow" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
            Request a Tow
          </Link>
          <Link to="/about" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
            About
          </Link>
          <Link to="/faq" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
            FAQ
          </Link>
          <Link to="/login" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
            Log In
          </Link>
          <Button variant="hero" size="sm" asChild>
            <Link to="/register">Register Free</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-primary-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden mt-4 p-4 rounded-xl bg-foreground/90 backdrop-blur-sm space-y-3">
          <Link to="/listings" className="block text-sm text-primary-foreground/80 py-2" onClick={() => setOpen(false)}>Find Operators</Link>
          <Link to="/listings" className="block text-sm text-primary-foreground/80 py-2" onClick={() => setOpen(false)}>Services</Link>
          <a href="/#how-it-works" className="block text-sm text-primary-foreground/80 py-2" onClick={() => setOpen(false)}>About</a>
          <Link to="/login" className="block text-sm text-primary-foreground/80 py-2" onClick={() => setOpen(false)}>Log In</Link>
          <Button variant="hero" size="sm" className="w-full" asChild>
            <Link to="/register" onClick={() => setOpen(false)}>Register Free</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
