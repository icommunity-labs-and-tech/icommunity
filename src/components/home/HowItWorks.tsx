import { motion, useInView, AnimatePresence, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Download, Lock, Search } from "lucide-react";

/* ── Step data ── */
const steps = [
  {
    icon: Download,
    step: "01",
    title: "Captura",
    desc: "Recibe el evento de verificación desde tu proveedor KYC y lo normaliza en un payload estructurado.",
    input: "Evento (KYC / edad / interacción)",
    output: "Payload normalizado",
    codeLines: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    receiptStatus: "received" as const,
  },
  {
    icon: Lock,
    step: "02",
    title: "Certifica",
    desc: "Genera automáticamente una prueba criptográfica con sello temporal y registro inmutable.",
    input: "Payload normalizado",
    output: "Hash + sello temporal + registro inmutable",
    codeLines: [8, 9, 10, 11, 12, 13],
    receiptStatus: "sealed" as const,
  },
  {
    icon: Search,
    step: "03",
    title: "Verifica / Audita",
    desc: "Consulta el verificador público o exporta la evidencia completa para cualquier auditoría.",
    input: "Evidence Receipt",
    output: "Verificación pública + export auditoría",
    codeLines: [14, 15, 16, 17],
    receiptStatus: "verified" as const,
  },
];

type ReceiptStatus = "received" | "sealed" | "verified";

/* ── Code lines ── */
const codeString = `import { ICommunity } from '@icommunity/sdk';

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
// receipt.verifyUrl → https://verify.ic…`;

const codeLines = codeString.split("\n");

/* ── Receipt status config ── */
const receiptConfig: Record<ReceiptStatus, { label: string; color: string; dotClass: string }> = {
  received: { label: "Evento recibido", color: "text-yellow-400", dotClass: "bg-yellow-400" },
  sealed: { label: "Certificado sellado", color: "text-primary", dotClass: "bg-primary" },
  verified: { label: "Verificación completa", color: "text-green-400", dotClass: "bg-green-400" },
};

/* ── Stripe-style transition ── */
const crossfade = {
  initial: { opacity: 0, y: 4 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
};

const crossfadeReduced = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.15 },
};

/* ── Step Card ── */
const StepCard = ({
  s,
  index,
  isActive,
  onActivate,
  onScrollActivate,
  prefersReducedMotion,
}: {
  s: typeof steps[number];
  index: number;
  isActive: boolean;
  onActivate: () => void;
  onScrollActivate: () => void;
  prefersReducedMotion: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inCenter = useInView(ref, { margin: "-35% 0px -35% 0px" });

  useEffect(() => {
    if (inCenter && !prefersReducedMotion) onScrollActivate();
  }, [inCenter, onScrollActivate, prefersReducedMotion]);

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      onClick={onActivate}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onActivate(); }}
      className={`
        relative flex gap-5 p-5 rounded-xl cursor-pointer
        transition-all duration-300 ease-out
        ${isActive ? "bg-muted/30" : "hover:bg-muted/15"}
      `}
    >
      {/* Active indicator bar */}
      <motion.div
        className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-primary"
        initial={false}
        animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0.3 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
      />

      <div
        className={`
          flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center mt-0.5
          transition-colors duration-300
          ${isActive ? "bg-primary/15" : "bg-accent"}
        `}
      >
        <s.icon
          className={`w-5 h-5 transition-colors duration-300 ${
            isActive ? "text-primary" : "text-muted-foreground"
          }`}
        />
      </div>

      <div className="flex-1 min-w-0">
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
    </div>
  );
};

