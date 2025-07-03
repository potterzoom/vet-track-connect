
import { useState } from "react"
import { Pill, Search, Plus, Package, AlertTriangle, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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
}

const medicamentos: Medicamento[] = [
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
    categoria: "Antibióticos"
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
    categoria: "Antiinflamatorios"
  },
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
    categoria: "Antiparasitarios"
  }
]

export default function Farmacia() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredMedicamentos = medicamentos.filter(med =>
    med.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.principioActivo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStockStatus = (stock: number, minimo: number) => {
    if (stock <= minimo) return { status: "bajo", color: "bg-red-100 text-red-800", icon: <AlertTriangle className="w-4 h-4" /> }
    if (stock <= minimo * 1.5) return { status: "medio", color: "bg-yellow-100 text-yellow-800", icon: <Package className="w-4 h-4" /> }
    return { status: "normal", color: "bg-green-100 text-green-800", icon: <CheckCircle className="w-4 h-4" /> }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Pill className="w-8 h-8 text-green-600" />
            Farmacia
          </h1>
          <p className="text-gray-600">Gestión de medicamentos y stock</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Medicamento
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Buscar medicamentos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">{medicamentos.length}</div>
            <p className="text-sm text-gray-600">Total Medicamentos</p>
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
            <div className="text-2xl font-bold text-yellow-600">2</div>
            <p className="text-sm text-gray-600">Próximos a Vencer</p>
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

      {/* Medicamentos List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMedicamentos.map((med) => {
          const stockInfo = getStockStatus(med.stock, med.stockMinimo)
          return (
            <Card key={med.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{med.nombre}</CardTitle>
                    <p className="text-sm text-gray-600">{med.principioActivo}</p>
                  </div>
                  <Badge className={`${stockInfo.color} flex items-center gap-1`}>
                    {stockInfo.icon}
                    {med.stock}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-600">Categoría:</p>
                      <p className="font-medium">{med.categoria}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Precio:</p>
                      <p className="font-medium">${med.precio}</p>
                    </div>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-600">Lote: {med.lote}</p>
                    <p className="text-gray-600">Vence: {new Date(med.fechaVencimiento).toLocaleDateString('es-ES')}</p>
                    <p className="text-gray-600">Proveedor: {med.proveedor}</p>
                  </div>
                  {med.stock <= med.stockMinimo && (
                    <div className="bg-red-50 border border-red-200 rounded p-2">
                      <p className="text-red-700 text-xs font-medium">
                        ⚠️ Stock bajo - Mínimo: {med.stockMinimo}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
