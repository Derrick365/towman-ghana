import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const faqs = [
  { q: "How does Towman Ghana work?", a: "Towman Ghana connects vehicle owners with verified tow truck operators across Ghana. Simply browse available operators, view their ratings and pricing, and submit a tow request. The operator will confirm and come to your location." },
  { q: "How much does a tow cost?", a: "Towing prices vary by operator, vehicle type, and distance. Each operator sets their own pricing, which is displayed on their profile. Prices typically range from GH₵ 250 to GH₵ 950+ per trip depending on the service required." },
  { q: "How do I become a registered operator?", a: "Click 'Register Free' and fill in your details including business name, vehicle information, and service area. Our team will verify your documentation and approve your profile within 24-48 hours." },
  { q: "Is there a fee to register as an operator?", a: "Registration on Towman Ghana is currently free. We may introduce optional premium features in the future, but basic registration and listing will always remain free." },
  { q: "What areas do you cover?", a: "We currently have operators in all 16 regions of Ghana, with the highest concentration in Greater Accra, Ashanti, and Central regions. We're actively expanding coverage nationwide." },
  { q: "How are operators verified?", a: "All operators undergo a verification process that includes license validation, vehicle inspection documentation, insurance verification, and background checks. Only approved operators appear on the platform." },
  { q: "What if I have a problem with an operator?", a: "You can rate and review operators after each service. If you experience a serious issue, contact us at hello@towmanghana.com or call +233 24 120 4040 and our team will investigate and take appropriate action." },
  { q: "Can I request a specific type of tow truck?", a: "Yes! You can filter operators by vehicle type including Flatbed, Wheel-Lift, Heavy Duty, Carrier, and Rollback. Choose the type that best suits your vehicle and situation." },
  { q: "How quickly can I get a tow truck?", a: "Response times depend on your location and operator availability. In urban areas like Accra and Kumasi, operators typically respond within 30-60 minutes. Rural areas may take longer." },
  { q: "Do you offer 24/7 service?", a: "Many operators on our platform offer 24/7 emergency towing. Check individual operator profiles for their availability hours. You can also filter for currently available operators." },
];

const FAQ = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="bg-primary pt-20 pb-12 px-6">
      <div className="container mx-auto max-w-3xl text-center">
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-primary-foreground animate-reveal-up">
          Frequently Asked Questions
        </h1>
        <p className="text-primary-foreground/60 mt-2 animate-reveal-up" style={{ animationDelay: "0.1s" }}>
          Everything you need to know about Towman Ghana
        </p>
      </div>
    </div>

    <section className="py-16 px-6">
      <div className="container mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border px-5">
              <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12 space-y-3">
          <p className="text-muted-foreground text-sm">Still have questions?</p>
          <Button asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default FAQ;
