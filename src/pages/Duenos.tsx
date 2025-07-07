
import { useState } from "react"
import { Users, Search, Plus, Phone, Mail, MapPin, CreditCard, Briefcase } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UnifiedRegistrationModal } from "@/components/modals/UnifiedRegistrationModal"

interface Owner {
  id: number
  name: string
  cedula: string
  phone: string
  email: string
  address: string
  occupation: string
  petsCount: number
  lastVisit: string
  totalSpent: number
  pets: string[]
}

// Datos actualizados y conectados con las mascotas
const owners: Owner[] = [
  {
    id: 1,
    name: "María García Rodríguez",
    cedula: "1234567890",
    phone: "+57 300-234-5678",
    email: "maria.garcia@email.com",
    address: "Carrera 15 #45-23, Bogotá, Colombia",
    occupation: "Profesora",
    petsCount: 1,
    lastVisit: "2024-06-28",
    totalSpent: 1250000,
    pets: ["Max"]
  },
  {
    id: 2,
    name: "Carlos López Mendoza",
    cedula: "2345678901",
    phone: "+57 301-345-6789",
    email: "carlos.lopez@email.com",
    address: "Calle 72 #12-34, Medellín, Colombia",
    occupation: "Ingeniero",
    petsCount: 1,
    lastVisit: "2024-06-25",
    totalSpent: 890000,
    pets: ["Luna"]
  },
  {
    id: 3,
    name: "Ana Martínez Silva",
    cedula: "3456789012",
    phone: "+57 302-456-7890",
    email: "ana.martinez@email.com",
    address: "Avenida 68 #25-67, Cali, Colombia",
    occupation: "Médica",
    petsCount: 1,
    lastVisit: "2024-07-02",
    totalSpent: 2100000,
    pets: ["Buddy"]
  },
  {
    id: 4,
    name: "Pedro Ruiz Castro",
    cedula: "4567890123",
    phone: "+57 303-567-8901",
    email: "pedro.ruiz@email.com",
    address: "Transversal 45 #78-90, Barranquilla, Colombia",
    occupation: "Abogado",
    petsCount: 1,
    lastVisit: "2024-06-30",
    totalSpent: 675000,
    pets: ["Mimi"]
  },
  {
    id: 5,
    name: "Laura Fernández Vega",
    cedula: "5678901234",
    phone: "+57 304-678-9012",
    email: "laura.fernandez@email.com",
    address: "Diagonal 25 #34-56, Bucaramanga, Colombia",
    occupation: "Arquitecta",
    petsCount: 1,
    lastVisit: "2024-07-01",
    totalSpent: 1480000,
    pets: ["Rocky"]
  },
  {
    id: 6,
    name: "Miguel Santos Herrera",
    cedula: "6789012345",
    phone: "+57 305-789-0123",
    email: "miguel.santos@email.com",
    address: "Calle 8 #45-12, Cartagena, Colombia",
    occupation: "Empresario",
    petsCount: 1,
    lastVisit: "2024-06-22",
    totalSpent: 1750000,
    pets: ["Whiskers"]
  },
  {
    id: 7,
    name: "Carmen Jiménez Morales",
    cedula: "7890123456",
    phone: "+57 306-890-1234",
    email: "carmen.jimenez@email.com",
    address: "Carrera 50 #23-45, Pereira, Colombia",
    occupation: "Contadora",
    petsCount: 1,
    lastVisit: "2024-07-03",
    totalSpent: 920000,
    pets: ["Bella"]
  },
  {
    id: 8,
    name: "Roberto Díaz Peña",
    cedula: "8901234567",
    phone: "+57 307-901-2345",
    email: "roberto.diaz@email.com",
    address: "Avenida 30 #67-89, Manizales, Colombia",
    occupation: "Veterinario",
    petsCount: 1,
    lastVisit: "2024-06-27",
    totalSpent: 1320000,
    pets: ["Felix"]
  }
]

export default function Duenos() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredOwners = owners.filter(owner =>
    owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    owner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    owner.phone.includes(searchTerm) ||
    owner.cedula.includes(searchTerm) ||
    owner.pets.some(pet => pet.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const totalRevenue = owners.reduce((sum, owner) => sum + owner.totalSpent, 0)
  const averageSpent = totalRevenue / owners.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="w-8 h-8 text-blue-600" />
            Dueños
          </h1>
          <p className="text-gray-600">Gestión de clientes de la clínica veterinaria</p>
        </div>
        <UnifiedRegistrationModal defaultTab="owner" />
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Buscar por nombre, cédula, email, teléfono o mascota..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">{owners.length}</div>
            <p className="text-sm text-gray-600">Total Dueños</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {owners.reduce((sum, owner) => sum + owner.petsCount, 0)}
            </div>
            <p className="text-sm text-gray-600">Mascotas Totales</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(totalRevenue)}
            </div>
            <p className="text-sm text-gray-600">Ingresos Totales</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {formatCurrency(averageSpent)}
            </div>
            <p className="text-sm text-gray-600">Promedio por Cliente</p>
          </CardContent>
        </Card>
      </div>

      {/* Owners List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOwners.map((owner) => (
          <Card key={owner.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{owner.name}</CardTitle>
                <div className="flex gap-2">
                  <Badge variant="outline">
                    {owner.petsCount} mascota{owner.petsCount !== 1 ? 's' : ''}
                  </Badge>
                  <Badge variant="secondary">
                    {formatCurrency(owner.totalSpent)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <CreditCard className="w-4 h-4" />
                  <span className="text-sm font-mono">{owner.cedula}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{owner.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{owner.email}</span>
                </div>
                <div className="flex items-start gap-2 text-gray-600">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  <span className="text-sm">{owner.address}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-sm">{owner.occupation}</span>
                </div>
                
                {/* Mascotas del dueño */}
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-sm font-medium text-gray-700 mb-1">Mascotas:</p>
                  <div className="flex flex-wrap gap-1">
                    {owner.pets.map((pet, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {pet}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    Última visita: {new Date(owner.lastVisit).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
