import { useState } from "react";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { BlogKind } from "@/content/blogTypes";
import { invokeBlogAi, type AiArticle } from "@/lib/blogAutomation";

export { invokeBlogAi, type AiArticle };

interface Props {
  kind: BlogKind;
  hasContent: boolean;
  onGenerated: (article: AiArticle, topic: string) => void;
}

const AiArticleDialog = ({ kind, hasContent, onGenerated }: Props) => {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [length, setLength] = useState<"short" | "medium" | "long">("medium");
  const [busy, setBusy] = useState(false);

  const generate = async () => {
    if (topic.trim().length < 5) return toast.error("Describe el tema con algo más de detalle");
    if (hasContent && !window.confirm("Se sustituirá el contenido en español actual. ¿Continuar?")) return;
    setBusy(true);
    try {
      const article = await invokeBlogAi<AiArticle>({ action: "article", topic, notes, kind, length });
      onGenerated(article, topic);
      setOpen(false);
      toast.success("Borrador generado. Revísalo y corrige los [datos a confirmar].");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo generar el artículo");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !busy && setOpen(o)}>
      <DialogTrigger asChild>
        <Button type="button" size="sm"><Sparkles className="w-4 h-4 mr-1" />Generar con IA</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Generar artículo con IA</DialogTitle>
          <DialogDescription>Crea un borrador en español con título, descripción y contenido. Después puedes editarlo y traducirlo.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="ai-topic">Tema</Label>
            <Input id="ai-topic" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Ej.: Pasaporte digital de producto para el sector textil" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ai-notes">Ideas, datos o enfoque (opcional)</Label>
            <Textarea id="ai-notes" rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Puntos clave, público objetivo, normativa a mencionar, palabras clave SEO…" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ai-length">Extensión</Label>
            <select id="ai-length" className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={length} onChange={(e) => setLength(e.target.value as typeof length)}>
              <option value="short">Corta (500–700 palabras)</option>
              <option value="medium">Media (900–1.200 palabras)</option>
              <option value="long">Larga (1.500–2.000 palabras)</option>
            </select>
          </div>
          <Button className="w-full" onClick={generate} disabled={busy}>
            {busy ? (<><span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />Escribiendo… (puede tardar 30 s)</>) : "Generar borrador"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AiArticleDialog;
