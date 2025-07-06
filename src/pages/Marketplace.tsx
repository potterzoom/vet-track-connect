import { useState } from "react"
import { FileText, Search, DollarSign, Package, TrendingUp, Calendar, Users, ShoppingCart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AddInvoiceModal } from "@/components/modals/AddInvoiceModal"
import { ReportsModal } from "@/components/modals/ReportsModal"

interface Factura {
  id: number
  numero: string
  cliente: string
  mascota: string
  fecha: string
  servicios: string[]
  productos: string[]
  subtotal: number
  iva: number
  total: number
  estado: 'pagada' | 'pendiente' | 'vencida'
  metodoPago?: string
  veterinario: string
}

interface Venta {
  id: number
  producto: string
  categoria: string
  cantidad: number
  precioUnitario: number
  total: number
  fecha: string
  cliente: string
}

const facturas: Factura[] = [
  {
    id: 1,
    numero: "F-001-2024",
    cliente: "María García",
    mascota: "Max",
    fecha: "2024-07-01",
    servicios: ["Consulta General", "Vacuna Antirrábica"],
    productos: ["Bravecto Antipulgas"],
    subtotal: 120.00,
    iva: 14.40,
    total: 134.40,
    estado: 'pagada',
    metodoPago: 'Efectivo',
    veterinario: "Dr. Rodríguez"
  },
  {
    id: 2,
    numero: "F-002-2024",
    cliente: "Carlos López",
    mascota: "Luna",
    fecha: "2024-07-02",
    servicios: ["Cirugía Básica", "Análisis Hemograma"],
    productos: ["Antibiótico", "Analgésico"],
    subtotal: 350.00,
    iva: 42.00,
    total: 392.00,
    estado: 'pendiente',
    veterinario: "Dra. Martínez"
  },
  {
    id: 3,
    numero: "F-003-2024",
    cliente: "Ana Martínez",
    mascota: "Toby",
    fecha: "2024-06-28",
    servicios: ["Control Prenatal"],
    productos: ["Vitaminas", "Shampoo Medicado"],
    subtotal: 85.00,
    iva: 10.20,
    total: 95.20,
    estado: 'vencida',
    veterinario: "Dr. García"
  }
]

const ventasRecientes: Venta[] = [
  {
    id: 1,
    producto: "Royal Canin Digestive",
    categoria: "Balanceados",
    cantidad: 2,
    precioUnitario: 89.99,
    total: 179.98,
    fecha: "2024-07-03",
    cliente: "Pedro Ruiz"
  },
  {
    id: 2,
    producto: "Bravecto Antipulgas",
    categoria: "Medicamentos",
    cantidad: 1,
    precioUnitario: 75.00,
    total: 75.00,
    fecha: "2024-07-03",
    cliente: "María García"
  },
  {
    id: 3,
    producto: "Shampoo Antiséptico",
    categoria: "Shampoos",
    cantidad: 3,
    precioUnitario: 24.90,
    total: 74.70,
    fecha: "2024-07-02",
    cliente: "Luis Hernández"
  }
]

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState<'facturas' | 'ventas' | 'resumen'>('resumen')

  const filteredFacturas = facturas.filter(factura =>
    factura.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    factura.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
    factura.mascota.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getEstadoFacturaInfo = (estado: string) => {
    switch (estado) {
      case "pagada": return { color: "bg-green-100 text-green-800", label: "Pagada" }
      case "pendiente": return { color: "bg-yellow-100 text-yellow-800", label: "Pendiente" }
      case "vencida": return { color: "bg-red-100 text-red-800", label: "Vencida" }
      default: return { color: "bg-gray-100 text-gray-800", label: estado }
    }
  }

  const totalFacturado = facturas.reduce((sum, f) => sum + f.total, 0)
  const facturasPendientes = facturas.filter(f => f.estado === 'pendiente').length
  const facturasVencidas = facturas.filter(f => f.estado === 'vencida').length
  const ventasHoy = ventasRecientes.filter(v => v.fecha === new Date().toISOString().split('T')[0]).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-8 h-8 text-orange-600" />
            Control Interno y Facturación
          </h1>
          <p className="text-gray-600">Gestión de ventas, facturas y control financiero de la veterinaria</p>
        </div>
        <div className="flex gap-2">
          <ReportsModal />
          <AddInvoiceModal />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <Button
          variant={activeTab === 'resumen' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('resumen')}
        >
          Resumen
        </Button>
        <Button
          variant={activeTab === 'facturas' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('facturas')}
        >
          Facturas
        </Button>
        <Button
          variant={activeTab === 'ventas' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('ventas')}
        >
          Ventas
        </Button>
      </div>

      {activeTab === 'resumen' && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">${totalFacturado.toFixed(2)}</div>
                <p className="text-sm text-gray-600">Total Facturado</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-yellow-600">{facturasPendientes}</div>
                <p className="text-sm text-gray-600">Facturas Pendientes</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-red-600">{facturasVencidas}</div>
                <p className="text-sm text-gray-600">Facturas Vencidas</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">{ventasHoy}</div>
                <p className="text-sm text-gray-600">Ventas Hoy</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  Ventas Recientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {ventasRecientes.slice(0, 5).map((venta) => (
                    <div key={venta.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{venta.producto}</p>
                        <p className="text-sm text-gray-600">{venta.cliente} - {venta.cantidad} unid.</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">${venta.total}</p>
                        <p className="text-xs text-gray-500">{new Date(venta.fecha).toLocaleDateString('es-ES')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-orange-600" />
                  Facturas Recientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {facturas.slice(0, 5).map((factura) => {
                    const estadoInfo = getEstadoFacturaInfo(factura.estado)
                    return (
                      <div key={factura.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{factura.numero}</p>
                          <p className="text-sm text-gray-600">{factura.cliente} - {factura.mascota}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${factura.total}</p>
                          <Badge className={`text-xs ${estadoInfo.color}`}>
                            {estadoInfo.label}
                          </Badge>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {activeTab === 'facturas' && (
        <>
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar facturas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Facturas Table */}
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Facturas</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Mascota</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFacturas.map((factura) => {
                    const estadoInfo = getEstadoFacturaInfo(factura.estado)
                    return (
                      <TableRow key={factura.id}>
                        <TableCell className="font-medium">{factura.numero}</TableCell>
                        <TableCell>{factura.cliente}</TableCell>
                        <TableCell>{factura.mascota}</TableCell>
                        <TableCell>{new Date(factura.fecha).toLocaleDateString('es-ES')}</TableCell>
                        <TableCell className="font-bold">${factura.total}</TableCell>
                        <TableCell>
                          <Badge className={estadoInfo.color}>
                            {estadoInfo.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Ver</Button>
                            <Button size="sm" variant="outline">Editar</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}

      {activeTab === 'ventas' && (
        <>
          {/* Ventas Table */}
          <Card>
            <CardHeader>
              <CardTitle>Registro de Ventas</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Precio Unit.</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Fecha</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ventasRecientes.map((venta) => (
                    <TableRow key={venta.id}>
                      <TableCell className="font-medium">{venta.producto}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{venta.categoria}</Badge>
                      </TableCell>
                      <TableCell>{venta.cliente}</TableCell>
                      <TableCell>{venta.cantidad}</TableCell>
                      <TableCell>${venta.precioUnitario}</TableCell>
                      <TableCell className="font-bold text-green-600">${venta.total}</TableCell>
                      <TableCell>{new Date(venta.fecha).toLocaleDateString('es-ES')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
