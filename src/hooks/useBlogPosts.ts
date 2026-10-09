import { useQuery } from "@tanstack/react-query";
import { fetchAllPosts, fetchPostById, fetchPublishedPosts } from "@/lib/blogApi";
import { blogPosts as seedPosts } from "@/content/blogPosts";

/** Public blog posts. The bundled seed is shown while loading so the page (and prerendered HTML) never flashes empty. */
export const usePublishedPosts = () =>
  useQuery({
    queryKey: ["blog-posts", "published"],
    queryFn: fetchPublishedPosts,
    placeholderData: () => seedPosts.map((p) => ({ ...p, id: p.slug, status: "published" as const, publishAt: null, updatedAt: p.date })),
    staleTime: 60_000,
  });

export const useAdminPosts = (enabled: boolean) =>
  useQuery({ queryKey: ["blog-posts", "admin"], queryFn: fetchAllPosts, enabled });

export const useAdminPost = (id: string | undefined) =>
  useQuery({ queryKey: ["blog-posts", "admin", id], queryFn: () => fetchPostById(id as string), enabled: !!id && id !== "nuevo" });
