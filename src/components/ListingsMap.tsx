import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Operator {
  id: number;
  name: string;
  location: string;
  type: string;
  price: string;
  available: boolean;
  lat: number;
  lng: number;
}

const operators: Operator[] = [
  { id: 1, name: "Kwame's Tow Services", location: "Accra", type: "Flatbed", price: "GH₵ 350/trip", available: true, lat: 5.6037, lng: -0.1870 },
  { id: 2, name: "Ashanti Heavy Haul", location: "Kumasi", type: "Heavy Duty", price: "GH₵ 800/trip", available: true, lat: 6.6885, lng: -1.6244 },
  { id: 3, name: "Cape Coast Rescue", location: "Cape Coast", type: "Wheel-Lift", price: "GH₵ 280/trip", available: false, lat: 5.1036, lng: -1.2466 },
  { id: 4, name: "Volta Towing Co.", location: "Ho", type: "Flatbed", price: "GH₵ 400/trip", available: true, lat: 6.6006, lng: 0.4710 },
  { id: 5, name: "Tema Port Haulers", location: "Tema", type: "Carrier", price: "GH₵ 600/trip", available: true, lat: 5.6698, lng: -0.0166 },
  { id: 6, name: "Northern Star Recovery", location: "Tamale", type: "Rollback", price: "GH₵ 450/trip", available: true, lat: 9.4034, lng: -0.8424 },
  { id: 7, name: "Takoradi Tow Masters", location: "Takoradi", type: "Heavy Duty", price: "GH₵ 950/trip", available: false, lat: 4.8986, lng: -1.7610 },
  { id: 8, name: "Koforidua Quick Tow", location: "Koforidua", type: "Wheel-Lift", price: "GH₵ 250/trip", available: true, lat: 6.0940, lng: -0.2593 },
  { id: 9, name: "Sunyani Express Tow", location: "Sunyani", type: "Flatbed", price: "GH₵ 320/trip", available: true, lat: 7.3349, lng: -2.3266 },
  { id: 10, name: "Obuasi Road Rescue", location: "Obuasi", type: "Rollback", price: "GH₵ 380/trip", available: true, lat: 6.2024, lng: -1.6678 },
  { id: 11, name: "Wa Carriers Ltd.", location: "Wa", type: "Carrier", price: "GH₵ 700/trip", available: false, lat: 10.0601, lng: -2.5099 },
  { id: 12, name: "Bolga Breakdown Aid", location: "Bolgatanga", type: "Flatbed", price: "GH₵ 300/trip", available: true, lat: 10.7855, lng: -0.8514 },
];

interface ListingsMapProps {
  searchQuery: string;
  selectedRegion: string;
  selectedType: string;
  onSelectOperator?: (id: number) => void;
}

const ListingsMap = ({ searchQuery, selectedRegion, selectedType, onSelectOperator }: ListingsMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView([7.5, -1.5], 7);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) map.removeLayer(layer);
    });

    const filtered = operators.filter((o) => {
      const matchSearch = !searchQuery || o.name.toLowerCase().includes(searchQuery.toLowerCase()) || o.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchType = selectedType === "All Types" || o.type === selectedType;
      // Simple region match by location name
      const matchRegion = selectedRegion === "All Regions" || o.location.toLowerCase().includes(selectedRegion.toLowerCase().split(" ")[0].toLowerCase());
      return matchSearch && matchType && matchRegion;
    });

    filtered.forEach((op) => {
      const marker = L.marker([op.lat, op.lng]).addTo(map);
      marker.bindPopup(`
        <div style="min-width:160px">
          <strong>${op.name}</strong><br/>
          <span style="font-size:12px;color:#666">${op.type} • ${op.price}</span><br/>
          <span style="font-size:11px;color:${op.available ? '#16a34a' : '#999'}">${op.available ? '● Available' : '● Busy'}</span>
        </div>
      `);
      if (onSelectOperator) {
        marker.on("click", () => onSelectOperator(op.id));
      }
    });
  }, [searchQuery, selectedRegion, selectedType, onSelectOperator]);

  return <div ref={mapRef} className="w-full h-full min-h-[400px] rounded-xl z-0" />;
};

export default ListingsMap;
