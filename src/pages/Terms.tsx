import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  { title: "1. Acceptance of Terms", content: "By accessing or using the Towman Ghana platform, you agree to be bound by these Terms of Service. If you do not agree, you may not use the platform. These terms apply to all visitors, users, and operators registered on the platform." },
  { title: "2. Platform Description", content: "Towman Ghana is a marketplace that connects vehicle owners in need of towing services with registered tow truck operators. We do not directly provide towing services. We act as an intermediary platform facilitating connections between service seekers and service providers." },
  { title: "3. User Accounts", content: "You must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your login credentials. Towman Ghana reserves the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity." },
  { title: "4. Operator Obligations", content: "Registered operators must maintain valid licenses, insurance, and vehicle registrations. Operators must provide accurate information about their services, pricing, and availability. Any misrepresentation may result in account suspension or removal from the platform." },
  { title: "5. Service Requests & Payments", content: "Pricing displayed on the platform is set by individual operators. Towman Ghana does not guarantee specific pricing and is not responsible for disputes between users and operators regarding service fees. All payment arrangements are between the user and the operator." },
  { title: "6. Limitation of Liability", content: "Towman Ghana is not liable for any damages, injuries, or losses arising from the use of towing services arranged through the platform. We do not guarantee the quality, safety, or legality of services provided by operators listed on our platform." },
  { title: "7. Intellectual Property", content: "All content on the Towman Ghana platform, including text, graphics, logos, and software, is the property of Towman Ghana and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission." },
  { title: "8. Modifications", content: "We reserve the right to modify these Terms of Service at any time. Changes will be posted on this page with an updated effective date. Continued use of the platform after changes constitutes acceptance of the revised terms." },
  { title: "9. Governing Law", content: "These Terms of Service are governed by the laws of the Republic of Ghana. Any disputes arising from these terms shall be resolved in the courts of Ghana." },
];

const Terms = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="bg-primary pt-20 pb-12 px-6">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-primary-foreground animate-reveal-up">Terms of Service</h1>
        <p className="text-primary-foreground/60 mt-2 animate-reveal-up" style={{ animationDelay: "0.1s" }}>Last updated: March 2026</p>
      </div>
    </div>
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-3xl space-y-8">
        {sections.map((s) => (
          <div key={s.title} className="space-y-2">
            <h2 className="text-lg font-semibold font-display text-foreground">{s.title}</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">{s.content}</p>
          </div>
        ))}
      </div>
    </section>
    <Footer />
  </div>
);

export default Terms;
