
import {
  LayoutDashboard,
  Heart,
  Users,
  Calendar,
  TestTube,
  Stethoscope,
  ShoppingBag,
  FileText,
  Wifi,
  Settings,
  HelpCircle,
  LogOut,
  ChevronsLeft,
  Syringe,
  Shield,
  ShieldAlert,
} from "lucide-react"
import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"

interface MenuItemProps {
  title: string
  url: string
  icon: any
}

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Mascotas",
    url: "/mascotas",
    icon: Heart,
  },
  {
    title: "Dueños",
    url: "/duenos",
    icon: Users,
  },
  {
    title: "Vacunas",
    url: "/vacunas",
    icon: Syringe,
  },
  {
    title: "Gestor de Calendario",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Control Policial",
    url: "/control-policial",
    icon: Shield,
  },
  {
    title: "Laboratorio",
    url: "/laboratorio",
    icon: TestTube,
  },
  {
    title: "Servicios",
    url: "/servicios",
    icon: Stethoscope,
  },
  {
    title: "Farmacia",
    url: "/farmacia",
    icon: ShoppingBag,
  },
  {
    title: "Control Interno y Facturación",
    url: "/marketplace",
    icon: FileText,
  },
  {
    title: "IoT Dashboard",
    url: "/iot-dashboard",
    icon: Wifi,
  },
]

export function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    navigate("/login")
  }

  return (
    <aside
      className={cn(
        "flex flex-col bg-gray-50 border-r h-screen fixed top-0 left-0 z-50",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-end p-4">
        <ChevronsLeft
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
        />
      </div>

      <nav className="flex-1 px-2 py-4">
        <ul>
          {menuItems.map((item: MenuItemProps) => (
            <li key={item.title} className="mb-1">
              <Link
                to={item.url}
                className={cn(
                  "flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors",
                  location.pathname === item.url && "bg-gray-200 text-gray-900"
                )}
              >
                <item.icon
                  className={cn("w-5 h-5 mr-2", isCollapsed ? "mr-0" : "")}
                />
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4">
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors cursor-pointer" onClick={handleSignOut}>
            <LogOut className="w-5 h-5 mr-2" />
            {!isCollapsed && <span>Cerrar Sesión</span>}
          </div>
        </div>
      </div>
    </aside>
  )
}
