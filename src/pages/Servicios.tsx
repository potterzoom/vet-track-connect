
import { useState } from "react"
import { Calendar, User, Clock, DollarSign, Search, Plus, Filter, Stethoscope } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

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
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Cita
        </Button>
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

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServicios.map((servicio) => (
              <Card key={servicio.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{servicio.nombre}</CardTitle>
                      <p className="text-sm text-gray-600">{servicio.descripcion}</p>
                      <Badge className="mt-1" variant="outline">
                        {servicio.categoria}
                      </Badge>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Badge className={getEstadoColor(servicio.estado)}>
                        {servicio.estado}
                      </Badge>
                      <Badge className={getEspecieColor(servicio.especieCompatible)}>
                        {servicio.especieCompatible}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-600">Precio:</p>
                        <p className="font-bold text-lg">${servicio.precio}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Duración:</p>
                        <p className="font-medium">{servicio.duracion} min</p>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <p className="text-gray-600">Veterinario: {servicio.veterinario}</p>
                      {servicio.requiereAnestesia && (
                        <p className="text-orange-600 font-medium">⚠️ Requiere anestesia</p>
                      )}
                    </div>

                    {servicio.estado === "no_disponible" && servicio.proximaDisponibilidad && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
                        <p className="text-yellow-700 text-xs font-medium">
                          📅 Próxima disponibilidad: {new Date(servicio.proximaDisponibilidad).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1" 
                        disabled={servicio.estado === "no_disponible"}
                      >
                        Agendar Cita
                      </Button>
                      <Button size="sm" variant="outline">
                        Detalles
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {activeTab === "citas" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {citas.map((cita) => (
              <Card key={cita.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div>
                          <h3 className="font-semibold text-lg">{cita.servicioNombre}</h3>
                          <p className="text-gray-600">{cita.petName} - {cita.ownerName}</p>
                        </div>
                        <Badge className={getCitaEstadoColor(cita.estado)}>
                          {cita.estado}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 mt-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          {new Date(cita.fecha).toLocaleDateString('es-ES')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-gray-500" />
                          {cita.hora}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4 text-gray-500" />
                          {cita.veterinario}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-gray-500" />
                          ${cita.precio}
                        </div>
                      </div>

                      {cita.notas && (
                        <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                          <strong>Notas:</strong> {cita.notas}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
