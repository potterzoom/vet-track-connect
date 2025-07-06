
import { useState } from "react"
import { ShoppingCart, Search, Star, Package, Truck, CreditCard, Filter } from "lucide-react"
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
  subcategoria: string
  proveedor: string
  rating: number
  stock: number
  imagen: string
  envioGratis: boolean
  promocion?: string
  especie: 'perros' | 'gatos' | 'ambos'
}

const productos: Producto[] = [
  // Balanceados
  {
    id: 1,
    nombre: "Royal Canin Veterinary Diet Digestive",
    descripcion: "Alimento terapéutico para perros con problemas digestivos",
    precio: 89.99,
    categoria: "Balanceados",
    subcategoria: "Terapéuticos",
    proveedor: "PetNutrition Pro",
    rating: 4.8,
    stock: 25,
    imagen: "/placeholder.svg",
    envioGratis: true,
    promocion: "20% OFF",
    especie: "perros"
  },
  {
    id: 2,
    nombre: "Hill's Science Diet Kitten",
    descripcion: "Alimento premium para gatitos en crecimiento",
    precio: 65.50,
    categoria: "Balanceados",
    subcategoria: "Premium",
    proveedor: "Hill's Distribuidor",
    rating: 4.7,
    stock: 18,
    imagen: "/placeholder.svg",
    envioGratis: true,
    especie: "gatos"
  },
  {
    id: 3,
    nombre: "Purina Pro Plan Adult",
    descripcion: "Alimento balanceado para perros adultos activos",
    precio: 45.90,
    categoria: "Balanceados",
    subcategoria: "Standard",
    proveedor: "Purina Oficial",
    rating: 4.5,
    stock: 32,
    imagen: "/placeholder.svg",
    envioGratis: false,
    especie: "perros"
  },
  // Medicamentos
  {
    id: 4,
    nombre: "Bravecto Antipulgas",
    descripcion: "Tableta masticable antipulgas de larga duración (3 meses)",
    precio: 75.00,
    categoria: "Medicamentos",
    subcategoria: "Antipulgas",
    proveedor: "MSD Animal Health",
    rating: 4.9,
    stock: 15,
    imagen: "/placeholder.svg",
    envioGratis: true,
    promocion: "Nuevo",
    especie: "perros"
  },
  {
    id: 5,
    nombre: "Advocate Gatos",
    descripcion: "Pipeta antiparasitaria mensual para gatos",
    precio: 28.75,
    categoria: "Medicamentos",
    subcategoria: "Antipulgas",
    proveedor: "Bayer",
    rating: 4.6,
    stock: 22,
    imagen: "/placeholder.svg",
    envioGratis: false,
    especie: "gatos"
  },
  // Shampoos y Cuidado
  {
    id: 6,
    nombre: "Shampoo Medicado Antiséptico",
    descripcion: "Shampoo con clorhexidina para problemas de piel",
    precio: 24.90,
    categoria: "Shampoos",
    subcategoria: "Medicados",
    proveedor: "DermaPet",
    rating: 4.4,
    stock: 12,
    imagen: "/placeholder.svg",
    envioGratis: false,
    especie: "ambos"
  },
  {
    id: 7,
    nombre: "Acondicionador Hidratante",
    descripcion: "Acondicionador con aloe vera para pelaje suave",
    precio: 19.50,
    categoria: "Shampoos",
    subcategoria: "Cosméticos",
    proveedor: "PetBeauty",
    rating: 4.2,
    stock: 20,
    imagen: "/placeholder.svg",
    envioGratis: false,
    especie: "ambos"
  },
  // Accesorios
  {
    id: 8,
    nombre: "Cama Ortopédica Memory Foam",
    descripcion: "Cama ortopédica con memory foam para perros mayores",
    precio: 125.00,
    categoria: "Accesorios",
    subcategoria: "Camas",
    proveedor: "ComfortPet",
    rating: 4.8,
    stock: 8,
    imagen: "/placeholder.svg",
    envioGratis: true,
    especie: "perros"
  },
  {
    id: 9,
    nombre: "Casa Térmica para Gatos",
    descripcion: "Casa aislada térmicamente para gatos en invierno",
    precio: 89.90,
    categoria: "Accesorios",
    subcategoria: "Casas",
    proveedor: "CatComfort",
    rating: 4.5,
    stock: 6,
    imagen: "/placeholder.svg",
    envioGratis: true,
    especie: "gatos"
  },
  {
    id: 10,
    nombre: "Collar Antipulgas Natural",
    descripcion: "Collar repelente natural con aceites esenciales",
    precio: 18.90,
    categoria: "Accesorios",
    subcategoria: "Collares",
    proveedor: "NaturalPet",
    rating: 4.1,
    stock: 25,
    imagen: "/placeholder.svg",
    envioGratis: false,
    especie: "ambos"
  },
  // Vitaminas y Suplementos
  {
    id: 11,
    nombre: "Complejo Multivitamínico Senior",
    descripcion: "Vitaminas para perros mayores de 7 años",
    precio: 42.50,
    categoria: "Vitaminas",
    subcategoria: "Multivitamínicos",
    proveedor: "VitaPet",
    rating: 4.6,
    stock: 18,
    imagen: "/placeholder.svg",
    envioGratis: false,
    especie: "perros"
  },
  {
    id: 12,
    nombre: "Omega 3 + Vitamina E",
    descripcion: "Suplemento para pelaje brillante y articulaciones",
    precio: 35.00,
    categoria: "Vitaminas",
    subcategoria: "Suplementos",
    proveedor: "NutriVet",
    rating: 4.7,
    stock: 14,
    imagen: "/placeholder.svg",
    envioGratis: false,
    especie: "ambos"
  }
]

