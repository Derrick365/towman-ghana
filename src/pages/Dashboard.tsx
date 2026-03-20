import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Plus, Truck, MapPin, Phone, Mail, Image as ImageIcon } from "lucide-react";

interface Vehicle {
  id: string;
  type: string;
  make: string;
  model: string;
  year: string;
  plate: string;
  capacity: string;
  photos: string[];
}

interface Operator {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  region: string;
  city: string;
  about: string;
  vehicles: Vehicle[];
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [operator, setOperator] = useState<Operator | null>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("towman_operator");
    if (!data) {
      navigate("/register");
      return;
    }
    setOperator(JSON.parse(data));
  }, [navigate]);

  if (!operator) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary px-6 py-4">
        <div className="container mx-auto flex items-center gap-4">
          <Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-display font-bold text-primary-foreground">
              My Dashboard
            </h1>
            <p className="text-xs text-primary-foreground/60">Manage your profile & vehicles</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-lg px-6 py-6 space-y-6">
        {/* Profile Summary */}
        <Card>
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary font-display font-bold text-lg">
                  {operator.fullName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div className="min-w-0">
                <h2 className="font-display font-bold text-foreground truncate">{operator.fullName}</h2>
                <p className="text-xs text-muted-foreground">Free Operator Account</p>
              </div>
            </div>
            <div className="space-y-1.5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" /> {operator.phone}
              </div>
              {operator.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" /> {operator.email}
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" /> {operator.city}, {operator.region}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vehicles Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-foreground">My Vehicles</h3>
            <Button variant="hero" size="sm" onClick={() => navigate("/add-vehicle")}>
              <Plus className="w-4 h-4 mr-1" /> Add Vehicle
            </Button>
          </div>

          {operator.vehicles.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto">
                  <Truck className="w-7 h-7 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">No vehicles yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add your first vehicle to start receiving towing requests.
                  </p>
                </div>
                <Button variant="hero" onClick={() => navigate("/add-vehicle")}>
                  <Plus className="w-4 h-4 mr-1" /> Upload Vehicle
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {operator.vehicles.map((v) => (
                <Card key={v.id}>
                  <CardContent className="p-4 flex items-center gap-4">
                    {v.photos.length > 0 ? (
                      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                        <img src={v.photos[0]} alt={`${v.make} ${v.model}`} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <ImageIcon className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-foreground truncate">
                        {v.year} {v.make} {v.model}
                      </p>
                      <p className="text-xs text-muted-foreground">{v.type} · {v.plate}</p>
                      <p className="text-xs text-muted-foreground">{v.capacity} · {v.photos.length} photos</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
