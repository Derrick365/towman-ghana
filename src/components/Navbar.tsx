import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-display font-bold text-primary-foreground">
          Towman<span className="text-secondary">Ghana</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/listings" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
            Find Operators
          </Link>
          <Link to="/listings" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
            Services
          </Link>
          <a href="#how-it-works" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
            About
          </a>
          <Button variant="hero" size="sm" asChild>
            <Link to="/listings">Register</Link>
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
          <a href="#how-it-works" className="block text-sm text-primary-foreground/80 py-2" onClick={() => setOpen(false)}>About</a>
          <Button variant="hero" size="sm" className="w-full" asChild>
            <Link to="/listings" onClick={() => setOpen(false)}>Register</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
