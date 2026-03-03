import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const NewsletterBanner = () => {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.5;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Introduce tu nombre.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Introduce un correo válido.");
      return;
    }

    setSending(true);

    try {
      const { error: fnError } = await supabase.functions.invoke("send-email", {
        body: {
          type: "newsletter",
          data: { name: name.trim(), email: email.trim() },
        },
      });

      if (fnError) throw fnError;

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "No se pudo enviar. Inténtalo de nuevo.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <section ref={ref} className="ic-section pb-0">
      <div className="ic-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl"
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 z-[1] bg-black/20" />

          <div className="relative z-[2] px-8 py-10 md:px-12 md:py-14">
            <div className="mb-8 max-w-2xl">
              <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground leading-tight mb-3">
                Forma parte del ecosistema iCommunity
              </h3>
              <p className="text-primary-foreground/75 text-sm md:text-base leading-relaxed">
                Descubre cómo organizaciones reguladas están transformando procesos digitales en evidencia verificable. Recibe casos de uso y novedades del sector.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col md:flex-row gap-3 max-w-2xl"
                >
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary-foreground/30 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Correo profesional"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary-foreground/30 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={sending}
                    className="rounded-lg ic-gradient-cta px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity flex-shrink-0 disabled:opacity-50"
                  >
                    {sending ? "Enviando..." : "Suscribirme"}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-3 max-w-2xl"
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-sm font-medium text-primary-foreground">
                    Gracias. Te mantendremos informado.
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {!submitted && (
              <div className="mt-3 max-w-2xl">
                {error ? (
                  <p className="text-xs text-red-300">{error}</p>
                ) : (
                  <p className="text-xs text-primary-foreground/40">
                    Solo enviaremos contenidos relevantes. Sin spam.
                  </p>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterBanner;
