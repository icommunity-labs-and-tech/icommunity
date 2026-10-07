import { useRef, useState } from "react";
import { ArrowDown, ArrowUp, Heading2, ImagePlus, List, Pilcrow, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { BlogBlock } from "@/content/blogTypes";
import { uploadBlogImage } from "@/lib/blogApi";

interface BlockEditorProps {
  blocks: BlogBlock[];
  onChange: (blocks: BlogBlock[]) => void;
}

const BlockEditor = ({ blocks, onChange }: BlockEditorProps) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const update = (i: number, b: BlogBlock) => onChange(blocks.map((x, j) => (j === i ? b : x)));
  const remove = (i: number) => onChange(blocks.filter((_, j) => j !== i));
  const move = (i: number, d: -1 | 1) => {
    const j = i + d;
    if (j < 0 || j >= blocks.length) return;
    const next = [...blocks];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const add = (b: BlogBlock) => onChange([...blocks, b]);

  const uploadFiles = async (files: FileList | File[]) => {
    const images = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (!images.length) return;
    setUploading(true);
    try {
      const added: BlogBlock[] = [];
      for (const f of images) {
        if (f.size > 10 * 1024 * 1024) {
          toast.error(`${f.name} supera los 10 MB`);
          continue;
        }
        added.push({ type: "image", url: await uploadBlogImage(f), alt: "" });
      }
      onChange([...blocks, ...added]);
      if (added.length) toast.success("Imagen subida. Añade una descripción breve.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo subir la imagen");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className={`space-y-3 rounded-xl p-1 ${dragOver ? "ring-2 ring-primary" : ""}`}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => { e.preventDefault(); setDragOver(false); void uploadFiles(e.dataTransfer.files); }}
    >
      {blocks.length === 0 && <p className="text-sm text-muted-foreground p-4 border border-dashed border-border rounded-lg">Aún no hay contenido. Añade un párrafo o arrastra imágenes aquí.</p>}
      {blocks.map((b, i) => (
        <div key={i} className="group border border-border rounded-lg p-3 bg-card space-y-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className="font-mono uppercase tracking-wider mr-auto">
              {b.type === "heading" ? "Encabezado" : b.type === "list" ? "Lista" : b.type === "image" ? "Imagen" : "Párrafo"}
            </span>
            <Button type="button" size="icon" variant="ghost" className="h-7 w-7" onClick={() => move(i, -1)} aria-label="Subir"><ArrowUp className="w-3.5 h-3.5" /></Button>
            <Button type="button" size="icon" variant="ghost" className="h-7 w-7" onClick={() => move(i, 1)} aria-label="Bajar"><ArrowDown className="w-3.5 h-3.5" /></Button>
            <Button type="button" size="icon" variant="ghost" className="h-7 w-7" onClick={() => remove(i)} aria-label="Eliminar"><Trash2 className="w-3.5 h-3.5" /></Button>
          </div>
          {b.type === "heading" && <Input value={b.text} onChange={(e) => update(i, { ...b, text: e.target.value })} className="font-semibold" />}
          {b.type === "paragraph" && <Textarea rows={4} value={b.text} onChange={(e) => update(i, { ...b, text: e.target.value })} />}
          {b.type === "list" && (
            <Textarea
              rows={4}
              placeholder="Un elemento por línea"
              value={b.items.join("\n")}
              onChange={(e) => update(i, { ...b, items: e.target.value.split("\n") })}
            />
          )}
          {b.type === "image" && (
            <div className="flex gap-3 items-start">
              <img src={b.url} alt={b.alt} className="w-32 h-20 object-cover rounded border border-border" />
              <Input placeholder="Descripción de la imagen (para accesibilidad y Google)" value={b.alt} onChange={(e) => update(i, { ...b, alt: e.target.value })} />
            </div>
          )}
        </div>
      ))}
      <div className="flex flex-wrap gap-2 pt-1">
        <Button type="button" size="sm" variant="outline" onClick={() => add({ type: "paragraph", text: "" })}><Pilcrow className="w-4 h-4 mr-1" />Párrafo</Button>
        <Button type="button" size="sm" variant="outline" onClick={() => add({ type: "heading", text: "" })}><Heading2 className="w-4 h-4 mr-1" />Encabezado</Button>
        <Button type="button" size="sm" variant="outline" onClick={() => add({ type: "list", items: [""] })}><List className="w-4 h-4 mr-1" />Lista</Button>
        <Button type="button" size="sm" variant="outline" disabled={uploading} onClick={() => fileRef.current?.click()}>
          <ImagePlus className="w-4 h-4 mr-1" />{uploading ? "Subiendo…" : "Imagen"}
        </Button>
        <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => { if (e.target.files) void uploadFiles(e.target.files); e.target.value = ""; }} />
      </div>
    </div>
  );
};

export default BlockEditor;
