import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type Role = "admin" | "editor";

interface AuthState {
  session: Session | null;
  user: User | null;
  loading: boolean;
  roles: Role[];
  rolesLoading: boolean;
  isEditor: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const userId = session?.user.id;
  const { data: roles = [], isPending: rolesPending, isFetching: rolesFetching } = useQuery({
    queryKey: ["user-roles", userId],
    enabled: !!userId,
    queryFn: async (): Promise<Role[]> => {
      const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", userId as string);
      if (error) throw error;
      return (data ?? []).map((r) => r.role as Role);
    },
  });

  const value: AuthState = {
    session,
    user: session?.user ?? null,
    loading,
    roles,
    // While roles are (re)fetching and none grant access yet, report loading so guards never flash "no access".
    rolesLoading: !!userId && (rolesPending || (rolesFetching && roles.length === 0)),
    isAdmin: roles.includes("admin"),
    isEditor: roles.includes("admin") || roles.includes("editor"),
    signOut: async () => {
      await supabase.auth.signOut();
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
