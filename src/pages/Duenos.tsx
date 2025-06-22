
import { useState } from "react"
import { Users, Search, Plus, Phone, Mail, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Owner {
  id: number
  name: string
  phone: string
  email: string
  address: string
  petsCount: number
  lastVisit: string
}

const owners: Owner[] = [
  {
    id: 1,
    name: "María García",
    phone: "+1 234-567-8901",
    email: "maria.garcia@email.com",
    address: "Av. Principal 123, Ciudad",
    petsCount: 2,
    lastVisit: "2024-06-15"
  },
  {
    id: 2,
    name: "Carlos López",
    phone: "+1 234-567-8902",
    email: "carlos.lopez@email.com",
    address: "Calle Secundaria 456, Ciudad",
    petsCount: 1,
    lastVisit: "2024-06-18"
  },
  {
    id: 3,
    name: "Ana Martínez",
    phone: "+1 234-567-8903",
    email: "ana.martinez@email.com",
    address: "Plaza Central 789, Ciudad",
    petsCount: 3,
    lastVisit: "2024-06-20"
  },
  {
    id: 4,
    name: "Pedro Ruiz",
    phone: "+1 234-567-8904",
    email: "pedro.ruiz@email.com",
    address: "Av. Norte 321, Ciudad",
    petsCount: 1,
    lastVisit: "2024-06-10"
  }
]

export default function Duenos() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredOwners = owners.filter(owner =>
    owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    owner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    owner.phone.includes(searchTerm)
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="w-8 h-8 text-blue-600" />
            Dueños
          </h1>
          <p className="text-gray-600">Gestión de clientes de la clínica</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Dueño
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Buscar por nombre, email o teléfono..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
              {Math.round(owners.reduce((sum, owner) => sum + owner.petsCount, 0) / owners.length * 10) / 10}
            </div>
            <p className="text-sm text-gray-600">Promedio por Dueño</p>
          </CardContent>
        </Card>
      </div>

      {/* Owners List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOwners.map((owner) => (
          <Card key={owner.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{owner.name}</CardTitle>
                <Badge variant="outline">
                  {owner.petsCount} mascota{owner.petsCount !== 1 ? 's' : ''}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
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
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    Última visita: {new Date(owner.lastVisit).toLocaleDateString('es-ES')}
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
