
import { ReactNode } from "react"
import { Outlet } from "react-router-dom"
import { AppSidebar } from "@/components/AppSidebar"

interface LayoutProps {
  children?: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col ml-64">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-800">Sistema de Gestión Veterinaria</h2>
          </div>
        </header>
        
        <main className="flex-1 p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  )
}
