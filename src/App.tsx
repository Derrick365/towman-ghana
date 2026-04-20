import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminAuthProvider } from "@/lib/admin-auth";
import CookieConsent from "@/components/CookieConsent";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

/* Lazy-loaded routes — reduces initial JS bundle for better Core Web Vitals */
const Listings = lazy(() => import("./pages/Listings.tsx"));
const OperatorDetail = lazy(() => import("./pages/OperatorDetail.tsx"));
const Register = lazy(() => import("./pages/Register.tsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.tsx"));
const AddVehicle = lazy(() => import("./pages/AddVehicle.tsx"));
const Login = lazy(() => import("./pages/Login.tsx"));
const About = lazy(() => import("./pages/About.tsx"));
const Terms = lazy(() => import("./pages/Terms.tsx"));
const Privacy = lazy(() => import("./pages/Privacy.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const FAQ = lazy(() => import("./pages/FAQ.tsx"));
const RequestTow = lazy(() => import("./pages/RequestTow.tsx"));
const Pricing = lazy(() => import("./pages/Pricing.tsx"));
const LegalCompliance = lazy(() => import("./pages/LegalCompliance.tsx"));
const OperatorDashboard = lazy(() => import("./pages/OperatorDashboard.tsx"));
const CityLanding = lazy(() => import("./pages/CityLanding.tsx"));
const Blog = lazy(() => import("./pages/Blog.tsx"));
const BlogPost = lazy(() => import("./pages/BlogPost.tsx"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin.tsx"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.tsx"));
const AdminOperators = lazy(() => import("./pages/admin/AdminOperators.tsx"));
const AdminVehicles = lazy(() => import("./pages/admin/AdminVehicles.tsx"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers.tsx"));
const AdminActivity = lazy(() => import("./pages/admin/AdminActivity.tsx"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AdminAuthProvider>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/operator/:id" element={<OperatorDetail />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-vehicle" element={<AddVehicle />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/request-tow" element={<RequestTow />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/legal-compliance" element={<LegalCompliance />} />
              <Route path="/operator-dashboard" element={<OperatorDashboard />} />
              {/* SEO: City-specific towing landing pages */}
              <Route path="/towing/:city" element={<CityLanding />} />
              {/* SEO: Blog content hub */}
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              {/* Admin */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/operators" element={<AdminOperators />} />
              <Route path="/admin/vehicles" element={<AdminVehicles />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/activity" element={<AdminActivity />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <CookieConsent />
        </AdminAuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
