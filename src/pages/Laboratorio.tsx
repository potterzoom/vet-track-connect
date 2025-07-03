
import { useState } from "react"
import { Flask, Search, Plus, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Analisis {
  id: number
  mascota: string
  dueno: string
  tipoAnalisis: string
  fechaSolicitud: string
  fechaResultado: string | null
  estado: string
  veterinario: string
  laboratorio: string
  prioridad: string
  costo: number
}

const analisis: Analisis[] = [
  {
    id: 1,
    mascota: "Max",
    dueno: "María García",
    tipoAnalisis: "Hemograma Completo",
    fechaSolicitud: "2024-07-01",
    fechaResultado: "2024-07-02",
    estado: "completado",
    veterinario: "Dr. Rodríguez",
    laboratorio: "LabVet Central",
    prioridad: "normal",
    costo: 45.00
  },
  {
    id: 2,
    mascota: "Luna",
    dueno: "Carlos López",
    tipoAnalisis: "Perfil Hepático",
    fechaSolicitud: "2024-07-02",
    fechaResultado: null,
    estado: "procesando",
    veterinario: "Dra. Martínez",
    laboratorio: "DiagnostiVet",
    prioridad: "alta",
    costo: 65.00
  },
  {
    id: 3,
    mascota: "Toby",
    dueno: "Ana Martínez",
    tipoAnalisis: "Análisis de Orina",
    fechaSolicitud: "2024-07-03",
    fechaResultado: null,
    estado: "pendiente",
    veterinario: "Dr. Rodríguez",
    laboratorio: "LabVet Central",
    prioridad: "normal",
    costo: 25.00
  }
]

export default function Laboratorio() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredAnalisis = analisis.filter(item =>
    item.mascota.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.dueno.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tipoAnalisis.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getEstadoInfo = (estado: string) => {
    switch (estado) {
      case "completado": return { color: "bg-green-100 text-green-800", icon: <CheckCircle className="w-4 h-4" /> }
      case "procesando": return { color: "bg-blue-100 text-blue-800", icon: <Clock className="w-4 h-4" /> }
      case "pendiente": return { color: "bg-yellow-100 text-yellow-800", icon: <AlertCircle className="w-4 h-4" /> }
      default: return { color: "bg-gray-100 text-gray-800", icon: <Flask className="w-4 h-4" /> }
    }
  }

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case "alta": return "border-l-4 border-red-500"
      case "media": return "border-l-4 border-yellow-500"
      case "normal": return "border-l-4 border-green-500"
      default: return "border-l-4 border-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Flask className="w-8 h-8 text-purple-600" />
            Laboratorio
          </h1>
          <p className="text-gray-600">Gestión de análisis clínicos y resultados</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Análisis
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Buscar análisis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">{analisis.length}</div>
            <p className="text-sm text-gray-600">Total Análisis</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {analisis.filter(a => a.estado === "procesando").length}
            </div>
            <p className="text-sm text-gray-600">En Proceso</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {analisis.filter(a => a.estado === "pendiente").length}
            </div>
            <p className="text-sm text-gray-600">Pendientes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {analisis.filter(a => a.estado === "completado").length}
            </div>
            <p className="text-sm text-gray-600">Completados</p>
          </CardContent>
        </Card>
      </div>

      {/* Análisis List */}
      <div className="space-y-4">
        {filteredAnalisis.map((item) => {
          const estadoInfo = getEstadoInfo(item.estado)
          return (
            <Card key={item.id} className={`hover:shadow-lg transition-shadow ${getPrioridadColor(item.prioridad)}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{item.tipoAnalisis}</CardTitle>
                    <p className="text-sm text-gray-600">{item.mascota} - {item.dueno}</p>
                  </div>
                  <Badge className={`${estadoInfo.color} flex items-center gap-1`}>
                    {estadoInfo.icon}
                    {item.estado}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Veterinario</p>
                      <p className="text-sm font-medium">{item.veterinario}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Laboratorio</p>
                      <p className="text-sm font-medium">{item.laboratorio}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Fecha Solicitud</p>
                      <p className="text-sm font-medium">{new Date(item.fechaSolicitud).toLocaleDateString('es-ES')}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Fecha Resultado</p>
                      <p className="text-sm font-medium">
                        {item.fechaResultado ? new Date(item.fechaResultado).toLocaleDateString('es-ES') : 'Pendiente'}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Prioridad</p>
                      <p className={`text-sm font-medium capitalize ${
                        item.prioridad === 'alta' ? 'text-red-600' : 
                        item.prioridad === 'media' ? 'text-yellow-600' : 
                        'text-green-600'
                      }`}>{item.prioridad}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Costo</p>
                      <p className="text-sm font-medium">${item.costo}</p>
                    </div>
                  </div>
                </div>
                {item.estado === "completado" && (
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <Button variant="outline" size="sm">
                      Ver Resultados
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
