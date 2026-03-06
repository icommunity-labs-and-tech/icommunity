import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, FileCheck2, Webhook, Layers, Scale, Server } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const texts = {
  en: {
    title: "Why <span>iCommunity</span>",
    subtitle: "Trust layer designed to turn digital events into audited proofs with regulatory traceability.",
    blocks: [
      { icon: ShieldCheck, title: "Operator-independent certification", description: "Audited proof is generated outside the system that executes the process, ensuring regulatory traceability before third parties." },
      { icon: FileCheck2, title: "Every event is born with an immutable record", description: "Each event is sealed with cryptographic integrity and a timestamp from its creation." },
      { icon: Webhook, title: "Integrates without replacing anything", description: "Integration via <strong>SDK</strong>, <strong>API</strong>, or <strong>Webhooks</strong> without modifying existing systems." },
      { icon: Layers, title: "Provider-independent", description: "Compatible with any existing KYC provider, onboarding, or corporate system." },
      { icon: Scale, title: "Aligned with the European regulatory framework", description: "Designed aligned with eIDAS, AML, MiCA, and applicable regulatory frameworks." },
      { icon: Server, title: "Architecture ready for institutional scale", description: "Multi-tenant architecture prepared to operate at institutional scale." },
    ],
  },
  es: {
    title: "Por qué <span>iCommunity</span>",
    subtitle: "Capa de confianza diseñada para convertir eventos digitales en pruebas auditadas con trazabilidad regulatoria.",
    blocks: [
      { icon: ShieldCheck, title: "Certificación independiente del operador", description: "La prueba auditada se genera fuera del sistema que ejecuta el proceso, garantizando trazabilidad regulatoria ante terceros." },
      { icon: FileCheck2, title: "Cada evento nace con un registro inmutable", description: "Cada evento se sella con integridad criptográfica y sellado de tiempo desde su creación." },
      { icon: Webhook, title: "Se integra sin sustituir nada", description: "Integración vía <strong>SDK</strong>, <strong>API</strong> o <strong>Webhooks</strong> sin modificar los sistemas existentes." },
      { icon: Layers, title: "Independiente del proveedor", description: "Compatible con cualquier proveedor KYC, onboarding o sistema corporativo existente." },
      { icon: Scale, title: "Alineado con el marco regulatorio europeo", description: "Diseñado alineado con eIDAS, AML, MiCA y los marcos regulatorios aplicables." },
      { icon: Server, title: "Arquitectura preparada para escala institucional", description: "Arquitectura multi-tenant preparada para operar a escala institucional." },
    ],
  },
};

const WhyICommunity = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { lang } = useLanguage();
  const t = texts[lang];

  return (
    <section className="ic-section py-16 md:py-20 bg-background" ref={ref}>
      <div className="ic-container max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: t.title.replace("<span>", '<span class="text-primary">').replace("</span>", "</span>") }} />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.subtitle}</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-3">
          {t.blocks.map((b, i) => (
            <motion.div key={b.title} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 + i * 0.07 }} className="rounded-xl transition-all duration-300 p-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                  <b.icon className="text-primary w-[18px] h-[18px]" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground mb-1">{b.title}</h3>
                  <p className="text-[13px] leading-relaxed text-muted-foreground">{b.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyICommunity;
