
import { useState } from "react"
import { Heart, Search, Filter, Calendar, User, Stethoscope } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UnifiedRegistrationModal } from "@/components/modals/UnifiedRegistrationModal"

interface Pet {
  id: number
  name: string
  species: string
  breed: string
  age: string
  weight: string
  owner: string
  phone: string
  lastVisit: string
  status: string
  nextVaccine: string
  microchip: string
  ownerId: number
}

// Datos más realistas y conectados con dueños
const pets: Pet[] = [
  {
    id: 1,
    name: "Max",
    species: "perro",
    breed: "Golden Retriever",
    age: "3 años",
    weight: "28.5 kg",
    owner: "María García Rodríguez",
    phone: "+57 300-234-5678",
    lastVisit: "2024-06-28",
    status: "saludable",
    nextVaccine: "2024-08-15",
    microchip: "MCH001234567",
    ownerId: 1
  },
  {
    id: 2,
    name: "Luna",
    species: "gato",
    breed: "Persa",
    age: "2 años 4 meses",
    weight: "4.2 kg",
    owner: "Carlos López Mendoza",
    phone: "+57 301-345-6789",
    lastVisit: "2024-06-25",
    status: "tratamiento",
    nextVaccine: "2024-07-20",
    microchip: "MCH001234568",
    ownerId: 2
  },
  {
    id: 3,
    name: "Buddy",
    species: "perro",
    breed: "Labrador Chocolate",
    age: "5 años 2 meses",
    weight: "32.1 kg",
    owner: "Ana Martínez Silva",
    phone: "+57 302-456-7890",
    lastVisit: "2024-07-02",
    status: "saludable",
    nextVaccine: "2024-09-10",
    microchip: "MCH001234569",
    ownerId: 3
  },
  {
    id: 4,
    name: "Mimi",
    species: "gato",
    breed: "Siamés",
    age: "4 años 8 meses",
    weight: "3.8 kg",
    owner: "Pedro Ruiz Castro",
    phone: "+57 303-567-8901",
    lastVisit: "2024-06-30",
    status: "cita_pendiente",
    nextVaccine: "2024-07-15",
    microchip: "MCH001234570",
    ownerId: 4
  },
  {
    id: 5,
    name: "Rocky",
    species: "perro",
    breed: "Pastor Alemán",
    age: "6 años",
    weight: "35.7 kg",
    owner: "Laura Fernández Vega",
    phone: "+57 304-678-9012",
    lastVisit: "2024-07-01",
    status: "saludable",
    nextVaccine: "2024-08-01",
    microchip: "MCH001234571",
    ownerId: 5
  },
  {
    id: 6,
    name: "Whiskers",
    species: "gato",
    breed: "Maine Coon",
    age: "1 año 6 meses",
    weight: "5.1 kg",
    owner: "Miguel Santos Herrera",
    phone: "+57 305-789-0123",
    lastVisit: "2024-06-22",
    status: "tratamiento",
    nextVaccine: "2024-07-25",
    microchip: "MCH001234572",
    ownerId: 6
  },
  {
    id: 7,
    name: "Bella",
    species: "perro",
    breed: "Bulldog Francés",
    age: "2 años 8 meses",
    weight: "12.3 kg",
    owner: "Carmen Jiménez Morales",
    phone: "+57 306-890-1234",
    lastVisit: "2024-07-03",
    status: "cita_pendiente",
    nextVaccine: "2024-07-18",
    microchip: "MCH001234573",
    ownerId: 7
  },
  {
    id: 8,
    name: "Felix",
    species: "gato",
    breed: "Bengalí",
    age: "3 años 3 meses",
    weight: "4.7 kg",
    owner: "Roberto Díaz Peña",
    phone: "+57 307-901-2345",
    lastVisit: "2024-06-27",
    status: "saludable",
    nextVaccine: "2024-08-05",
    microchip: "MCH001234574",
    ownerId: 8
  }
]

const statusOptions = ["Todos", "Saludable", "Tratamiento", "Cita Pendiente"]
const speciesOptions = ["Todas", "Perro", "Gato"]

