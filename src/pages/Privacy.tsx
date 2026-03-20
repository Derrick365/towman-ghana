import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  { title: "1. Information We Collect", content: "We collect personal information you provide when registering, including your name, email address, phone number, and location. For operators, we also collect vehicle details, license information, and service area preferences. We automatically collect usage data such as IP addresses, browser type, and pages visited." },
  { title: "2. How We Use Your Information", content: "We use your information to provide and improve our services, connect users with operators, process service requests, communicate updates and promotions, ensure platform security, and comply with legal obligations. We do not sell your personal information to third parties." },
  { title: "3. Information Sharing", content: "We share your information only as necessary to facilitate towing services (e.g., sharing your location with an operator you've requested). We may also share data with service providers who assist in platform operations, or when required by law." },
  { title: "4. Data Security", content: "We implement industry-standard security measures to protect your data, including encryption, secure servers, and access controls. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security." },
  { title: "5. Your Rights", content: "You have the right to access, correct, or delete your personal information. You may request a copy of your data or ask us to stop processing it. To exercise these rights, contact us at privacy@towmanghana.com." },
  { title: "6. Cookies", content: "We use cookies and similar technologies to enhance your browsing experience, analyze platform usage, and personalize content. You can manage cookie preferences through your browser settings." },
  { title: "7. Data Retention", content: "We retain your personal information for as long as your account is active or as needed to provide services. We may retain certain data for longer periods as required by law or for legitimate business purposes." },
  { title: "8. Children's Privacy", content: "Our platform is not intended for users under 18 years of age. We do not knowingly collect personal information from children. If we learn that we have collected data from a child, we will delete it promptly." },
  { title: "9. Changes to This Policy", content: "We may update this Privacy Policy from time to time. We will notify you of significant changes by posting a notice on our platform. Your continued use constitutes acceptance of the updated policy." },
];

const Privacy = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="bg-primary pt-20 pb-12 px-6">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-primary-foreground animate-reveal-up">Privacy Policy</h1>
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

export default Privacy;
