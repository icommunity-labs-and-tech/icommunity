import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Eye, Languages, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { FunctionsHttpError } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminHeader from "@/components/admin/AdminHeader";
import BlockEditor from "@/components/admin/BlockEditor";
import BlogBlocks from "@/components/blog/BlogBlocks";
import { useAdminPost } from "@/hooks/useBlogPosts";
import { supabase } from "@/integrations/supabase/client";
import { BLOG_KIND_LABEL, type BlogBlock, type BlogKind, type BlogLang } from "@/content/blogTypes";
import { estimateReadingMinutes, postToRow, slugify, uploadBlogImage, type AdminBlogPost } from "@/lib/blogApi";

type Draft = Omit<AdminBlogPost, "id" | "updatedAt">;

const emptyDraft = (): Draft => ({
  slug: "",
  kind: "article",
  status: "draft",
  date: new Date().toISOString().slice(0, 10),
  readingMinutes: 1,
  coverUrl: null,
  title: { es: "", en: "" },
  description: { es: "", en: "" },
  blocks: { es: [], en: [] },
  translated: false,
});

/** Removes empty list lines and empty text blocks before saving. */
const cleanBlocks = (blocks: BlogBlock[]): BlogBlock[] =>
  blocks
    .map((b) => (b.type === "list" ? { ...b, items: b.items.map((x) => x.trim()).filter(Boolean) } : b))
    .filter((b) => (b.type === "list" ? b.items.length > 0 : b.type === "image" ? !!b.url : b.text.trim() !== ""));

