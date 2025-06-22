
import { useState } from "react"
import { Heart, Search, Plus, Camera } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Pet {
  id: number
  name: string
  species: string
  breed: string
  age: string
  owner: string
  imageUrl: string
  status: 'activo' | 'inactivo'
}

const pets: Pet[] = [
  {
    id: 1,
    name: "Max",
    species: "Perro",
    breed: "Golden Retriever",
    age: "3 años",
    owner: "María García",
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=200&h=200&fit=crop&crop=face",
    status: 'activo'
  },
  {
    id: 2,
    name: "Luna",
    species: "Gato",
    breed: "Siamés",
    age: "2 años",
    owner: "Carlos López",
    imageUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=200&h=200&fit=crop&crop=face",
    status: 'activo'
  },
  {
    id: 3,
    name: "Toby",
    species: "Perro",
    breed: "Labrador",
    age: "5 años",
    owner: "Ana Martínez",
    imageUrl: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=200&h=200&fit=crop&crop=face",
    status: 'activo'
  },
  {
    id: 4,
    name: "Mimi",
    species: "Gato",
    breed: "Persa",
    age: "4 años",
    owner: "Pedro Ruiz",
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=200&h=200&fit=crop&crop=face",
    status: 'inactivo'
  }
]

export default function Mascotas() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPets = pets.filter(pet =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.species.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Heart className="w-8 h-8 text-blue-600" />
            Mascotas
          </h1>
          <p className="text-gray-600">Gestión de pacientes de la clínica</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Mascota
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Buscar por nombre, dueño o especie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">{pets.length}</div>
            <p className="text-sm text-gray-600">Total Mascotas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{pets.filter(p => p.status === 'activo').length}</div>
            <p className="text-sm text-gray-600">Activas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-500">{pets.filter(p => p.status === 'inactivo').length}</div>
            <p className="text-sm text-gray-600">Inactivas</p>
          </CardContent>
        </Card>
      </div>

      {/* Pets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPets.map((pet) => (
          <Card key={pet.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{pet.name}</CardTitle>
                <Badge variant={pet.status === 'activo' ? 'default' : 'secondary'}>
                  {pet.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={pet.imageUrl}
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 rounded-full p-1">
                    <Camera className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Especie:</span> {pet.species}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Raza:</span> {pet.breed}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Edad:</span> {pet.age}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Dueño:</span> {pet.owner}
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
