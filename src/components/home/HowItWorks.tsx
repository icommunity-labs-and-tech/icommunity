import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Download, Lock, Search } from "lucide-react";

const steps = [
  {
    icon: Download,
    step: "01",
    title: "Captura",
    desc: "Recibe el evento de verificación desde tu proveedor KYC y lo normaliza en un payload estructurado.",
    input: "Evento (KYC / edad / interacción)",
    output: "Payload normalizado",
  },
  {
    icon: Lock,
    step: "02",
    title: "Certifica",
    desc: "Genera automáticamente una prueba criptográfica con sello temporal y registro inmutable.",
    input: "Payload normalizado",
    output: "Hash + sello temporal + registro inmutable",
  },
  {
    icon: Search,
    step: "03",
    title: "Verifica / Audita",
    desc: "Consulta el verificador público o exporta la evidencia completa para cualquier auditoría.",
    input: "Evidence Receipt",
    output: "Verificación pública + export auditoría",
  },
];

const HowItWorks = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="como-funciona" className="ic-section bg-background" ref={ref}>
      <div className="ic-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Cómo funciona</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tres pasos para convertir cualquier verificación en evidencia verificable y auditable.
          </p>
          <p className="text-sm text-muted-foreground/70 font-mono mt-3 max-w-xl mx-auto">
            Integración vía SDK / API / Webhook. Sin fricción con tu proveedor KYC.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Steps */}
          <div className="space-y-10">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex gap-5"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent flex items-center justify-center mt-1">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-mono text-primary mb-1">PASO {s.step}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{s.desc}</p>
                  <div className="flex flex-col sm:flex-row gap-2 text-xs font-mono">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted text-muted-foreground">
                      <span className="text-primary/70">IN →</span> {s.input}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-foreground">
                      <span className="text-primary">OUT →</span> {s.output}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Code snippet */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-2xl bg-ic-navy p-6 overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-400/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
              <div className="w-3 h-3 rounded-full bg-green-400/60" />
              <span className="ml-3 text-xs font-mono text-primary-foreground/30">evidence.ts</span>
            </div>
            <pre className="font-mono text-[13px] leading-relaxed text-primary-foreground/70 overflow-x-auto">
              <code>{`import { ICommunity } from '@icommunity/sdk';

const ic = new ICommunity({
  apiKey: process.env.IC_API_KEY,
  tenant: 'your-tenant-id'
});

// Registrar evento de verificación
const receipt = await ic.evidence.create({
  eventType: 'kyc_verification',
  subject: 'user_abc123',
  provider: 'your-kyc-provider',
  result: 'approved',
  metadata: { documentType: 'passport' }
});

// receipt.hash → sha256:a1b2c3d4…
// receipt.timestamp → ISO 8601
// receipt.verifyUrl → https://verify.ic…`}</code>
            </pre>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
