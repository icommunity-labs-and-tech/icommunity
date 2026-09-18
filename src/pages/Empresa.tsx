import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Shield, Globe2, Scale, Send } from "lucide-react";
import PageSEO from "@/components/PageSEO";
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
import { useLanguage } from "@/i18n/LanguageContext";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (<motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay }} className={className}>{children}</motion.div>);
};

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (<section className={`ic-section ${className}`}>{children}</section>);

const texts = {
  en: {
    heroTitle: "Independent technology infrastructure ",
    heroSpan: "for regulated systems",
    heroSub: "iCommunity develops and operates verifiable evidence infrastructure ready for audit, oversight, and regulatory compliance from the origin.",
    heroImgAlt: "Institutional technology infrastructure",
    missionTitle: "Our <span>mission</span>",
    missionText: "Transform digital processes into verifiable, interoperable evidence ready for regulatory oversight. We design neutral infrastructure that enables public and private organizations to operate with evidentiary integrity from the origin.",
    principlesTitle: "Our <span>principles</span>",
    principles: [
      { icon: Shield, title: "Independence", text: "Neutral infrastructure, not dependent on specific operators." },
      { icon: Globe2, title: "Interoperability", text: "Integration with enterprise systems and regulatory frameworks." },
      { icon: Scale, title: "Regulatory readiness", text: "Designed for audit and oversight from its conception." },
    ],
    euTitle: "Commitment to European ",
    euSpan: "standards and regulation",
    euText: "Aligned with European regulatory frameworks and institutional projects, we develop infrastructure ready for regulated environments and public oversight.",
    contactTitle: "Interested? <span>Contact us</span>",
    name: "Name *", namePh: "Your name",
    company: "Company *", companyPh: "Your company",
    role: "Role *", rolePh: "Your role",
    email: "Email *", emailPh: "you@company.com",
    country: "Country *", countryPh: "Country",
    interest: "Type of interest *", interestPh: "Select an option",
    interestOptions: ["Technology integration", "Regulatory oversight", "Institutional project", "Strategic collaboration", "General information"],
    message: "Message", messagePh: "Describe your inquiry...",
    submit: "Contact iCommunity", sending: "Sending...",
    footer: "We will respond within approximately 48 hours.",
    successTitle: "Message sent", successDesc: "We will respond within approximately 48 hours.",
    errorTitle: "Error", errorDesc: "Could not send the message. Please try again.",
  },
  es: {
    heroTitle: "Infraestructura tecnológica independiente ",
    heroSpan: "para sistemas regulados",
    heroSub: "iCommunity desarrolla y opera infraestructura de evidencia verificable preparada para auditoría, supervisión y cumplimiento regulatorio desde el origen.",
    heroImgAlt: "Infraestructura tecnológica institucional",
    missionTitle: "Nuestra <span>misión</span>",
    missionText: "Transformar procesos digitales en evidencia verificable, interoperable y preparada para supervisión regulatoria. Diseñamos infraestructura neutral que permite a organizaciones públicas y privadas operar con integridad probatoria desde el origen.",
    principlesTitle: "Nuestros <span>principios</span>",
    principles: [
      { icon: Shield, title: "Independencia", text: "Infraestructura neutral, no dependiente de operadores específicos." },
      { icon: Globe2, title: "Interoperabilidad", text: "Integración con sistemas empresariales y marcos regulatorios." },
      { icon: Scale, title: "Preparación regulatoria", text: "Diseñada para auditoría y supervisión desde su concepción." },
    ],
    euTitle: "Compromiso con estándares y ",
    euSpan: "regulación europea",
    euText: "Alineados con marcos regulatorios europeos y proyectos institucionales, desarrollamos infraestructura preparada para entornos regulados y supervisión pública.",
    contactTitle: "¿Interesado? <span>Contáctanos</span>",
    name: "Nombre *", namePh: "Tu nombre",
    company: "Empresa *", companyPh: "Tu empresa",
    role: "Cargo *", rolePh: "Tu cargo",
    email: "Email *", emailPh: "tu@empresa.com",
    country: "País *", countryPh: "País",
    interest: "Tipo de interés *", interestPh: "Seleccionar opción",
    interestOptions: ["Integración tecnológica", "Supervisión regulatoria", "Proyecto institucional", "Colaboración estratégica", "Información general"],
    message: "Mensaje", messagePh: "Describe tu consulta...",
    submit: "Contactar con iCommunity", sending: "Enviando...",
    footer: "Responderemos en un plazo aproximado de 48 horas.",
    successTitle: "Mensaje enviado", successDesc: "Responderemos en un plazo aproximado de 48 horas.",
    errorTitle: "Error", errorDesc: "No se pudo enviar el mensaje. Inténtelo de nuevo.",
  },
};

