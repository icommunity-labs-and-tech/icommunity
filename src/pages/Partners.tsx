import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Code2, ShieldCheck, Landmark, Globe2, Handshake,
  Server, BadgeCheck, Blocks, Building2, FolderGit2,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import ContactModal from "@/components/home/ContactModal";
import type { OrganizationType } from "@/components/home/ContactModal";

import logoAenor from "@/assets/logo-aenor.png";
import logoAytoMadrid from "@/assets/logo-ayto-madrid.png";
import logoDatia from "@/assets/logo-datia.png";
import logoLogalty from "@/assets/logo-logalty.png";
import logoSalusCoop from "@/assets/logo-saluscoop.png";
import logoAirtrace from "@/assets/logo-airtrace.png";
import logoEstrella from "@/assets/logo-estrella.png";
import logoCertifika from "@/assets/logo-certifika.png";
import logoLidl from "@/assets/logo-lidl.png";
import logoCdti from "@/assets/logo-cdti.jpg";
import logoEnisa from "@/assets/logo-enisa.jpg";
import logoFeder from "@/assets/logo-feder.png";
import logoCofinanciadoUe from "@/assets/logo-cofinanciado-ue.png";

/* ── Section wrapper ─────────────────────────── */
const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`ic-section ${className}`}>{children}</section>
);

/* ── Fade-in wrapper ─────────────────────────── */
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

/* ── Data ─────────────────────────────────────── */
const collaborationBlocks = [
  {
    icon: Code2,
    title: "Integración tecnológica",
    text: "Integración vía API con plataformas SaaS, sistemas sectoriales y soluciones empresariales.",
  },
  {
    icon: ShieldCheck,
    title: "Certificación y supervisión",
    text: "Preparado para validación por certificadoras, auditores y organismos reguladores.",
  },
  {
    icon: Landmark,
    title: "Proyectos institucionales",
    text: "Participación en consorcios, proyectos europeos y marcos regulatorios sectoriales.",
  },
];

const partnerTypes = [
  { icon: Server, title: "Plataformas SaaS", desc: "Integración de evidencia verificable en productos digitales." },
  { icon: BadgeCheck, title: "Entidades certificadoras", desc: "Infraestructura probatoria para procesos de certificación." },
  { icon: Blocks, title: "Integradores tecnológicos", desc: "Componentes de confianza para soluciones empresariales." },
  { icon: Building2, title: "Administraciones públicas", desc: "Evidencia verificable en procesos regulados e institucionales." },
  { icon: FolderGit2, title: "Proyectos europeos", desc: "Trazabilidad y cumplimiento en consorcios de I+D+i." },
];

const logos = [
  { src: logoAenor, alt: "AENOR" },
  { src: logoAytoMadrid, alt: "Ayuntamiento de Madrid" },
  { src: logoLogalty, alt: "Logalty" },
  { src: logoSalusCoop, alt: "Salus Coop" },
  { src: logoAirtrace, alt: "AirTrace" },
  { src: logoEstrella, alt: "Estrella Galicia" },
  { src: logoEnisa, alt: "ENISA" },
];

/* ── Page ─────────────────────────────────────── */
const Partners = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [orgType, setOrgType] = useState<OrganizationType | undefined>();

  const openModal = (org?: OrganizationType) => {
    setOrgType(org);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onOpenModal={() => openModal()} />

      {/* ── HERO ──────────────────────────────── */}
      <div className="hero pt-16">
        <div className="hero-aurora" />
        <div className="hero-noise" />
        <div className="hero-content">
          <Section className="py-28 md:py-36">
            <div className="ic-container text-center max-w-3xl mx-auto">
              <FadeIn>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground tracking-tight leading-[1.1] mb-6">
                  Ecosistema de Integración{" "}
                  <span className="ic-text-gradient">y Confianza</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="text-base md:text-lg text-primary-foreground/60 leading-relaxed max-w-2xl mx-auto mb-10">
                  iCommunity opera como infraestructura de evidencia verificable dentro de un ecosistema técnico, institucional y regulatorio interoperable.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <a
                  href="#modelo"
                  className="inline-flex items-center gap-2 rounded-lg ic-gradient-cta px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                >
                  Explorar modelo de colaboración
                  <ArrowRight className="w-4 h-4" />
                </a>
              </FadeIn>
            </div>
          </Section>
        </div>
      </div>

      {/* ── MODELO DE COLABORACIÓN ────────────── */}
      <Section>
        <div id="modelo" className="ic-container max-w-5xl scroll-mt-24">
          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Modelo de <span className="ic-text-gradient">colaboración</span>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {collaborationBlocks.map((b, i) => (
              <FadeIn key={b.title} delay={i * 0.1}>
                <div className="ic-card flex flex-col items-start gap-4 h-full">
                  <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center">
                    <b.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      {/* ── TIPOLOGÍAS DE PARTNERS ────────────── */}
      <Section className="bg-secondary/30">
        <div className="ic-container max-w-5xl">
          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Tipologías de <span className="ic-text-gradient">partners</span>
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {partnerTypes.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.08}>
                <div className="rounded-2xl border border-border bg-card p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
                    <p.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">{p.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      {/* ── LOGOS ─────────────────────────────── */}
      <Section>
        <div className="ic-container max-w-5xl">
          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Confían en la <span className="ic-text-gradient">infraestructura</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {logos.map((l, i) => (
              <FadeIn key={l.alt} delay={i * 0.04}>
                <div className="flex items-center justify-center rounded-2xl border border-border bg-card p-8 h-28 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                  <img
                    src={l.src}
                    alt={l.alt}
                    className="max-h-10 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      {/* ── CTA FINAL ────────────────────────── */}
      <Section className="bg-secondary/30">
        <div className="ic-container max-w-3xl text-center">
          <FadeIn>
            <p className="text-xl md:text-2xl font-semibold text-foreground mb-8 leading-snug">
              Infraestructura interoperable para{" "}
              <span className="ic-text-gradient">sistemas regulados.</span>
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <button
              onClick={() => openModal("partner-integrador")}
              className="inline-flex items-center gap-2 rounded-lg ic-gradient-cta px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
            >
              Solicitar colaboración
              <ArrowRight className="w-4 h-4" />
            </button>
          </FadeIn>
        </div>
      </Section>

      <Footer />
      <ContactModal open={modalOpen} onOpenChange={setModalOpen} defaultOrgType={orgType} />
    </div>
  );
};

export default Partners;
