import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const TrustStatement = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="flex items-center justify-center text-center px-6"
      style={{
        minHeight: "340px",
        background:
          "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--secondary)/0.3) 50%, hsl(var(--background)) 100%)",
      }}
    >
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-2xl md:text-3xl lg:text-4xl font-light text-foreground/80 leading-snug max-w-xl"
      >
        Todo sistema regulado necesita
        <br />
        <span className="text-primary font-normal">evidencia independiente.</span>
      </motion.p>
    </section>
  );
};

export default TrustStatement;
