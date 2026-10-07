import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FunctionsHttpError } from "@supabase/supabase-js";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminHeader from "@/components/admin/AdminHeader";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface Member {
  user_id: string;
  email: string | null;
  role: "admin" | "editor";
}

const callTeam = async <T,>(body: Record<string, unknown>): Promise<T> => {
  const { data, error } = await supabase.functions.invoke("blog-team", { body });
  if (error) {
    const details = error instanceof FunctionsHttpError ? await error.context.json().catch(() => null) : null;
    throw new Error(details?.error ?? "No se pudo completar la acción");
  }
  return data as T;
};

const AdminTeamContent = () => {
  const { isAdmin, user } = useAuth();
  const qc = useQueryClient();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Member["role"]>("editor");

  const { data: members, isLoading, error } = useQuery({
    queryKey: ["blog-team"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data, error: e } = await supabase.from("user_roles").select("user_id, email, role").order("created_at");
      if (e) throw e;
      return (data ?? []) as Member[];
    },
  });

  const invite = useMutation({
    mutationFn: () => callTeam<{ invited: boolean }>({ action: "add", email, role }),
    onSuccess: (r) => {
      toast.success(r.invited ? "Invitación enviada por email" : "Acceso concedido");
      setEmail("");
      qc.invalidateQueries({ queryKey: ["blog-team"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const removeMember = useMutation({
    mutationFn: (m: Member) => callTeam({ action: "remove", user_id: m.user_id, role: m.role }),
    onSuccess: () => {
      toast.success("Acceso retirado");
      qc.invalidateQueries({ queryKey: ["blog-team"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (!isAdmin) return <Navigate to="/admin/blog" replace />;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    invite.mutate();
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet><meta name="robots" content="noindex, nofollow" /><title>Equipo — Panel del blog</title></Helmet>
      <AdminHeader />
      <main className="ic-container py-10 max-w-3xl space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Equipo</h1>
          <p className="text-sm text-muted-foreground mt-1">Los editores pueden escribir, publicar y borrar entradas. Los administradores además gestionan el equipo.</p>
        </div>
        <form onSubmit={submit} className="ic-card flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[220px] space-y-1.5">
            <label htmlFor="invite-email" className="text-sm font-medium">Email</label>
            <Input id="invite-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nombre@icommunity.io" />
          </div>
          <select className="h-10 rounded-md border border-input bg-background px-3 text-sm" value={role} onChange={(e) => setRole(e.target.value as Member["role"])} aria-label="Rol">
            <option value="editor">Editor</option>
            <option value="admin">Administrador</option>
          </select>
          <Button type="submit" disabled={invite.isPending}>{invite.isPending ? "Enviando…" : "Dar acceso"}</Button>
        </form>
        {error && <p className="text-sm text-destructive">No se pudo cargar el equipo.</p>}
        {isLoading ? (
          <Skeleton className="h-32 w-full" />
        ) : (
          <div className="border border-border rounded-xl divide-y divide-border">
            {(members ?? []).map((m) => (
              <div key={`${m.user_id}-${m.role}`} className="flex items-center gap-3 px-4 py-3">
                <span className="flex-1 text-sm text-foreground">{m.email ?? m.user_id}</span>
                <span className="text-xs font-mono uppercase text-muted-foreground">{m.role === "admin" ? "Administrador" : "Editor"}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  disabled={m.user_id === user?.id || removeMember.isPending}
                  onClick={() => removeMember.mutate(m)}
                  aria-label="Retirar acceso"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

const AdminTeam = () => (
  <AdminGuard>
    <AdminTeamContent />
  </AdminGuard>
);

export default AdminTeam;
