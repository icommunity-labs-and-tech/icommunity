import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Sparkles, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { BLOG_KIND_LABEL, type BlogKind } from "@/content/blogTypes";
import { createAiPost, invokeBlogAi, planDates, type PlanIdea } from "@/lib/blogAutomation";
import type { PlanIdeasApi } from "@/hooks/usePlanIdeas";

const WEEKDAYS = [
  { v: 1, l: "L" }, { v: 2, l: "M" }, { v: 3, l: "X" }, { v: 4, l: "J" }, { v: 5, l: "V" }, { v: 6, l: "S" }, { v: 0, l: "D" },
];
const DEFAULT_THEMES = "CertyPass y pasaporte digital de producto (DPP), CertyFile y certificación de documentos, Privaro y privacidad con IA, MusicDibs y registro de obras, cumplimiento normativo (eIDAS 2, NIS2, AI Act, RGPD), sellado de tiempo, trazabilidad, evidencia trazable";
const selectCls = "h-10 w-full rounded-md border border-input bg-background px-3 text-sm";

const BulkGenerator = ({ plan }: { plan: PlanIdeasApi }) => {
  const qc = useQueryClient();
  const [perWeek, setPerWeek] = useState(1);
  const [months, setMonths] = useState(1);
  const [weekdays, setWeekdays] = useState<number[]>([2]);
  const [hour, setHour] = useState(9);
  const [themes, setThemes] = useState(DEFAULT_THEMES);
  const [schedule, setSchedule] = useState(true);
  const [cover, setCover] = useState(true);
  const [loadingIdeas, setLoadingIdeas] = useState(false);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0, current: "" });
  const [warnings, setWarnings] = useState<string[]>([]);

  const count = Math.min(60, Math.round(perWeek * months * 4.33));

  const toggleDay = (v: number) =>
    setWeekdays((cur) => (cur.includes(v) ? cur.filter((x) => x !== v) : cur.length >= perWeek ? [...cur.slice(1), v] : [...cur, v]));

  const nextDates = (n: number) => {
    const days = weekdays.length ? weekdays : [2];
    const taken = new Set(plan.ideas.map((i) => i.publishAt));
    return planDates(n + taken.size, days, days.length, hour).filter((d) => !taken.has(d)).slice(0, n);
  };

  const generateIdeas = async () => {
    if (weekdays.length !== perWeek) return toast.error(`Elige ${perWeek} día(s) de la semana`);
    setLoadingIdeas(true);
    try {
      const { ideas } = await invokeBlogAi<{ ideas: Array<{ title: string; topic: string; kind: BlogKind }> }>({ action: "ideas", count, themes });
      const dates = nextDates(ideas.length);
      plan.add(ideas.map((i, n) => ({ ...i, id: crypto.randomUUID(), publishAt: dates[n] })));
      toast.success(`${ideas.length} ideas añadidas al plan`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "No se pudieron generar ideas");
    } finally {
      setLoadingIdeas(false);
    }
  };

  const generateAll = async () => {
    if (!plan.ideas.length) return;
    if (schedule && plan.ideas.some((i) => new Date(i.publishAt) <= new Date())) return toast.error("Hay ideas con fecha pasada; cámbialas antes de programar");
    if (!window.confirm(`Se escribirán ${plan.ideas.length} artículos con IA${cover ? " con portada" : ""} y traducción al inglés. Puede tardar ~1 min por artículo y tiene coste en la cuenta de OpenAI. ¿Continuar?`)) return;
    setRunning(true);
    setWarnings([]);
    const queue = [...plan.ideas];
    const notes: string[] = [];
    let ok = 0;
    for (const [n, idea] of queue.entries()) {
      setProgress({ done: n, total: queue.length, current: idea.title });
      try {
        const { warnings: w } = await createAiPost(idea, { status: schedule ? "scheduled" : "draft", cover, translate: true });
        w.forEach((x) => notes.push(`${idea.title}: ${x}`));
        plan.remove(idea.id);
        ok++;
      } catch (e) {
        notes.push(`${idea.title}: ${e instanceof Error ? e.message : "error"}`);
      }
      setWarnings([...notes]);
    }
    setProgress({ done: queue.length, total: queue.length, current: "" });
    setRunning(false);
    qc.invalidateQueries({ queryKey: ["blog-posts"] });
    if (ok) toast.success(`${ok} artículo(s) creados${schedule ? " y programados" : " como borrador"}`);
    if (ok < queue.length) toast.error(`${queue.length - ok} no se pudieron crear; siguen en el plan`);
  };

  const addEmpty = () => plan.add([{ id: crypto.randomUUID(), title: "", topic: "", kind: "article", publishAt: nextDates(1)[0] }]);

  return (
    <div className="space-y-6">
      <div className="ic-card space-y-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="per-week">Publicaciones por semana</Label>
            <select id="per-week" className={selectCls} value={perWeek} onChange={(e) => { const v = Number(e.target.value); setPerWeek(v); setWeekdays((d) => d.slice(0, v)); }}>
              {[1, 2, 3, 5].map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="months">Meses a planificar</Label>
            <select id="months" className={selectCls} value={months} onChange={(e) => setMonths(Number(e.target.value))}>
              {[1, 2, 3, 6].map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label>Días ({weekdays.length}/{perWeek})</Label>
            <div className="flex gap-1">
              {WEEKDAYS.map((d) => (
                <button key={d.v} type="button" onClick={() => toggleDay(d.v)} aria-pressed={weekdays.includes(d.v)}
                  className={`h-10 w-9 rounded-md border text-sm ${weekdays.includes(d.v) ? "border-primary bg-primary text-primary-foreground" : "border-input bg-background"}`}>{d.l}</button>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="hour">Hora</Label>
            <select id="hour" className={selectCls} value={hour} onChange={(e) => setHour(Number(e.target.value))}>
              {Array.from({ length: 15 }, (_, i) => i + 7).map((h) => <option key={h} value={h}>{`${h}:00`}</option>)}
            </select>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="themes">Temas a cubrir</Label>
          <Textarea id="themes" rows={2} value={themes} onChange={(e) => setThemes(e.target.value)} />
        </div>
        <Button onClick={generateIdeas} disabled={loadingIdeas || running}>
          <Sparkles className="w-4 h-4 mr-1" />{loadingIdeas ? "Pensando ideas…" : `Proponer ${count} ideas`}
        </Button>
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-lg font-medium mr-auto">Plan ({plan.ideas.length})</h2>
          <Button size="sm" variant="ghost" onClick={addEmpty} disabled={running}>Añadir fila</Button>
          {plan.ideas.length > 0 && <Button size="sm" variant="ghost" onClick={() => window.confirm("¿Vaciar el plan?") && plan.clear()} disabled={running}>Vaciar</Button>}
        </div>
        {plan.ideas.length === 0 ? (
          <p className="text-sm text-muted-foreground border border-dashed border-border rounded-xl p-6">Aún no hay ideas. Propónlas con IA o añádelas desde la pestaña Tendencias.</p>
        ) : (
          <div className="border border-border rounded-xl divide-y divide-border">
            {plan.ideas.map((i: PlanIdea) => (
              <div key={i.id} className="grid md:grid-cols-[1fr_1fr_150px_200px_40px] gap-2 p-3 items-start">
                <Input aria-label="Título" placeholder="Título" value={i.title} onChange={(e) => plan.update(i.id, { title: e.target.value })} disabled={running} />
                <div className="space-y-1">
                  <Textarea aria-label="Enfoque" rows={2} className="text-xs" placeholder="Enfoque" value={i.topic} onChange={(e) => plan.update(i.id, { topic: e.target.value })} disabled={running} />
                  {i.source && <a href={i.source.url} target="_blank" rel="noreferrer" className="block truncate text-[11px] text-primary">Fuente: {i.source.outlet}</a>}
                </div>
                <select aria-label="Tipo" className={selectCls} value={i.kind} onChange={(e) => plan.update(i.id, { kind: e.target.value as BlogKind })} disabled={running}>
                  {(Object.keys(BLOG_KIND_LABEL) as BlogKind[]).map((k) => <option key={k} value={k}>{BLOG_KIND_LABEL[k].es}</option>)}
                </select>
                <Input aria-label="Fecha" type="datetime-local" value={i.publishAt} onChange={(e) => plan.update(i.id, { publishAt: e.target.value })} disabled={running} />
                <Button size="icon" variant="ghost" aria-label="Quitar" onClick={() => plan.remove(i.id)} disabled={running}><Trash2 className="w-4 h-4" /></Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {plan.ideas.length > 0 && (
        <div className="ic-card space-y-4">
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm"><Switch checked={schedule} onCheckedChange={setSchedule} disabled={running} />Programar en su fecha (si no, quedan como borrador)</label>
            <label className="flex items-center gap-2 text-sm"><Switch checked={cover} onCheckedChange={setCover} disabled={running} />Generar portada</label>
          </div>
          <Button onClick={generateAll} disabled={running || plan.ideas.some((i) => i.title.trim().length < 5)}>
            <Sparkles className="w-4 h-4 mr-1" />{running ? "Generando…" : `Generar los ${plan.ideas.length} artículos`}
          </Button>
          {running && (
            <div className="space-y-1">
              <Progress value={(progress.done / Math.max(progress.total, 1)) * 100} />
              <p className="text-xs text-muted-foreground">{progress.done + 1} de {progress.total}: {progress.current}. No cierres esta pestaña.</p>
            </div>
          )}
        </div>
      )}

      {warnings.length > 0 && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm">
          <p className="font-medium text-destructive mb-1">Avisos</p>
          <ul className="list-disc pl-5 space-y-0.5 text-muted-foreground">{warnings.map((w, n) => <li key={n}>{w}</li>)}</ul>
        </div>
      )}
    </div>
  );
};

export default BulkGenerator;
