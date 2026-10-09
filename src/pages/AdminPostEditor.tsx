import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, CalendarClock, Eye, Languages, Sparkles, Trash2, Upload } from "lucide-react";
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
import AiArticleDialog, { invokeBlogAi, type AiArticle } from "@/components/admin/AiArticleDialog";
import BlogBlocks from "@/components/blog/BlogBlocks";
import { useAdminPost } from "@/hooks/useBlogPosts";
import { supabase } from "@/integrations/supabase/client";
import { BLOG_KIND_LABEL, type BlogBlock, type BlogKind, type BlogLang } from "@/content/blogTypes";
import { STATUS_LABEL, effectiveStatus, estimateReadingMinutes, postToRow, slugify, uploadBlogImage, type AdminBlogPost } from "@/lib/blogApi";
import { toLocalInput } from "@/lib/blogAutomation";

type Draft = Omit<AdminBlogPost, "id" | "updatedAt">;

const emptyDraft = (): Draft => ({
  slug: "",
  kind: "article",
  status: "draft",
  publishAt: null,
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
  const [coverPrompt, setCoverPrompt] = useState("");
  const [generatingCover, setGeneratingCover] = useState(false);
  const [scheduleInput, setScheduleInput] = useState("");
  const coverRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (existing) {
      const { id: _id, updatedAt: _u, ...rest } = existing;
      setDraft(rest);
      setSlugTouched(true);
      setScheduleInput(rest.publishAt ? toLocalInput(new Date(rest.publishAt)) : "");
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
      if (status !== "draft" && !payload.description.es.trim()) throw new Error("Añade una descripción antes de publicar o programar");
      if (status === "scheduled") {
        if (!scheduleInput) throw new Error("Elige día y hora de publicación");
        const at = new Date(scheduleInput);
        if (at <= new Date()) throw new Error("La fecha programada debe ser futura");
        payload.publishAt = at.toISOString();
        payload.date = scheduleInput.slice(0, 10);
      } else {
        payload.publishAt = null;
      }
      const row = postToRow(payload);
      if (isNew) {
        const { data, error } = await supabase.from("blog_posts").insert(row).select("id").single();
        if (error) throw error;
        return { id: data.id, status, publishAt: payload.publishAt, date: payload.date };
      }
      const { error } = await supabase.from("blog_posts").update(row).eq("id", id as string);
      if (error) throw error;
      return { id: id as string, status, publishAt: payload.publishAt, date: payload.date };
    },
    onSuccess: ({ id: savedId, status, publishAt, date }) => {
      setDraft((d) => ({ ...d, status, publishAt, date }));
      qc.invalidateQueries({ queryKey: ["blog-posts"] });
      toast.success(status === "published" ? "Entrada publicada" : status === "scheduled" ? `Programada para el ${new Date(publishAt as string).toLocaleString("es-ES", { dateStyle: "long", timeStyle: "short" })}` : "Borrador guardado");
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

  const applyAiArticle = (a: AiArticle, topic: string) => {
    setDraft((d) => ({
      ...d,
      title: { ...d.title, es: a.title },
      description: { ...d.description, es: a.description },
      blocks: { ...d.blocks, es: a.blocks },
      slug: slugTouched ? d.slug : slugify(a.title),
      translated: false,
    }));
    setLang("es");
    if (!coverPrompt) setCoverPrompt(topic);
  };

  const generateCover = async () => {
    const prompt = coverPrompt.trim() || draft.title.es.trim();
    if (prompt.length < 5) return toast.error("Describe la imagen o escribe antes el título");
    setGeneratingCover(true);
    try {
      const { image, mime } = await invokeBlogAi<{ image: string; mime: string }>({ action: "cover", prompt });
      const bytes = Uint8Array.from(atob(image), (c) => c.charCodeAt(0));
      const file = new File([bytes], "portada-ia.png", { type: mime });
      set("coverUrl", await uploadBlogImage(file));
      toast.success("Portada generada");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo generar la portada");
    } finally {
      setGeneratingCover(false);
    }
  };

  if (!isNew && isLoading) {
    return <div className="min-h-screen bg-background"><AdminHeader /><div className="ic-container py-10 space-y-4"><Skeleton className="h-10 w-1/2" /><Skeleton className="h-64 w-full" /></div></div>;
  }
  if (!isNew && !existing) {
    return <div className="min-h-screen bg-background"><AdminHeader /><div className="ic-container py-10"><p className="text-muted-foreground">Entrada no encontrada. <Link to="/admin/blog" className="text-primary">Volver</Link></p></div></div>;
  }

  const busy = save.isPending;
  const shownStatus = effectiveStatus(draft);

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
              <AiArticleDialog kind={draft.kind} hasContent={draft.blocks.es.length > 0 || !!draft.title.es.trim()} onGenerated={applyAiArticle} />
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
              Estado: <span className={shownStatus !== "draft" ? "text-primary" : ""}>{STATUS_LABEL[shownStatus]}</span>
            </p>
            {shownStatus === "scheduled" && draft.publishAt && (
              <p className="text-xs text-muted-foreground">Se publicará el {new Date(draft.publishAt).toLocaleString("es-ES", { dateStyle: "long", timeStyle: "short" })}</p>
            )}
            <div className="grid gap-2">
              <Button onClick={() => save.mutate("published")} disabled={busy}>
                {shownStatus === "published" ? "Guardar cambios" : "Publicar ahora"}
              </Button>
              <Button variant="outline" onClick={() => save.mutate("draft")} disabled={busy}>
                {shownStatus === "published" ? "Despublicar (pasar a borrador)" : shownStatus === "scheduled" ? "Cancelar programación" : "Guardar borrador"}
              </Button>
              <Button variant="ghost" onClick={() => setPreview(true)}><Eye className="w-4 h-4 mr-1" />Vista previa</Button>
            </div>
            {shownStatus !== "published" && (
              <div className="space-y-1.5 border-t border-border pt-4">
                <Label htmlFor="schedule-at" className="flex items-center gap-1"><CalendarClock className="w-4 h-4" />Programar publicación</Label>
                <Input id="schedule-at" type="datetime-local" value={scheduleInput} onChange={(e) => setScheduleInput(e.target.value)} />
                <Button variant="outline" className="w-full" onClick={() => save.mutate("scheduled")} disabled={busy || !scheduleInput}>
                  {shownStatus === "scheduled" ? "Reprogramar" : "Programar"}
                </Button>
              </div>
            )}
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
              <div className="space-y-1.5 pt-1">
                <Textarea rows={2} className="text-xs" value={coverPrompt} onChange={(e) => setCoverPrompt(e.target.value)} placeholder="Describe la imagen (si lo dejas vacío se usa el título)" />
                <Button type="button" size="sm" variant="outline" className="w-full" onClick={generateCover} disabled={generatingCover}>
                  <Sparkles className="w-4 h-4 mr-1" />{generatingCover ? "Generando… (hasta 1 min)" : "Generar portada con IA"}
                </Button>
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
