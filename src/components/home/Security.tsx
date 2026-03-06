import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Fingerprint, ClipboardList, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const texts = {
  en: {
    badge: "Technical guarantees designed for regulatory audit",
    title: "Security & <span>Compliance</span>",
    subtitle: "Three layers of technical guarantees designed from day one to meet the requirements of regulated environments and independent audit",
    layers: [
      { icon: Fingerprint, title: "Cryptographic integrity", properties: ["SHA-512 hash per certified event", "Verifiable and independent timestamp sealing", "Immutable evidence record"] },
      { icon: ClipboardList, title: "Auditability", properties: ["Exportable evidence in standard format", "Access observability and traceability", "Complete event history per tenant"] },
      { icon: ShieldCheck, title: "Privacy and data governance", properties: ["Retention controls compliant with GDPR", "Logical segregation per tenant", "Granular access and deletion policies"] },
    ],
    link: "View technical details →",
  },
  es: {
    badge: "Garantías técnicas diseñadas para auditoría regulatoria",
    title: "Seguridad & <span>Cumplimiento</span>",
    subtitle: "Tres capas de garantías técnicas diseñadas desde el primer día para cumplir con los requisitos de entornos regulados y auditoría independiente",
    layers: [
      { icon: Fingerprint, title: "Integridad criptográfica", properties: ["Hash SHA-512 por evento certificado", "Sellado de tiempo verificable e independiente", "Registro inmutable de evidencia"] },
      { icon: ClipboardList, title: "Auditabilidad", properties: ["Evidencia exportable en formato estándar", "Observabilidad y trazabilidad de accesos", "Historial completo de eventos por tenant"] },
      { icon: ShieldCheck, title: "Privacidad y gobernanza de datos", properties: ["Controles de retención conformes con GDPR", "Segregación lógica por tenant", "Políticas granulares de acceso y eliminación"] },
    ],
    link: "Ver detalles técnicos →",
  },
};

const Security = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { lang } = useLanguage();
  const t = texts[lang];

  return (
    <section id="security" className="ic-section bg-secondary/30" ref={ref}>
      <div className="ic-container max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
          <p className="text-sm font-medium tracking-wide text-primary/60 mb-4">{t.badge}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" dangerouslySetInnerHTML={{ __html: t.title.replace("<span>", '<span class="text-primary">').replace("</span>", "</span>") }} />
          <p className="text-muted-foreground text-lg max-w-4xl mx-auto">{t.subtitle}</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-10">
          {t.layers.map((layer, i) => (
            <motion.div key={layer.title} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }} className="border-l-2 border-primary/15 pl-6">
              <div className="w-11 h-11 rounded-lg bg-accent flex items-center justify-center mb-5"><layer.icon className="w-5 h-5 text-primary" strokeWidth={1.5} /></div>
              <h3 className="text-sm font-semibold text-foreground mb-5 tracking-tight">{layer.title}</h3>
              <ul className="space-y-3">
                {layer.properties.map((prop) => (
                  <li key={prop} className="flex items-start gap-2.5"><div className="w-1 h-1 rounded-full bg-primary/40 mt-2 flex-shrink-0" /><span className="text-[14px] leading-relaxed text-muted-foreground">{prop}</span></li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.6 }} className="text-center mt-10">
          <a href="#" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">{t.link}</a>
        </motion.div>
      </div>
    </section>
  );
};

export default Security;
