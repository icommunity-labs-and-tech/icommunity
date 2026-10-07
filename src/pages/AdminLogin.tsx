import { useState, type FormEvent } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/useAuth";

type Mode = "signin" | "signup" | "reset";

const AdminLogin = () => {
  const { user, loading } = useAuth();
  const [params] = useSearchParams();
  const next = params.get("next")?.startsWith("/admin") ? (params.get("next") as string) : "/admin/blog";
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  if (!loading && user) return <Navigate to={next} replace />;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin/acceso` },
        });
        if (error) throw error;
        toast.success("Te hemos enviado un email para confirmar la cuenta.");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/admin/nueva-contrasena`,
        });
        if (error) throw error;
        toast.success("Si la cuenta existe, recibirás un email para cambiar la contraseña.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo completar la acción");
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    sessionStorage.setItem("admin-next", next);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: `${window.location.origin}/admin/acceso` });
    if (result.error) toast.error("No se pudo iniciar sesión con Google");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <Helmet><meta name="robots" content="noindex, nofollow" /><title>Acceso al panel — iCommunity</title></Helmet>
      <div className="ic-card w-full max-w-sm space-y-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">Panel del blog</p>
          <h1 className="text-2xl font-semibold text-foreground">
            {mode === "signin" ? "Iniciar sesión" : mode === "signup" ? "Crear cuenta" : "Recuperar contraseña"}
          </h1>
        </div>
        <Button type="button" variant="outline" className="w-full" onClick={google}>Continuar con Google</Button>
        <div className="flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />o<span className="h-px flex-1 bg-border" /></div>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </div>
          {mode !== "reset" && (
            <div className="space-y-1.5">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === "signup" ? "new-password" : "current-password"} />
            </div>
          )}
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? "Un momento…" : mode === "signin" ? "Entrar" : mode === "signup" ? "Crear cuenta" : "Enviar enlace"}
          </Button>
        </form>
        <div className="flex justify-between text-xs">
          {mode !== "signin" ? (
            <button className="text-muted-foreground hover:text-foreground" onClick={() => setMode("signin")}>Ya tengo cuenta</button>
          ) : (
            <button className="text-muted-foreground hover:text-foreground" onClick={() => setMode("signup")}>Crear cuenta</button>
          )}
          <button className="text-muted-foreground hover:text-foreground" onClick={() => setMode("reset")}>He olvidado la contraseña</button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
