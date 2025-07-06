
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, FileText, Trash2 } from "lucide-react"

interface AddInvoiceModalProps {
  trigger?: React.ReactNode
}

interface ServicioItem {
  id: string
  nombre: string
  precio: number
}

interface ProductoItem {
  id: string
  nombre: string
  precio: number
  cantidad: number
}

export function AddInvoiceModal({ trigger }: AddInvoiceModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    cliente: "",
    mascota: "",
    veterinario: "",
    metodoPago: "efectivo"
  })
  
  const [servicios, setServicios] = useState<ServicioItem[]>([])
  const [productos, setProductos] = useState<ProductoItem[]>([])
  const [nuevoServicio, setNuevoServicio] = useState({ nombre: "", precio: "" })
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: "", precio: "", cantidad: "" })

  const serviciosDisponibles = [
    "Consulta General",
    "Vacuna Antirrábica",
    "Cirugía Básica",
    "Control Prenatal",
    "Análisis Hemograma",
    "Desparasitación",
    "Limpieza Dental"
  ]

  const productosDisponibles = [
    "Bravecto Antipulgas",
    "Royal Canin Digestive",
    "Antibiótico",
    "Analgésico",
    "Vitaminas",
    "Shampoo Medicado"
  ]

  const veterinarios = [
    "Dr. Rodríguez",
    "Dra. Martínez",
    "Dr. García",
    "Dra. López",
    "Dr. Fernández"
  ]

  const agregarServicio = () => {
    if (nuevoServicio.nombre && nuevoServicio.precio) {
      setServicios([...servicios, {
        id: Date.now().toString(),
        nombre: nuevoServicio.nombre,
        precio: parseFloat(nuevoServicio.precio)
      }])
      setNuevoServicio({ nombre: "", precio: "" })
    }
  }

  const agregarProducto = () => {
    if (nuevoProducto.nombre && nuevoProducto.precio && nuevoProducto.cantidad) {
      setProductos([...productos, {
        id: Date.now().toString(),
        nombre: nuevoProducto.nombre,
        precio: parseFloat(nuevoProducto.precio),
        cantidad: parseInt(nuevoProducto.cantidad)
      }])
      setNuevoProducto({ nombre: "", precio: "", cantidad: "" })
    }
  }

  const eliminarServicio = (id: string) => {
    setServicios(servicios.filter(s => s.id !== id))
  }

  const eliminarProducto = (id: string) => {
    setProductos(productos.filter(p => p.id !== id))
  }

  const subtotal = servicios.reduce((sum, s) => sum + s.precio, 0) + 
                  productos.reduce((sum, p) => sum + (p.precio * p.cantidad), 0)
  const iva = subtotal * 0.12
  const total = subtotal + iva

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nuevaFactura = {
      ...formData,
      servicios: servicios.map(s => s.nombre),
      productos: productos.map(p => p.nombre),
      subtotal,
      iva,
      total,
      fecha: new Date().toISOString().split('T')[0],
      numero: `F-${String(Date.now()).slice(-6)}-2024`,
      estado: 'pendiente',
      id: Date.now()
    }
    console.log("Nueva factura:", nuevaFactura)
    setOpen(false)
    // Reset form
    setFormData({ cliente: "", mascota: "", veterinario: "", metodoPago: "efectivo" })
    setServicios([])
    setProductos([])
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-orange-600 hover:bg-orange-700">
            <FileText className="w-4 h-4 mr-2" />
            Nueva Factura
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-orange-600" />
            Nueva Factura
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información básica */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cliente">Cliente *</Label>
              <Input
                id="cliente"
                value={formData.cliente}
                onChange={(e) => setFormData({...formData, cliente: e.target.value})}
                placeholder="Nombre del cliente"
                required
              />
            </div>
            <div>
              <Label htmlFor="mascota">Mascota *</Label>
              <Input
                id="mascota"
                value={formData.mascota}
                onChange={(e) => setFormData({...formData, mascota: e.target.value})}
                placeholder="Nombre de la mascota"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="veterinario">Veterinario *</Label>
              <Select value={formData.veterinario} onValueChange={(value) => setFormData({...formData, veterinario: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar veterinario" />
                </SelectTrigger>
                <SelectContent>
                  {veterinarios.map((vet) => (
                    <SelectItem key={vet} value={vet}>{vet}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="metodoPago">Método de Pago</Label>
              <Select value={formData.metodoPago} onValueChange={(value) => setFormData({...formData, metodoPago: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="efectivo">Efectivo</SelectItem>
                  <SelectItem value="tarjeta">Tarjeta</SelectItem>
                  <SelectItem value="transferencia">Transferencia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Servicios */}
          <Card>
            <CardHeader>
              <CardTitle>Servicios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Select value={nuevoServicio.nombre} onValueChange={(value) => setNuevoServicio({...nuevoServicio, nombre: value})}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Seleccionar servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviciosDisponibles.map((servicio) => (
                      <SelectItem key={servicio} value={servicio}>{servicio}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Precio"
                  type="number"
                  step="0.01"
                  value={nuevoServicio.precio}
                  onChange={(e) => setNuevoServicio({...nuevoServicio, precio: e.target.value})}
                  className="w-32"
                />
                <Button type="button" onClick={agregarServicio}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              {servicios.map((servicio) => (
                <div key={servicio.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>{servicio.nombre}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">${servicio.precio.toFixed(2)}</span>
                    <Button type="button" size="sm" variant="outline" onClick={() => eliminarServicio(servicio.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Productos */}
          <Card>
            <CardHeader>
              <CardTitle>Productos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Select value={nuevoProducto.nombre} onValueChange={(value) => setNuevoProducto({...nuevoProducto, nombre: value})}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Seleccionar producto" />
                  </SelectTrigger>
                  <SelectContent>
                    {productosDisponibles.map((producto) => (
                      <SelectItem key={producto} value={producto}>{producto}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Cantidad"
                  type="number"
                  value={nuevoProducto.cantidad}
                  onChange={(e) => setNuevoProducto({...nuevoProducto, cantidad: e.target.value})}
                  className="w-24"
                />
                <Input
                  placeholder="Precio Unit."
                  type="number"
                  step="0.01"
                  value={nuevoProducto.precio}
                  onChange={(e) => setNuevoProducto({...nuevoProducto, precio: e.target.value})}
                  className="w-32"
                />
                <Button type="button" onClick={agregarProducto}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              {productos.map((producto) => (
                <div key={producto.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>{producto.nombre} (x{producto.cantidad})</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">${(producto.precio * producto.cantidad).toFixed(2)}</span>
                    <Button type="button" size="sm" variant="outline" onClick={() => eliminarProducto(producto.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Totales */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>IVA (12%):</span>
                  <span>${iva.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
              <FileText className="w-4 h-4 mr-2" />
              Crear Factura
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
