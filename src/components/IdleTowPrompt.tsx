import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Truck, Phone } from "lucide-react";

const DEFAULT_IDLE_DELAY_MS = 40_000; // 40s — sits between 30 and 50s
const DEFAULT_SESSION_KEY = "towman_idle_prompt_shown";

interface IdleTowPromptProps {
  /** Idle delay in milliseconds before the prompt appears. Defaults to 40000 (40s). */
  delayMs?: number;
  /** sessionStorage key used to suppress repeat displays. Override to allow per-page prompts. */
  sessionKey?: string;
  /** Custom title text. */
  title?: string;
  /** Custom description text. */
  description?: string;
}

const IdleTowPrompt = ({
  delayMs = DEFAULT_IDLE_DELAY_MS,
  sessionKey = DEFAULT_SESSION_KEY,
  title = "Need a hand on the road?",
  description = "Looks like you're searching for help. Our verified operators across Ghana are ready to assist — request a tow in under a minute.",
}: IdleTowPromptProps = {}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const resetTimer = useCallback((timerRef: { current: number | null }) => {
    if (sessionStorage.getItem(sessionKey)) return;
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setOpen(true), delayMs);
  }, [delayMs, sessionKey]);

  useEffect(() => {
    if (sessionStorage.getItem(sessionKey)) return;

    const timerRef: { current: number | null } = { current: null };
    const handleActivity = () => resetTimer(timerRef);

    const events: (keyof WindowEventMap)[] = ["mousemove", "keydown", "scroll", "click", "touchstart"];
    events.forEach((e) => window.addEventListener(e, handleActivity, { passive: true }));
    resetTimer(timerRef);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      events.forEach((e) => window.removeEventListener(e, handleActivity));
    };
  }, [resetTimer, sessionKey]);

  const handleClose = (next: boolean) => {
    if (!next) sessionStorage.setItem(sessionKey, "1");
    setOpen(next);
  };

  const handleRequestTow = () => {
    sessionStorage.setItem(sessionKey, "1");
    setOpen(false);
    navigate("/request-tow");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-sm p-0 overflow-hidden border-border">
        {/* Accent header */}
        <div className="bg-primary px-6 pt-6 pb-5 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-secondary/20 flex items-center justify-center ring-4 ring-primary-foreground/10">
            <Truck className="w-7 h-7 text-secondary" />
          </div>
        </div>

        <div className="px-6 pt-5 pb-6 text-center space-y-3">
          <DialogTitle className="text-xl font-display font-bold text-foreground">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </DialogDescription>

          <div className="flex flex-col gap-2 pt-3">
            <Button onClick={handleRequestTow} className="w-full" size="lg">
              <Truck className="w-4 h-4" /> Request a Tow
            </Button>
            <a
              href="tel:+233241204040"
              className="w-full inline-flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-2"
            >
              <Phone className="w-3.5 h-3.5" /> Or call +233 24 120 4040
            </a>
          </div>

          <button
            onClick={() => handleClose(false)}
            className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors pt-1"
          >
            No thanks, I'm just browsing
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IdleTowPrompt;
