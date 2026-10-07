import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminHeader from "@/components/admin/AdminHeader";
import { useAdminPosts } from "@/hooks/useBlogPosts";
import { useAuth } from "@/hooks/useAuth";
import { BLOG_KIND_LABEL, type BlogKind } from "@/content/blogTypes";
import type { BlogStatus } from "@/lib/blogApi";

const normalize = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const AdminBlogListContent = () => {
  const { isEditor } = useAuth();
  const { data: posts, isLoading, error } = useAdminPosts(isEditor);
  const [q, setQ] = useState("");
  const [kind, setKind] = useState<BlogKind | "all">("all");
  const [status, setStatus] = useState<BlogStatus | "all">("all");

  const filtered = useMemo(
    () =>
      (posts ?? []).filter(
        (p) =>
          (kind === "all" || p.kind === kind) &&
          (status === "all" || p.status === status) &&
          (!q || normalize(`${p.title.es} ${p.title.en} ${p.slug}`).includes(normalize(q))),
      ),
    [posts, q, kind, status],
  );

  const selectCls = "h-10 rounded-md border border-input bg-background px-3 text-sm";

  return (
    <div className="min-h-screen bg-background">
      <Helmet><meta name="robots" content="noindex, nofollow" /><title>Entradas — Panel del blog</title></Helmet>
      <AdminHeader />
      <main className="ic-container py-10 space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold text-foreground mr-auto">Entradas del blog</h1>
          <Button asChild><Link to="/admin/blog/nuevo"><Plus className="w-4 h-4 mr-1" />Nueva entrada</Link></Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Buscar por título…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <select className={selectCls} value={kind} onChange={(e) => setKind(e.target.value as BlogKind | "all")} aria-label="Tipo">
            <option value="all">Todos los tipos</option>
            {(Object.keys(BLOG_KIND_LABEL) as BlogKind[]).map((k) => <option key={k} value={k}>{BLOG_KIND_LABEL[k].es}</option>)}
          </select>
          <select className={selectCls} value={status} onChange={(e) => setStatus(e.target.value as BlogStatus | "all")} aria-label="Estado">
            <option value="all">Todos los estados</option>
            <option value="published">Publicadas</option>
            <option value="draft">Borradores</option>
          </select>
        </div>

        {error && <p className="text-sm text-destructive">No se pudieron cargar las entradas. Recarga la página.</p>}
        {isLoading ? (
          <div className="space-y-2">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}</div>
        ) : (
          <div className="border border-border rounded-xl divide-y divide-border overflow-hidden">
            {filtered.length === 0 && <p className="p-6 text-sm text-muted-foreground">No hay entradas con estos filtros.</p>}
            {filtered.map((p) => (
              <Link key={p.id} to={`/admin/blog/${p.id}`} className="flex flex-wrap items-center gap-3 px-4 py-3 hover:bg-muted/40 transition-colors">
                <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded ${p.status === "published" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                  {p.status === "published" ? "Publicada" : "Borrador"}
                </span>
                <span className="flex-1 min-w-[200px] text-sm font-medium text-foreground">{p.title.es || "(sin título)"}</span>
                <span className="text-xs text-muted-foreground">{BLOG_KIND_LABEL[p.kind].es}</span>
                <time className="text-xs text-muted-foreground w-24 text-right">{p.date}</time>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

const AdminBlogList = () => (
  <AdminGuard>
    <AdminBlogListContent />
  </AdminGuard>
);

export default AdminBlogList;
