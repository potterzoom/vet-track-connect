
import { useState } from "react"
import { ShoppingCart, Search, Star, Package, Truck, CreditCard } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Producto {
  id: number
  nombre: string
  descripcion: string
  precio: number
  categoria: string
  proveedor: string
  rating: number
  stock: number
  imagen: string
  envioGratis: boolean
  promocion?: string
}

const productos: Producto[] = [
  {
    id: 1,
    nombre: "Royal Canin Veterinary Diet",
    descripcion: "Alimento terapéutico para perros con problemas digestivos",
    precio: 89.99,
    categoria: "Alimentos",
    proveedor: "PetNutrition Pro",
    rating: 4.8,
    stock: 25,
    imagen: "/placeholder.svg",
    envioGratis: true,
    promocion: "20% OFF"
  },
  {
    id: 2,
    nombre: "Collar GPS PetTracker Pro",
    descripcion: "Collar inteligente con GPS y monitoreo de salud",
    precio: 149.99,
    categoria: "Tecnología",
    proveedor: "TechPet Solutions",
    rating: 4.6,
    stock: 12,
    imagen: "/placeholder.svg",
    envioGratis: true
  },
  {
    id: 3,
    nombre: "Kit Quirúrgico Profesional",
    descripcion: "Set completo de instrumentos quirúrgicos veterinarios",
    precio: 299.99,
    categoria: "Instrumental",
    proveedor: "MedVet Supplies",
    rating: 4.9,
    stock: 8,
    imagen: "/placeholder.svg",
    envioGratis: false
  },
  {
    id: 4,
    nombre: "Vacuna Antirrábica Nobivac",
    descripcion: "Vacuna antirrábica de alta calidad para perros y gatos",
    precio: 35.50,
    categoria: "Vacunas",
    proveedor: "VetPharma Direct",
    rating: 4.7,
    stock: 50,
    imagen: "/placeholder.svg",
    envioGratis: false,
    promocion: "Nuevo"
  }
]

const categorias = ["Todas", "Alimentos", "Medicamentos", "Instrumental", "Tecnología", "Vacunas", "Accesorios"]

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todas")

  const filteredProductos = productos.filter(producto => {
    const matchesSearch = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Todas" || producto.categoria === selectedCategory
    return matchesSearch && matchesCategory
  })

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingCart className="w-8 h-8 text-orange-600" />
            Marketplace Veterinario
          </h1>
          <p className="text-gray-600">Productos y suministros para clínicas veterinarias</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Package className="w-4 h-4 mr-2" />
            Mis Pedidos
          </Button>
          <Button className="bg-orange-600 hover:bg-orange-700">
            <CreditCard className="w-4 h-4 mr-2" />
            Carrito (0)
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categorias.map((categoria) => (
            <Button
              key={categoria}
              variant={selectedCategory === categoria ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(categoria)}
              className="whitespace-nowrap"
            >
              {categoria}
            </Button>
          ))}
        </div>
      </div>

      {/* Promociones Banner */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
              <Truck className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-orange-900">Envío Gratis en compras mayores a $100</h3>
              <p className="text-orange-700 text-sm">Recibe tus productos en 24-48 horas</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">{productos.length}</div>
            <p className="text-sm text-gray-600">Productos Disponibles</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">15</div>
            <p className="text-sm text-gray-600">Proveedores</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">4.7</div>
            <p className="text-sm text-gray-600">Rating Promedio</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">24h</div>
            <p className="text-sm text-gray-600">Tiempo Entrega</p>
          </CardContent>
        </Card>
      </div>

      {/* Productos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProductos.map((producto) => (
          <Card key={producto.id} className="hover:shadow-lg transition-shadow group">
            <div className="relative">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              {producto.promocion && (
                <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                  {producto.promocion}
                </Badge>
              )}
              {producto.envioGratis && (
                <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                  Envío Gratis
                </Badge>
              )}
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-base leading-tight">{producto.nombre}</CardTitle>
              <p className="text-sm text-gray-600 line-clamp-2">{producto.descripcion}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  {renderStars(producto.rating)}
                  <span className="text-sm text-gray-600 ml-1">({producto.rating})</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">${producto.precio}</p>
                    <p className="text-xs text-gray-500">{producto.proveedor}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Stock: {producto.stock}
                  </Badge>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-orange-600 hover:bg-orange-700">
                    Agregar al Carrito
                  </Button>
                  <Button size="sm" variant="outline">
                    Ver Detalles
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
