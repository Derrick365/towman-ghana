import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Users, Truck, MapPin } from "lucide-react";

const values = [
  { icon: Shield, title: "Trust & Safety", desc: "Every operator is verified before joining our platform. We maintain strict standards to protect both operators and customers." },
  { icon: Users, title: "Community First", desc: "We're building a network that supports Ghanaian tow operators with fair pricing and reliable work opportunities." },
  { icon: Truck, title: "Reliable Service", desc: "Our platform ensures rapid response times by connecting you with the nearest available tow truck operator." },
  { icon: MapPin, title: "Nationwide Coverage", desc: "From Accra to Tamale, we're expanding across all 16 regions of Ghana to serve every motorist in need." },
];

const team = [
  { name: "Kofi Mensah", role: "Founder & CEO", initials: "KM" },
  { name: "Ama Darko", role: "Head of Operations", initials: "AD" },
  { name: "Yaw Boateng", role: "Lead Developer", initials: "YB" },
  { name: "Efua Ansah", role: "Community Manager", initials: "EA" },
];

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* Hero */}
    <div className="bg-primary pt-20 pb-16 px-6">
      <div className="container mx-auto max-w-3xl text-center">
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-primary-foreground mb-4 animate-reveal-up">
          About Towman Ghana
        </h1>
        <p className="text-primary-foreground/70 text-lg leading-relaxed animate-reveal-up" style={{ animationDelay: "0.1s" }}>
          We're on a mission to modernize roadside assistance across Ghana — connecting stranded motorists
          with trusted tow truck operators in minutes, not hours.
        </p>
      </div>
    </div>

    {/* Story */}
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-3xl space-y-6 text-muted-foreground leading-relaxed">
        <h2 className="text-2xl font-bold font-display text-foreground">Our Story</h2>
        <p>
          Towman Ghana was born out of a simple frustration: when your vehicle breaks down on a Ghanaian
          highway, finding a reliable tow truck is nearly impossible. Phone numbers scribbled on walls,
          word-of-mouth referrals, and long waits under the sun — we knew there had to be a better way.
        </p>
        <p>
          Founded in 2024, we set out to create the first centralized digital marketplace for tow truck
          services in Ghana. Our platform connects vehicle owners with verified operators, providing
          transparent pricing, real-time availability, and peace of mind when you need it most.
        </p>
        <p>
          Today, we serve operators across multiple regions and continue to grow. Our vision is simple:
          no Ghanaian motorist should ever feel stranded.
        </p>
      </div>
    </section>

    {/* Values */}
    <section className="py-16 px-6 bg-muted/40">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold font-display text-foreground text-center mb-12">Our Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div key={v.title} className="bg-card rounded-xl p-6 border border-border text-center space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                <v.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold font-display text-foreground">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold font-display text-foreground mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {team.map((t) => (
            <div key={t.name} className="space-y-3">
              <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold font-display mx-auto">
                {t.initials}
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default About;
