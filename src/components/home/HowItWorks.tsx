import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Download, Lock, Search } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const textsData = {
  en: {
    title: "How it works",
    subtitle: "Three steps to turn any verification into verifiable and auditable evidence.",
    integration: { prefix: "Integration via", methods: ["SDK", "API", "Webhook"], suffix: "No friction with your KYC provider." },
    stepLabel: "STEP",
    steps: [
      { icon: Download, step: "01", title: "Capture", desc: "Receives the verification event from your KYC provider and normalizes it into a structured payload.", input: "Event (KYC / age / interaction)", output: "Normalized payload" },
      { icon: Lock, step: "02", title: "Certify", desc: "Automatically generates a cryptographic proof with timestamp and immutable record.", input: "Normalized payload", output: "Hash + timestamp + immutable record" },
      { icon: Search, step: "03", title: "Verify / Audit", desc: "Query the public verifier or export the complete evidence for any audit.", input: "Evidence Receipt", output: "Public verification + audit export" },
    ],
    receiptStatuses: {
      received: "Event received",
      sealed: "Sealed certificate",
      verified: "Verification complete",
    },
    ariaLabel: "Process steps",
  },
  es: {
    title: "Cómo funciona",
    subtitle: "Tres pasos para convertir cualquier verificación en evidencia verificable y auditable.",
    integration: "Integración vía SDK / API / Webhook. Sin fricción con tu proveedor KYC.",
    stepLabel: "PASO",
    steps: [
      { icon: Download, step: "01", title: "Captura", desc: "Recibe el evento de verificación desde tu proveedor KYC y lo normaliza en un payload estructurado.", input: "Evento (KYC / edad / interacción)", output: "Payload normalizado" },
      { icon: Lock, step: "02", title: "Certifica", desc: "Genera automáticamente una prueba criptográfica con sellado de tiempo y registro inmutable.", input: "Payload normalizado", output: "Hash + sellado de tiempo + registro inmutable" },
      { icon: Search, step: "03", title: "Verifica / Audita", desc: "Consulta el verificador público o exporta la evidencia completa para cualquier auditoría.", input: "Evidence Receipt", output: "Verificación pública + export auditoría" },
    ],
    receiptStatuses: {
      received: "Evento recibido",
      sealed: "Certificado sellado",
      verified: "Verificación completa",
    },
    ariaLabel: "Pasos del proceso",
  },
};

