import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const Spinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" aria-label="Cargando" />
  </div>
);

const AdminGuard = ({ children }: { children: ReactNode }) => {
  const { user, loading, rolesLoading, isEditor, signOut } = useAuth();
  const location = useLocation();

  if (loading || rolesLoading) return <Spinner />;
  if (!user) return <Navigate to={`/admin/acceso?next=${encodeURIComponent(location.pathname)}`} replace />;
  if (!isEditor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="ic-card max-w-md text-center space-y-4">
          <h1 className="text-xl font-semibold text-foreground">Sin acceso al panel</h1>
          <p className="text-sm text-muted-foreground">
            Has entrado como <strong>{user.email}</strong>, pero esta cuenta no tiene permiso de edición. Pide a un administrador que te invite.
          </p>
          <Button variant="outline" onClick={signOut}>Cerrar sesión</Button>
        </div>
      </div>
    );
  }
  return <>{children}</>;
};

export default AdminGuard;