const Empresa = () => {
  const [sending, setSending] = useState(false);
  const [interest, setInterest] = useState("");
  const { toast } = useToast();
  const { lang } = useLanguage();
  const t = texts[lang];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      const { error } = await supabase.functions.invoke("send-email", { body: { type: "contact", data: { name: fd.get("emp-name"), company: fd.get("emp-company"), role: fd.get("emp-role"), email: fd.get("emp-email"), orgType: interest, message: fd.get("emp-message") } } });
      if (error) throw error;
      toast({ title: t.successTitle, description: t.successDesc });
      form.reset();
      setInterest("");
    } catch {
      toast({ title: t.errorTitle, description: t.errorDesc, variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Company"
        description="Learn about iCommunity's mission, principles and commitment to European standards for regulated systems."
        path="/empresa"
        lang="en"
      />
      <Navbar />
      <div className="hero pt-16"><div className="hero-aurora" /><div className="hero-noise" /><div className="hero-content">
        <Section className="py-28 md:py-36">
          <div className="ic-container grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <FadeIn><h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground tracking-tight leading-[1.1] mb-6">{t.heroTitle}<span className="ic-text-gradient-light">{t.heroSpan}</span></h1></FadeIn>
              <FadeIn delay={0.1}><p className="text-base md:text-lg text-primary-foreground/60 leading-relaxed max-w-xl">{t.heroSub}</p></FadeIn>
            </div>
            <FadeIn delay={0.2} className="hidden md:block"><div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/30 border border-primary-foreground/10"><img src={heroImg} alt={t.heroImgAlt} className="w-full h-auto object-cover" loading="eager" /></div></FadeIn>
          </div>
        </Section>
      </div></div>

      <Section><div className="ic-container max-w-3xl text-center">
        <FadeIn><h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" dangerouslySetInnerHTML={{ __html: t.missionTitle.replace("<span>", '<span class="ic-text-gradient">').replace("</span>", "</span>") }} /></FadeIn>
        <FadeIn delay={0.1}><p className="text-base md:text-lg text-muted-foreground leading-relaxed">{t.missionText}</p></FadeIn>
      </div></Section>

      <Section className="bg-secondary/30"><div className="ic-container max-w-5xl">
        <FadeIn className="text-center mb-14"><h2 className="text-3xl md:text-4xl font-bold text-foreground" dangerouslySetInnerHTML={{ __html: t.principlesTitle.replace("<span>", '<span class="ic-text-gradient">').replace("</span>", "</span>") }} /></FadeIn>
        <div className="grid md:grid-cols-3 gap-6">{t.principles.map((p, i) => (
          <FadeIn key={p.title} delay={i * 0.1}><div className="ic-card flex flex-col items-start gap-4 h-full"><div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center"><p.icon className="w-5 h-5 text-primary" /></div><h3 className="text-lg font-semibold text-foreground">{p.title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p></div></FadeIn>
        ))}</div>
      </div></Section>

      <Section><div className="ic-container max-w-3xl text-center">
        <FadeIn><h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{t.euTitle}<span className="ic-text-gradient">{t.euSpan}</span></h2></FadeIn>
        <FadeIn delay={0.1}><p className="text-base md:text-lg text-muted-foreground leading-relaxed">{t.euText}</p></FadeIn>
      </div></Section>

      <Section className="bg-secondary/30"><div className="ic-container max-w-lg">
        <FadeIn className="text-center mb-10"><h2 className="text-3xl md:text-4xl font-bold text-foreground" dangerouslySetInnerHTML={{ __html: t.contactTitle.replace("<span>", '<span class="ic-text-gradient">').replace("</span>", "</span>") }} /></FadeIn>
        <FadeIn delay={0.1}>
          <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-8 md:p-10 space-y-5 shadow-sm">
            <div className="grid sm:grid-cols-2 gap-5">
              <div><Label htmlFor="emp-name" className="mb-1.5 block text-sm">{t.name}</Label><Input id="emp-name" name="emp-name" required placeholder={t.namePh} maxLength={100} /></div>
              <div><Label htmlFor="emp-company" className="mb-1.5 block text-sm">{t.company}</Label><Input id="emp-company" name="emp-company" required placeholder={t.companyPh} maxLength={100} /></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div><Label htmlFor="emp-role" className="mb-1.5 block text-sm">{t.role}</Label><Input id="emp-role" name="emp-role" required placeholder={t.rolePh} maxLength={100} /></div>
              <div><Label htmlFor="emp-email" className="mb-1.5 block text-sm">{t.email}</Label><Input id="emp-email" name="emp-email" type="email" required placeholder={t.emailPh} maxLength={255} /></div>
            </div>
            <div>
              <Label className="mb-1.5 block text-sm">{t.interest}</Label>
              <Select value={interest} onValueChange={setInterest} required><SelectTrigger><SelectValue placeholder={t.interestPh} /></SelectTrigger><SelectContent>{t.interestOptions.map((opt) => (<SelectItem key={opt} value={opt}>{opt}</SelectItem>))}</SelectContent></Select>
            </div>
            <div><Label htmlFor="emp-message" className="mb-1.5 block text-sm">{t.message}</Label><Textarea id="emp-message" name="emp-message" placeholder={t.messagePh} rows={4} maxLength={1000} /></div>
             <div className="flex justify-center">
               <Button type="submit" disabled={!interest || sending} className="inline-flex items-center justify-center gap-2 rounded-lg ic-gradient-cta px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
                 {sending ? t.sending : t.submit}{!sending && <Send className="w-4 h-4" />}
               </Button>
             </div>
            <p className="text-xs text-muted-foreground text-center pt-1">{t.footer}</p>
          </form>
        </FadeIn>
      </div></Section>

      <Footer />
    </div>
  );
};

export default Empresa;
