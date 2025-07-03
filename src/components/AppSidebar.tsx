
import { Heart, Users, Calendar, Flask, Pill, ShoppingCart, Home, Wifi } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

const items = [
  { title: "Inicio", url: "/", icon: Home },
  { title: "Mascotas", url: "/mascotas", icon: Heart },
  { title: "Dueños", url: "/duenos", icon: Users },
  { title: "Vacunas", url: "/vacunas", icon: Calendar },
  { title: "Farmacia", url: "/farmacia", icon: Pill },
  { title: "Laboratorio", url: "/laboratorio", icon: Flask },
  { title: "Marketplace", url: "/marketplace", icon: ShoppingCart },
  { title: "IoT Monitor", url: "/iot", icon: Wifi },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const collapsed = state === "collapsed"
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-blue-100 text-blue-700 border-r-2 border-blue-700" : "hover:bg-gray-100"

  return (
    <Sidebar
      className={`${collapsed ? "w-14" : "w-64"} bg-white border-r border-gray-200`}
      collapsible="icon"
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-bold text-xl text-gray-800">VetTrack</h1>
              <p className="text-xs text-gray-500">Gestión Veterinaria</p>
            </div>
          )}
        </div>
      </div>

      <SidebarTrigger className="m-2 self-end" />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 font-medium">
            {!collapsed && "Navegación Principal"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
