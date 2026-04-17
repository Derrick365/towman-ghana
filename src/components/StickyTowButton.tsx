import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

const StickyTowButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling past ~80% of viewport height (past hero)
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      <Button
        asChild
        size="lg"
        className="shadow-lg shadow-primary/30 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:shadow-xl hover:shadow-secondary/40 active:scale-95 transition-all"
      >
        <Link to="/request-tow" aria-label="Request a tow">
          <Truck className="w-5 h-5 mr-2" />
          Request a Tow
        </Link>
      </Button>
    </div>
  );
};

export default StickyTowButton;
