import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminHeader from "@/components/admin/AdminHeader";
import PlannerCalendar from "@/components/admin/PlannerCalendar";
import BulkGenerator from "@/components/admin/BulkGenerator";
import TrendsFinder from "@/components/admin/TrendsFinder";
import { usePlanIdeas } from "@/hooks/usePlanIdeas";

const AdminPlannerContent = () => {
  const plan = usePlanIdeas();
  return (
    <div className="min-h-screen bg-background">
      <Helmet><meta name="robots" content="noindex, nofollow" /><title>Planificador — Panel del blog</title></Helmet>
      <AdminHeader />
      <main className="ic-container py-10 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Planificador e IA</h1>
          <p className="text-sm text-muted-foreground">Programa publicaciones, genera artículos en bloque y busca ideas en la actualidad del sector.</p>
        </div>
        <Tabs defaultValue="calendar">
          <TabsList>
            <TabsTrigger value="calendar">Calendario</TabsTrigger>
            <TabsTrigger value="bulk">Generador en bloque{plan.ideas.length ? ` (${plan.ideas.length})` : ""}</TabsTrigger>
            <TabsTrigger value="trends">Tendencias</TabsTrigger>
          </TabsList>
          <TabsContent value="calendar" className="mt-6"><PlannerCalendar /></TabsContent>
          <TabsContent value="bulk" className="mt-6"><BulkGenerator plan={plan} /></TabsContent>
          <TabsContent value="trends" className="mt-6"><TrendsFinder plan={plan} /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

const AdminPlanner = () => (
  <AdminGuard>
    <AdminPlannerContent />
  </AdminGuard>
);

export default AdminPlanner;
