import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground/70 pt-16 pb-8 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <h3 className="text-lg font-display font-bold text-primary-foreground">
              Towman Ghana
            </h3>
            <p className="text-sm leading-relaxed">
              Ghana's centralized platform for tow truck operators and those who
              need them.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-primary-foreground uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/listings" className="hover:text-secondary transition-colors">Find a Tow Truck</Link></li>
              <li><Link to="/register" className="hover:text-secondary transition-colors">Register as Operator</Link></li>
              <li><Link to="/request-tow" className="hover:text-secondary transition-colors">Request a Tow</Link></li>
              <li><Link to="/about" className="hover:text-secondary transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-primary-foreground uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/faq" className="hover:text-secondary transition-colors">FAQ</Link></li>
              <li><Link to="/blog" className="hover:text-secondary transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-secondary transition-colors">Contact Us</Link></li>
              <li><Link to="/terms" className="hover:text-secondary transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-secondary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/legal-compliance" className="hover:text-secondary transition-colors">Legal Compliance</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-primary-foreground uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 shrink-0" /> Accra, Ghana
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" /> +233 24 120 4040
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" /> hello@towmanghana.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 text-center text-xs">
          © {new Date().getFullYear()} Towman Ghana. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
