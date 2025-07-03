
import { useState } from "react"
import { Heart, Search, Plus, Calendar, User, Filter, ArrowUpDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Pet {
  id: number
  name: string
  species: string
  breed: string
  age: string
  owner: string
  phone: string
  lastVisit: string
  nextAppointment: string
  status: 'activo' | 'inactivo'
  microchip: string
  weight: string
}

const pets: Pet[] = [
  {
    id: 1,
    name: "Max",
    species: "Perro",
    breed: "Golden Retriever",
    age: "3 años",
    owner: "María García",
    phone: "+34 666 123 456",
    lastVisit: "2024-06-25",
    nextAppointment: "2024-07-15",
    status: 'activo',
    microchip: "985112001234567",
    weight: "28.5 kg"
  },
  {
    id: 2,
    name: "Luna",
    species: "Gato",
    breed: "Siamés",
    age: "2 años",
    owner: "Carlos López",
    phone: "+34 666 789 012",
    lastVisit: "2024-06-28",
    nextAppointment: "2024-07-20",
    status: 'activo',
    microchip: "985112001234568",
    weight: "4.2 kg"
  },
  {
    id: 3,
    name: "Toby",
    species: "Perro",
    breed: "Labrador",
    age: "5 años",
    owner: "Ana Martínez",
    phone: "+34 666 345 678",
    lastVisit: "2024-06-20",
    nextAppointment: "2024-08-01",
    status: 'activo',
    microchip: "985112001234569",
    weight: "32.1 kg"
  },
  {
    id: 4,
    name: "Mimi",
    species: "Gato",
    breed: "Persa",
    age: "4 años",
    owner: "Pedro Ruiz",
    phone: "+34 666 901 234",
    lastVisit: "2024-05-15",
    nextAppointment: "",
    status: 'inactivo',
    microchip: "985112001234570",
    weight: "5.8 kg"
  },
  {
    id: 5,
    name: "Rocky",
    species: "Perro",
    breed: "Pastor Alemán",
    age: "6 años",
    owner: "Laura Sánchez",
    phone: "+34 666 567 890",
    lastVisit: "2024-06-30",
    nextAppointment: "2024-07-10",
    status: 'activo',
    microchip: "985112001234571",
    weight: "35.0 kg"
  }
]

type SortField = 'name' | 'species' | 'owner' | 'lastVisit' | 'nextAppointment'
type SortOrder = 'asc' | 'desc'

export default function Mascotas() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<SortField>('lastVisit')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [filterStatus, setFilterStatus] = useState<'all' | 'activo' | 'inactivo'>('all')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const filteredAndSortedPets = pets
    .filter(pet => {
      const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = filterStatus === 'all' || pet.status === filterStatus
      
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      let aValue = a[sortField]
      let bValue = b[sortField]
      
      if (sortField === 'lastVisit' || sortField === 'nextAppointment') {
        aValue = aValue || '0000-00-00'
        bValue = bValue || '0000-00-00'
      }
      
      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue)
      } else {
        return bValue.localeCompare(aValue)
      }
    })

  const formatDate = (dateString: string) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const isUpcoming = (dateString: string) => {
    if (!dateString) return false
    const today = new Date()
    const appointmentDate = new Date(dateString)
    const diffTime = appointmentDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 7 && diffDays >= 0
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Heart className="w-8 h-8 text-blue-600" />
            Registro de Mascotas
          </h1>
          <p className="text-gray-600">Gestión completa de pacientes veterinarios</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Mascota
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar por nombre, dueño, especie o raza..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterStatus === 'all' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('all')}
            size="sm"
          >
            Todos
          </Button>
          <Button
            variant={filterStatus === 'activo' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('activo')}
            size="sm"
          >
            Activos
          </Button>
          <Button
            variant={filterStatus === 'inactivo' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('inactivo')}
            size="sm"
          >
            Inactivos
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">{pets.length}</div>
            <p className="text-sm text-gray-600">Total Mascotas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {pets.filter(p => p.status === 'activo').length}
            </div>
            <p className="text-sm text-gray-600">Activas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {pets.filter(p => isUpcoming(p.nextAppointment)).length}
            </div>
            <p className="text-sm text-gray-600">Citas Próximas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-500">
              {pets.filter(p => p.status === 'inactivo').length}
            </div>
            <p className="text-sm text-gray-600">Inactivas</p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Listado de Mascotas ({filteredAndSortedPets.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('name')}
                    className="h-auto p-0 font-medium"
                  >
                    Mascota <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('species')}
                    className="h-auto p-0 font-medium"
                  >
                    Especie/Raza <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('owner')}
                    className="h-auto p-0 font-medium"
                  >
                    Propietario <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('lastVisit')}
                    className="h-auto p-0 font-medium"
                  >
                    Última Visita <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('nextAppointment')}
                    className="h-auto p-0 font-medium"
                  >
                    Próxima Cita <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Detalles</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedPets.map((pet) => (
                <TableRow key={pet.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{pet.name}</div>
                      <div className="text-sm text-gray-500">{pet.age} • {pet.weight}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{pet.species}</div>
                      <div className="text-sm text-gray-500">{pet.breed}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {pet.owner}
                      </div>
                      <div className="text-sm text-gray-500">{pet.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-blue-500" />
                      {formatDate(pet.lastVisit)}
                    </div>
                  </TableCell>
                  <TableCell>
                    {pet.nextAppointment ? (
                      <div className={`flex items-center gap-1 ${isUpcoming(pet.nextAppointment) ? 'text-orange-600 font-medium' : ''}`}>
                        <Calendar className="w-3 h-3" />
                        {formatDate(pet.nextAppointment)}
                        {isUpcoming(pet.nextAppointment) && (
                          <Badge variant="outline" className="ml-1 text-xs border-orange-200 text-orange-600">
                            Próxima
                          </Badge>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400">Sin cita</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={pet.status === 'activo' ? 'default' : 'secondary'}>
                      {pet.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs text-gray-500">
                      <div>ID: {pet.microchip.slice(-4)}</div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
