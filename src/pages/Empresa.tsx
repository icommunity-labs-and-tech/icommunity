import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Shield, Globe2, Scale, Send } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import heroImg from "@/assets/hero-empresa.png";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay }} className={className}>
      {children}
    </motion.div>
  );
};

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`ic-section ${className}`}>{children}</section>
);

const principles = [
  { icon: Shield, title: "Independence", text: "Neutral infrastructure, not dependent on specific operators." },
  { icon: Globe2, title: "Interoperability", text: "Integration with enterprise systems and regulatory frameworks." },
  { icon: Scale, title: "Regulatory readiness", text: "Designed for audit and oversight from its conception." },
];

const interestOptions = [
  "Technology integration",
  "Regulatory oversight",
  "Institutional project",
  "Strategic collaboration",
  "General information",
];

const Empresa = () => {
  const [sending, setSending] = useState(false);
  const [interest, setInterest] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const form = e.currentTarget;
    const fd = new FormData(form);

    try {
      const { error } = await supabase.functions.invoke("send-email", {
        body: {
          type: "contact",
          data: {
            name: fd.get("emp-name"),
            company: fd.get("emp-company"),
            role: fd.get("emp-role"),
            email: fd.get("emp-email"),
            orgType: interest,
            message: fd.get("emp-message"),
          },
        },
      });

      if (error) throw error;

      toast({ title: "Message sent", description: "We will respond within approximately 48 hours." });
      form.reset();
      setInterest("");
    } catch {
      toast({ title: "Error", description: "Could not send the message. Please try again.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="hero pt-16">
        <div className="hero-aurora" />
        <div className="hero-noise" />
        <div className="hero-content">
          <Section className="py-28 md:py-36">
            <div className="ic-container grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <FadeIn>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground tracking-tight leading-[1.1] mb-6">
                    Independent technology infrastructure{" "}
                    <span className="ic-text-gradient">for regulated systems</span>
                  </h1>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <p className="text-base md:text-lg text-primary-foreground/60 leading-relaxed max-w-xl">
                    iCommunity develops and operates verifiable evidence infrastructure ready for audit, oversight, and regulatory compliance from the origin.
                  </p>
                </FadeIn>
              </div>
              <FadeIn delay={0.2} className="hidden md:block">
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/30 border border-primary-foreground/10">
                  <img src={heroImg} alt="Institutional technology infrastructure" className="w-full h-auto object-cover" loading="eager" />
                </div>
              </FadeIn>
            </div>
          </Section>
        </div>
      </div>

      <Section>
        <div className="ic-container max-w-3xl text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our <span className="ic-text-gradient">mission</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Transform digital processes into verifiable, interoperable evidence ready for regulatory oversight. We design neutral infrastructure that enables public and private organizations to operate with evidentiary integrity from the origin.
            </p>
          </FadeIn>
        </div>
      </Section>

      <Section className="bg-secondary/30">
        <div className="ic-container max-w-5xl">
          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Our <span className="ic-text-gradient">principles</span>
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {principles.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.1}>
                <div className="ic-card flex flex-col items-start gap-4 h-full">
                  <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center">
                    <p.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="ic-container max-w-3xl text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Commitment to European{" "}
              <span className="ic-text-gradient">standards and regulation</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Aligned with European regulatory frameworks and institutional projects, we develop infrastructure ready for regulated environments and public oversight.
            </p>
          </FadeIn>
        </div>
      </Section>

      <Section className="bg-secondary/30">
        <div className="ic-container max-w-2xl">
          <FadeIn className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Institutional <span className="ic-text-gradient">contact</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-8 md:p-10 space-y-5 shadow-sm">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="emp-name" className="mb-1.5 block text-sm">Name *</Label>
                  <Input id="emp-name" name="emp-name" required placeholder="Your name" maxLength={100} />
                </div>
                <div>
                  <Label htmlFor="emp-company" className="mb-1.5 block text-sm">Company *</Label>
                  <Input id="emp-company" name="emp-company" required placeholder="Your company" maxLength={100} />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="emp-role" className="mb-1.5 block text-sm">Role *</Label>
                  <Input id="emp-role" name="emp-role" required placeholder="Your role" maxLength={100} />
                </div>
                <div>
                  <Label htmlFor="emp-email" className="mb-1.5 block text-sm">Email *</Label>
                  <Input id="emp-email" name="emp-email" type="email" required placeholder="you@company.com" maxLength={255} />
                </div>
              </div>
              <div>
                <Label className="mb-1.5 block text-sm">Type of interest *</Label>
                <Select value={interest} onValueChange={setInterest} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {interestOptions.map((opt) => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="emp-message" className="mb-1.5 block text-sm">Message</Label>
                <Textarea id="emp-message" name="emp-message" placeholder="Describe your inquiry..." rows={4} maxLength={1000} />
              </div>
              <Button
                type="submit"
                disabled={!interest || sending}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg ic-gradient-cta px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
              >
                {sending ? "Sending..." : "Contact iCommunity"}
                {!sending && <Send className="w-4 h-4" />}
              </Button>
              <p className="text-xs text-muted-foreground text-center pt-1">
                We will respond within approximately 48 hours.
              </p>
            </form>
          </FadeIn>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default Empresa;
