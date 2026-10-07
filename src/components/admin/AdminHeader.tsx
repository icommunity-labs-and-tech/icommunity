import { Link, NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const AdminHeader = () => {
  const { user, isAdmin, signOut } = useAuth();
  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `text-sm transition-colors ${isActive ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`;
  return (
    <header className="border-b border-border bg-card/60 backdrop-blur sticky top-0 z-30">
      <div className="ic-container h-14 flex items-center gap-6">
        <Link to="/admin/blog" className="font-mono text-xs uppercase tracking-widest text-primary">Panel del blog</Link>
        <nav className="flex items-center gap-5">
          <NavLink to="/admin/blog" end className={linkCls}>Entradas</NavLink>
          {isAdmin && <NavLink to="/admin/equipo" className={linkCls}>Equipo</NavLink>}
          <a href="/blog" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-foreground">Ver blog</a>
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <span className="hidden sm:inline text-xs text-muted-foreground">{user?.email}</span>
          <Button size="sm" variant="ghost" onClick={signOut} aria-label="Cerrar sesión">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
