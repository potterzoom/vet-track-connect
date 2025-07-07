
import { useState } from "react"
import { Shield, ShieldAlert, Search, Filter, Plus, AlertTriangle, FileText, Calendar, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddIncautacionModal } from "@/components/modals/AddIncautacionModal"
import { ReportePoliciailModal } from "@/components/modals/ReportePoliciailModal"

// Datos mock de especies en peligro y casos policiales
const especiesEnPeligro = [
  {
    id: 1,
    nombreCientifico: "Panthera onca",
    nombreComun: "Jaguar",
    estado: "En Peligro Crítico",
    ubicacion: "Amazonía Ecuatoriana",
    fechaReporte: "2024-07-01",
    reportadoPor: "Unidad Ambiental Pastaza",
    descripcion: "Avistamiento de jaguar herido cerca del río Puyo",
    urgencia: "alta"
  },
  {
    id: 2,
    nombreCientifico: "Ateles fusciceps",
    nombreComun: "Mono Araña de Cabeza Marrón",
    estado: "En Peligro Crítico",
    ubicacion: "Bosque Protector Chongón-Colonche",
    fechaReporte: "2024-06-28",
    reportadoPor: "Policía Ambiental Guayas",
    descripcion: "Grupo de monos desplazados por deforestación",
    urgencia: "media"
  },
  {
    id: 3,
    nombreCientifico: "Chelonia mydas",
    nombreComun: "Tortuga Verde",
    estado: "Vulnerable",
    ubicacion: "Playa de Machalilla",
    fechaReporte: "2024-07-02",
    reportadoPor: "Guardaparques SNAP",
    descripcion: "Tortuga con lesiones por redes de pesca",
    urgencia: "alta"
  }
]

const incautaciones = [
  {
    id: 1,
    fecha: "2024-07-03",
    ubicacion: "Terminal Terrestre Quitumbe",
    especiesIncautadas: "Loros, Tucanes (15 aves)",
    responsable: "Sgto. María Rodríguez",
    estado: "En Proceso",
    destinoAnimales: "Centro de Rescate Aves Exóticas",
    documentoLegal: "ACTA-AMB-2024-158",
    sospechoso: "Juan Carlos M. (CI: 170123456-7)"
  },
  {
    id: 2,
    fecha: "2024-07-01",
    ubicacion: "Aeropuerto José Joaquín de Olmedo",
    especiesIncautadas: "Iguanas Marinas (3 ejemplares)",
    responsable: "Tte. Carlos Vásquez",
    estado: "Completado",
    destinoAnimales: "Estación Científica Charles Darwin",
    documentoLegal: "ACTA-AMB-2024-156",
    sospechoso: "Turista extranjero"
  }
]

