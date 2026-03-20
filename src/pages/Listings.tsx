import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Star, Filter, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const regions = [
  "All Regions",
  "Greater Accra",
  "Ashanti",
  "Central",
  "Western",
  "Eastern",
  "Northern",
  "Volta",
  "Upper East",
  "Upper West",
  "Bono",
  "Bono East",
  "Ahafo",
  "Western North",
  "Oti",
  "Savannah",
  "North East",
];

const vehicleTypes = ["All Types", "Flatbed", "Wheel-Lift", "Heavy Duty", "Carrier", "Rollback"];

const listings = [
  { id: 1, name: "Kwame's Tow Services", location: "Accra, Greater Accra", type: "Flatbed", capacity: "3.5 tonnes", rating: 4.8, reviews: 124, price: "GH₵ 350/trip", available: true, initials: "KT", region: "Greater Accra", phone: "+233 24 123 4567", photo: "https://images.unsplash.com/photo-1562920618-21e666772b4f?w=200" },
  { id: 2, name: "Ashanti Heavy Haul", location: "Kumasi, Ashanti", type: "Heavy Duty", capacity: "12 tonnes", rating: 4.6, reviews: 89, price: "GH₵ 800/trip", available: true, initials: "AH", region: "Ashanti", phone: "+233 20 987 6543", photo: "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=200" },
  { id: 3, name: "Cape Coast Rescue", location: "Cape Coast, Central", type: "Wheel-Lift", capacity: "2.5 tonnes", rating: 4.9, reviews: 67, price: "GH₵ 280/trip", available: false, initials: "CR", region: "Central", phone: "+233 27 456 7890", photo: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=200" },
  { id: 4, name: "Volta Towing Co.", location: "Ho, Volta", type: "Flatbed", capacity: "4 tonnes", rating: 4.3, reviews: 42, price: "GH₵ 400/trip", available: true, initials: "VT", region: "Volta", phone: "+233 26 321 0987", photo: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=200" },
  { id: 5, name: "Tema Port Haulers", location: "Tema, Greater Accra", type: "Carrier", capacity: "8 tonnes", rating: 4.7, reviews: 156, price: "GH₵ 600/trip", available: true, initials: "TP", region: "Greater Accra", phone: "+233 24 555 6789", photo: "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=200" },
  { id: 6, name: "Northern Star Recovery", location: "Tamale, Northern", type: "Rollback", capacity: "5 tonnes", rating: 4.4, reviews: 38, price: "GH₵ 450/trip", available: true, initials: "NS", region: "Northern", phone: "+233 20 112 3344", photo: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=200" },
  { id: 7, name: "Takoradi Tow Masters", location: "Takoradi, Western", type: "Heavy Duty", capacity: "15 tonnes", rating: 4.5, reviews: 73, price: "GH₵ 950/trip", available: false, initials: "TM", region: "Western", phone: "+233 27 998 7766", photo: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=200" },
  { id: 8, name: "Koforidua Quick Tow", location: "Koforidua, Eastern", type: "Wheel-Lift", capacity: "2 tonnes", rating: 4.2, reviews: 29, price: "GH₵ 250/trip", available: true, initials: "KQ", region: "Eastern", phone: "+233 26 443 2211", photo: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=200" },
  { id: 9, name: "Sunyani Express Tow", location: "Sunyani, Bono", type: "Flatbed", capacity: "3 tonnes", rating: 4.1, reviews: 19, price: "GH₵ 320/trip", available: true, initials: "SE", region: "Bono", phone: "+233 24 667 8899", photo: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=200" },
  { id: 10, name: "Obuasi Road Rescue", location: "Obuasi, Ashanti", type: "Rollback", capacity: "4.5 tonnes", rating: 4.7, reviews: 51, price: "GH₵ 380/trip", available: true, initials: "OR", region: "Ashanti", phone: "+233 20 776 5544", photo: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200" },
  { id: 11, name: "Wa Carriers Ltd.", location: "Wa, Upper West", type: "Carrier", capacity: "10 tonnes", rating: 4.0, reviews: 14, price: "GH₵ 700/trip", available: false, initials: "WC", region: "Upper West", phone: "+233 27 889 0011", photo: "https://images.unsplash.com/photo-1562920618-21e666772b4f?w=200" },
  { id: 12, name: "Bolga Breakdown Aid", location: "Bolgatanga, Upper East", type: "Flatbed", capacity: "3 tonnes", rating: 4.3, reviews: 22, price: "GH₵ 300/trip", available: true, initials: "BB", region: "Upper East", phone: "+233 26 112 3355", photo: "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=200" },
];

const Listings = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const typeParam = searchParams.get("type");
  const [selectedType, setSelectedType] = useState(
    typeParam && ["Flatbed", "Wheel-Lift", "Heavy Duty", "Carrier", "Rollback"].includes(typeParam) ? typeParam : "All Types"
  );
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollReveal(0.05);

  const filtered = listings.filter((l) => {
    const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === "All Regions" || l.region === selectedRegion;
    const matchesType = selectedType === "All Types" || l.type === selectedType;
    return matchesSearch && matchesRegion && matchesType;
  });

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      {/* Header with dark bg for navbar visibility */}
      <div className="bg-primary pb-12 pt-4">
        <div className="h-16" /> {/* spacer for navbar */}
        <div className="container mx-auto px-6 pt-8">
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-primary-foreground mb-2 animate-reveal-up">
            All Tow Trucks
          </h1>
          <p className="text-primary-foreground/60 mb-8 animate-reveal-up" style={{ animationDelay: "0.1s" }}>
            Browse {listings.length} verified tow vehicles across Ghana
          </p>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 animate-reveal-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-lg bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <div className="relative">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="h-11 pl-4 pr-9 rounded-lg bg-background text-foreground text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                {regions.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="h-11 pl-4 pr-9 rounded-lg bg-background text-foreground text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                {vehicleTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div ref={ref} className="container mx-auto px-6 -mt-2 pb-24">
        <div className="flex items-center justify-between mb-6 pt-6">
          <span className="text-sm text-muted-foreground">
            Showing <strong className="text-foreground">{filtered.length}</strong> vehicle{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 space-y-3">
            <Filter className="w-10 h-10 text-muted-foreground/40 mx-auto" />
            <p className="text-muted-foreground font-medium">No vehicles match your filters</p>
            <p className="text-sm text-muted-foreground/70">Try adjusting your search or region</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((truck, i) => (
              <div
                key={truck.id}
                className={`rounded-xl border border-border bg-card p-5 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300 group ${
                  isVisible ? "animate-reveal-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${0.05 + i * 0.04}s` }}
              >
                {/* Header */}
                <div className="flex items-start gap-3.5 mb-4">
                  <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0">
                    <img src={truck.photo} alt={truck.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold font-display text-foreground text-sm truncate">{truck.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span className="truncate">{truck.location}</span>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                      truck.available ? "bg-forest-light text-primary" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {truck.available ? "Available" : "Busy"}
                  </span>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                  <div className="px-3 py-2 rounded-md bg-muted/70">
                    <span className="text-muted-foreground block">Type</span>
                    <span className="font-medium text-foreground">{truck.type}</span>
                  </div>
                  <div className="px-3 py-2 rounded-md bg-muted/70">
                    <span className="text-muted-foreground block">Capacity</span>
                    <span className="font-medium text-foreground">{truck.capacity}</span>
                  </div>
                </div>

                {/* Rating + Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
                    <span className="text-sm font-medium tabular-nums">{truck.rating}</span>
                    <span className="text-xs text-muted-foreground">({truck.reviews})</span>
                  </div>
                  <span className="text-sm font-semibold font-display text-secondary">{truck.price}</span>
                </div>

                {/* Action */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => navigate(`/operator/${truck.id}`)}
                >
                  View Operator
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Listings;
