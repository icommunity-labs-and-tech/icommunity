import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const texts = {
  es: {
    kicker: "Herramienta con IA",
    title: "Tu guía inicial de evidencia verificable",
    sub: "Describe tu caso de uso y recibe al momento una guía personalizada: obligaciones normativas, qué evidencia trazable generar y recursos para empezar.",
    email: "Email profesional",
    sector: "Sector (opcional)",
    sectorPh: "Banca, salud, administración pública…",
    useCase: "Describe tu caso de uso",
    useCasePh: "Ej.: Necesitamos demostrar ante auditoría cuándo y quién aprobó cada versión de nuestras políticas internas…",
    submit: "Generar guía",
    loading: "Generando tu guía…",
    privacy: "Usaremos tu email solo para contactarte sobre tu caso. Orientación inicial, no asesoramiento jurídico.",
    error: "No se pudo generar la guía",
    again: "Generar otra guía",
  },
  en: {
    kicker: "AI-powered tool",
    title: "Your starter guide to verifiable evidence",
    sub: "Describe your use case and instantly get a tailored guide: regulatory obligations, what traceable evidence to produce and resources to get started.",
    email: "Work email",
    sector: "Industry (optional)",
    sectorPh: "Banking, healthcare, public sector…",
    useCase: "Describe your use case",
    useCasePh: "E.g.: We need to prove to auditors when and who approved each version of our internal policies…",
    submit: "Generate guide",
    loading: "Generating your guide…",
    privacy: "We'll only use your email to follow up on your case. Initial guidance, not legal advice.",
    error: "Could not generate the guide",
    again: "Generate another guide",
  },
};

const renderInline = (text: string) =>
  text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const bold = part.match(/^\*\*(.+)\*\*$/);
    if (bold) return <strong key={i}>{bold[1]}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link)
      return (
        <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">
          {link[1]}
        </a>
      );
    return part;
  });

const GuideMarkdown = ({ content }: { content: string }) => (
  <div className="space-y-3 text-sm md:text-base text-foreground/90 leading-relaxed">
    {content.split("\n").map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return null;
      if (trimmed.startsWith("#")) {
        return (
          <h3 key={i} className="text-lg font-semibold text-foreground pt-3">
            {renderInline(trimmed.replace(/^#+\s*/, ""))}
          </h3>
        );
      }
      if (/^[-*]\s/.test(trimmed)) {
        return (
          <p key={i} className="pl-4 border-l border-primary/30">
            {renderInline(trimmed.replace(/^[-*]\s/, ""))}
          </p>
        );
      }
      return <p key={i}>{renderInline(trimmed)}</p>;
    })}
  </div>
);

const ComplianceGuide = () => {
  const { lang } = useLanguage();
  const t = texts[lang];
  const [email, setEmail] = useState("");
  const [sector, setSector] = useState("");
  const [useCase, setUseCase] = useState("");

  const mutation = useMutation({
    mutationFn: async (): Promise<string> => {
      const { data, error } = await supabase.functions.invoke<{ guide?: string; error?: string }>("compliance-guide", {
        body: { email, sector, useCase, lang },
      });
      if (error) {
        let message = t.error;
        try {
          const body = await (error as { context?: Response }).context?.json();
          if (body?.error) message = body.error;
        } catch {
          /* keep default message */
        }
        throw new Error(message);
      }
      if (!data?.guide) throw new Error(data?.error ?? t.error);
      return data.guide;
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <section id="guia" className="ic-container mt-20">
      <div className="ic-card max-w-3xl mx-auto">
        <p className="text-xs font-mono uppercase tracking-widest text-primary/80 mb-2 inline-flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          {t.kicker}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-3">{t.title}</h2>
        <p className="text-muted-foreground mb-8">{t.sub}</p>

        {mutation.data ? (
          <div className="space-y-6">
            <GuideMarkdown content={mutation.data} />
            <Button variant="outline" onClick={() => mutation.reset()}>
              {t.again}
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cg-email">{t.email}</Label>
                <Input id="cg-email" type="email" required maxLength={255} value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cg-sector">{t.sector}</Label>
                <Input id="cg-sector" maxLength={120} placeholder={t.sectorPh} value={sector} onChange={(e) => setSector(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cg-usecase">{t.useCase}</Label>
              <Textarea
                id="cg-usecase"
                required
                minLength={30}
                maxLength={2000}
                rows={6}
                placeholder={t.useCasePh}
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
              />
            </div>
            {mutation.error && <p className="text-sm text-destructive">{mutation.error.message}</p>}
            <Button type="submit" disabled={mutation.isPending} className="w-full sm:w-auto">
              {mutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t.loading}
                </>
              ) : (
                t.submit
              )}
            </Button>
            <p className="text-xs text-muted-foreground">{t.privacy}</p>
          </form>
        )}
      </div>
    </section>
  );
};

export default ComplianceGuide;
