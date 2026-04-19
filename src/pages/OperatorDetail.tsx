import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import IdleTowPrompt from "@/components/IdleTowPrompt";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReviewForm from "@/components/ReviewForm";
import ReportOperatorDialog from "@/components/ReportOperatorDialog";
import { MapPin, Star, Phone, Mail, ArrowLeft, ChevronLeft, ChevronRight, X, MessageSquare, Clock, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const operators: Record<number, {
  id: number; name: string; location: string; type: string; capacity: string;
  rating: number; reviews: number; price: string; available: boolean;
  initials: string; region: string; phone: string; email: string;
  bio: string; experience: string; services: string[];
  photos: string[]; comments: { name: string; text: string; rating: number; date: string }[];
}> = {
  1: { id: 1, name: "Kwame's Tow Services", location: "Accra, Greater Accra", type: "Flatbed", capacity: "3.5 tonnes", rating: 4.8, reviews: 124, price: "GH₵ 350/trip", available: true, initials: "KT", region: "Greater Accra", phone: "+233 24 123 4567", email: "kwame@towmanghana.com", bio: "Reliable flatbed towing across the Greater Accra Metropolitan Area. Over 8 years of trusted service with a fleet of well-maintained vehicles. We pride ourselves on prompt response times and careful handling of all vehicles.", experience: "8 years", services: ["Flatbed Towing", "Accident Recovery", "Long Distance Haulage", "Roadside Assistance"], photos: ["https://images.unsplash.com/photo-1562920618-21e666772b4f?w=600", "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=600", "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600", "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600", "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=600", "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600", "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600", "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=600"], comments: [{ name: "Ama Serwah", text: "Kwame responded within 20 minutes. Very professional and careful with my car. Highly recommend!", rating: 5, date: "2 weeks ago" }, { name: "Kofi Mensah", text: "Great service. Fair pricing and the driver was very courteous. Will use again.", rating: 5, date: "1 month ago" }, { name: "Yaa Asantewaa", text: "Helped me out at midnight on the motorway. Lifesaver! Fast and efficient.", rating: 4, date: "2 months ago" }, { name: "Nana Adjei", text: "Good service overall, arrived a bit later than expected but handled the car well.", rating: 4, date: "3 months ago" }] },
  2: { id: 2, name: "Ashanti Heavy Haul", location: "Kumasi, Ashanti", type: "Heavy Duty", capacity: "12 tonnes", rating: 4.6, reviews: 89, price: "GH₵ 800/trip", available: true, initials: "AH", region: "Ashanti", phone: "+233 20 987 6543", email: "info@ashantiheavy.com", bio: "Specialists in heavy-duty towing and recovery for commercial vehicles, trucks, and buses across the Ashanti Region. Our equipment handles the toughest jobs.", experience: "12 years", services: ["Heavy Duty Towing", "Commercial Vehicle Recovery", "Equipment Transport", "Crane Services"], photos: ["https://images.unsplash.com/photo-1562920618-21e666772b4f?w=600", "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=600", "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600", "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600", "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=600", "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600", "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600", "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=600", "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600", "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600"], comments: [{ name: "Osei Bonsu", text: "Moved our broken-down DAF truck with no issues. Professional team.", rating: 5, date: "3 weeks ago" }, { name: "Akua Darko", text: "The only service in Kumasi that can handle heavy vehicles. Reliable.", rating: 4, date: "1 month ago" }, { name: "Samuel Frimpong", text: "Expensive but worth it. They know what they are doing.", rating: 4, date: "6 weeks ago" }] },
  3: { id: 3, name: "Cape Coast Rescue", location: "Cape Coast, Central", type: "Wheel-Lift", capacity: "2.5 tonnes", rating: 4.9, reviews: 67, price: "GH₵ 280/trip", available: false, initials: "CR", region: "Central", phone: "+233 27 456 7890", email: "rescue@capecoast.com", bio: "Fast and affordable wheel-lift towing serving Cape Coast and the Central Region. Known for gentle handling and quick response.", experience: "5 years", services: ["Wheel-Lift Towing", "Jump Start", "Tire Change", "Lockout Service"], photos: ["https://images.unsplash.com/photo-1562920618-21e666772b4f?w=600", "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=600", "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600", "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600", "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=600", "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600", "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600", "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=600"], comments: [{ name: "Efua Mensah", text: "Best towing service in Central Region. Always punctual.", rating: 5, date: "1 week ago" }, { name: "Kweku Annan", text: "Affordable and professional. Recommended to all my friends.", rating: 5, date: "3 weeks ago" }] },
  4: { id: 4, name: "Volta Towing Co.", location: "Ho, Volta", type: "Flatbed", capacity: "4 tonnes", rating: 4.3, reviews: 42, price: "GH₵ 400/trip", available: true, initials: "VT", region: "Volta", phone: "+233 26 321 0987", email: "volta@towmanghana.com", bio: "Serving the Volta Region with dependable flatbed towing services.", experience: "6 years", services: ["Flatbed Towing", "Roadside Assistance"], photos: ["https://images.unsplash.com/photo-1562920618-21e666772b4f?w=600", "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=600", "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600", "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600", "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=600", "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600", "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600", "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=600"], comments: [{ name: "Dela Adzomada", text: "Reliable service. Came through in a tough situation.", rating: 4, date: "2 weeks ago" }] },
  5: { id: 5, name: "Tema Port Haulers", location: "Tema, Greater Accra", type: "Carrier", capacity: "8 tonnes", rating: 4.7, reviews: 156, price: "GH₵ 600/trip", available: true, initials: "TP", region: "Greater Accra", phone: "+233 24 555 6789", email: "tema@porthaulers.com", bio: "Specialists in carrier transport around the Tema port area. We move multiple vehicles safely.", experience: "10 years", services: ["Multi-Car Carrier", "Port-to-Destination", "Vehicle Import Transport"], photos: ["https://images.unsplash.com/photo-1562920618-21e666772b4f?w=600", "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=600", "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600", "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600", "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=600", "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600", "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600", "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=600", "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600"], comments: [{ name: "Isaac Owusu", text: "Transported 3 vehicles from the port. Excellent handling.", rating: 5, date: "1 month ago" }, { name: "Grace Tetteh", text: "Professional and well-organized. Fair pricing too.", rating: 5, date: "2 months ago" }] },
  6: { id: 6, name: "Northern Star Recovery", location: "Tamale, Northern", type: "Rollback", capacity: "5 tonnes", rating: 4.4, reviews: 38, price: "GH₵ 450/trip", available: true, initials: "NS", region: "Northern", phone: "+233 20 112 3344", email: "northernstar@towman.com", bio: "The go-to recovery service in the Northern Region. Fast response even on remote roads.", experience: "7 years", services: ["Rollback Towing", "Accident Recovery", "Off-Road Recovery"], photos: ["https://images.unsplash.com/photo-1562920618-21e666772b4f?w=600", "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=600", "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600", "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600", "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=600", "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600", "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600", "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=600"], comments: [{ name: "Abdul Rahman", text: "Great service in Tamale. Very responsive.", rating: 4, date: "3 weeks ago" }] },
  7: { id: 7, name: "Takoradi Tow Masters", location: "Takoradi, Western", type: "Heavy Duty", capacity: "15 tonnes", rating: 4.5, reviews: 73, price: "GH₵ 950/trip", available: false, initials: "TM", region: "Western", phone: "+233 27 998 7766", email: "masters@takoradi.com", bio: "Heavy-duty towing experts in the Western Region, serving oil and gas industry vehicles.", experience: "15 years", services: ["Heavy Duty Towing", "Industrial Equipment", "Oil & Gas Support"], photos: ["https://images.unsplash.com/photo-1562920618-21e666772b4f?w=600", "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=600", "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600", "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600", "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=600", "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600", "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600", "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=600"], comments: [{ name: "Patrick Essien", text: "Handled our drilling rig transport perfectly.", rating: 5, date: "1 month ago" }] },
  8: { id: 8, name: "Koforidua Quick Tow", location: "Koforidua, Eastern", type: "Wheel-Lift", capacity: "2 tonnes", rating: 4.2, reviews: 29, price: "GH₵ 250/trip", available: true, initials: "KQ", region: "Eastern", phone: "+233 26 443 2211", email: "quicktow@koforidua.com", bio: "Quick and affordable towing in the Eastern Region.", experience: "4 years", services: ["Wheel-Lift Towing", "Battery Jump", "Tire Service"], photos: ["https://images.unsplash.com/photo-1562920618-21e666772b4f?w=600", "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=600", "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600", "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600", "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=600", "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600", "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600", "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=600"], comments: [{ name: "Abena Kyei", text: "Affordable and fast. Good for small cars.", rating: 4, date: "2 weeks ago" }] },
  9: { id: 9, name: "Sunyani Express Tow", location: "Sunyani, Bono", type: "Flatbed", capacity: "3 tonnes", rating: 4.1, reviews: 19, price: "GH₵ 320/trip", available: true, initials: "SE", region: "Bono", phone: "+233 24 667 8899", email: "express@sunyani.com", bio: "Flatbed towing across the Bono Region with fair prices.", experience: "3 years", services: ["Flatbed Towing", "Roadside Assistance"], photos: ["https://images.unsplash.com/photo-1562920618-21e666772b4f?w=600", "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=600", "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600", "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600", "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=600", "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600", "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600", "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=600"], comments: [] },
  10: { id: 10, name: "Obuasi Road Rescue", location: "Obuasi, Ashanti", type: "Rollback", capacity: "4.5 tonnes", rating: 4.7, reviews: 51, price: "GH₵ 380/trip", available: true, initials: "OR", region: "Ashanti", phone: "+233 20 776 5544", email: "roadrescue@obuasi.com", bio: "Dependable rollback towing in the Obuasi area and greater Ashanti Region.", experience: "9 years", services: ["Rollback Towing", "Mining Vehicle Recovery", "Roadside Assistance"], photos: ["https://images.unsplash.com/photo-1562920618-21e666772b4f?w=600", "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=600", "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600", "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600", "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=600", "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600", "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600", "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=600"], comments: [{ name: "Francis Appiah", text: "Rescued our truck from a ditch. Excellent work.", rating: 5, date: "1 month ago" }] },
  11: { id: 11, name: "Wa Carriers Ltd.", location: "Wa, Upper West", type: "Carrier", capacity: "10 tonnes", rating: 4.0, reviews: 14, price: "GH₵ 700/trip", available: false, initials: "WC", region: "Upper West", phone: "+233 27 889 0011", email: "carriers@wa.com", bio: "Multi-vehicle carrier service in the Upper West Region.", experience: "6 years", services: ["Multi-Car Carrier", "Long Distance Transport"], photos: ["https://images.unsplash.com/photo-1562920618-21e666772b4f?w=600", "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=600", "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600", "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600", "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=600", "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600", "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600", "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=600"], comments: [] },
  12: { id: 12, name: "Bolga Breakdown Aid", location: "Bolgatanga, Upper East", type: "Flatbed", capacity: "3 tonnes", rating: 4.3, reviews: 22, price: "GH₵ 300/trip", available: true, initials: "BB", region: "Upper East", phone: "+233 26 112 3355", email: "breakdown@bolga.com", bio: "Reliable breakdown assistance in the Upper East Region.", experience: "5 years", services: ["Flatbed Towing", "Breakdown Assistance", "Battery Service"], photos: ["https://images.unsplash.com/photo-1562920618-21e666772b4f?w=600", "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=600", "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600", "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600", "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=600", "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600", "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600", "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=600"], comments: [{ name: "Azuma Ibrahim", text: "Saved us on the Bolga-Tamale road. Thank you!", rating: 5, date: "2 weeks ago" }] },
};

const OperatorDetail = () => {
  const { id } = useParams();
  const operator = operators[Number(id)];
  const [activePhoto, setActivePhoto] = useState(0);
  const [showContact, setShowContact] = useState(false);
  const [userReviews, setUserReviews] = useState<{ name: string; text: string; rating: number; date: string }[]>([]);
  const { ref, isVisible } = useScrollReveal(0.05);

  const allComments = operator ? [...userReviews, ...operator.comments] : [];

  if (!operator) {
    return (
      <div className="min-h-screen bg-muted/30">
        <div className="h-16" />
        <div className="container mx-auto px-6 py-24 text-center">
          <p className="text-muted-foreground">Operator not found.</p>
          <Link to="/listings" className="text-secondary underline mt-4 inline-block">Back to listings</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      <div className="bg-primary pb-6 pt-4">
        <div className="h-16" />
        <div className="container mx-auto px-6 pt-4">
          <Link to="/listings" className="inline-flex items-center gap-1.5 text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to listings
          </Link>
        </div>
      </div>

      <div ref={ref} className="container mx-auto px-6 -mt-2 pb-24">
        {/* Header card */}
        <div className={`rounded-xl border border-border bg-card p-6 mb-6 ${isVisible ? "animate-reveal-up" : "opacity-0"}`}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-lg shrink-0">
              {operator.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-xl font-bold font-display text-foreground">{operator.name}</h1>
                <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${operator.available ? "bg-forest-light text-primary" : "bg-muted text-muted-foreground"}`}>
                  {operator.available ? "Available" : "Busy"}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-1.5 text-sm text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{operator.location}</span>
                <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-secondary text-secondary" />{operator.rating} ({operator.reviews} reviews)</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{operator.experience} experience</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-lg font-bold font-display text-secondary">{operator.price}</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column — Photos & About */}
          <div className="lg:col-span-2 space-y-6">
            {/* Photo gallery */}
            <div className={`rounded-xl border border-border bg-card overflow-hidden ${isVisible ? "animate-reveal-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
              <div className="relative aspect-[4/3] sm:aspect-video bg-muted">
                <img
                  src={operator.photos[activePhoto]}
                  alt={`${operator.name} vehicle ${activePhoto + 1}`}
                  className="w-full h-full object-cover"
                />
                {operator.photos.length > 1 && (
                  <>
                    <button
                      onClick={() => setActivePhoto((p) => (p === 0 ? operator.photos.length - 1 : p - 1))}
                      className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-foreground/60 text-primary-foreground flex items-center justify-center hover:bg-foreground/80 transition-colors active:scale-95"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-4 sm:h-4" />
                    </button>
                    <button
                      onClick={() => setActivePhoto((p) => (p === operator.photos.length - 1 ? 0 : p + 1))}
                      className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-foreground/60 text-primary-foreground flex items-center justify-center hover:bg-foreground/80 transition-colors active:scale-95"
                    >
                      <ChevronRight className="w-5 h-5 sm:w-4 sm:h-4" />
                    </button>
                    <span className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 text-xs bg-foreground/60 text-primary-foreground px-2 py-0.5 rounded-full tabular-nums">
                      {activePhoto + 1} / {operator.photos.length}
                    </span>
                  </>
                )}
              </div>
              {/* Thumbnails */}
              <div className="grid grid-cols-4 sm:grid-cols-5 md:flex gap-2 p-3 overflow-x-auto">
                {operator.photos.map((photo, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhoto(i)}
                    className={`aspect-[4/3] md:w-20 md:h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all active:scale-95 ${
                      i === activePhoto ? "border-secondary ring-1 ring-secondary/30" : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img src={photo} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* About */}
            <div className={`rounded-xl border border-border bg-card p-6 ${isVisible ? "animate-reveal-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
              <h2 className="font-display font-semibold text-foreground mb-3">About</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{operator.bio}</p>
            </div>

            {/* Services */}
            <div className={`rounded-xl border border-border bg-card p-6 ${isVisible ? "animate-reveal-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
              <h2 className="font-display font-semibold text-foreground mb-3">Services Offered</h2>
              <div className="flex flex-wrap gap-2">
                {operator.services.map((s) => (
                  <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-xs font-medium text-foreground">
                    <Truck className="w-3 h-3 text-muted-foreground" />{s}
                  </span>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div className={`rounded-xl border border-border bg-card p-6 ${isVisible ? "animate-reveal-up" : "opacity-0"}`} style={{ animationDelay: "0.25s" }}>
              <h2 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                Reviews ({allComments.length})
              </h2>

              {/* Rating Summary */}
              {allComments.length > 0 && (
                <div className="flex items-center gap-4 mb-5 p-4 rounded-lg bg-muted/70">
                  <div className="text-center">
                    <p className="text-3xl font-bold font-display text-foreground">{operator.rating}</p>
                    <div className="flex gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < Math.round(operator.rating) ? "fill-secondary text-secondary" : "text-muted-foreground/30"}`} />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{allComments.length} reviews</p>
                  </div>
                  <div className="flex-1 space-y-1">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = allComments.filter((c) => c.rating === star).length;
                      const pct = allComments.length > 0 ? (count / allComments.length) * 100 : 0;
                      return (
                        <div key={star} className="flex items-center gap-2 text-xs">
                          <span className="w-3 text-muted-foreground">{star}</span>
                          <div className="flex-1 h-2 rounded-full bg-border overflow-hidden">
                            <div className="h-full rounded-full bg-secondary transition-all" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="w-6 text-right text-muted-foreground">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {allComments.length === 0 ? (
                <p className="text-sm text-muted-foreground mb-4">No reviews yet. Be the first to leave one!</p>
              ) : (
                <div className="space-y-4 mb-6">
                  {allComments.map((c, i) => (
                    <div key={i} className="border-b border-border last:border-0 pb-4 last:pb-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-foreground">{c.name}</span>
                        <span className="text-xs text-muted-foreground">{c.date}</span>
                      </div>
                      <div className="flex items-center gap-0.5 mb-2">
                        {Array.from({ length: 5 }).map((_, si) => (
                          <Star key={si} className={`w-3 h-3 ${si < c.rating ? "fill-secondary text-secondary" : "text-muted-foreground/30"}`} />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{c.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Review Form */}
              <div className="border-t border-border pt-5">
                <h3 className="text-sm font-semibold font-display text-foreground mb-3">Leave a Review</h3>
                <ReviewForm
                  operatorName={operator.name}
                  onSubmit={(review) => setUserReviews((prev) => [review, ...prev])}
                />
              </div>
            </div>
          </div>

          {/* Right column — Contact & Details */}
          <div className="space-y-6">
            <div className={`rounded-xl border border-border bg-card p-6 sticky top-24 ${isVisible ? "animate-reveal-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
              <h2 className="font-display font-semibold text-foreground mb-4">Vehicle Details</h2>
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium text-foreground">{operator.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Capacity</span>
                  <span className="font-medium text-foreground">{operator.capacity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Region</span>
                  <span className="font-medium text-foreground">{operator.region}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-semibold text-secondary">{operator.price}</span>
                </div>
              </div>

              {!showContact ? (
                <Button variant="hero" size="lg" className="w-full" onClick={() => setShowContact(true)}>
                  <Phone className="w-4 h-4 mr-2" /> Contact Operator
                </Button>
              ) : (
                <div className="space-y-3 animate-reveal-up">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                    <Phone className="w-4 h-4 text-secondary shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <a href={`tel:${operator.phone.replace(/\s/g, "")}`} className="text-sm font-medium text-foreground hover:text-secondary transition-colors">
                        {operator.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                    <Mail className="w-4 h-4 text-secondary shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <a href={`mailto:${operator.email}`} className="text-sm font-medium text-foreground hover:text-secondary transition-colors break-all">
                        {operator.email}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-border flex justify-center">
                <ReportOperatorDialog operatorId={operator.id} operatorName={operator.name} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <IdleTowPrompt
        delayMs={12_000}
        sessionKey="towman_idle_prompt_operator"
        title="Ready to book this operator?"
        description="If you've made up your mind, request a tow now and we'll connect you instantly."
      />
    </div>
  );
};

export default OperatorDetail;