export default function ControlPolicial() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("especies")
  const [showIncautacionModal, setShowIncautacionModal] = useState(false)
  const [showReporteModal, setShowReporteModal] = useState(false)
  const [selectedUrgencia, setSelectedUrgencia] = useState<"todas" | "alta" | "media" | "baja">("todas")

  const filteredEspecies = especiesEnPeligro.filter(especie => {
    const matchesSearch = especie.nombreComun.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         especie.nombreCientifico.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         especie.ubicacion.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesUrgencia = selectedUrgencia === "todas" || especie.urgencia === selectedUrgencia
    
    return matchesSearch && matchesUrgencia
  })

  const getUrgenciaColor = (urgencia: string) => {
    switch (urgencia) {
      case "alta": return "bg-red-100 text-red-800 border-red-300"
      case "media": return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "baja": return "bg-green-100 text-green-800 border-green-300"
      default: return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "En Peligro Crítico": return "bg-red-100 text-red-800"
      case "En Peligro": return "bg-orange-100 text-orange-800"
      case "Vulnerable": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-600" />
            Control Policial de Animales
          </h1>
          <p className="text-gray-600">Gestión especializada para la Policía Nacional del Ecuador</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowIncautacionModal(true)} className="bg-red-600 hover:bg-red-700">
            <ShieldAlert className="w-4 h-4 mr-2" />
            Nueva Incautación
          </Button>
          <Button onClick={() => setShowReporteModal(true)} variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Reporte Policial
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div>
                <div className="text-2xl font-bold text-red-600">{especiesEnPeligro.filter(e => e.urgencia === "alta").length}</div>
                <p className="text-sm text-gray-600">Casos Urgentes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">{incautaciones.length}</div>
                <p className="text-sm text-gray-600">Incautaciones Activas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">{especiesEnPeligro.length}</div>
                <p className="text-sm text-gray-600">Especies Monitoreadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-600">12</div>
                <p className="text-sm text-gray-600">Reportes Este Mes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Banner */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <ShieldAlert className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-red-900">Sistema de Alerta Temprana Activo</h3>
              <p className="text-red-700 text-sm">Coordinación directa con Ministerio del Ambiente y Unidades Especializadas</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="especies" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="especies">Especies en Peligro</TabsTrigger>
          <TabsTrigger value="incautaciones">Incautaciones</TabsTrigger>
          <TabsTrigger value="reportes">Reportes Policiales</TabsTrigger>
        </TabsList>

        <TabsContent value="especies" className="space-y-4">
          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar especies, ubicación..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Urgencia:</span>
              </div>
              <Button
                variant={selectedUrgencia === "todas" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedUrgencia("todas")}
              >
                Todas
              </Button>
              <Button
                variant={selectedUrgencia === "alta" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedUrgencia("alta")}
              >
                Alta
              </Button>
              <Button
                variant={selectedUrgencia === "media" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedUrgencia("media")}
              >
                Media
              </Button>
              <Button
                variant={selectedUrgencia === "baja" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedUrgencia("baja")}
              >
                Baja
              </Button>
            </div>
          </div>

          {/* Species Table */}
          <Card>
            <CardHeader>
              <CardTitle>Especies en Peligro - Monitoreo Activo ({filteredEspecies.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Especie</TableHead>
                    <TableHead>Estado de Conservación</TableHead>
                    <TableHead>Ubicación</TableHead>
                    <TableHead>Fecha Reporte</TableHead>
                    <TableHead>Reportado Por</TableHead>
                    <TableHead>Urgencia</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEspecies.map((especie) => (
                    <TableRow key={especie.id}>
                      <TableCell>
                        <div>
                          <p className="font-semibold">{especie.nombreComun}</p>
                          <p className="text-sm italic text-gray-600">{especie.nombreCientifico}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getEstadoColor(especie.estado)}>
                          {especie.estado}
                        </Badge>
                      </TableCell>
                      <TableCell>{especie.ubicacion}</TableCell>
                      <TableCell>{new Date(especie.fechaReporte).toLocaleDateString('es-ES')}</TableCell>
                      <TableCell className="text-sm">{especie.reportadoPor}</TableCell>
                      <TableCell>
                        <Badge className={getUrgenciaColor(especie.urgencia)}>
                          {especie.urgencia.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            Ver Detalles
                          </Button>
                          <Button size="sm" variant="outline">
                            Asignar Unidad
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incautaciones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Registro de Incautaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Ubicación</TableHead>
                    <TableHead>Especies Incautadas</TableHead>
                    <TableHead>Responsable</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Documento Legal</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incautaciones.map((incautacion) => (
                    <TableRow key={incautacion.id}>
                      <TableCell>{new Date(incautacion.fecha).toLocaleDateString('es-ES')}</TableCell>
                      <TableCell>{incautacion.ubicacion}</TableCell>
                      <TableCell>
                        <p className="font-medium">{incautacion.especiesIncautadas}</p>
                        <p className="text-xs text-gray-500">Destino: {incautacion.destinoAnimales}</p>
                      </TableCell>
                      <TableCell>{incautacion.responsable}</TableCell>
                      <TableCell>
                        <Badge className={incautacion.estado === "Completado" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                          {incautacion.estado}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {incautacion.documentoLegal}
                        </code>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            Ver Acta
                          </Button>
                          <Button size="sm" variant="outline">
                            Facturar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reportes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reportes Policiales Ambientales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Sección en desarrollo - Integración con sistema policial</p>
                <Button onClick={() => setShowReporteModal(true)}>
                  Generar Nuevo Reporte
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <AddIncautacionModal 
        isOpen={showIncautacionModal} 
        onClose={() => setShowIncautacionModal(false)} 
      />
      <ReportePoliciailModal 
        isOpen={showReporteModal} 
        onClose={() => setShowReporteModal(false)} 
      />
    </div>
  )
}
