import { useState } from "react";
import { Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ReviewFormProps {
  operatorName: string;
  onSubmit: (review: { name: string; text: string; rating: number; date: string }) => void;
}

const ReviewForm = ({ operatorName, onSubmit }: ReviewFormProps) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim() || rating === 0) {
      toast({ title: "Please fill in all fields and select a rating", variant: "destructive" });
      return;
    }
    onSubmit({ name: name.trim(), text: text.trim(), rating, date: "Just now" });
    setSubmitted(true);
    toast({ title: "Review submitted!", description: `Thank you for reviewing ${operatorName}` });
  };

  if (submitted) {
    return (
      <div className="text-center py-6 space-y-2">
        <div className="flex justify-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-5 h-5 ${i < rating ? "fill-secondary text-secondary" : "text-muted-foreground/30"}`} />
          ))}
        </div>
        <p className="text-sm font-medium text-foreground">Thank you for your review!</p>
        <p className="text-xs text-muted-foreground">Your feedback helps other users find great operators.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Star Rating */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Your Rating *</label>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => {
            const starValue = i + 1;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHoveredStar(starValue)}
                onMouseLeave={() => setHoveredStar(0)}
                className="p-0.5 transition-transform hover:scale-110 active:scale-95"
              >
                <Star
                  className={`w-7 h-7 transition-colors ${
                    starValue <= (hoveredStar || rating)
                      ? "fill-secondary text-secondary"
                      : "text-muted-foreground/30 hover:text-secondary/50"
                  }`}
                />
              </button>
            );
          })}
          {rating > 0 && (
            <span className="text-sm text-muted-foreground ml-2">
              {rating === 1 && "Poor"}
              {rating === 2 && "Fair"}
              {rating === 3 && "Good"}
              {rating === 4 && "Very Good"}
              {rating === 5 && "Excellent"}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Your Name *</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Kwame Mensah"
          maxLength={100}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Your Review *</label>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Tell others about your experience with this operator..."
          rows={3}
          maxLength={500}
        />
        <p className="text-xs text-muted-foreground text-right">{text.length}/500</p>
      </div>

      <Button type="submit" className="w-full" disabled={!name.trim() || !text.trim() || rating === 0}>
        <Send className="w-4 h-4 mr-2" /> Submit Review
      </Button>
    </form>
  );
};

export default ReviewForm;
