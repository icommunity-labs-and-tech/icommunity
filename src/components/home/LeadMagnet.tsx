import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const LeadMagnet = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [modalOpen, setModalOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const { error } = await supabase.functions.invoke("send-email", {
        body: {
          type: "whitepaper",
          data: {
            company: formData.get("wp-company"),
            email: formData.get("wp-email"),
          },
        },
      });

      if (error) throw error;

      toast({ title: "Solicitud enviada", description: "Te enviaremos el whitepaper pronto." });
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "No se pudo enviar la solicitud.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <section id="recursos" className="ic-section bg-background" ref={ref}>
        <div className="ic-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="ic-gradient-lead rounded-3xl p-10 md:p-16 text-center"
          >
            <div className="inline-flex items-center rounded-full border border-primary-foreground/15 bg-primary-foreground/5 px-3.5 py-1 mb-6">
              <span className="text-xs font-medium tracking-wide text-primary-foreground/60 uppercase">
                Documento técnico
              </span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-6">
              <FileText className="w-7 h-7 text-primary-foreground/80" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4 max-w-xl mx-auto">
              Whitepaper: Evidencia verificable para KYC bajo regulación UE (MiCA)
            </h2>
            <p className="text-primary-foreground/60 mb-2 max-w-lg mx-auto">
              Descubre cómo construir una capa de evidencia regulatoria independiente y preparada para auditoría.
            </p>
            <p className="text-primary-foreground/40 text-sm mb-8 max-w-lg mx-auto">
              Para equipos técnicos, reguladores y responsables de compliance.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center justify-center rounded-lg bg-primary-foreground px-6 py-3 text-sm font-semibold text-ic-navy hover:bg-primary-foreground/90 transition-colors"
            >
              Descargar
            </button>
          </motion.div>
        </div>
      </section>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-card rounded-2xl p-8 max-w-md w-full shadow-2xl z-10"
          >
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-foreground mb-2">Descargar Whitepaper</h3>
            <p className="text-sm text-muted-foreground mb-6">Rellena estos datos y te enviaremos el documento.</p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Empresa</label>
                <input name="wp-company" type="text" required className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Tu empresa" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Email corporativo</label>
                <input name="wp-email" type="email" required className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="tu@empresa.com" />
              </div>
              <button type="submit" disabled={sending} className="w-full rounded-lg ic-gradient-cta py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50">
                {sending ? "Enviando..." : "Descargar ahora"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default LeadMagnet;
