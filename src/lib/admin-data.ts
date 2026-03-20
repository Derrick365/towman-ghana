export interface Operator {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  region: string;
  status: "approved" | "pending" | "rejected";
  vehicles: number;
  rating: number;
  reviews: number;
  joined: string;
}

export interface Vehicle {
  id: number;
  operatorId: number;
  operatorName: string;
  type: string;
  make: string;
  model: string;
  year: number;
  plate: string;
  capacity: string;
  price: string;
  status: "active" | "pending" | "suspended";
  region: string;
}

export interface PlatformUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: "user" | "operator";
  status: "active" | "suspended";
  joined: string;
  lastActive: string;
}

export interface ActivityLog {
  id: number;
  action: string;
  actor: string;
  target: string;
  timestamp: string;
  type: "approval" | "rejection" | "registration" | "edit" | "suspension";
}

export const operators: Operator[] = [
  { id: 1, name: "Kwame's Tow Services", email: "kwame@towtruck.gh", phone: "+233 24 123 4567", location: "Accra", region: "Greater Accra", status: "approved", vehicles: 3, rating: 4.8, reviews: 124, joined: "2025-08-14" },
  { id: 2, name: "Ashanti Heavy Haul", email: "ashanti@haul.gh", phone: "+233 20 987 6543", location: "Kumasi", region: "Ashanti", status: "approved", vehicles: 5, rating: 4.6, reviews: 89, joined: "2025-09-02" },
  { id: 3, name: "Cape Coast Rescue", email: "rescue@cape.gh", phone: "+233 27 456 7890", location: "Cape Coast", region: "Central", status: "pending", vehicles: 2, rating: 4.9, reviews: 67, joined: "2026-01-20" },
  { id: 4, name: "Volta Towing Co.", email: "volta@tow.gh", phone: "+233 26 321 0987", location: "Ho", region: "Volta", status: "approved", vehicles: 1, rating: 4.3, reviews: 42, joined: "2025-11-05" },
  { id: 5, name: "Tema Port Haulers", email: "tema@haulers.gh", phone: "+233 24 555 6789", location: "Tema", region: "Greater Accra", status: "approved", vehicles: 4, rating: 4.7, reviews: 156, joined: "2025-07-28" },
  { id: 6, name: "Northern Star Recovery", email: "star@north.gh", phone: "+233 20 112 3344", location: "Tamale", region: "Northern", status: "pending", vehicles: 2, rating: 4.4, reviews: 38, joined: "2026-02-10" },
  { id: 7, name: "Takoradi Tow Masters", email: "masters@tak.gh", phone: "+233 27 998 7766", location: "Takoradi", region: "Western", status: "rejected", vehicles: 3, rating: 4.5, reviews: 73, joined: "2025-12-15" },
  { id: 8, name: "Koforidua Quick Tow", email: "quick@kof.gh", phone: "+233 26 443 2211", location: "Koforidua", region: "Eastern", status: "approved", vehicles: 1, rating: 4.2, reviews: 29, joined: "2026-01-03" },
  { id: 9, name: "Sunyani Express Tow", email: "express@sun.gh", phone: "+233 24 667 8899", location: "Sunyani", region: "Bono", status: "pending", vehicles: 1, rating: 4.1, reviews: 19, joined: "2026-03-01" },
  { id: 10, name: "Obuasi Road Rescue", email: "rescue@obuasi.gh", phone: "+233 20 776 5544", location: "Obuasi", region: "Ashanti", status: "approved", vehicles: 2, rating: 4.7, reviews: 51, joined: "2025-10-18" },
];

export const vehicles: Vehicle[] = [
  { id: 1, operatorId: 1, operatorName: "Kwame's Tow Services", type: "Flatbed", make: "Isuzu", model: "NPR", year: 2021, plate: "GR-4521-22", capacity: "3.5 tonnes", price: "GH₵ 350/trip", status: "active", region: "Greater Accra" },
  { id: 2, operatorId: 2, operatorName: "Ashanti Heavy Haul", type: "Heavy Duty", make: "MAN", model: "TGS", year: 2020, plate: "AS-1187-21", capacity: "12 tonnes", price: "GH₵ 800/trip", status: "active", region: "Ashanti" },
  { id: 3, operatorId: 3, operatorName: "Cape Coast Rescue", type: "Wheel-Lift", make: "Toyota", model: "Dyna", year: 2019, plate: "CR-3390-20", capacity: "2.5 tonnes", price: "GH₵ 280/trip", status: "pending", region: "Central" },
  { id: 4, operatorId: 4, operatorName: "Volta Towing Co.", type: "Flatbed", make: "Mitsubishi", model: "Canter", year: 2022, plate: "VR-0078-23", capacity: "4 tonnes", price: "GH₵ 400/trip", status: "active", region: "Volta" },
  { id: 5, operatorId: 5, operatorName: "Tema Port Haulers", type: "Carrier", make: "Hino", model: "500", year: 2023, plate: "GR-9012-23", capacity: "8 tonnes", price: "GH₵ 600/trip", status: "active", region: "Greater Accra" },
  { id: 6, operatorId: 6, operatorName: "Northern Star Recovery", type: "Rollback", make: "Foton", model: "Auman", year: 2021, plate: "NR-5567-22", capacity: "5 tonnes", price: "GH₵ 450/trip", status: "pending", region: "Northern" },
  { id: 7, operatorId: 7, operatorName: "Takoradi Tow Masters", type: "Heavy Duty", make: "Scania", model: "P380", year: 2018, plate: "WR-2201-19", capacity: "15 tonnes", price: "GH₵ 950/trip", status: "suspended", region: "Western" },
  { id: 8, operatorId: 1, operatorName: "Kwame's Tow Services", type: "Wheel-Lift", make: "Hyundai", model: "HD78", year: 2022, plate: "GR-7743-23", capacity: "2 tonnes", price: "GH₵ 250/trip", status: "active", region: "Greater Accra" },
  { id: 9, operatorId: 5, operatorName: "Tema Port Haulers", type: "Flatbed", make: "DAF", model: "LF", year: 2020, plate: "GR-6689-21", capacity: "5 tonnes", price: "GH₵ 500/trip", status: "active", region: "Greater Accra" },
  { id: 10, operatorId: 10, operatorName: "Obuasi Road Rescue", type: "Rollback", make: "Isuzu", model: "FTR", year: 2021, plate: "AS-3345-22", capacity: "4.5 tonnes", price: "GH₵ 380/trip", status: "active", region: "Ashanti" },
  { id: 11, operatorId: 2, operatorName: "Ashanti Heavy Haul", type: "Carrier", make: "Volvo", model: "FH16", year: 2019, plate: "AS-8811-20", capacity: "20 tonnes", price: "GH₵ 1200/trip", status: "active", region: "Ashanti" },
  { id: 12, operatorId: 9, operatorName: "Sunyani Express Tow", type: "Flatbed", make: "Toyota", model: "Dyna", year: 2020, plate: "BA-1122-21", capacity: "3 tonnes", price: "GH₵ 320/trip", status: "pending", region: "Bono" },
];