const categorias = ["Todas", "Balanceados", "Medicamentos", "Shampoos", "Accesorios", "Vitaminas"]
const especies = ["Todas", "Perros", "Gatos", "Ambos"]

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [selectedEspecie, setSelectedEspecie] = useState("Todas")

  const filteredProductos = productos.filter(producto => {
    const matchesSearch = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         producto.subcategoria.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === "Todas" || producto.categoria === selectedCategory
    
    const matchesEspecie = selectedEspecie === "Todas" || 
                          producto.especie === selectedEspecie.toLowerCase() ||
                          producto.especie === "ambos"
    
    return matchesSearch && matchesCategory && matchesEspecie
  })

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  const getEspecieColor = (especie: string) => {
    switch (especie) {
      case "perros": return "bg-blue-100 text-blue-800"
      case "gatos": return "bg-purple-100 text-purple-800"
      case "ambos": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
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
          <p className="text-gray-600">Balanceados, medicamentos, accesorios y más para tu veterinaria</p>
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
      <div className="space-y-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar productos..."
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
              className="whitespace-nowrap"
            >
              {categoria}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Especies:</span>
          </div>
          {especies.map((especie) => (
            <Button
              key={especie}
              variant={selectedEspecie === especie ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedEspecie(especie)}
              className="whitespace-nowrap"
            >
              {especie}
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
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">{filteredProductos.length}</div>
            <p className="text-sm text-gray-600">Productos Encontrados</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{categorias.length - 1}</div>
            <p className="text-sm text-gray-600">Categorías</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {productos.filter(p => p.especie === 'perros' || p.especie === 'ambos').length}
            </div>
            <p className="text-sm text-gray-600">Para Perros</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {productos.filter(p => p.especie === 'gatos' || p.especie === 'ambos').length}
            </div>
            <p className="text-sm text-gray-600">Para Gatos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">4.6</div>
            <p className="text-sm text-gray-600">Rating Promedio</p>
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
              <Badge className={`absolute bottom-2 left-2 ${getEspecieColor(producto.especie)}`}>
                {producto.especie}
              </Badge>
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-base leading-tight">{producto.nombre}</CardTitle>
                  <p className="text-sm text-gray-600 line-clamp-2">{producto.descripcion}</p>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {producto.subcategoria}
                  </Badge>
                </div>
              </div>
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
                    Agregar
                  </Button>
                  <Button size="sm" variant="outline">
                    Ver
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
