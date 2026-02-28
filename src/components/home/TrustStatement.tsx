import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const TrustStatement = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center text-center px-6 overflow-hidden"
      style={{
        minHeight: "380px",
        background:
          "linear-gradient(180deg, hsl(225 35% 7%) 0%, hsl(230 40% 10%) 50%, hsl(225 35% 7%) 100%)",
      }}
    >
      {/* Grid overlay – blueprint feel */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(225 80% 60%) 1px, transparent 1px), linear-gradient(90deg, hsl(225 80% 60%) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Subtle horizontal accent line */}
      <motion.div
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, hsl(225 80% 55% / 0.15) 30%, hsl(225 80% 55% / 0.15) 70%, transparent 100%)" }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-2xl md:text-3xl lg:text-4xl font-light leading-snug max-w-xl"
        style={{ color: "hsl(225 20% 85%)" }}
      >
        Todo sistema regulado necesita
        <br />
        <span className="font-normal" style={{ color: "hsl(217 91% 60%)" }}>
          evidencia independiente.
        </span>
      </motion.p>
    </section>
  );
};

export default TrustStatement;
