
import { useState } from "react"
import { Calendar, User, Clock, DollarSign, Search, Plus, Filter, Stethoscope } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AddServiceModal } from "@/components/modals/AddServiceModal"

interface Servicio {
  id: number
  nombre: string
  categoria: string
  descripcion: string
  precio: number
  duracion: number // en minutos
  veterinario: string
  especieCompatible: 'perros' | 'gatos' | 'ambos'
  requiereAnestesia: boolean
  estado: 'disponible' | 'no_disponible'
  proximaDisponibilidad?: string
}

interface Cita {
  id: number
  servicioId: number
  servicioNombre: string
  petName: string
  ownerName: string
  fecha: string
  hora: string
  veterinario: string
  estado: 'programada' | 'completada' | 'cancelada'
  notas?: string
  precio: number
}

const servicios: Servicio[] = [
  // Cirugías Básicas
  {
    id: 1,
    nombre: "Castración Canina",
    categoria: "Cirugías",
    descripcion: "Esterilización quirúrgica para perros machos",
    precio: 120.00,
    duracion: 60,
    veterinario: "Dr. Martínez",
    especieCompatible: "perros",
    requiereAnestesia: true,
    estado: "disponible"
  },
  {
    id: 2,
    nombre: "Ovariohisterectomía Felina",
    categoria: "Cirugías",
    descripcion: "Esterilización quirúrgica para gatas",
    precio: 95.00,
    duracion: 45,
    veterinario: "Dra. García",
    especieCompatible: "gatos",
    requiereAnestesia: true,
    estado: "disponible"
  },
  {
    id: 3,
    nombre: "Extracción Dental",
    categoria: "Cirugías",
    descripcion: "Extracción de piezas dentales dañadas",
    precio: 80.00,
    duracion: 30,
    veterinario: "Dr. López",
    especieCompatible: "ambos",
    requiereAnestesia: true,
    estado: "disponible"
  },
  // Control Prenatal y Postnatal
  {
    id: 4,
    nombre: "Control Prenatal",
    categoria: "Reproductivo",
    descripcion: "Seguimiento del embarazo con ecografía",
    precio: 45.00,
    duracion: 30,
    veterinario: "Dra. Morales",
    especieCompatible: "ambos",
    requiereAnestesia: false,
    estado: "disponible"
  },
  {
    id: 5,
    nombre: "Asistencia al Parto",
    categoria: "Reproductivo",
    descripcion: "Atención veterinaria durante el parto",
    precio: 150.00,
    duracion: 180,
    veterinario: "Dr. Fernández",
    especieCompatible: "ambos",
    requiereAnestesia: false,
    estado: "no_disponible",
    proximaDisponibilidad: "2024-07-20"
  },
  {
    id: 6,
    nombre: "Control Postnatal",
    categoria: "Reproductivo",
    descripcion: "Revisión de madre y crías post-parto",
    precio: 35.00,
    duracion: 25,
    veterinario: "Dra. Herrera",
    especieCompatible: "ambos",
    requiereAnestesia: false,
    estado: "disponible"
  },
  // Consultas Generales
  {
    id: 7,
    nombre: "Consulta General",
    categoria: "Consultas",
    descripcion: "Examen clínico general y diagnóstico",
    precio: 25.00,
    duracion: 20,
    veterinario: "Dr. Castillo",
    especieCompatible: "ambos",
    requiereAnestesia: false,
    estado: "disponible"
  },
  {
    id: 8,
    nombre: "Consulta Especializada",
    categoria: "Consultas",
    descripcion: "Consulta con especialista en dermatología",
    precio: 55.00,
    duracion: 40,
    veterinario: "Dra. Jiménez",
    especieCompatible: "ambos",
    requiereAnestesia: false,
    estado: "disponible"
  },
  {
    id: 9,
    nombre: "Revisión Geriátrica",
    categoria: "Consultas",
    descripcion: "Chequeo completo para mascotas mayores",
    precio: 40.00,
    duracion: 35,
    veterinario: "Dr. Vega",
    especieCompatible: "ambos",
    requiereAnestesia: false,
    estado: "disponible"
  },
  // Análisis de Laboratorio
  {
    id: 10,
    nombre: "Hemograma Completo",
    categoria: "Laboratorio",
    descripcion: "Análisis sanguíneo completo",
    precio: 35.00,
    duracion: 15,
    veterinario: "Lab. Externo",
    especieCompatible: "ambos",
    requiereAnestesia: false,
    estado: "disponible"
  },
  {
    id: 11,
    nombre: "Perfil Hepático",
    categoria: "Laboratorio",
    descripcion: "Análisis de función hepática",
    precio: 45.00,
    duracion: 15,
    veterinario: "Lab. Externo",
    especieCompatible: "ambos",
    requiereAnestesia: false,
    estado: "disponible"
  }
]

const citas: Cita[] = [
  {
    id: 1,
    servicioId: 1,
    servicioNombre: "Castración Canina",
    petName: "Max",
    ownerName: "María García",
    fecha: "2024-07-15",
    hora: "09:00",
    veterinario: "Dr. Martínez",
    estado: "programada",
    precio: 120.00
  },
  {
    id: 2,
    servicioId: 7,
    servicioNombre: "Consulta General",
    petName: "Luna",
    ownerName: "Carlos López",
    fecha: "2024-07-12",
    hora: "10:30",
    veterinario: "Dr. Castillo",
    estado: "completada",
    precio: 25.00,
    notas: "Vacunación al día, peso normal"
  }
]

const categorias = ["Todas", "Cirugías", "Consultas", "Reproductivo", "Laboratorio"]

