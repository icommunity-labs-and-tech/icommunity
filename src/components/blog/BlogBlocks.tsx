import type { BlogBlock } from "@/content/blogTypes";

interface BlogBlocksProps {
  blocks: BlogBlock[];
}

const BlogBlocks = ({ blocks }: BlogBlocksProps) => (
  <>
    {blocks.map((b, i) =>
      b.type === "heading" ? (
        <h2 key={i} className="text-xl font-semibold text-foreground pt-5">{b.text}</h2>
      ) : b.type === "list" ? (
        <ul key={i} className="space-y-2">
          {b.items.map((item, j) => (
            <li key={j} className="flex gap-3 text-muted-foreground leading-relaxed">
              <span className="font-mono text-primary mt-0.5">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : b.type === "image" ? (
        <figure key={i} className="my-6">
          <img src={b.url} alt={b.alt} loading="lazy" className="w-full rounded-xl border border-border" />
          {b.alt && <figcaption className="mt-2 text-xs text-muted-foreground">{b.alt}</figcaption>}
        </figure>
      ) : (
        <p key={i} className="text-muted-foreground leading-relaxed">{b.text}</p>
      ),
    )}
  </>
);

export default BlogBlocks;