export default function Mascotas() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("Todos")
  const [selectedSpecies, setSelectedSpecies] = useState("Todas")
  const [sortBy, setSortBy] = useState<"name" | "lastVisit" | "nextVaccine">("lastVisit")

  const filteredPets = pets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pet.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pet.microchip.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = selectedStatus === "Todos" || 
                         pet.status.toLowerCase().replace("_", " ") === selectedStatus.toLowerCase()
    
    const matchesSpecies = selectedSpecies === "Todas" || 
                          pet.species.toLowerCase() === selectedSpecies.toLowerCase()
    
    return matchesSearch && matchesStatus && matchesSpecies
  }).sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name)
    } else if (sortBy === "lastVisit") {
      return new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime()
    } else if (sortBy === "nextVaccine") {
      return new Date(a.nextVaccine).getTime() - new Date(b.nextVaccine).getTime()
    }
    return 0
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "saludable": return "bg-green-100 text-green-800"
      case "tratamiento": return "bg-yellow-100 text-yellow-800"
      case "cita_pendiente": return "bg-blue-100 text-blue-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getSpeciesColor = (species: string) => {
    return species === "perro" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Heart className="w-8 h-8 text-red-600" />
            Mascotas
          </h1>
          <p className="text-gray-600">Gestión completa de mascotas registradas</p>
        </div>
        <UnifiedRegistrationModal defaultTab="pet" />
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar mascotas, dueños o microchip..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Estado:</span>
          </div>
          {statusOptions.map((status) => (
            <Button
              key={status}
              variant={selectedStatus === status ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus(status)}
            >
              {status}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <span className="text-sm font-medium text-gray-700">Especie:</span>
          {speciesOptions.map((species) => (
            <Button
              key={species}
              variant={selectedSpecies === species ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSpecies(species)}
            >
              {species}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <span className="text-sm font-medium text-gray-700">Ordenar por:</span>
          {[
            { key: "name", label: "Nombre" },
            { key: "lastVisit", label: "Última Visita" },
            { key: "nextVaccine", label: "Próxima Vacuna" }
          ].map(({ key, label }) => (
            <Button
              key={key}
              variant={sortBy === key ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy(key as any)}
            >
              {label}
            </Button>
          ))}
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
              {pets.filter(p => p.status === "saludable").length}
            </div>
            <p className="text-sm text-gray-600">Saludables</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {pets.filter(p => p.status === "tratamiento").length}
            </div>
            <p className="text-sm text-gray-600">En Tratamiento</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {pets.filter(p => p.status === "cita_pendiente").length}
            </div>
            <p className="text-sm text-gray-600">Citas Pendientes</p>
          </CardContent>
        </Card>
      </div>

      {/* Pets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Mascotas ({filteredPets.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mascota</TableHead>
                  <TableHead>Especie/Raza</TableHead>
                  <TableHead>Edad/Peso</TableHead>
                  <TableHead>Dueño</TableHead>
                  <TableHead>Microchip</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Última Visita</TableHead>
                  <TableHead>Próxima Vacuna</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPets.map((pet) => (
                  <TableRow key={pet.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        <div>
                          <p className="font-semibold">{pet.name}</p>
                          <p className="text-xs text-gray-500">ID: {pet.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge className={getSpeciesColor(pet.species)}>
                          {pet.species}
                        </Badge>
                        <p className="text-sm text-gray-600">{pet.breed}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{pet.age}</p>
                        <p className="text-gray-600">{pet.weight}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3 text-gray-400" />
                          <span className="text-sm font-medium">{pet.owner}</span>
                        </div>
                        <p className="text-xs text-gray-500">{pet.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {pet.microchip}
                      </code>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(pet.status)}>
                        {pet.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="w-3 h-3" />
                        {new Date(pet.lastVisit).toLocaleDateString('es-ES')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Stethoscope className="w-3 h-3" />
                        {new Date(pet.nextVaccine).toLocaleDateString('es-ES')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline">
                          Ver
                        </Button>
                        <Button size="sm" variant="outline">
                          Editar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