const AdminPostEditorContent = () => {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "nuevo";
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data: existing, isLoading } = useAdminPost(id);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [lang, setLang] = useState<BlogLang>("es");
  const [preview, setPreview] = useState(false);
  const [translating, setTranslating] = useState(false);
  const coverRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (existing) {
      const { id: _id, updatedAt: _u, ...rest } = existing;
      setDraft(rest);
      setSlugTouched(true);
    }
  }, [existing]);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => setDraft((d) => ({ ...d, [key]: value }));
  const setLocalized = (key: "title" | "description", value: string) =>
    setDraft((d) => {
      const next = { ...d, [key]: { ...d[key], [lang]: value } };
      if (key === "title" && lang === "es" && !slugTouched) next.slug = slugify(value);
      return next;
    });

  const save = useMutation({
    mutationFn: async (status: Draft["status"]) => {
      const blocks = { es: cleanBlocks(draft.blocks.es), en: cleanBlocks(draft.blocks.en) };
      const payload: Draft = { ...draft, status, blocks, readingMinutes: estimateReadingMinutes(blocks.es) };
      if (!payload.title.es.trim()) throw new Error("Falta el título en español");
      if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(payload.slug)) throw new Error("La dirección (slug) solo puede tener minúsculas, números y guiones");
      if (status === "published" && !payload.description.es.trim()) throw new Error("Añade una descripción antes de publicar");
      const row = postToRow(payload);
      if (isNew) {
        const { data, error } = await supabase.from("blog_posts").insert(row).select("id").single();
        if (error) throw error;
        return { id: data.id, status };
      }
      const { error } = await supabase.from("blog_posts").update(row).eq("id", id as string);
      if (error) throw error;
      return { id: id as string, status };
    },
    onSuccess: ({ id: savedId, status }) => {
      setDraft((d) => ({ ...d, status }));
      qc.invalidateQueries({ queryKey: ["blog-posts"] });
      toast.success(status === "published" ? "Entrada publicada" : "Borrador guardado");
      if (isNew) navigate(`/admin/blog/${savedId}`, { replace: true });
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "No se pudo guardar";
      toast.error(msg.includes("duplicate") ? "Ya existe una entrada con esa dirección (slug)" : msg);
    },
  });

  const remove = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id as string);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["blog-posts"] });
      toast.success("Entrada eliminada");
      navigate("/admin/blog", { replace: true });
    },
    onError: () => toast.error("No se pudo eliminar la entrada"),
  });

  const translate = async () => {
    if (!draft.title.es.trim()) return toast.error("Escribe primero el título en español");
    setTranslating(true);
    try {
      const { data, error } = await supabase.functions.invoke("blog-translate", {
        body: { title: draft.title.es, description: draft.description.es, blocks: cleanBlocks(draft.blocks.es) },
      });
      if (error) {
        const details = error instanceof FunctionsHttpError ? await error.context.json().catch(() => null) : null;
        throw new Error(details?.error ?? "No se pudo traducir");
      }
      setDraft((d) => ({
        ...d,
        title: { ...d.title, en: data.title },
        description: { ...d.description, en: data.description },
        blocks: { ...d.blocks, en: data.blocks },
        translated: true,
      }));
      setLang("en");
      toast.success("Traducción lista. Revísala antes de publicar.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo traducir");
    } finally {
      setTranslating(false);
    }
  };

  const uploadCover = async (file: File) => {
    try {
      set("coverUrl", await uploadBlogImage(file));
      toast.success("Portada subida");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo subir la imagen");
    }
  };

  if (!isNew && isLoading) {
    return <div className="min-h-screen bg-background"><AdminHeader /><div className="ic-container py-10 space-y-4"><Skeleton className="h-10 w-1/2" /><Skeleton className="h-64 w-full" /></div></div>;
  }
  if (!isNew && !existing) {
    return <div className="min-h-screen bg-background"><AdminHeader /><div className="ic-container py-10"><p className="text-muted-foreground">Entrada no encontrada. <Link to="/admin/blog" className="text-primary">Volver</Link></p></div></div>;
  }

  const busy = save.isPending;

  return (
    <div className="min-h-screen bg-background">
      <Helmet><meta name="robots" content="noindex, nofollow" /><title>{isNew ? "Nueva entrada" : "Editar entrada"} — Panel del blog</title></Helmet>
      <AdminHeader />
      <main className="ic-container py-8 grid lg:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-6 min-w-0">
          <Link to="/admin/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="w-4 h-4" />Entradas</Link>
          <Tabs value={lang} onValueChange={(v) => setLang(v as BlogLang)}>
            <div className="flex flex-wrap items-center gap-3">
              <TabsList>
                <TabsTrigger value="es">Español</TabsTrigger>
                <TabsTrigger value="en">Inglés</TabsTrigger>
              </TabsList>
              <Button type="button" variant="outline" size="sm" onClick={translate} disabled={translating}>
                <Languages className="w-4 h-4 mr-1" />{translating ? "Traduciendo…" : "Traducir al inglés con IA"}
              </Button>
            </div>
            {(["es", "en"] as BlogLang[]).map((l) => (
              <TabsContent key={l} value={l} className="space-y-5 mt-5">
                <div className="space-y-1.5">
                  <Label>Título</Label>
                  <Input value={draft.title[l]} onChange={(e) => setLocalized("title", e.target.value)} className="text-lg" />
                </div>
                <div className="space-y-1.5">
                  <Label>Descripción (aparece en Google y en el listado)</Label>
                  <Textarea rows={2} value={draft.description[l]} onChange={(e) => setLocalized("description", e.target.value)} />
                  <p className="text-xs text-muted-foreground">{draft.description[l].length} / 160 caracteres recomendados</p>
                </div>
                <div className="space-y-1.5">
                  <Label>Contenido</Label>
                  <BlockEditor blocks={draft.blocks[l]} onChange={(b) => setDraft((d) => ({ ...d, blocks: { ...d.blocks, [l]: b } }))} />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-20 self-start">
          <div className="ic-card space-y-4">
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              Estado: <span className={draft.status === "published" ? "text-primary" : ""}>{draft.status === "published" ? "Publicada" : "Borrador"}</span>
            </p>
            <div className="grid gap-2">
              <Button onClick={() => save.mutate("published")} disabled={busy}>
                {draft.status === "published" ? "Guardar cambios" : "Publicar"}
              </Button>
              <Button variant="outline" onClick={() => save.mutate("draft")} disabled={busy}>
                {draft.status === "published" ? "Despublicar (pasar a borrador)" : "Guardar borrador"}
              </Button>
              <Button variant="ghost" onClick={() => setPreview(true)}><Eye className="w-4 h-4 mr-1" />Vista previa</Button>
            </div>
          </div>
          <div className="ic-card space-y-4">
            <div className="space-y-1.5">
              <Label>Dirección</Label>
              <div className="flex items-center text-xs text-muted-foreground gap-1"><span>/blog/</span>
                <Input className="h-8 text-xs" value={draft.slug} onChange={(e) => { setSlugTouched(true); set("slug", slugify(e.target.value)); }} />
              </div>
              {!isNew && draft.status === "published" && <p className="text-[11px] text-muted-foreground">Cambiarla rompe los enlaces existentes.</p>}
            </div>
            <div className="space-y-1.5">
              <Label>Tipo</Label>
              <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={draft.kind} onChange={(e) => set("kind", e.target.value as BlogKind)}>
                {(Object.keys(BLOG_KIND_LABEL) as BlogKind[]).map((k) => <option key={k} value={k}>{BLOG_KIND_LABEL[k].es}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label>Fecha de publicación</Label>
              <Input type="date" value={draft.date} onChange={(e) => set("date", e.target.value)} />
            </div>
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="translated" className="text-sm">Versión inglesa revisada</Label>
              <Switch id="translated" checked={draft.translated} onCheckedChange={(v) => set("translated", v)} />
            </div>
            <div className="space-y-2">
              <Label>Imagen de portada</Label>
              {draft.coverUrl && <img src={draft.coverUrl} alt="" className="w-full rounded border border-border" />}
              <div className="flex gap-2">
                <Button type="button" size="sm" variant="outline" onClick={() => coverRef.current?.click()}><Upload className="w-4 h-4 mr-1" />{draft.coverUrl ? "Cambiar" : "Subir"}</Button>
                {draft.coverUrl && <Button type="button" size="sm" variant="ghost" onClick={() => set("coverUrl", null)}>Quitar</Button>}
              </div>
              <input ref={coverRef} type="file" accept="image/*" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) void uploadCover(f); e.target.value = ""; }} />
            </div>
          </div>
          {!isNew && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" className="w-full text-destructive hover:text-destructive"><Trash2 className="w-4 h-4 mr-1" />Eliminar entrada</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Eliminar esta entrada?</AlertDialogTitle>
                  <AlertDialogDescription>Se borrará definitivamente. Si solo quieres ocultarla, despublícala.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={() => remove.mutate()}>Eliminar</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </aside>
      </main>

      <Dialog open={preview} onOpenChange={setPreview}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-2xl">{draft.title[lang] || "(sin título)"}</DialogTitle></DialogHeader>
          <article className="space-y-5">
            <p className="text-sm text-muted-foreground">{draft.description[lang]}</p>
            {draft.coverUrl && <img src={draft.coverUrl} alt="" className="w-full rounded-xl border border-border" />}
            <BlogBlocks blocks={cleanBlocks(draft.blocks[lang])} />
          </article>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const AdminPostEditor = () => (
  <AdminGuard>
    <AdminPostEditorContent />
  </AdminGuard>
);

export default AdminPostEditor;