const codeString = `import { ICommunity } from '@icommunity/sdk';

const ic = new ICommunity({
  apiKey: process.env.IC_API_KEY,
  tenant: 'your-tenant-id'
});

// Register verification event
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

const stepCodeLines = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  [8, 9, 10, 11, 12, 13],
  [14, 15, 16, 17],
];

type ReceiptStatus = "received" | "sealed" | "verified";
const receiptStatusOrder: ReceiptStatus[] = ["received", "sealed", "verified"];

const receiptConfig: Record<ReceiptStatus, { color: string; dotClass: string }> = {
  received: { color: "text-yellow-400", dotClass: "bg-yellow-400" },
  sealed: { color: "text-primary", dotClass: "bg-primary" },
  verified: { color: "text-green-400", dotClass: "bg-green-400" },
};

const AUTO_ADVANCE_MS = 4000;

const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const sectionVisible = useInView(sectionRef, { amount: 0.3 });
  const [activeStep, setActiveStep] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const { lang } = useLanguage();
  const t = textsData[lang];

  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!sectionVisible || userInteracted || prefersReducedMotion) { clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(() => { setActiveStep((prev) => (prev + 1) % t.steps.length); }, AUTO_ADVANCE_MS);
    return () => clearInterval(timerRef.current);
  }, [sectionVisible, userInteracted, prefersReducedMotion, t.steps.length]);

  const handleStepClick = useCallback((i: number) => { setActiveStep(i); setUserInteracted(true); }, []);
  const handleKeyDown = useCallback((e: React.KeyboardEvent, i: number) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleStepClick(i); }
    else if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); handleStepClick((i + 1) % t.steps.length); }
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); handleStepClick((i - 1 + t.steps.length) % t.steps.length); }
  }, [handleStepClick, t.steps.length]);

  const currentStep = t.steps[activeStep];
  const highlightSet = new Set(stepCodeLines[activeStep]);
  const currentStatus = receiptStatusOrder[activeStep];
  const statusConfig = receiptConfig[currentStatus];
  const statusLabel = t.receiptStatuses[currentStatus];

  return (
    <section id="como-funciona" className="ic-section bg-background" ref={sectionRef}>
      <div className="ic-container">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.subtitle}</p>
          <p className="text-muted-foreground text-lg font-mono mt-3 max-w-2xl mx-auto">{t.integration}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-3" role="tablist" aria-label={t.ariaLabel}>
            {t.steps.map((s, i) => {
              const isActive = i === activeStep;
              return (
                <motion.div key={s.step} initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.15 }} role="tab" tabIndex={0} aria-selected={isActive} aria-controls="hiw-panel" onClick={() => handleStepClick(i)} onKeyDown={(e) => handleKeyDown(e, i)} className={`relative flex gap-5 p-5 rounded-xl cursor-pointer transition-all duration-300 ease-out ${isActive ? "bg-muted/30" : "hover:bg-muted/20"}`}>
                  <motion.div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-primary" initial={false} animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0.3 }} transition={{ duration: 0.3 }} />
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center mt-0.5 transition-colors duration-300 ${isActive ? "bg-primary/15" : "bg-accent"}`}>
                    <s.icon className={`w-5 h-5 transition-colors duration-300 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-mono text-primary mb-1">{t.stepLabel} {s.step}</div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{s.title}</h3>
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div key={`detail-${i}`} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="overflow-hidden">
                          <p className="text-sm text-muted-foreground mb-3">{s.desc}</p>
                          <div className="flex flex-col sm:flex-row gap-2 text-xs font-mono">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted text-muted-foreground"><span className="text-primary/70">IN →</span> {s.input}</span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-foreground"><span className="text-primary">OUT →</span> {s.output}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div id="hiw-panel" role="tabpanel" initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="rounded-2xl bg-ic-navy overflow-hidden">
            <div className="p-5 md:p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400/60" /><div className="w-3 h-3 rounded-full bg-yellow-400/60" /><div className="w-3 h-3 rounded-full bg-green-400/60" />
                <span className="ml-3 text-xs font-mono text-primary-foreground/30">evidence.ts</span>
              </div>
              <pre className="font-mono text-[14px] leading-[1.7] overflow-x-auto"><code>
                {codeLines.map((line, idx) => (<span key={idx} className={`block px-2 -mx-2 rounded-sm transition-all duration-500 ease-out ${highlightSet.has(idx) ? "text-primary-foreground/90 bg-primary/10" : "text-primary-foreground/25"}`}>{line || "\u00A0"}</span>))}
              </code></pre>
            </div>
            <div className="border-t border-primary-foreground/10" />
            <div className="p-4 md:p-5 font-mono text-[14px]">
              <div className="flex items-center gap-2 mb-3">
                <AnimatePresence mode="wait"><motion.span key={currentStatus} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.3 }} className={`inline-block w-2 h-2 rounded-full ${statusConfig.dotClass}`} /></AnimatePresence>
                <span className="text-primary-foreground/50">Evidence Receipt</span>
              </div>
              <div className="space-y-1 text-primary-foreground/50">
                <div>event_type: <span className="text-primary-foreground/70">kyc_verification</span></div>
                <div>timestamp: <span className="text-primary-foreground/70">{new Date().toISOString().slice(0, 19)}Z</span></div>
                <AnimatePresence mode="wait">
                  <motion.div key={currentStatus} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.35 }}>
                    {currentStatus === "received" && (<><div>status: <span className="text-yellow-400">pending</span></div><div>integrity: <span className="text-primary-foreground/40">awaiting…</span></div></>)}
                    {currentStatus === "sealed" && (<><div>integrity: <span className="text-primary-foreground/70">sha256:a1b2c3…</span></div><div>status: <span className="text-primary">sealed</span></div></>)}
                    {currentStatus === "verified" && (<><div>integrity: <span className="text-primary-foreground/70">sha256:a1b2c3…</span></div><div>status: <span className="text-green-400">verified</span></div><div>verifyUrl: <span className="text-primary-foreground/70">https://verify.ic…</span></div></>)}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="mt-3 pt-3 border-t border-primary-foreground/10 flex items-center gap-2">
                <AnimatePresence mode="wait"><motion.span key={statusLabel} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className={`text-xs ${statusConfig.color}`}>{statusLabel}</motion.span></AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
