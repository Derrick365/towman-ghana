import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "towman_cookie_consent";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const respond = (choice: "accepted" | "rejected") => {
    localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-6 animate-reveal-up">
      <div className="container mx-auto max-w-4xl rounded-xl border border-border bg-card shadow-2xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center shrink-0">
            <Cookie className="w-5 h-5 text-secondary" />
          </div>
          <div className="flex-1 space-y-2">
            <h3 className="font-display font-bold text-foreground">We value your privacy</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We use cookies to improve your experience, remember your preferences, and analyse traffic.
              See our{" "}
              <Link to="/privacy" className="text-secondary underline">Privacy Policy</Link>{" "}
              and{" "}
              <Link to="/legal-compliance" className="text-secondary underline">Legal Compliance</Link>{" "}
              page for details.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Button variant="hero" size="sm" onClick={() => respond("accepted")}>
                Accept All
              </Button>
              <Button variant="outline" size="sm" onClick={() => respond("rejected")}>
                Reject Non-Essential
              </Button>
            </div>
          </div>
          <button
            aria-label="Close"
            onClick={() => respond("rejected")}
            className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
