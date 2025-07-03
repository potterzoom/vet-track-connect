
import { useState } from "react"
import { Calendar, Syringe, AlertTriangle, CheckCircle, Plus, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { VaccineBlockchainCard } from "@/components/VaccineBlockchainCard"
import { AddVaccineModal } from "@/components/AddVaccineModal"

const mockVaccines = [
  {
    id: 1,
    petName: "Max",
    ownerName: "María García",
    vaccine: "Vacuna Antirrábica",
    appliedDate: "2024-06-15",
    nextDue: "2025-06-15",
    status: "vigente",
    lot: "RAB-2024-001",
    blockchainHash: "0xa1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456"
  },
  {
    id: 2,
    petName: "Luna",
    ownerName: "Carlos López",
    vaccine: "Refuerzo Múltiple",
    appliedDate: "2024-07-01",
    nextDue: "2024-12-30",
    status: "proximo",
    lot: "MUL-2024-008",
    blockchainHash: "0xb2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567"
  },
  {
    id: 3,
    petName: "Toby",
    ownerName: "Ana Martínez",
    vaccine: "Desparasitación",
    appliedDate: "2024-06-20",
    nextDue: "2024-07-10",
    status: "vencido",
    lot: "DES-2024-003",
    blockchainHash: "0xc3d4e5f6789012345678901234567890abcdef1234567890abcdef12345678"
  }
]

export default function Vacunas() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [filteredVaccines, setFilteredVaccines] = useState(mockVaccines)

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

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    const filtered = mockVaccines.filter(vaccine => 
      vaccine.petName.toLowerCase().includes(value.toLowerCase()) ||
      vaccine.ownerName.toLowerCase().includes(value.toLowerCase()) ||
      vaccine.vaccine.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredVaccines(filtered)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Control de Vacunas</h1>
          <p className="text-gray-600">Gestión blockchain de vacunación veterinaria</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Vacuna
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar por mascota, dueño o vacuna..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Card className="lg:col-span-1">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">15</div>
              <div className="text-sm text-gray-600">Próximas este mes</div>
            </div>
          </CardContent>
        </Card>
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
              <p className="text-blue-700 text-sm">Todos los registros de vacunación son inmutables y verificables</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vaccines List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVaccines.map((vaccine) => (
          <VaccineBlockchainCard
            key={vaccine.id}
            vaccine={vaccine}
            statusColor={getStatusColor(vaccine.status)}
            statusIcon={getStatusIcon(vaccine.status)}
          />
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
