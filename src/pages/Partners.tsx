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
import logoLogalty from "@/assets/logo-logalty.png";
import logoSalusCoop from "@/assets/logo-saluscoop.png";
import logoEstrella from "@/assets/logo-estrella.png";
import logoAyiGroup from "@/assets/logo-ayi-group.png";
import logoFinnovating from "@/assets/logo-finnovating.png";
import logoIfedes from "@/assets/logo-ifedes.png";
import logoIntegranova from "@/assets/logo-integranova.png";
import logoLiquid from "@/assets/logo-liquid.png";
import logoMrHouston from "@/assets/logo-mr-houston.png";

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`ic-section ${className}`}>{children}</section>
);

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay }} className={className}>
      {children}
    </motion.div>
  );
};

const collaborationBlocks = [
  { icon: Code2, title: "Technology integration", text: "API integration with SaaS platforms, sector systems, and enterprise solutions." },
  { icon: ShieldCheck, title: "Certification and oversight", text: "Ready for validation by certification bodies, auditors, and regulatory agencies." },
  { icon: Landmark, title: "Institutional projects", text: "Participation in consortia, European projects, and sector regulatory frameworks." },
];

const partnerTypes = [
  { icon: Server, title: "SaaS Platforms", desc: "Verifiable evidence integration in digital products." },
  { icon: BadgeCheck, title: "Certification bodies", desc: "Evidentiary infrastructure for certification processes." },
  { icon: Blocks, title: "Technology integrators", desc: "Trust components for enterprise solutions." },
  { icon: Building2, title: "Public administrations", desc: "Verifiable evidence in regulated and institutional processes." },
  { icon: FolderGit2, title: "European projects", desc: "Traceability and compliance in R&D&I consortia." },
];

const logos = [
  { src: logoAenor, alt: "AENOR" },
  { src: logoAytoMadrid, alt: "Madrid City Council" },
  { src: logoLogalty, alt: "Logalty" },
  { src: logoSalusCoop, alt: "Salus Coop" },
  { src: logoEstrella, alt: "Estrella Galicia" },
  { src: logoAyiGroup, alt: "AYI Group" },
  { src: logoFinnovating, alt: "Finnovating" },
  { src: logoIfedes, alt: "IFEDES" },
  { src: logoIntegranova, alt: "Integranova" },
  { src: logoLiquid, alt: "Liquid" },
  { src: logoMrHouston, alt: "Mr Houston" },
];

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

      <div className="hero pt-16">
        <div className="hero-aurora" />
        <div className="hero-noise" />
        <div className="hero-content">
          <Section className="py-28 md:py-36">
            <div className="ic-container text-center max-w-3xl mx-auto">
              <FadeIn>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground tracking-tight leading-[1.1] mb-6">
                  Integration & Trust{" "}
                  <span className="ic-text-gradient">Ecosystem</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="text-base md:text-lg text-primary-foreground/60 leading-relaxed max-w-2xl mx-auto mb-10">
                  iCommunity operates as verifiable evidence infrastructure within an interoperable technical, institutional, and regulatory ecosystem.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <a
                  href="#model"
                  className="inline-flex items-center gap-2 rounded-lg ic-gradient-cta px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                >
                  Explore collaboration model
                  <ArrowRight className="w-4 h-4" />
                </a>
              </FadeIn>
            </div>
          </Section>
        </div>
      </div>

      <Section>
        <div id="model" className="ic-container max-w-5xl scroll-mt-24">
          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Collaboration <span className="ic-text-gradient">model</span>
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

      <Section className="bg-secondary/30">
        <div className="ic-container max-w-5xl">
          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Partner <span className="ic-text-gradient">types</span>
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

      <Section>
        <div className="ic-container max-w-5xl">
          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              They trust the <span className="ic-text-gradient">infrastructure</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {logos.map((l, i) => (
              <FadeIn key={l.alt} delay={i * 0.04}>
                <div className="flex items-center justify-center rounded-2xl border border-border bg-card p-8 h-28 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                  <img src={l.src} alt={l.alt} className="max-h-10 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-secondary/30">
        <div className="ic-container max-w-3xl text-center">
          <FadeIn>
            <p className="text-xl md:text-2xl font-semibold text-foreground mb-8 leading-snug">
              Interoperable infrastructure for{" "}
              <span className="ic-text-gradient">regulated systems.</span>
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <button
              onClick={() => openModal("partner-integrador")}
              className="inline-flex items-center gap-2 rounded-lg ic-gradient-cta px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
            >
              Request collaboration
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
