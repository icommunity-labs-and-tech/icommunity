import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Code2, ShieldCheck, Landmark, Globe2, Handshake, Server, BadgeCheck, Blocks, Building2, FolderGit2, ArrowRight } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import ContactModal from "@/components/home/ContactModal";
import type { OrganizationType } from "@/components/home/ContactModal";
import { useLanguage } from "@/i18n/LanguageContext";

import logoNexta from "@/assets/logo-nexta.jpg";
import logoMadrid from "@/assets/logo-ayto-madrid-bw.png";
import logoAcbp from "@/assets/logo-acbp.jpg";
import logoAhora from "@/assets/logo-ahora.jpg";
import logoAlpha from "@/assets/logo-alpha.jpg";
import logoAmapala from "@/assets/logo-amapala.jpg";
import logoAmypro from "@/assets/logo-amypro.jpg";
import logoTkAnalytics from "@/assets/logo-tk-analytics.jpg";

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (<section className={`ic-section ${className}`}>{children}</section>);
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (<motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay }} className={className}>{children}</motion.div>);
};

const texts = {
  en: {
    heroTitle: "Integration & Trust ",
    heroSpan: "Ecosystem",
    heroSub: "iCommunity operates as verifiable evidence infrastructure within an interoperable technical, institutional, and regulatory ecosystem.",
    heroCta: "Explore collaboration model",
    modelTitle: "Collaboration <span>model</span>",
    collabs: [
      { icon: Code2, title: "Technology integration", text: "API integration with SaaS platforms, sector systems, and enterprise solutions." },
      { icon: ShieldCheck, title: "Certification and oversight", text: "Ready for validation by certification bodies, auditors, and regulatory agencies." },
      { icon: Landmark, title: "Institutional projects", text: "Participation in consortia, European projects, and sector regulatory frameworks." },
    ],
    typesTitle: "Partner <span>types</span>",
    partnerTypes: [
      { icon: Server, title: "SaaS Platforms", desc: "Verifiable evidence integration in digital products." },
      { icon: BadgeCheck, title: "Certification bodies", desc: "Evidentiary infrastructure for certification processes." },
      { icon: Blocks, title: "Technology integrators", desc: "Trust components for enterprise solutions." },
      { icon: Building2, title: "Public administrations", desc: "Verifiable evidence in regulated and institutional processes." },
      { icon: FolderGit2, title: "European projects", desc: "Traceability and compliance in R&D&I consortia." },
    ],
    trustTitle: "They trust the <span>infrastructure</span>",
    ctaText: "Interoperable infrastructure for <span>regulated systems.</span>",
    ctaButton: "Request collaboration",
    madridAlt: "Madrid City Council",
  },
  es: {
    heroTitle: "Ecosistema de Integración y ",
    heroSpan: "Confianza",
    heroSub: "iCommunity opera como infraestructura de evidencia verificable dentro de un ecosistema técnico, institucional y regulatorio interoperable.",
    heroCta: "Explorar modelo de colaboración",
    modelTitle: "Modelo de <span>colaboración</span>",
    collabs: [
      { icon: Code2, title: "Integración tecnológica", text: "Integración API con plataformas SaaS, sistemas sectoriales y soluciones empresariales." },
      { icon: ShieldCheck, title: "Certificación y supervisión", text: "Listo para validación por organismos de certificación, auditores y agencias regulatorias." },
      { icon: Landmark, title: "Proyectos institucionales", text: "Participación en consorcios, proyectos europeos y marcos regulatorios sectoriales." },
    ],
    typesTitle: "Tipos de <span>partner</span>",
    partnerTypes: [
      { icon: Server, title: "Plataformas SaaS", desc: "Integración de evidencia verificable en productos digitales." },
      { icon: BadgeCheck, title: "Organismos de certificación", desc: "Infraestructura probatoria para procesos de certificación." },
      { icon: Blocks, title: "Integradores tecnológicos", desc: "Componentes de confianza para soluciones empresariales." },
      { icon: Building2, title: "Administraciones públicas", desc: "Evidencia verificable en procesos regulados e institucionales." },
      { icon: FolderGit2, title: "Proyectos europeos", desc: "Trazabilidad y cumplimiento en consorcios de I+D+i." },
    ],
    trustTitle: "Confían en la <span>infraestructura</span>",
    ctaText: "Infraestructura interoperable para <span>sistemas regulados.</span>",
    ctaButton: "Solicitar colaboración",
    madridAlt: "Ayuntamiento de Madrid",
  },
};

