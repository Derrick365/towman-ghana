import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const vehicleTypes = [
  "Flatbed",
  "Wheel-Lift",
  "Hook & Chain",
  "Integrated",
  "Boom Truck",
  "Rollback",
];

const capacityOptions = [
  "Light Duty (up to 7,000 lbs)",
  "Medium Duty (7,000–17,000 lbs)",
  "Heavy Duty (17,000–35,000 lbs)",
  "Super Heavy Duty (35,000+ lbs)",
];

const AddVehicle = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    type: "",
    make: "",
    model: "",
    year: "",
    plate: "",
    capacity: "",
  });
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    const data = sessionStorage.getItem("towman_operator");
    if (!data) {
      navigate("/register");
    }
  }, [navigate]);

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (photos.length + files.length > 10) {
      toast({ title: "Too many photos", description: "Maximum 10 photos per vehicle.", variant: "destructive" });
      return;
    }

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotos((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.type || !form.make.trim() || !form.model.trim() || !form.year.trim() || !form.plate.trim() || !form.capacity) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    if (photos.length === 0) {
      toast({ title: "Photos required", description: "Please upload at least one photo of your vehicle.", variant: "destructive" });
      return;
    }

    const data = sessionStorage.getItem("towman_operator");
    if (!data) return;

    const operator = JSON.parse(data);
    const vehicle = { ...form, id: `v-${Date.now()}`, photos };
    operator.vehicles = [...(operator.vehicles || []), vehicle];
    sessionStorage.setItem("towman_operator", JSON.stringify(operator));

    toast({ title: "Vehicle added!", description: `${form.year} ${form.make} ${form.model} has been added to your profile.` });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary px-6 py-4">
        <div className="container mx-auto flex items-center gap-4">
          <Link to="/dashboard" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-lg font-display font-bold text-primary-foreground">Add Vehicle</h1>
            <p className="text-xs text-primary-foreground/60">Provide details about your tow truck</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-lg px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Vehicle Type */}
          <div className="space-y-2">
            <Label>Vehicle Type <span className="text-destructive">*</span></Label>
            <Select value={form.type} onValueChange={(v) => update("type", v)}>
              <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
              <SelectContent>
                {vehicleTypes.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Make & Model */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="make">Make <span className="text-destructive">*</span></Label>
              <Input id="make" placeholder="e.g. Isuzu" value={form.make} onChange={(e) => update("make", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Model <span className="text-destructive">*</span></Label>
              <Input id="model" placeholder="e.g. NPR" value={form.model} onChange={(e) => update("model", e.target.value)} />
            </div>
          </div>

          {/* Year & Plate */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="year">Year <span className="text-destructive">*</span></Label>
              <Input id="year" placeholder="e.g. 2019" value={form.year} onChange={(e) => update("year", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plate">Plate Number <span className="text-destructive">*</span></Label>
              <Input id="plate" placeholder="e.g. GR-1234-22" value={form.plate} onChange={(e) => update("plate", e.target.value)} />
            </div>
          </div>

          {/* Capacity */}
          <div className="space-y-2">
            <Label>Towing Capacity <span className="text-destructive">*</span></Label>
            <Select value={form.capacity} onValueChange={(v) => update("capacity", v)}>
              <SelectTrigger><SelectValue placeholder="Select capacity" /></SelectTrigger>
              <SelectContent>
                {capacityOptions.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Photos */}
          <div className="space-y-2">
            <Label>
              Vehicle Photos <span className="text-destructive">*</span>
              <span className="text-muted-foreground text-xs ml-1">(up to 10)</span>
            </Label>

            {photos.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mb-2">
                {photos.map((src, i) => (
                  <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                    <img src={src} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-foreground/70 text-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {photos.length < 10 && (
              <label className="flex flex-col items-center justify-center w-full h-28 rounded-lg border-2 border-dashed border-input hover:border-primary/40 cursor-pointer transition-colors bg-muted/30">
                <Upload className="w-6 h-6 text-muted-foreground mb-1" />
                <span className="text-sm text-muted-foreground">Tap to upload photos</span>
                <span className="text-xs text-muted-foreground/60">{photos.length}/10 uploaded</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </label>
            )}
          </div>

          <Button type="submit" variant="hero" size="lg" className="w-full mt-4">
            Add Vehicle
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
