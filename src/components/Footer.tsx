import { Link } from "react-router-dom"
import { 
  LayoutDashboard, 
  Heart, 
  Users, 
  Syringe, 
  Calendar, 
  Shield, 
  TestTube, 
  Stethoscope, 
  ShoppingBag, 
  FileText, 
  Wifi,
  Mail,
  Phone,
  MapPin
} from "lucide-react"

export function Footer() {
  const sectionLinks = [
    { title: "Dashboard", url: "/", icon: LayoutDashboard },
    { title: "Mascotas", url: "/mascotas", icon: Heart },
    { title: "Dueños", url: "/duenos", icon: Users },
    { title: "Vacunas", url: "/vacunas", icon: Syringe },
    { title: "Gestor de Calendario", url: "/calendar", icon: Calendar },
    { title: "Control Policial", url: "/control-policial", icon: Shield },
    { title: "Laboratorio", url: "/laboratorio", icon: TestTube },
    { title: "Servicios", url: "/servicios", icon: Stethoscope },
    { title: "Farmacia", url: "/farmacia", icon: ShoppingBag },
    { title: "Control Interno y Facturación", url: "/marketplace", icon: FileText },
    { title: "IoT Dashboard", url: "/iot-dashboard", icon: Wifi },
  ]

  return (
    <footer className="bg-slate-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Sistema de Gestión */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Sistema de Gestión Veterinaria</h3>
            <p className="text-gray-300 text-sm mb-4">
              Sistema integral para la gestión de clínicas veterinarias, control de especies 
              en peligro y servicios especializados.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>+593 2 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>info@veterinaria.gob.ec</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>Quito, Ecuador</span>
              </div>
            </div>
          </div>

          {/* Gestión Clínica */}
          <div>
            <h4 className="font-semibold mb-4">Gestión Clínica</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/mascotas" className="text-gray-300 hover:text-white flex items-center">
                  <Heart className="w-4 h-4 mr-2" />
                  Registro de Mascotas
                </Link>
              </li>
              <li>
                <Link to="/duenos" className="text-gray-300 hover:text-white flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Gestión de Dueños
                </Link>
              </li>
              <li>
                <Link to="/vacunas" className="text-gray-300 hover:text-white flex items-center">
                  <Syringe className="w-4 h-4 mr-2" />
                  Control de Vacunas
                </Link>
              </li>
              <li>
                <Link to="/calendar" className="text-gray-300 hover:text-white flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Gestor de Calendario
                </Link>
              </li>
            </ul>
          </div>

          {/* Servicios Especializados */}
          <div>
            <h4 className="font-semibold mb-4">Servicios Especializados</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/control-policial" className="text-gray-300 hover:text-white flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Control Policial
                </Link>
              </li>
              <li>
                <Link to="/laboratorio" className="text-gray-300 hover:text-white flex items-center">
                  <TestTube className="w-4 h-4 mr-2" />
                  Análisis de Laboratorio
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="text-gray-300 hover:text-white flex items-center">
                  <Stethoscope className="w-4 h-4 mr-2" />
                  Servicios Médicos
                </Link>
              </li>
              <li>
                <Link to="/farmacia" className="text-gray-300 hover:text-white flex items-center">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Farmacia Veterinaria
                </Link>
              </li>
            </ul>
          </div>

          {/* Administración */}
          <div>
            <h4 className="font-semibold mb-4">Administración</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white flex items-center">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard Principal
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-gray-300 hover:text-white flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Control Interno y Facturación
                </Link>
              </li>
              <li>
                <Link to="/iot-dashboard" className="text-gray-300 hover:text-white flex items-center">
                  <Wifi className="w-4 h-4 mr-2" />
                  Monitoreo IoT
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400">
              © 2024 Sistema de Gestión Veterinaria - República del Ecuador. Todos los derechos reservados.
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0 text-sm">
              <span className="text-gray-400">Ministerio de Salud Pública</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-400">AGROCALIDAD</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-400">Policía Nacional</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}