const Partners = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [orgType, setOrgType] = useState<OrganizationType | undefined>();
  const { lang } = useLanguage();
  const t = texts[lang];

  const openModal = (org?: OrganizationType) => { setOrgType(org); setModalOpen(true); };

  const logos = [
    { src: logoNexta, alt: "Nexta Digital Strategy" },
    { src: logoMadrid, alt: t.madridAlt },
    { src: logoAcbp, alt: "ACBP Soluciones Informáticas" },
    { src: logoAhora, alt: "Ahora" },
    { src: logoAlpha, alt: "Alpha Consulting" },
    { src: logoAmapala, alt: "Amapala" },
    { src: logoAmypro, alt: "AmyPro ECM Solutions" },
    { src: logoTkAnalytics, alt: "TK Analytics Group" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar onOpenModal={() => openModal()} />
      <div className="hero pt-16"><div className="hero-aurora" /><div className="hero-noise" /><div className="hero-content">
        <Section className="py-28 md:py-36"><div className="ic-container text-center max-w-3xl mx-auto">
          <FadeIn><h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground tracking-tight leading-[1.1] mb-6">{t.heroTitle}<span className="ic-text-gradient-light">{t.heroSpan}</span></h1></FadeIn>
          <FadeIn delay={0.1}><p className="text-base md:text-lg text-primary-foreground/60 leading-relaxed max-w-2xl mx-auto mb-10">{t.heroSub}</p></FadeIn>
          <FadeIn delay={0.2}><a href="#model" className="inline-flex items-center gap-2 rounded-lg ic-gradient-cta px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">{t.heroCta}<ArrowRight className="w-4 h-4" /></a></FadeIn>
        </div></Section>
      </div></div>

      <Section><div id="model" className="ic-container max-w-5xl scroll-mt-24">
        <FadeIn className="text-center mb-14"><h2 className="text-3xl md:text-4xl font-bold text-foreground" dangerouslySetInnerHTML={{ __html: t.modelTitle.replace("<span>", '<span class="ic-text-gradient">').replace("</span>", "</span>") }} /></FadeIn>
        <div className="grid md:grid-cols-3 gap-6">{t.collabs.map((b, i) => (
          <FadeIn key={b.title} delay={i * 0.1}><div className="ic-card flex flex-col items-start gap-4 h-full"><div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center"><b.icon className="w-5 h-5 text-primary" /></div><h3 className="text-lg font-semibold text-foreground">{b.title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{b.text}</p></div></FadeIn>
        ))}</div>
      </div></Section>

      <Section className="bg-secondary/30"><div className="ic-container max-w-5xl">
        <FadeIn className="text-center mb-14"><h2 className="text-3xl md:text-4xl font-bold text-foreground" dangerouslySetInnerHTML={{ __html: t.typesTitle.replace("<span>", '<span class="ic-text-gradient">').replace("</span>", "</span>") }} /></FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{t.partnerTypes.map((p, i) => (
          <FadeIn key={p.title} delay={i * 0.08}><div className="rounded-2xl border border-border bg-card p-6 flex items-start gap-4"><div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0"><p.icon className="w-5 h-5 text-primary" /></div><div><h3 className="text-sm font-semibold text-foreground mb-1">{p.title}</h3><p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p></div></div></FadeIn>
        ))}</div>
      </div></Section>

      <Section><div className="ic-container max-w-5xl">
        <FadeIn className="text-center mb-14"><h2 className="text-3xl md:text-4xl font-bold text-foreground" dangerouslySetInnerHTML={{ __html: t.trustTitle.replace("<span>", '<span class="ic-text-gradient">').replace("</span>", "</span>") }} /></FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">{logos.map((l, i) => (
          <FadeIn key={l.alt} delay={i * 0.04}><div className="flex items-center justify-center rounded-2xl border border-border bg-card p-8 h-28 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"><img src={l.src} alt={l.alt} className="max-h-10 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" /></div></FadeIn>
        ))}</div>
      </div></Section>

      <Section className="bg-secondary/30"><div className="ic-container max-w-3xl text-center">
        <FadeIn><p className="text-xl md:text-2xl font-semibold text-foreground mb-8 leading-snug" dangerouslySetInnerHTML={{ __html: t.ctaText.replace("<span>", '<span class="ic-text-gradient">').replace("</span>", "</span>") }} /></FadeIn>
        <FadeIn delay={0.1}><button onClick={() => openModal("partner-integrador")} className="inline-flex items-center gap-2 rounded-lg ic-gradient-cta px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">{t.ctaButton}<ArrowRight className="w-4 h-4" /></button></FadeIn>
      </div></Section>

      <Footer />
      <ContactModal open={modalOpen} onOpenChange={setModalOpen} defaultOrgType={orgType} />
    </div>
  );
};

export default Partners;
