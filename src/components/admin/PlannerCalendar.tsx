import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminPosts } from "@/hooks/useBlogPosts";
import { useAuth } from "@/hooks/useAuth";
import { effectiveStatus } from "@/lib/blogApi";

const WEEKDAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const dayKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Month grid with scheduled and published posts per day. */
const PlannerCalendar = () => {
  const { isEditor } = useAuth();
  const { data: posts, isLoading, error } = useAdminPosts(isEditor);
  const [month, setMonth] = useState(() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); });

  const byDay = useMemo(() => {
    const map = new Map<string, NonNullable<typeof posts>>();
    for (const p of posts ?? []) {
      if (p.status === "draft") continue;
      const key = p.status === "scheduled" && p.publishAt ? dayKey(new Date(p.publishAt)) : p.date;
      map.set(key, [...(map.get(key) ?? []), p]);
    }
    return map;
  }, [posts]);

  const days = useMemo(() => {
    const first = new Date(month);
    const offset = (first.getDay() + 6) % 7;
    const start = new Date(first); start.setDate(1 - offset);
    return Array.from({ length: 42 }, (_, i) => { const d = new Date(start); d.setDate(start.getDate() + i); return d; });
  }, [month]);

  const upcoming = (posts ?? []).filter((p) => effectiveStatus(p) === "scheduled").sort((a, b) => (a.publishAt ?? "").localeCompare(b.publishAt ?? ""));
  const today = dayKey(new Date());

  if (isLoading) return <Skeleton className="h-[480px] w-full" />;
  if (error) return <p className="text-sm text-destructive">No se pudo cargar el calendario. Recarga la página.</p>;

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-6">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline" aria-label="Mes anterior" onClick={() => setMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))}><ChevronLeft className="w-4 h-4" /></Button>
          <Button size="icon" variant="outline" aria-label="Mes siguiente" onClick={() => setMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))}><ChevronRight className="w-4 h-4" /></Button>
          <h2 className="text-lg font-medium capitalize">{month.toLocaleDateString("es-ES", { month: "long", year: "numeric" })}</h2>
        </div>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-7 min-w-[640px] border border-border rounded-xl overflow-hidden">
            {WEEKDAYS.map((w) => <div key={w} className="bg-muted/50 px-2 py-1.5 text-xs font-mono uppercase text-muted-foreground">{w}</div>)}
            {days.map((d) => {
              const key = dayKey(d);
              const items = byDay.get(key) ?? [];
              const inMonth = d.getMonth() === month.getMonth();
              return (
                <div key={key} className={`min-h-[92px] border-t border-l border-border p-1.5 space-y-1 ${inMonth ? "" : "bg-muted/30"}`}>
                  <span className={`text-xs ${key === today ? "text-primary font-semibold" : "text-muted-foreground"}`}>{d.getDate()}</span>
                  {items.map((p) => (
                    <Link key={p.id} to={`/admin/blog/${p.id}`} title={p.title.es}
                      className={`block truncate rounded px-1.5 py-0.5 text-[11px] ${effectiveStatus(p) === "scheduled" ? "bg-accent text-accent-foreground" : "bg-primary/10 text-primary"}`}>
                      {p.title.es || "(sin título)"}
                    </Link>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Las entradas programadas se publican solas a su hora. Para cambiar la fecha, ábrela y pulsa "Reprogramar".</p>
      </div>
      <aside className="ic-card space-y-3 self-start">
        <h3 className="text-sm font-medium">Próximas publicaciones ({upcoming.length})</h3>
        {upcoming.length === 0 && <p className="text-xs text-muted-foreground">No hay nada programado. Usa el generador en bloque o programa una entrada desde el editor.</p>}
        <ul className="space-y-2 max-h-[420px] overflow-y-auto">
          {upcoming.map((p) => (
            <li key={p.id}>
              <Link to={`/admin/blog/${p.id}`} className="block text-sm hover:text-primary">
                <span className="block text-xs text-muted-foreground">{new Date(p.publishAt as string).toLocaleString("es-ES", { dateStyle: "medium", timeStyle: "short" })}</span>
                {p.title.es || "(sin título)"}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default PlannerCalendar;
