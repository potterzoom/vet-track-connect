
import { useState } from "react"
import { Pill, Search, Plus, Package, AlertTriangle, CheckCircle, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AddProductModal } from "@/components/modals/AddProductModal"

interface Medicamento {
  id: number
  nombre: string
  principioActivo: string
  stock: number
  stockMinimo: number
  precio: number
  lote: string
  fechaVencimiento: string
  proveedor: string
  categoria: string
  especie: 'perros' | 'gatos' | 'ambos'
  descripcion: string
}

const medicamentos: Medicamento[] = [
  // Medicamentos
  {
    id: 1,
    nombre: "Amoxicilina 500mg",
    principioActivo: "Amoxicilina",
    stock: 45,
    stockMinimo: 10,
    precio: 25.50,
    lote: "AMX-2024-001",
    fechaVencimiento: "2025-08-15",
    proveedor: "FarmaVet S.A.",
    categoria: "Medicamentos",
    especie: "ambos",
    descripcion: "Antibiótico de amplio espectro"
  },
  {
    id: 2,
    nombre: "Metacam 5mg/ml",
    principioActivo: "Meloxicam",
    stock: 8,
    stockMinimo: 15,
    precio: 45.00,
    lote: "MTC-2024-005",
    fechaVencimiento: "2025-12-20",
    proveedor: "VetPharma Ltd.",
    categoria: "Medicamentos",
    especie: "ambos",
    descripcion: "Antiinflamatorio no esteroideo"
  },
  // Antipulgas y Antiparasitarios
  {
    id: 3,
    nombre: "Frontline Plus",
    principioActivo: "Fipronil + Metopreno",
    stock: 25,
    stockMinimo: 20,
    precio: 35.75,
    lote: "FTL-2024-012",
    fechaVencimiento: "2026-03-10",
    proveedor: "Boehringer Ingelheim",
    categoria: "Antipulgas",
    especie: "perros",
    descripcion: "Pipeta antipulgas y garrapatas"
  },
  {
    id: 4,
    nombre: "Revolution Gatos",
    principioActivo: "Selamectina",
    stock: 18,
    stockMinimo: 12,
    precio: 28.90,
    lote: "REV-2024-007",
    fechaVencimiento: "2025-09-30",
    proveedor: "Zoetis",
    categoria: "Antipulgas",
    especie: "gatos",
    descripcion: "Pipeta antiparasitaria mensual"
  },
  // Shampoos
  {
    id: 5,
    nombre: "Shampoo Medicado Malaseb",
    principioActivo: "Miconazol + Clorhexidina",
    stock: 12,
    stockMinimo: 8,
    precio: 22.50,
    lote: "SHP-2024-003",
    fechaVencimiento: "2026-01-15",
    proveedor: "Dermcare",
    categoria: "Shampoos",
    especie: "ambos",
    descripcion: "Shampoo antifúngico y antibacteriano"
  },
  {
    id: 6,
    nombre: "Shampoo Hidratante Avena",
    principioActivo: "Extracto de Avena",
    stock: 20,
    stockMinimo: 10,
    precio: 18.75,
    lote: "SHP-2024-008",
    fechaVencimiento: "2025-11-20",
    proveedor: "PetCare Plus",
    categoria: "Shampoos",
    especie: "ambos",
    descripcion: "Shampoo hidratante para piel sensible"
  },
  // Vitaminas
  {
    id: 7,
    nombre: "Complejo Vitamínico Canino",
    principioActivo: "Vitaminas A, D, E, B",
    stock: 35,
    stockMinimo: 15,
    precio: 32.00,
    lote: "VIT-2024-001",
    fechaVencimiento: "2025-10-05",
    proveedor: "NutriPet",
    categoria: "Vitaminas",
    especie: "perros",
    descripcion: "Suplemento multivitamínico diario"
  },
  {
    id: 8,
    nombre: "Omega 3 Felino",
    principioActivo: "Ácidos Grasos Omega 3",
    stock: 28,
    stockMinimo: 12,
    precio: 24.90,
    lote: "OMG-2024-004",
    fechaVencimiento: "2025-07-18",
    proveedor: "VetNutrition",
    categoria: "Vitaminas",
    especie: "gatos",
    descripcion: "Suplemento para pelaje y articulaciones"
  },
  // Balanceados
  {
    id: 9,
    nombre: "Royal Canin Adult Dog",
    principioActivo: "Alimento completo",
    stock: 15,
    stockMinimo: 25,
    precio: 89.99,
    lote: "RC-2024-015",
    fechaVencimiento: "2025-12-31",
    proveedor: "Royal Canin",
    categoria: "Balanceados",
    especie: "perros",
    descripcion: "Alimento premium para perros adultos"
  },
  {
    id: 10,
    nombre: "Hill's Prescription Diet Felino",
    principioActivo: "Alimento terapéutico",
    stock: 8,
    stockMinimo: 15,
    precio: 95.50,
    lote: "HD-2024-009",
    fechaVencimiento: "2025-08-25",
    proveedor: "Hill's Pet Nutrition",
    categoria: "Balanceados",
    especie: "gatos",
    descripcion: "Alimento medicado para problemas renales"
  }
]

