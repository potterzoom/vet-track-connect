
import { useState } from "react"
import { TestTube, Search, Plus, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AddAnalysisModal } from "@/components/modals/AddAnalysisModal"

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
  const [showAll, setShowAll] = useState(false)

  const filteredAnalisis = analisis.filter(item =>
    item.mascota.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.dueno.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tipoAnalisis.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const displayedAnalisis = showAll ? filteredAnalisis : filteredAnalisis.slice(0, 5)

  const getEstadoInfo = (estado: string) => {
    switch (estado) {
      case "completado": return { color: "bg-green-100 text-green-800", icon: <CheckCircle className="w-4 h-4" /> }
      case "procesando": return { color: "bg-blue-100 text-blue-800", icon: <Clock className="w-4 h-4" /> }
      case "pendiente": return { color: "bg-yellow-100 text-yellow-800", icon: <AlertCircle className="w-4 h-4" /> }
      default: return { color: "bg-gray-100 text-gray-800", icon: <TestTube className="w-4 h-4" /> }
    }
  }

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case "alta": return "text-red-600"
      case "media": return "text-yellow-600"
      case "normal": return "text-green-600"
      default: return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <TestTube className="w-8 h-8 text-purple-600" />
            Laboratorio
          </h1>
          <p className="text-gray-600">Gestión de análisis clínicos y resultados</p>
        </div>
        <AddAnalysisModal />
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

      {/* Análisis Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Análisis de Laboratorio</span>
            <Badge variant="outline">{filteredAnalisis.length} total</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Análisis</TableHead>
                <TableHead>Mascota</TableHead>
                <TableHead>Dueño</TableHead>
                <TableHead>Veterinario</TableHead>
                <TableHead>Laboratorio</TableHead>
                <TableHead>Fecha Solicitud</TableHead>
                <TableHead>Fecha Resultado</TableHead>
                <TableHead>Prioridad</TableHead>
                <TableHead>Costo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedAnalisis.map((item) => {
                const estadoInfo = getEstadoInfo(item.estado)
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.tipoAnalisis}</TableCell>
                    <TableCell>{item.mascota}</TableCell>
                    <TableCell>{item.dueno}</TableCell>
                    <TableCell className="text-sm">{item.veterinario}</TableCell>
                    <TableCell className="text-sm">{item.laboratorio}</TableCell>
                    <TableCell>{new Date(item.fechaSolicitud).toLocaleDateString('es-ES')}</TableCell>
                    <TableCell>
                      {item.fechaResultado ? new Date(item.fechaResultado).toLocaleDateString('es-ES') : 'Pendiente'}
                    </TableCell>
                    <TableCell>
                      <span className={`font-medium capitalize ${getPrioridadColor(item.prioridad)}`}>
                        {item.prioridad}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium">${item.costo}</TableCell>
                    <TableCell>
                      <Badge className={`${estadoInfo.color} flex items-center gap-1 w-fit`}>
                        {estadoInfo.icon}
                        {item.estado}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {item.estado === "completado" && (
                        <Button variant="outline" size="sm">
                          Ver Resultados
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          
          {filteredAnalisis.length > 5 && (
            <div className="mt-4 text-center">
              <Button 
                variant="outline" 
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? 'Mostrar menos' : `Ver todos (${filteredAnalisis.length - 5} más)`}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
