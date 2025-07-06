
import { useState } from "react"
import { Calendar, Syringe, AlertTriangle, CheckCircle, Plus, Search, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { VaccineBlockchainCard } from "@/components/VaccineBlockchainCard"
import { AddVaccineModal } from "@/components/AddVaccineModal"

const mockVaccines = [
  // Vacunas para Perros
  {
    id: 1,
    petName: "Max",
    ownerName: "María García",
    species: "perro",
    vaccine: "Vacuna Antirrábica",
    appliedDate: "2024-06-15",
    nextDue: "2025-06-15",
    status: "vigente",
    lot: "RAB-2024-001",
    blockchainHash: "0xa1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
    veterinarian: "Dr. Martínez",
    dose: "1ml"
  },
  {
    id: 2,
    petName: "Rocky",
    ownerName: "Laura Sánchez",
    species: "perro",
    vaccine: "Óctuple (DHPPI + L + C)",
    appliedDate: "2024-07-01",
    nextDue: "2025-07-01",
    status: "vigente",
    lot: "OCT-2024-008",
    blockchainHash: "0xb2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567",
    veterinarian: "Dr. García",
    dose: "1ml"
  },
  {
    id: 3,
    petName: "Toby",
    ownerName: "Ana Martínez",
    species: "perro",
    vaccine: "Refuerzo Anual",
    appliedDate: "2024-06-20",
    nextDue: "2024-07-10",
    status: "vencido",
    lot: "REF-2024-003",
    blockchainHash: "0xc3d4e5f6789012345678901234567890abcdef1234567890abcdef12345678",
    veterinarian: "Dr. López",
    dose: "1ml"
  },
  {
    id: 4,
    petName: "Bruno",
    ownerName: "Carlos Ruiz",
    species: "perro",
    vaccine: "Vacuna Tos de las Perreras",
    appliedDate: "2024-06-25",
    nextDue: "2024-12-25",
    status: "proximo",
    lot: "TOS-2024-012",
    blockchainHash: "0xd4e5f6789012345678901234567890abcdef1234567890abcdef123456789",
    veterinarian: "Dr. Fernández",
    dose: "0.5ml"
  },
  // Vacunas para Gatos
  {
    id: 5,
    petName: "Luna",
    ownerName: "Carlos López",
    species: "gato",
    vaccine: "Triple Felina (Rinotraqueitis + Calicivirus + Panleucopenia)",
    appliedDate: "2024-07-01",
    nextDue: "2024-12-30",
    status: "vigente",
    lot: "TRI-2024-008",
    blockchainHash: "0xe5f6789012345678901234567890abcdef1234567890abcdef1234567890",
    veterinarian: "Dra. Morales",
    dose: "1ml"
  },
  {
    id: 6,
    petName: "Mimi",
    ownerName: "Pedro Ruiz",
    species: "gato",
    vaccine: "Vacuna Antirrábica Felina",
    appliedDate: "2024-05-15",
    nextDue: "2025-05-15",
    status: "vigente",
    lot: "RAB-FEL-2024-005",
    blockchainHash: "0xf6789012345678901234567890abcdef1234567890abcdef12345678901",
    veterinarian: "Dr. Castillo",
    dose: "1ml"
  },
  {
    id: 7,
    petName: "Whiskers",
    ownerName: "Elena Torres",
    species: "gato",
    vaccine: "Leucemia Felina",
    appliedDate: "2024-06-10",
    nextDue: "2024-08-15",
    status: "proximo",
    lot: "LEU-2024-007",
    blockchainHash: "0x6789012345678901234567890abcdef1234567890abcdef123456789012",
    veterinarian: "Dra. Herrera",
    dose: "1ml"
  },
  {
    id: 8,
    petName: "Garfield",
    ownerName: "Miguel Vega",
    species: "gato",
    vaccine: "Refuerzo Triple Felina",
    appliedDate: "2024-05-20",
    nextDue: "2024-07-05",
    status: "vencido",
    lot: "REF-TRI-2024-009",
    blockchainHash: "0x789012345678901234567890abcdef1234567890abcdef1234567890123",
    veterinarian: "Dr. Jiménez",
    dose: "1ml"
  }
]

const tiposVacunas = {
  perro: [
    "Vacuna Antirrábica",
    "Óctuple (DHPPI + L + C)",
    "Séxtuple (DHPPI)",
    "Vacuna Tos de las Perreras",
    "Refuerzo Anual",
    "Parvovirus",
    "Coronavirus"
  ],
  gato: [
    "Triple Felina (Rinotraqueitis + Calicivirus + Panleucopenia)",
    "Vacuna Antirrábica Felina",
    "Leucemia Felina",
    "Refuerzo Triple Felina",
    "Clamidiosis Felina",
    "Peritonitis Infecciosa Felina"
  ]
}

export default function Vacunas() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedSpecies, setSelectedSpecies] = useState<"todas" | "perro" | "gato">("todas")
  const [selectedStatus, setSelectedStatus] = useState<"todos" | "vigente" | "proximo" | "vencido">("todos")

  const filteredVaccines = mockVaccines.filter(vaccine => {
    const matchesSearch = vaccine.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vaccine.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vaccine.vaccine.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSpecies = selectedSpecies === "todas" || vaccine.species === selectedSpecies
    const matchesStatus = selectedStatus === "todos" || vaccine.status === selectedStatus
    
    return matchesSearch && matchesSpecies && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "vigente": return "bg-green-100 text-green-800 border-green-300"
      case "proximo": return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "vencido": return "bg-red-100 text-red-800 border-red-300"
      default: return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "vigente": return <CheckCircle className="w-4 h-4" />
      case "proximo": return <Calendar className="w-4 h-4" />
      case "vencido": return <AlertTriangle className="w-4 h-4" />
      default: return <Syringe className="w-4 h-4" />
    }
  }

  const getSpeciesColor = (species: string) => {
    return species === "perro" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
  }

  const getSpeciesStats = () => {
    const perros = mockVaccines.filter(v => v.species === "perro")
    const gatos = mockVaccines.filter(v => v.species === "gato")
    
    return {
      totalPerros: perros.length,
      totalGatos: gatos.length,
      proximosPerros: perros.filter(v => v.status === "proximo").length,
      proximosGatos: gatos.filter(v => v.status === "proximo").length,
      vencidosPerros: perros.filter(v => v.status === "vencido").length,
      vencidosGatos: gatos.filter(v => v.status === "vencido").length
    }
  }

  const stats = getSpeciesStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Control de Vacunas</h1>
          <p className="text-gray-600">Gestión blockchain de vacunación veterinaria por especies</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Vacuna
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Buscar por mascota, dueño o vacuna..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Especies:</span>
          </div>
          <Button
            variant={selectedSpecies === "todas" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedSpecies("todas")}
          >
            Todas
          </Button>
          <Button
            variant={selectedSpecies === "perro" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedSpecies("perro")}
          >
            Perros
          </Button>
          <Button
            variant={selectedSpecies === "gato" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedSpecies("gato")}
          >
            Gatos
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Estado:</span>
          </div>
          <Button
            variant={selectedStatus === "todos" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedStatus("todos")}
          >
            Todos
          </Button>
          <Button
            variant={selectedStatus === "vigente" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedStatus("vigente")}
          >
            Vigentes
          </Button>
          <Button
            variant={selectedStatus === "proximo" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedStatus("proximo")}
          >
            Próximos
          </Button>
          <Button
            variant={selectedStatus === "vencido" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedStatus("vencido")}
          >
            Vencidos
          </Button>
        </div>
      </div>

      {/* Blockchain Info Banner */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900">Registro Blockchain Activo</h3>
              <p className="text-blue-700 text-sm">Todos los registros de vacunación son inmutables y verificables por especie</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats by Species */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.totalPerros}</div>
            <p className="text-sm text-gray-600">Vacunas Perros</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{stats.totalGatos}</div>
            <p className="text-sm text-gray-600">Vacunas Gatos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.proximosPerros}</div>
            <p className="text-sm text-gray-600">Próximas Perros</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.proximosGatos}</div>
            <p className="text-sm text-gray-600">Próximas Gatos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{stats.vencidosPerros}</div>
            <p className="text-sm text-gray-600">Vencidas Perros</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{stats.vencidosGatos}</div>
            <p className="text-sm text-gray-600">Vencidas Gatos</p>
          </CardContent>
        </Card>
      </div>

      {/* Vaccines List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVaccines.map((vaccine) => (
          <Card key={vaccine.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{vaccine.petName}</CardTitle>
                  <p className="text-sm text-gray-600">{vaccine.ownerName}</p>
                  <Badge className={`mt-1 ${getSpeciesColor(vaccine.species)}`}>
                    {vaccine.species}
                  </Badge>
                </div>
                <Badge className={`${getStatusColor(vaccine.status)} flex items-center gap-1`}>
                  {getStatusIcon(vaccine.status)}
                  {vaccine.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900">{vaccine.vaccine}</h4>
                  <p className="text-sm text-gray-600">Dosis: {vaccine.dose}</p>
                  <p className="text-sm text-gray-600">Veterinario: {vaccine.veterinarian}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-600">Aplicada:</p>
                    <p className="font-medium">{new Date(vaccine.appliedDate).toLocaleDateString('es-ES')}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Próxima:</p>
                    <p className="font-medium">{new Date(vaccine.nextDue).toLocaleDateString('es-ES')}</p>
                  </div>
                </div>

                <div className="text-sm">
                  <p className="text-gray-600">Lote: {vaccine.lot}</p>
                  <p className="text-gray-600 truncate">Hash: {vaccine.blockchainHash.substring(0, 20)}...</p>
                </div>

                {vaccine.status === "vencido" && (
                  <div className="bg-red-50 border border-red-200 rounded p-2">
                    <p className="text-red-700 text-xs font-medium">
                      ⚠️ Vacuna vencida - Requiere refuerzo urgente
                    </p>
                  </div>
                )}

                {vaccine.status === "proximo" && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
                    <p className="text-yellow-700 text-xs font-medium">
                      📅 Próxima a vencer - Programar refuerzo
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Vaccine Modal */}
      <AddVaccineModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
      />
    </div>
  )
}
