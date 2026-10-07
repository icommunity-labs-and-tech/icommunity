import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

const AdminResetPassword = () => {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Contraseña actualizada");
    navigate("/admin/blog", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <Helmet><meta name="robots" content="noindex, nofollow" /><title>Nueva contraseña — iCommunity</title></Helmet>
      <form onSubmit={submit} className="ic-card w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold text-foreground">Nueva contraseña</h1>
        <div className="space-y-1.5">
          <Label htmlFor="pw">Contraseña</Label>
          <Input id="pw" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
        </div>
        <Button type="submit" className="w-full" disabled={busy}>{busy ? "Guardando…" : "Guardar"}</Button>
      </form>
    </div>
  );
};

export default AdminResetPassword;
