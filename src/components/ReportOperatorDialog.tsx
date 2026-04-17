import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Flag } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Props {
  operatorId: number;
  operatorName: string;
}

const REASONS = [
  "Unsafe vehicle handling",
  "Overcharging / hidden fees",
  "Unprofessional or abusive conduct",
  "No valid licence or insurance",
  "Fraud or scam",
  "Other",
];

const ReportOperatorDialog = ({ operatorId, operatorName }: Props) => {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [contact, setContact] = useState("");

  const submit = () => {
    if (!reason) {
      toast({ title: "Select a reason", variant: "destructive" });
      return;
    }
    if (details.trim().length < 10) {
      toast({ title: "Please add more detail", description: "Minimum 10 characters.", variant: "destructive" });
      return;
    }
    if (details.length > 1000) {
      toast({ title: "Description too long", description: "Maximum 1000 characters.", variant: "destructive" });
      return;
    }

    const reports = JSON.parse(localStorage.getItem("towman_reports") || "[]");
    reports.push({
      id: `rpt-${Date.now()}`,
      operatorId,
      operatorName,
      reason,
      details: details.trim(),
      contact: contact.trim(),
      status: "pending",
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("towman_reports", JSON.stringify(reports));

    toast({
      title: "Report submitted",
      description: "Our compliance team will review within 48 hours.",
    });
    setOpen(false);
    setReason("");
    setDetails("");
    setContact("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
          <Flag className="w-4 h-4 mr-2" />
          Report this operator
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Report a violation</DialogTitle>
          <DialogDescription>
            Reporting <strong>{operatorName}</strong>. False reports may lead to your account being restricted.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Reason <span className="text-destructive">*</span></Label>
            <RadioGroup value={reason} onValueChange={setReason}>
              {REASONS.map((r) => (
                <div key={r} className="flex items-center space-x-2">
                  <RadioGroupItem value={r} id={r} />
                  <Label htmlFor={r} className="font-normal cursor-pointer">{r}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">What happened? <span className="text-destructive">*</span></Label>
            <Textarea
              id="details"
              rows={4}
              maxLength={1000}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Date, location, and what occurred…"
            />
            <p className="text-xs text-muted-foreground">{details.length}/1000</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Your contact <span className="text-muted-foreground text-xs">(optional)</span></Label>
            <Input
              id="contact"
              maxLength={120}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Phone or email so we can follow up"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="destructive" onClick={submit}>Submit Report</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportOperatorDialog;