export const users: PlatformUser[] = [
  { id: 1, name: "Kofi Asante", email: "kofi@mail.com", phone: "+233 24 111 2222", role: "user", status: "active", joined: "2025-09-12", lastActive: "2026-03-19" },
  { id: 2, name: "Ama Owusu", email: "ama@mail.com", phone: "+233 20 333 4444", role: "user", status: "active", joined: "2025-10-03", lastActive: "2026-03-18" },
  { id: 3, name: "Yaw Boateng", email: "yaw@mail.com", phone: "+233 27 555 6666", role: "operator", status: "active", joined: "2025-08-14", lastActive: "2026-03-20" },
  { id: 4, name: "Efua Mensah", email: "efua@mail.com", phone: "+233 26 777 8888", role: "user", status: "suspended", joined: "2025-11-22", lastActive: "2026-02-15" },
  { id: 5, name: "Kwabena Darko", email: "kwabena@mail.com", phone: "+233 24 999 0000", role: "user", status: "active", joined: "2026-01-08", lastActive: "2026-03-17" },
  { id: 6, name: "Adjoa Poku", email: "adjoa@mail.com", phone: "+233 20 121 3434", role: "operator", status: "active", joined: "2025-09-02", lastActive: "2026-03-20" },
  { id: 7, name: "Nana Agyei", email: "nana@mail.com", phone: "+233 27 565 7878", role: "user", status: "active", joined: "2026-02-14", lastActive: "2026-03-16" },
  { id: 8, name: "Akua Frimpong", email: "akua@mail.com", phone: "+233 26 909 0101", role: "user", status: "active", joined: "2025-12-05", lastActive: "2026-03-19" },
];

export const activityLogs: ActivityLog[] = [
  { id: 1, action: "Operator approved", actor: "Kwesi Mensah", target: "Kwame's Tow Services", timestamp: "2026-03-20 09:15", type: "approval" },
  { id: 2, action: "New registration", actor: "System", target: "Cape Coast Rescue", timestamp: "2026-03-20 08:30", type: "registration" },
  { id: 3, action: "Vehicle suspended", actor: "Ama Serwaa", target: "Takoradi Tow Masters - Scania P380", timestamp: "2026-03-19 16:45", type: "suspension" },
  { id: 4, action: "Operator rejected", actor: "Kwesi Mensah", target: "Takoradi Tow Masters", timestamp: "2026-03-19 14:20", type: "rejection" },
  { id: 5, action: "Vehicle listing edited", actor: "Kwesi Mensah", target: "Tema Port Haulers - DAF LF", timestamp: "2026-03-19 11:00", type: "edit" },
  { id: 6, action: "New registration", actor: "System", target: "Northern Star Recovery", timestamp: "2026-03-18 15:30", type: "registration" },
  { id: 7, action: "Operator approved", actor: "Ama Serwaa", target: "Volta Towing Co.", timestamp: "2026-03-18 10:15", type: "approval" },
  { id: 8, action: "User suspended", actor: "Kwesi Mensah", target: "Efua Mensah", timestamp: "2026-03-17 09:00", type: "suspension" },
  { id: 9, action: "New registration", actor: "System", target: "Sunyani Express Tow", timestamp: "2026-03-16 12:45", type: "registration" },
  { id: 10, action: "Vehicle listing edited", actor: "Ama Serwaa", target: "Ashanti Heavy Haul - Volvo FH16", timestamp: "2026-03-15 14:30", type: "edit" },
];

export const regionStats = [
  { region: "Greater Accra", operators: 3, vehicles: 5 },
  { region: "Ashanti", operators: 2, vehicles: 4 },
  { region: "Central", operators: 1, vehicles: 1 },
  { region: "Volta", operators: 1, vehicles: 1 },
  { region: "Northern", operators: 1, vehicles: 1 },
  { region: "Western", operators: 1, vehicles: 1 },
  { region: "Eastern", operators: 1, vehicles: 0 },
  { region: "Bono", operators: 1, vehicles: 1 },
];

export const monthlyData = [
  { month: "Oct", registrations: 4, trips: 187 },
  { month: "Nov", registrations: 2, trips: 213 },
  { month: "Dec", registrations: 3, trips: 198 },
  { month: "Jan", registrations: 5, trips: 245 },
  { month: "Feb", registrations: 3, trips: 267 },
  { month: "Mar", registrations: 4, trips: 312 },
];
