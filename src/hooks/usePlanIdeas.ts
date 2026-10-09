import { useCallback, useEffect, useState } from "react";
import type { PlanIdea } from "@/lib/blogAutomation";

const KEY = "ic-blog-plan-ideas";

const read = (): PlanIdea[] => {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(v) ? (v as PlanIdea[]) : [];
  } catch {
    return [];
  }
};

/** Pending ideas of the bulk generator, kept in the browser so a reload does not lose the plan. */
export const usePlanIdeas = () => {
  const [ideas, setIdeas] = useState<PlanIdea[]>(read);
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(ideas)); }, [ideas]);

  const add = useCallback((items: PlanIdea[]) => setIdeas((cur) => [...cur, ...items]), []);
  const update = useCallback((id: string, patch: Partial<PlanIdea>) => setIdeas((cur) => cur.map((i) => (i.id === id ? { ...i, ...patch } : i))), []);
  const remove = useCallback((id: string) => setIdeas((cur) => cur.filter((i) => i.id !== id)), []);
  const clear = useCallback(() => setIdeas([]), []);
  return { ideas, add, update, remove, clear, setIdeas };
};

export type PlanIdeasApi = ReturnType<typeof usePlanIdeas>;
