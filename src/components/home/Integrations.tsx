import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const spokes = [
  { label: "KYC Provider", angle: 0 },
  { label: "ID Verifier", angle: 60 },
  { label: "AML Check", angle: 120 },
  { label: "Age Gate", angle: 180 },
  { label: "Biometric", angle: 240 },
  { label: "eSignature", angle: 300 },
];

const texts = {
  en: {
    title: "Integrate once. <span>Offer evidence to all your clients.</span>",
    badge: "Single integration via API · SDK · Webhook",
    desc: "B2B2B model: identity providers integrate iCommunity once and offer verifiable evidence as added value to each of their end clients.",
    licTitle: "Licensing model",
    licDesc: "License per integration + fee per certified event. No hidden costs.",
    cta: "Talk to Partnerships",
  },
  es: {
    title: "Integra una vez. <span>Ofrece evidencia a todos tus clientes.</span>",
    badge: "Integración única vía API · SDK · Webhook",
    desc: "Modelo B2B2B: los proveedores de identidad integran iCommunity una vez y ofrecen evidencia verificable como valor añadido a cada uno de sus clientes finales.",
    licTitle: "Modelo de licencia",
    licDesc: "Licencia por integración + tarifa por evento certificado. Sin costes ocultos.",
    cta: "Hablar con Partnerships",
  },
};

const HubDiagram = ({ inView }: { inView: boolean }) => {
  const size = 374;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 143;
  const nodeR = 46;

  return (
    <div className="flex items-center justify-center">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full max-w-[374px] h-auto"
        fill="none"
      >
        <defs>
          <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(225 86% 58% / 0.15)" />
            <stop offset="100%" stopColor="hsl(225 86% 58% / 0)" />
          </radialGradient>
          <filter id="lineGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx={cx} cy={cy} r={radius + 30} fill="url(#hubGlow)" />

        {spokes.map((s, i) => {
          const rad = (s.angle - 90) * (Math.PI / 180);
          const sx = cx + radius * Math.cos(rad);
          const sy = cy + radius * Math.sin(rad);

          return (
            <g key={s.label}>
              <line x1={cx} y1={cy} x2={sx} y2={sy} stroke="hsl(225 86% 58% / 0.18)" strokeWidth="1" filter="url(#lineGlow)" />
              {inView && (
                <circle r="2.5" fill="hsl(225 86% 68% / 0.6)">
                  <animateMotion dur={`${6 + i * 1.2}s`} repeatCount="indefinite" path={`M${cx},${cy} L${sx},${sy}`} begin={`${i * 0.8}s`} />
                  <animate attributeName="opacity" values="0;0.7;0.7;0" dur={`${6 + i * 1.2}s`} repeatCount="indefinite" begin={`${i * 0.8}s`} />
                </circle>
              )}
              {inView && (
                <circle r="2" fill="hsl(225 86% 58% / 0.4)">
                  <animateMotion dur={`${7 + i * 1}s`} repeatCount="indefinite" path={`M${sx},${sy} L${cx},${cy}`} begin={`${3 + i * 0.6}s`} />
                  <animate attributeName="opacity" values="0;0.5;0.5;0" dur={`${7 + i * 1}s`} repeatCount="indefinite" begin={`${3 + i * 0.6}s`} />
                </circle>
              )}
              <motion.g initial={{ opacity: 0, scale: 0.7 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}>
                <rect x={sx - nodeR} y={sy - 14} width={nodeR * 2} height={28} rx="8" fill="hsl(0 0% 100%)" stroke="hsl(220 13% 91%)" strokeWidth="1" />
                <text x={sx} y={sy + 1} textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground" fontSize="10" fontWeight="500" fontFamily="Inter, system-ui, sans-serif">{s.label}</text>
              </motion.g>
            </g>
          );
        })}

        <motion.g initial={{ opacity: 0, scale: 0.5 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5 }} style={{ transformOrigin: `${cx}px ${cy}px` }}>
          <animateTransform attributeName="transform" type="scale" values="1;1.03;1" dur="9s" repeatCount="indefinite" additive="sum" />
          <animateTransform attributeName="transform" type="translate" values={`0,0;${-cx * 0.03 / 2},${-cy * 0.03 / 2};0,0`} dur="9s" repeatCount="indefinite" additive="sum" />
          <circle cx={cx} cy={cy} r="30" fill="hsl(225 86% 58%)" opacity="0.1" />
          <circle cx={cx} cy={cy} r="22" fill="hsl(225 86% 58%)" />
          <text x={cx} y={cy - 4} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="7" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">iCommunity</text>
          <text x={cx} y={cy + 5} textAnchor="middle" dominantBaseline="middle" fill="hsl(0 0% 100% / 0.7)" fontSize="5.5" fontWeight="500" fontFamily="Inter, system-ui, sans-serif">HUB</text>
        </motion.g>
      </svg>
    </div>
  );
};

const Integrations = ({ onOpenModal }: { onOpenModal?: () => void }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { lang } = useLanguage();
  const t = texts[lang];

  return (
    <section id="integrations" className="ic-section bg-background" ref={ref}>
      <div className="ic-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3" dangerouslySetInnerHTML={{ __html: t.title.replace("<span>", '<span class="ic-text-gradient">').replace("</span>", "</span>") }} />
            <p className="text-sm font-medium tracking-wide text-primary/60 mb-6">
              {t.badge}
            </p>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              {t.desc}
            </p>
            <div className="rounded-xl bg-secondary p-5 mb-8">
              <div className="text-sm font-semibold text-foreground mb-1">{t.licTitle}</div>
              <p className="text-sm text-muted-foreground">
                {t.licDesc}
              </p>
            </div>
            <button onClick={onOpenModal} className="inline-flex items-center gap-2 ic-gradient-cta text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
              {t.cta} <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <HubDiagram inView={inView} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Integrations;
