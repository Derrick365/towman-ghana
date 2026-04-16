import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Users, Truck, FileCheck, AlertTriangle, Scale, Lock, Phone } from "lucide-react";

const sections = [
  {
    icon: Scale,
    title: "1. Regulatory Framework",
    content: "Towman Ghana operates in compliance with the laws of the Republic of Ghana, including the Road Traffic Act, 2004 (Act 683), the Road Traffic Regulations, 2012 (L.I. 2180), the Driver and Vehicle Licensing Authority (DVLA) regulations, and the National Road Safety Authority Act, 2019 (Act 993). All operators on the platform must comply with these statutes and any applicable municipal by-laws."
  },
  {
    icon: FileCheck,
    title: "2. Operator Licensing & Certification",
    content: "Every registered operator must hold: (a) a valid DVLA commercial vehicle licence, (b) a roadworthy certificate renewed annually, (c) a comprehensive motor insurance policy covering third-party liability, (d) a valid driver's licence appropriate to the towing vehicle class, and (e) a Ghana Revenue Authority (GRA) Tax Identification Number. Towman Ghana verifies these documents at onboarding and conducts periodic re-verification."
  },
  {
    icon: Users,
    title: "3. User Rights & Protections",
    content: "Users are entitled to: transparent pricing disclosed before service confirmation, the operator's verified identity and licence number, a written or digital receipt for every transaction, the right to refuse service if pricing or terms change without consent, and access to a formal dispute resolution process. Users may report misconduct via the Contact page or the in-app reporting feature."
  },
  {
    icon: Truck,
    title: "4. Operator Conduct Standards",
    content: "Operators must: respond truthfully to service requests, honour quoted prices, maintain professional conduct, refrain from price gouging during emergencies, secure vehicles properly during towing, and carry the customer's vehicle to the agreed destination only. Violation of these standards may lead to suspension or permanent removal from the platform."
  },
  {
    icon: Shield,
    title: "5. Data Protection (Data Protection Act, 2012 — Act 843)",
    content: "Towman Ghana is a registered data controller and processes personal data in accordance with the Data Protection Act, 2012 (Act 843). We collect only data necessary to provide the service, store it securely, and never sell it to third parties. Users and operators may request access, correction, or deletion of their data by writing to privacy@towmanghana.com. Our full Privacy Policy details retention periods and data subject rights."
  },
  {
    icon: Lock,
    title: "6. Payment & Financial Compliance",
    content: "All payment transactions processed through the platform comply with Bank of Ghana payment system regulations and the Payment Systems and Services Act, 2019 (Act 987). Where mobile money or card payments are facilitated, we work only with licensed payment service providers. Operators are responsible for issuing VAT invoices where applicable and remitting tax obligations to the GRA."
  },
  {
    icon: AlertTriangle,
    title: "7. Insurance & Liability",
    content: "Towman Ghana is a marketplace and not a service provider. We do not own tow trucks or employ drivers. Liability for damage, loss, or injury arising from a towing service rests with the operator and their insurer. Users are encouraged to inspect their vehicle before and after service and to document any pre-existing damage. Operators must carry minimum third-party insurance as required by law."
  },
  {
    icon: Scale,
    title: "8. Consumer Protection",
    content: "In accordance with consumer protection principles upheld by the Ghana Standards Authority and the Consumer Protection Agency, users have the right to fair treatment, accurate information, and redress for sub-standard services. Disputes that cannot be resolved through our internal process may be escalated to the relevant consumer protection authority or the courts of Ghana."
  },
  {
    icon: AlertTriangle,
    title: "9. Anti-Fraud & Anti-Money Laundering",
    content: "Towman Ghana complies with the Anti-Money Laundering Act, 2020 (Act 1044). We monitor transactions for suspicious activity and may report concerns to the Financial Intelligence Centre. Fraudulent listings, fake reviews, identity misrepresentation, or any attempt to circumvent platform fees are strictly prohibited and may result in account termination and legal action."
  },
  {
    icon: Shield,
    title: "10. Health, Safety & Environmental Standards",
    content: "Operators must follow road safety practices, use appropriate towing equipment for the vehicle being recovered, and dispose of any spilled fluids in accordance with Environmental Protection Agency (EPA) guidelines. Night operations must include reflective gear and proper warning signals. Operators are encouraged to maintain first-aid kits and fire extinguishers."
  },
  {
    icon: Users,
    title: "11. Accessibility & Non-Discrimination",
    content: "Towman Ghana prohibits discrimination on the basis of gender, ethnicity, religion, disability, or socio-economic status. Operators may not refuse service for discriminatory reasons. The platform aims to remain accessible to users with disabilities and welcomes feedback to improve accessibility."
  },
  {
    icon: Phone,
    title: "12. Reporting & Dispute Resolution",
    content: "Complaints may be submitted through the Contact page, by email to compliance@towmanghana.com, or by phone at +233 24 120 4040. We acknowledge complaints within 48 hours and aim to resolve them within 14 working days. Unresolved disputes may be referred to mediation or to the appropriate Ghanaian court of competent jurisdiction."
  },
];

const LegalCompliance = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="bg-primary pt-20 pb-12 px-6">
      <div className="container mx-auto max-w-3xl">
        <div className="inline-flex items-center gap-2 text-secondary text-xs font-semibold uppercase tracking-wider mb-3 animate-reveal-up">
          <Shield className="w-4 h-4" /> Compliance
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-primary-foreground animate-reveal-up">
          Legal Compliance
        </h1>
        <p className="text-primary-foreground/70 mt-3 text-sm sm:text-base max-w-2xl animate-reveal-up" style={{ animationDelay: "0.1s" }}>
          The standards, statutes, and obligations that govern how Towman Ghana, our operators, and our users interact on the platform.
        </p>
        <p className="text-primary-foreground/50 mt-2 text-xs animate-reveal-up" style={{ animationDelay: "0.2s" }}>
          Last reviewed: March 2026
        </p>
      </div>
    </div>

    <section className="py-16 px-6">
      <div className="container mx-auto max-w-3xl space-y-8">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className="flex gap-4 p-5 rounded-xl border border-border bg-card hover:border-secondary/40 transition-colors">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h2 className="text-base sm:text-lg font-semibold font-display text-foreground">{s.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.content}</p>
              </div>
            </div>
          );
        })}

        <div className="mt-12 p-6 rounded-xl bg-primary/5 border border-primary/20">
          <h3 className="text-base font-semibold font-display text-foreground mb-2">Need to report a compliance concern?</h3>
          <p className="text-sm text-muted-foreground mb-1">Email: <span className="text-foreground">compliance@towmanghana.com</span></p>
          <p className="text-sm text-muted-foreground">Phone: <span className="text-foreground">+233 24 120 4040</span></p>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default LegalCompliance;
