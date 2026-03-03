import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Shield, Globe2, Scale, ArrowRight, Send,
} from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import heroImg from "@/assets/hero-empresa.png";

/* ── Fade-in ─────────────────────────────────── */
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ── Section ─────────────────────────────────── */
const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`ic-section ${className}`}>{children}</section>
);

/* ── Data ─────────────────────────────────────── */
const principles = [
  {
    icon: Shield,
    title: "Independencia",
    text: "Infraestructura neutral, no dependiente de operadores específicos.",
  },
  {
    icon: Globe2,
    title: "Interoperabilidad",
    text: "Integración con sistemas empresariales y marcos regulatorios.",
  },
  {
    icon: Scale,
    title: "Preparación regulatoria",
    text: "Diseñada para auditoría y supervisión desde su concepción.",
  },
];

const interestOptions = [
  "Integración tecnológica",
  "Supervisión regulatoria",
  "Proyecto institucional",
  "Colaboración estratégica",
  "Información general",
];

/* ── Page ─────────────────────────────────────── */
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

      toast({ title: "Mensaje enviado", description: "Responderemos en un plazo aproximado de 48 horas." });
      form.reset();
      setInterest("");
    } catch {
      toast({ title: "Error", description: "No se pudo enviar el mensaje. Inténtalo de nuevo.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── HERO ──────────────────────────────── */}
      <div className="hero pt-16">
        <div className="hero-aurora" />
        <div className="hero-noise" />
        <div className="hero-content">
          <Section className="py-28 md:py-36">
            <div className="ic-container grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <FadeIn>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground tracking-tight leading-[1.1] mb-6">
                    Infraestructura tecnológica independiente{" "}
                    <span className="ic-text-gradient">para sistemas regulados</span>
                  </h1>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <p className="text-base md:text-lg text-primary-foreground/60 leading-relaxed max-w-xl">
                    iCommunity desarrolla y opera infraestructura de evidencia verificable preparada para auditoría, supervisión y cumplimiento regulatorio desde el origen.
                  </p>
                </FadeIn>
              </div>
              <FadeIn delay={0.2} className="hidden md:block">
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/30 border border-primary-foreground/10">
                  <img
                    src={heroImg}
                    alt="Infraestructura tecnológica institucional"
                    className="w-full h-auto object-cover"
                    loading="eager"
                  />
                </div>
              </FadeIn>
            </div>
          </Section>
        </div>
      </div>

      {/* ── MISIÓN ────────────────────────────── */}
      <Section>
        <div className="ic-container max-w-3xl text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Nuestra <span className="ic-text-gradient">misión</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Transformar procesos digitales en evidencia verificable, interoperable y preparada para supervisión regulatoria. Diseñamos infraestructura neutral que permite a organizaciones públicas y privadas operar con integridad probatoria desde el origen.
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* ── PRINCIPIOS ────────────────────────── */}
      <Section className="bg-secondary/30">
        <div className="ic-container max-w-5xl">
          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Nuestros <span className="ic-text-gradient">principios</span>
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

      {/* ── ENFOQUE EUROPEO ───────────────────── */}
      <Section>
        <div className="ic-container max-w-3xl text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Compromiso con estándares y{" "}
              <span className="ic-text-gradient">regulación europea</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Alineados con marcos regulatorios europeos y proyectos institucionales, desarrollamos infraestructura preparada para entornos regulados y supervisión pública.
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* ── CONTACTO INSTITUCIONAL ────────────── */}
      <Section className="bg-secondary/30">
        <div className="ic-container max-w-2xl">
          <FadeIn className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Contacto <span className="ic-text-gradient">institucional</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border bg-card p-8 md:p-10 space-y-5 shadow-sm"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="emp-name" className="mb-1.5 block text-sm">Nombre *</Label>
                  <Input id="emp-name" name="emp-name" required placeholder="Tu nombre" maxLength={100} />
                </div>
                <div>
                  <Label htmlFor="emp-company" className="mb-1.5 block text-sm">Empresa *</Label>
                  <Input id="emp-company" name="emp-company" required placeholder="Tu empresa" maxLength={100} />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="emp-role" className="mb-1.5 block text-sm">Cargo *</Label>
                  <Input id="emp-role" name="emp-role" required placeholder="Tu cargo" maxLength={100} />
                </div>
                <div>
                  <Label htmlFor="emp-email" className="mb-1.5 block text-sm">Email *</Label>
                  <Input id="emp-email" name="emp-email" type="email" required placeholder="tu@empresa.com" maxLength={255} />
                </div>
              </div>

              <div>
                <Label className="mb-1.5 block text-sm">Tipo de interés *</Label>
                <Select value={interest} onValueChange={setInterest} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    {interestOptions.map((opt) => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="emp-message" className="mb-1.5 block text-sm">Mensaje</Label>
                <Textarea id="emp-message" name="emp-message" placeholder="Describe tu consulta..." rows={4} maxLength={1000} />
              </div>

              <Button
                type="submit"
                disabled={!interest || sending}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg ic-gradient-cta px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
              >
                {sending ? "Enviando..." : "Contactar con iCommunity"}
                {!sending && <Send className="w-4 h-4" />}
              </Button>

              <p className="text-xs text-muted-foreground text-center pt-1">
                Responderemos en un plazo aproximado de 48 horas.
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