/* ── Technical Panel ── */
const TechPanel = ({ activeStep, prefersReducedMotion }: { activeStep: number; prefersReducedMotion: boolean }) => {
  const currentStep = steps[activeStep];
  const highlightSet = new Set(currentStep.codeLines);
  const status = receiptConfig[currentStep.receiptStatus];
  const anim = prefersReducedMotion ? crossfadeReduced : crossfade;

  return (
    <div className="rounded-2xl bg-ic-navy overflow-hidden">
      {/* Code block */}
      <div className="p-5 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-400/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
          <div className="w-3 h-3 rounded-full bg-green-400/60" />
          <span className="ml-3 text-xs font-mono text-primary-foreground/30">evidence.ts</span>
        </div>
        <pre className="font-mono text-[13px] leading-[1.7] overflow-x-auto">
          <code>
            {codeLines.map((line, idx) => (
              <span
                key={idx}
                className={`block px-2 -mx-2 rounded-sm transition-all duration-500 ease-out ${
                  highlightSet.has(idx)
                    ? "text-primary-foreground/90 bg-primary/10"
                    : "text-primary-foreground/25"
                }`}
              >
                {line || "\u00A0"}
              </span>
            ))}
          </code>
        </pre>
      </div>

      <div className="border-t border-primary-foreground/10" />

      {/* Evidence Receipt */}
      <div className="p-4 md:p-5 font-mono text-[13px]">
        <div className="flex items-center gap-2 mb-3">
          <AnimatePresence mode="wait">
            <motion.span
              key={currentStep.receiptStatus}
              {...anim}
              className={`inline-block w-2 h-2 rounded-full ${status.dotClass}`}
            />
          </AnimatePresence>
          <span className="text-primary-foreground/50">Evidence Receipt</span>
        </div>

        <div className="space-y-1 text-primary-foreground/50">
          <div>event_type: <span className="text-primary-foreground/70">kyc_verification</span></div>
          <div>timestamp: <span className="text-primary-foreground/70">{new Date().toISOString().slice(0, 19)}Z</span></div>

          <AnimatePresence mode="wait">
            <motion.div key={currentStep.receiptStatus} {...anim}>
              {currentStep.receiptStatus === "received" && (
                <>
                  <div>status: <span className="text-yellow-400">pending</span></div>
                  <div>integrity: <span className="text-primary-foreground/40">awaiting…</span></div>
                </>
              )}
              {currentStep.receiptStatus === "sealed" && (
                <>
                  <div>integrity: <span className="text-primary-foreground/70">sha256:a1b2c3…</span></div>
                  <div>status: <span className="text-primary">sealed</span></div>
                </>
              )}
              {currentStep.receiptStatus === "verified" && (
                <>
                  <div>integrity: <span className="text-primary-foreground/70">sha256:a1b2c3…</span></div>
                  <div>status: <span className="text-green-400">verified</span></div>
                  <div>verifyUrl: <span className="text-primary-foreground/70">https://verify.ic…</span></div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-3 pt-3 border-t border-primary-foreground/10 flex items-center gap-2">
          <AnimatePresence mode="wait">
            <motion.span key={status.label} {...anim} className={`text-xs ${status.color}`}>
              {status.label}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

/* ── Main Section ── */
const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(0);
  const prefersReducedMotion = !!useReducedMotion();

  const handleActivate = useCallback((i: number) => {
    setActiveStep(i);
  }, []);

  return (
    <section id="como-funciona" className="ic-section bg-background" ref={sectionRef}>
      <div className="ic-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Cómo funciona
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tres pasos para convertir cualquier verificación en evidencia verificable y auditable.
          </p>
          <p className="text-muted-foreground text-lg font-mono mt-3 max-w-2xl mx-auto">
            Integración vía SDK / API / Webhook. Sin fricción con tu proveedor KYC.
          </p>
        </motion.div>

        {/* Two-column layout — NO sticky */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: steps as selectors */}
          <div className="space-y-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <StepCard
                  s={s}
                  index={i}
                  isActive={i === activeStep}
                  onActivate={() => handleActivate(i)}
                  onScrollActivate={() => handleActivate(i)}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </motion.div>
            ))}
          </div>

          {/* Right: tech panel — scrolls normally */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <TechPanel activeStep={activeStep} prefersReducedMotion={prefersReducedMotion} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
