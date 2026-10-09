import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { CalendarPlus, ExternalLink, Search, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { createAiPost, invokeBlogAi, planDates, toLocalInput, type TrendResult } from "@/lib/blogAutomation";
import type { PlanIdeasApi } from "@/hooks/usePlanIdeas";

const TrendsFinder = ({ plan }: { plan: PlanIdeasApi }) => {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<TrendResult[] | null>(null);
  const [creating, setCreating] = useState<string | null>(null);

  const search = async () => {
    setLoading(true);
    setResults(null);
    try {
      const { results: r } = await invokeBlogAi<{ results: TrendResult[] }>({ action: "trends", query });
      setResults(r);
      if (!r.length) toast.message("No hemos encontrado noticias independientes recientes. Prueba otra búsqueda.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "No se pudo buscar");
    } finally {
      setLoading(false);
    }
  };

  const idea = (r: TrendResult) => ({
    title: r.proposalTitle,
    topic: r.proposalAngle,
    kind: "article" as const,
    source: { title: r.title, url: r.url, outlet: r.outlet, summary: r.summary },
  });

  const create = async (r: TrendResult) => {
    setCreating(r.url);
    try {
      const { id, warnings } = await createAiPost({ ...idea(r), publishAt: toLocalInput(new Date()) }, { status: "draft", cover: true, translate: true });
      warnings.forEach((w) => toast.warning(w));
      qc.invalidateQueries({ queryKey: ["blog-posts"] });
      toast.success("Borrador creado. Revísalo antes de publicar.");
      navigate(`/admin/blog/${id}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "No se pudo crear el artículo");
    } finally {
      setCreating(null);
    }
  };

  const addToPlan = (r: TrendResult) => {
    const taken = new Set(plan.ideas.map((i) => i.publishAt));
    const date = planDates(taken.size + 1, [2], 1, 9).find((d) => !taken.has(d)) as string;
    plan.add([{ ...idea(r), id: crypto.randomUUID(), publishAt: date }]);
    toast.success("Añadida al plan del generador en bloque");
  };

  return (
    <div className="space-y-6">
      <div className="ic-card space-y-3">
        <p className="text-sm text-muted-foreground">Busca noticias de los últimos 30 días en medios y foros independientes (sin notas de prensa, blogs de empresas ni contenido propio) y recibe propuestas de artículo.</p>
        <div className="flex flex-wrap gap-2">
          <Input className="flex-1 min-w-[240px]" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !loading && search()}
            placeholder="Tema opcional, p. ej. pasaporte digital de producto textil (vacío = todo el sector)" />
          <Button onClick={search} disabled={loading}><Search className="w-4 h-4 mr-1" />{loading ? "Buscando… (hasta 1 min)" : "Buscar tendencias"}</Button>
        </div>
      </div>

      {loading && <div className="grid md:grid-cols-2 gap-4">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-48" />)}</div>}

      {results && results.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4">
          {results.map((r) => (
            <article key={r.url} className="ic-card flex flex-col gap-3">
              <div className="space-y-1">
                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{r.outlet}{r.date ? ` · ${r.date}` : ""}</p>
                <a href={r.url} target="_blank" rel="noreferrer" className="font-medium hover:text-primary inline-flex gap-1">{r.title}<ExternalLink className="w-3.5 h-3.5 mt-1 shrink-0" /></a>
                <p className="text-sm text-muted-foreground">{r.summary}</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-3 space-y-1 mt-auto">
                <p className="text-xs font-mono uppercase text-primary">Propuesta</p>
                <p className="text-sm font-medium">{r.proposalTitle}</p>
                <p className="text-xs text-muted-foreground">{r.proposalAngle}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" onClick={() => create(r)} disabled={!!creating}>
                  <Sparkles className="w-4 h-4 mr-1" />{creating === r.url ? "Escribiendo… (~1 min)" : "Crear artículo"}
                </Button>
                <Button size="sm" variant="outline" onClick={() => addToPlan(r)} disabled={!!creating}><CalendarPlus className="w-4 h-4 mr-1" />Añadir al plan</Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendsFinder;
