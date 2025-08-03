
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/hooks/useAuth"
import { LoadingProvider } from "@/contexts/LoadingContext"
import { initSentry } from "@/utils/sentry"
import Layout from "@/layouts/Layout"
import Dashboard from "@/pages/Dashboard"
import Mascotas from "@/pages/Mascotas"
import NotFound from "@/pages/NotFound"
import Laboratorio from "@/pages/Laboratorio"
import Servicios from "@/pages/Servicios"
import Farmacia from "@/pages/Farmacia"
import Marketplace from "@/pages/Marketplace"
import IoTDashboard from "@/pages/IoTDashboard"
import Duenos from "@/pages/Duenos"
import Vacunas from "@/pages/Vacunas"
import Calendar from "@/pages/Calendar"
import ControlPolicial from "@/pages/ControlPolicial"

const queryClient = new QueryClient()

// Initialize Sentry for error monitoring
initSentry()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LoadingProvider>
        <AuthProvider>
          <Toaster />
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="mascotas" element={<Mascotas />} />
              <Route path="duenos" element={<Duenos />} />
              <Route path="vacunas" element={<Vacunas />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="control-policial" element={<ControlPolicial />} />
              <Route path="laboratorio" element={<Laboratorio />} />
              <Route path="servicios" element={<Servicios />} />
              <Route path="farmacia" element={<Farmacia />} />
              <Route path="marketplace" element={<Marketplace />} />
              <Route path="iot-dashboard" element={<IoTDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LoadingProvider>
  </QueryClientProvider>
  )
}

export default App