export default function Servicios() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [selectedEspecie, setSelectedEspecie] = useState("Todas")
  const [activeTab, setActiveTab] = useState<"servicios" | "citas">("servicios")
  const [showAllServicios, setShowAllServicios] = useState(false)
  const [showAllCitas, setShowAllCitas] = useState(false)

  const filteredServicios = servicios.filter(servicio => {
    const matchesSearch = servicio.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         servicio.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         servicio.veterinario.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === "Todas" || servicio.categoria === selectedCategory
    
    const matchesEspecie = selectedEspecie === "Todas" || 
                          servicio.especieCompatible === selectedEspecie.toLowerCase() ||
                          servicio.especieCompatible === "ambos"
    
    return matchesSearch && matchesCategory && matchesEspecie
  })

  const filteredCitas = citas.filter(cita => 
    cita.servicioNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cita.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cita.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const displayedServicios = showAllServicios ? filteredServicios : filteredServicios.slice(0, 5)
  const displayedCitas = showAllCitas ? filteredCitas : filteredCitas.slice(0, 5)

  const getEstadoColor = (estado: string) => {
    return estado === "disponible" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  const getEspecieColor = (especie: string) => {
    switch (especie) {
      case "perros": return "bg-blue-100 text-blue-800"
      case "gatos": return "bg-purple-100 text-purple-800"
      case "ambos": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getCitaEstadoColor = (estado: string) => {
    switch (estado) {
      case "programada": return "bg-blue-100 text-blue-800"
      case "completada": return "bg-green-100 text-green-800"
      case "cancelada": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Stethoscope className="w-8 h-8 text-blue-600" />
            Servicios Veterinarios
          </h1>
          <p className="text-gray-600">Cirugías, consultas, control reproductivo y análisis</p>
        </div>
        <AddServiceModal />
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === "servicios" ? "default" : "outline"}
          onClick={() => setActiveTab("servicios")}
        >
          Servicios Disponibles
        </Button>
        <Button
          variant={activeTab === "citas" ? "default" : "outline"}
          onClick={() => setActiveTab("citas")}
        >
          Citas Programadas
        </Button>
      </div>

      {activeTab === "servicios" && (
        <>
          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar servicios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Categorías:</span>
              </div>
              {categorias.map((categoria) => (
                <Button
                  key={categoria}
                  variant={selectedCategory === categoria ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(categoria)}
                >
                  {categoria}
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700">Especies:</span>
              {["Todas", "Perros", "Gatos", "Ambos"].map((especie) => (
                <Button
                  key={especie}
                  variant={selectedEspecie === especie ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedEspecie(especie)}
                >
                  {especie}
                </Button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-gray-900">{servicios.length}</div>
                <p className="text-sm text-gray-600">Total Servicios</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">
                  {servicios.filter(s => s.estado === "disponible").length}
                </div>
                <p className="text-sm text-gray-600">Disponibles</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">
                  {servicios.filter(s => s.categoria === "Cirugías").length}
                </div>
                <p className="text-sm text-gray-600">Cirugías</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-purple-600">
                  {citas.filter(c => c.estado === "programada").length}
                </div>
                <p className="text-sm text-gray-600">Citas Programadas</p>
              </CardContent>
            </Card>
          </div>

          {/* Services Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Servicios Disponibles</span>
                <Badge variant="outline">{filteredServicios.length} total</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Servicio</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Veterinario</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Duración</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Especie</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedServicios.map((servicio) => (
                    <TableRow key={servicio.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{servicio.nombre}</div>
                          <div className="text-sm text-gray-600">{servicio.descripcion}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{servicio.categoria}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{servicio.veterinario}</TableCell>
                      <TableCell className="font-medium">${servicio.precio}</TableCell>
                      <TableCell>{servicio.duracion} min</TableCell>
                      <TableCell>
                        <Badge className={getEstadoColor(servicio.estado)}>
                          {servicio.estado}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getEspecieColor(servicio.especieCompatible)}>
                          {servicio.especieCompatible}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" disabled={servicio.estado === "no_disponible"}>
                            Agendar
                          </Button>
                          <Button size="sm" variant="outline">
                            Ver
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredServicios.length > 5 && (
                <div className="mt-4 text-center">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAllServicios(!showAllServicios)}
                  >
                    {showAllServicios ? 'Mostrar menos' : `Ver todos (${filteredServicios.length - 5} más)`}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {activeTab === "citas" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Citas Programadas</span>
              <Badge variant="outline">{filteredCitas.length} total</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Servicio</TableHead>
                  <TableHead>Mascota</TableHead>
                  <TableHead>Dueño</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead>Veterinario</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedCitas.map((cita) => (
                  <TableRow key={cita.id}>
                    <TableCell className="font-medium">{cita.servicioNombre}</TableCell>
                    <TableCell>{cita.petName}</TableCell>
                    <TableCell>{cita.ownerName}</TableCell>
                    <TableCell>{new Date(cita.fecha).toLocaleDateString('es-ES')}</TableCell>
                    <TableCell>{cita.hora}</TableCell>
                    <TableCell>{cita.veterinario}</TableCell>
                    <TableCell className="font-medium">${cita.precio}</TableCell>
                    <TableCell>
                      <Badge className={getCitaEstadoColor(cita.estado)}>
                        {cita.estado}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredCitas.length > 5 && (
              <div className="mt-4 text-center">
                <Button 
                  variant="outline" 
                  onClick={() => setShowAllCitas(!showAllCitas)}
                >
                  {showAllCitas ? 'Mostrar menos' : `Ver todas (${filteredCitas.length - 5} más)`}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
