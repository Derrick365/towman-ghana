import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Truck, DollarSign, Clock, CheckCircle2, XCircle, Phone, MapPin, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockRequests = [
  { id: 1, customer: "Ama Serwaa", phone: "+233 24 555 1234", issue: "Engine Failure", pickup: "Spintex Road, Accra", time: "12 min ago", status: "pending" as const },
  { id: 2, customer: "Yaw Mensah", phone: "+233 20 987 4321", issue: "Flat Tire / Cannot Move", pickup: "Achimota Overpass", time: "28 min ago", status: "pending" as const },
  { id: 3, customer: "Efua Amponsah", phone: "+233 27 111 2222", issue: "Accident / Collision", pickup: "Tema Motorway, KM 14", time: "1 hr ago", status: "accepted" as const },
  { id: 4, customer: "Kofi Asante", phone: "+233 26 333 4444", issue: "Stuck in Ditch", pickup: "Kasoa Junction", time: "3 hrs ago", status: "completed" as const },
  { id: 5, customer: "Akua Bediako", phone: "+233 24 666 7777", issue: "Battery Dead", pickup: "Osu, Oxford Street", time: "Yesterday", status: "completed" as const },
];

const earningsData = {
  today: "GH₵ 700",
  week: "GH₵ 3,150",
  month: "GH₵ 12,400",
  trips: 34,
};

const OperatorDashboard = () => {
  const { toast } = useToast();
  const [available, setAvailable] = useState(true);
  const [requests, setRequests] = useState(mockRequests);

  const handleToggle = (val: boolean) => {
    setAvailable(val);
    toast({ title: val ? "You're now available" : "You're now offline", description: val ? "Customers can send you requests" : "You won't receive new requests" });
  };

  const handleAction = (id: number, action: "accepted" | "declined") => {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: action } : r));
    toast({ title: action === "accepted" ? "Request accepted!" : "Request declined" });
  };

  const pending = requests.filter((r) => r.status === "pending");
  const active = requests.filter((r) => r.status === "accepted");
  const completed = requests.filter((r) => r.status === "completed");

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      <div className="bg-primary pt-20 pb-10 px-6">
        <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-primary-foreground animate-reveal-up">
              Operator Dashboard
            </h1>
            <p className="text-primary-foreground/60 text-sm mt-1 animate-reveal-up" style={{ animationDelay: "0.05s" }}>
              Kwame's Tow Services
            </p>
          </div>
          <div className="flex items-center gap-3 bg-primary-foreground/10 rounded-lg px-4 py-2.5 animate-reveal-up" style={{ animationDelay: "0.1s" }}>
            <span className="text-sm text-primary-foreground/70">Availability</span>
            <Switch checked={available} onCheckedChange={handleToggle} />
            <Badge variant={available ? "default" : "secondary"} className={available ? "bg-green-600 text-white" : ""}>
              {available ? "Online" : "Offline"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-6 -mt-4 pb-20 space-y-8">
        {/* Earnings Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Today", value: earningsData.today, icon: DollarSign, color: "text-secondary" },
            { label: "This Week", value: earningsData.week, icon: TrendingUp, color: "text-primary" },
            { label: "This Month", value: earningsData.month, icon: DollarSign, color: "text-secondary" },
            { label: "Total Trips", value: earningsData.trips.toString(), icon: Truck, color: "text-primary" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl border border-border p-4 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{stat.label}</span>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <p className="text-xl font-bold font-display text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Pending Requests */}
        {pending.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-lg font-semibold font-display text-foreground flex items-center gap-2">
              <Clock className="w-5 h-5 text-secondary" /> Pending Requests ({pending.length})
            </h2>
            <div className="space-y-3">
              {pending.map((req) => (
                <div key={req.id} className="bg-card rounded-xl border-2 border-secondary/30 p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{req.customer}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3" /> {req.phone}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">{req.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="outline">{req.issue}</Badge>
                    <span className="text-muted-foreground flex items-center gap-1 text-xs">
                      <MapPin className="w-3 h-3" /> {req.pickup}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1" onClick={() => handleAction(req.id, "accepted")}>
                      <CheckCircle2 className="w-4 h-4 mr-1" /> Accept
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => handleAction(req.id, "declined")}>
                      <XCircle className="w-4 h-4 mr-1" /> Decline
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Active Jobs */}
        {active.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-lg font-semibold font-display text-foreground flex items-center gap-2">
              <Truck className="w-5 h-5 text-primary" /> Active Jobs ({active.length})
            </h2>
            <div className="space-y-3">
              {active.map((req) => (
                <div key={req.id} className="bg-card rounded-xl border border-border p-5 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground text-sm">{req.customer}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{req.issue} • {req.pickup}</p>
                  </div>
                  <Badge className="bg-primary text-primary-foreground">In Progress</Badge>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Completed */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold font-display text-foreground">Recent Completed ({completed.length})</h2>
          <div className="space-y-2">
            {completed.map((req) => (
              <div key={req.id} className="bg-card rounded-xl border border-border p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{req.customer}</p>
                  <p className="text-xs text-muted-foreground">{req.issue} • {req.time}</p>
                </div>
                <Badge variant="outline" className="text-primary border-primary/30">Completed</Badge>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default OperatorDashboard;