const categorias = ["Todas", "Medicamentos", "Antipulgas", "Shampoos", "Vitaminas", "Balanceados"]
const especies = ["Todas", "Perros", "Gatos", "Ambos"]

export default function Farmacia() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [selectedEspecie, setSelectedEspecie] = useState("Todas")
  const [showAll, setShowAll] = useState(false)

  const filteredMedicamentos = medicamentos.filter(med => {
    const matchesSearch = med.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         med.principioActivo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         med.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === "Todas" || med.categoria === selectedCategory
    
    const matchesEspecie = selectedEspecie === "Todas" || 
                          med.especie === selectedEspecie.toLowerCase() ||
                          med.especie === "ambos"
    
    return matchesSearch && matchesCategory && matchesEspecie
  })

  const displayedMedicamentos = showAll ? filteredMedicamentos : filteredMedicamentos.slice(0, 5)

  const getStockStatus = (stock: number, minimo: number) => {
    if (stock <= minimo) return { status: "bajo", color: "bg-red-100 text-red-800", icon: <AlertTriangle className="w-4 h-4" /> }
    if (stock <= minimo * 1.5) return { status: "medio", color: "bg-yellow-100 text-yellow-800", icon: <Package className="w-4 h-4" /> }
    return { status: "normal", color: "bg-green-100 text-green-800", icon: <CheckCircle className="w-4 h-4" /> }
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
            <Pill className="w-8 h-8 text-green-600" />
            Farmacia Veterinaria
          </h1>
          <p className="text-gray-600">Medicamentos, antipulgas, shampoos, vitaminas y balanceados</p>
        </div>
        <AddProductModal defaultCategory="Medicamentos" />
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative max-w-md">
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
            >
              {especie}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">{medicamentos.length}</div>
            <p className="text-sm text-gray-600">Total Productos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {medicamentos.filter(m => m.stock <= m.stockMinimo).length}
            </div>
            <p className="text-sm text-gray-600">Stock Bajo</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {categorias.length - 1}
            </div>
            <p className="text-sm text-gray-600">Categorías</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {medicamentos.filter(m => m.especie === 'perros' || m.especie === 'ambos').length}
            </div>
            <p className="text-sm text-gray-600">Para Perros</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              ${medicamentos.reduce((sum, m) => sum + (m.stock * m.precio), 0).toFixed(2)}
            </div>
            <p className="text-sm text-gray-600">Valor Total Stock</p>
          </CardContent>
        </Card>
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Inventario de Productos</span>
            <Badge variant="outline">{filteredMedicamentos.length} productos</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Principio Activo</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Lote</TableHead>
                <TableHead>Vencimiento</TableHead>
                <TableHead>Especie</TableHead>
                <TableHead>Proveedor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedMedicamentos.map((med) => {
                const stockInfo = getStockStatus(med.stock, med.stockMinimo)
                return (
                  <TableRow key={med.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{med.nombre}</div>
                        <div className="text-sm text-gray-600">{med.descripcion}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{med.categoria}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{med.principioActivo}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge className={`${stockInfo.color} flex items-center gap-1`}>
                          {stockInfo.icon}
                          {med.stock}
                        </Badge>
                        {med.stock <= med.stockMinimo && (
                          <span className="text-xs text-red-600">Min: {med.stockMinimo}</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">${med.precio}</TableCell>
                    <TableCell className="text-sm font-mono">{med.lote}</TableCell>
                    <TableCell className="text-sm">{new Date(med.fechaVencimiento).toLocaleDateString('es-ES')}</TableCell>
                    <TableCell>
                      <Badge className={getEspecieColor(med.especie)}>
                        {med.especie}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{med.proveedor}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          
          {filteredMedicamentos.length > 5 && (
            <div className="mt-4 text-center">
              <Button 
                variant="outline" 
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? 'Mostrar menos' : `Ver todos (${filteredMedicamentos.length - 5} más)`}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
