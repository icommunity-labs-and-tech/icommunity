import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ScrollToTop } from "@/components/ScrollToTop";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Index from "./pages/Index";
import Solutions from "./pages/Solutions";
import Partners from "./pages/Partners";
import Empresa from "./pages/Empresa";
import Legal from "./pages/Legal";
import Financiacion from "./pages/Financiacion";
import Terms from "./pages/Terms";
import Refunds from "./pages/Refunds";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/soluciones" element={<Solutions />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/empresa" element={<Empresa />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/financiacion" element={<Financiacion />} />
              <Route path="/terminos" element={<Terms />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/reembolsos" element={<Refunds />} />
              <Route path="/refunds" element={<Refunds />} />
              {/* Legacy route redirects (client-side, replace history so crawlers treat as permanent) */}
              <Route path="/privacy" element={<Navigate to="/legal" replace />} />
              <Route path="/privacy-policy" element={<Navigate to="/legal" replace />} />
              <Route path="/cookies" element={<Navigate to="/legal" replace />} />
              <Route path="/cookie-policy" element={<Navigate to="/legal" replace />} />
              <Route path="/terms-of-service" element={<Navigate to="/terminos" replace />} />
              <Route path="/refund" element={<Navigate to="/reembolsos" replace />} />
              <Route path="/refund-policy" element={<Navigate to="/reembolsos" replace />} />
              <Route path="/aviso-legal" element={<Navigate to="/legal" replace />} />
              <Route path="/privacidad" element={<Navigate to="/legal" replace />} />
              <Route path="/politica-privacidad" element={<Navigate to="/legal" replace />} />
              <Route path="/politica-cookies" element={<Navigate to="/legal" replace />} />
              <Route path="/condiciones" element={<Navigate to="/terminos" replace />} />
              <Route path="/condiciones-servicio" element={<Navigate to="/terminos" replace />} />
              <Route path="/politica-reembolsos" element={<Navigate to="/reembolsos" replace />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
