
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Mascotas from "./pages/Mascotas";
import Duenos from "./pages/Duenos";
import Servicios from "./pages/Servicios";
import Vacunas from "./pages/Vacunas";
import Farmacia from "./pages/Farmacia";
import Laboratorio from "./pages/Laboratorio";
import Marketplace from "./pages/Marketplace";
import IoTDashboard from "./pages/IoTDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/mascotas" element={<Mascotas />} />
            <Route path="/duenos" element={<Duenos />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/vacunas" element={<Vacunas />} />
            <Route path="/farmacia" element={<Farmacia />} />
            <Route path="/laboratorio" element={<Laboratorio />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/iot" element={<IoTDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
