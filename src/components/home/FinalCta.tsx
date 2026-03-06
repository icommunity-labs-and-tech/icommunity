import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Landmark, ShieldCheck, BarChart3, Handshake } from "lucide-react";
import type { OrganizationType } from "./ContactModal";
import { useLanguage } from "@/i18n/LanguageContext";

const texts = {
  en: {
    title: "Start certifying <span>digital processes today</span>",
    subtitle: "Integrate iCommunity and generate auditable proofs ready for regulatory oversight.",
    paths: [
      { icon: Landmark, title: "Public Administrations", desc: "Improve the transparency and traceability of your citizen processes.", cta: "Request info", orgType: "administracion-publica" as OrganizationType },
      { icon: ShieldCheck, title: "Identity / KYC Providers", desc: "Provide verifiable evidence in your clients' identity verification.", cta: "Request info", orgType: "proveedor-identidad" as OrganizationType },
      { icon: BarChart3, title: "Legal, Fintech, Health", desc: "Anonymize sensitive data before using it on AI platforms.", cta: "Request Privaro demo", orgType: "plataforma-regulada" as OrganizationType },
      { icon: Handshake, title: "Manufacturers", desc: "Digital Product Passport for traceability and ESPR compliance.", cta: "Request CertyPass demo", orgType: "partner-integrador" as OrganizationType },
    ],
  },
  es: {
    title: "Empieza a certificar <span>procesos digitales hoy</span>",
    subtitle: "Integra iCommunity y genera pruebas auditables listas para supervisión regulatoria.",
    paths: [
      { icon: Landmark, title: "Administraciones Públicas", desc: "Mejora la transparencia y trazabilidad de tus procesos ciudadanos.", cta: "Solicitar info", orgType: "administracion-publica" as OrganizationType },
      { icon: ShieldCheck, title: "Proveedores de Identidad / KYC", desc: "Ofrece evidencia verificable en la verificación de identidad de tus clientes.", cta: "Solicitar info", orgType: "proveedor-identidad" as OrganizationType },
      { icon: BarChart3, title: "Legal, Fintech, Salud", desc: "Anonimiza datos sensibles antes de usarlos en plataformas de IA.", cta: "Solicitar demo Privaro", orgType: "plataforma-regulada" as OrganizationType },
      { icon: Handshake, title: "Fabricantes", desc: "Pasaporte Digital de Producto para trazabilidad y cumplimiento ESPR.", cta: "Solicitar demo CertyPass", orgType: "partner-integrador" as OrganizationType },
    ],
  },
};

const FinalCta = ({ onOpenModal }: { onOpenModal?: (orgType?: OrganizationType) => void }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { lang } = useLanguage();
  const t = texts[lang];

  return (
    <section id="demo" className="ic-section bg-background" ref={ref}>
      <div className="ic-container">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: t.title.replace("<span>", '<span class="ic-text-gradient">').replace("</span>", "</span>") }} />
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed">{t.subtitle}</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {t.paths.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }} className="group rounded-xl border border-border bg-background p-6 flex flex-col text-left hover:border-primary/25 hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4"><p.icon className="w-5 h-5 text-primary" /></div>
              <h3 className="text-[15px] font-semibold text-foreground mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{p.desc}</p>
              <button onClick={() => onOpenModal?.(p.orgType)} className="inline-flex items-center justify-center rounded-lg ic-gradient-cta px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity shadow-sm shadow-primary/15 w-full">{p.cta}</button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinalCta;
