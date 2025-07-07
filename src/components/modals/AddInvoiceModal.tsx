
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, FileText, Trash2, Calculator } from "lucide-react"

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
    cedula: "",
    direccion: "",
    telefono: "",
    email: "",
    mascota: "",
    veterinario: "",
    metodoPago: "efectivo",
    tipoContribuyente: "consumidor_final"
  })
  
  const [servicios, setServicios] = useState<ServicioItem[]>([])
  const [productos, setProductos] = useState<ProductoItem[]>([])
  const [nuevoServicio, setNuevoServicio] = useState({ nombre: "", precio: "" })
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: "", precio: "", cantidad: "" })

  const serviciosDisponibles = [
    { nombre: "Consulta General", precio: 25.00 },
    { nombre: "Consulta Especializada", precio: 45.00 },
    { nombre: "Vacuna Antirrábica", precio: 15.00 },
    { nombre: "Vacuna Óctuple", precio: 35.00 },
    { nombre: "Cirugía Menor", precio: 120.00 },
    { nombre: "Cirugía Mayor", precio: 250.00 },
    { nombre: "Castración Gato", precio: 80.00 },
    { nombre: "Castración Perro", precio: 120.00 },
    { nombre: "Desparasitación", precio: 12.00 },
    { nombre: "Limpieza Dental", precio: 85.00 },
    { nombre: "Radiografía", precio: 40.00 },
    { nombre: "Ecografía", precio: 55.00 },
    { nombre: "Análisis Hemograma", precio: 30.00 },
    { nombre: "Análisis Orina", precio: 18.00 },
    { nombre: "Hospitalización (día)", precio: 35.00 }
  ]

  const productosDisponibles = [
    { nombre: "Bravecto Antipulgas (Perro Grande)", precio: 65.00 },
    { nombre: "Bravecto Antipulgas (Perro Pequeño)", precio: 45.00 },
    { nombre: "NexGard Antipulgas", precio: 38.00 },
    { nombre: "Royal Canin Digestive (2kg)", precio: 42.00 },
    { nombre: "Hill's Prescription Diet (1.5kg)", precio: 28.50 },
    { nombre: "Pro Plan Puppy (3kg)", precio: 24.00 },
    { nombre: "Antibiótico Cefalexina", precio: 15.00 },
    { nombre: "Antiinflamatorio Meloxicam", precio: 8.50 },
    { nombre: "Analgésico Tramadol", precio: 12.00 },
    { nombre: "Vitaminas Complejo B", precio: 9.00 },
    { nombre: "Shampoo Antiséptico", precio: 16.50 },
    { nombre: "Collar Isabelino", precio: 7.50 },
    { nombre: "Vendas Elásticas", precio: 4.00 },
    { nombre: "Suero Fisiológico", precio: 3.50 }
  ]

  const veterinarios = [
    "Dr. Carlos Rodríguez",
    "Dra. María Martínez", 
    "Dr. Luis García",
    "Dra. Ana López",
    "Dr. Pedro Fernández"
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

  const cargarPrecioServicio = (nombreServicio: string) => {
    const servicio = serviciosDisponibles.find(s => s.nombre === nombreServicio)
    if (servicio) {
      setNuevoServicio({ nombre: nombreServicio, precio: servicio.precio.toString() })
    }
  }

  const cargarPrecioProducto = (nombreProducto: string) => {
    const producto = productosDisponibles.find(p => p.nombre === nombreProducto)
    if (producto) {
      setNuevoProducto({ 
        ...nuevoProducto, 
        nombre: nombreProducto, 
        precio: producto.precio.toString() 
      })
    }
  }

  const subtotal = servicios.reduce((sum, s) => sum + s.precio, 0) + 
                  productos.reduce((sum, p) => sum + (p.precio * p.cantidad), 0)
  
  // IVA en Ecuador es 12% para ciertos productos/servicios
  const aplicaIva = formData.tipoContribuyente !== "consumidor_final" || subtotal > 200
  const iva = aplicaIva ? subtotal * 0.12 : 0
  const total = subtotal + iva

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Generar número de factura con formato ecuatoriano
    const fecha = new Date()
    const año = fecha.getFullYear()
    const mes = String(fecha.getMonth() + 1).padStart(2, '0')
    const numeroSecuencial = String(Date.now()).slice(-6)
    const numeroFactura = `001-001-${numeroSecuencial}`
    
    const nuevaFactura = {
      ...formData,
      servicios: servicios.map(s => s.nombre),
      productos: productos.map(p => p.nombre),
      subtotal,
      iva,
      total,
      fecha: fecha.toISOString().split('T')[0],
      numero: numeroFactura,
      estado: 'pendiente',
      id: Date.now(),
      puntoEmision: "001",
      establecimiento: "001",
      tipoComprobante: "01", // Factura
      claveAcceso: `${fecha.getDate()}${mes}${año}01${numeroSecuencial}12345678901123${numeroSecuencial}12345678`
    }
    
    console.log("Nueva factura (Ecuador):", nuevaFactura)
    setOpen(false)
    
    // Reset form
    setFormData({ 
      cliente: "", cedula: "", direccion: "", telefono: "", email: "",
      mascota: "", veterinario: "", metodoPago: "efectivo", tipoContribuyente: "consumidor_final" 
    })
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
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-orange-600" />
            Nueva Factura - Clínica Veterinaria
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información del Cliente */}
          <Card>
            <CardHeader>
              <CardTitle>Información del Cliente</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cliente">Nombre Completo *</Label>
                <Input
                  id="cliente"
                  value={formData.cliente}
                  onChange={(e) => setFormData({...formData, cliente: e.target.value})}
                  placeholder="Nombre completo del cliente"
                  required
                />
              </div>
              <div>
                <Label htmlFor="cedula">Cédula/RUC *</Label>
                <Input
                  id="cedula"
                  value={formData.cedula}
                  onChange={(e) => setFormData({...formData, cedula: e.target.value})}
                  placeholder="0123456789 o 0123456789001"
                  required
                />
              </div>
              <div>
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  value={formData.telefono}
                  onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                  placeholder="+593 99 123 4567"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="cliente@email.com"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="direccion">Dirección</Label>
                <Input
                  id="direccion"
                  value={formData.direccion}
                  onChange={(e) => setFormData({...formData, direccion: e.target.value})}
                  placeholder="Dirección completa"
                />
              </div>
            </CardContent>
          </Card>

          {/* Información de la Consulta */}
          <div className="grid grid-cols-3 gap-4">
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
              <Label htmlFor="tipoContribuyente">Tipo Contribuyente</Label>
              <Select value={formData.tipoContribuyente} onValueChange={(value) => setFormData({...formData, tipoContribuyente: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consumidor_final">Consumidor Final</SelectItem>
                  <SelectItem value="contribuyente_especial">Contribuyente Especial</SelectItem>
                  <SelectItem value="sociedades">Sociedades</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Servicios */}
          <Card>
            <CardHeader>
              <CardTitle>Servicios Veterinarios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Select value={nuevoServicio.nombre} onValueChange={cargarPrecioServicio}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Seleccionar servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviciosDisponibles.map((servicio) => (
                      <SelectItem key={servicio.nombre} value={servicio.nombre}>
                        {servicio.nombre} - ${servicio.precio}
                      </SelectItem>
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
                <div key={servicio.id} className="flex justify-between items-center p-3 bg-blue-50 border border-blue-200 rounded">
                  <span className="font-medium">{servicio.nombre}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-blue-600">${servicio.precio.toFixed(2)}</span>
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
              <CardTitle>Productos y Medicamentos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Select value={nuevoProducto.nombre} onValueChange={cargarPrecioProducto}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Seleccionar producto" />
                  </SelectTrigger>
                  <SelectContent>
                    {productosDisponibles.map((producto) => (
                      <SelectItem key={producto.nombre} value={producto.nombre}>
                        {producto.nombre} - ${producto.precio}
                      </SelectItem>
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
                <div key={producto.id} className="flex justify-between items-center p-3 bg-green-50 border border-green-200 rounded">
                  <span className="font-medium">{producto.nombre} (x{producto.cantidad})</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">${producto.precio} c/u</span>
                    <span className="font-bold text-green-600">${(producto.precio * producto.cantidad).toFixed(2)}</span>
                    <Button type="button" size="sm" variant="outline" onClick={() => eliminarProducto(producto.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Método de Pago */}
          <div>
            <Label htmlFor="metodoPago">Método de Pago</Label>
            <Select value={formData.metodoPago} onValueChange={(value) => setFormData({...formData, metodoPago: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="efectivo">Efectivo</SelectItem>
                <SelectItem value="tarjeta_credito">Tarjeta de Crédito</SelectItem>
                <SelectItem value="tarjeta_debito">Tarjeta de Débito</SelectItem>
                <SelectItem value="transferencia">Transferencia Bancaria</SelectItem>
                <SelectItem value="cheque">Cheque</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Totales */}
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Resumen de Facturación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-lg">
                  <span>Subtotal:</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>IVA (12%):</span>
                  <span className="font-medium">
                    ${iva.toFixed(2)}
                    {!aplicaIva && <span className="text-xs text-gray-500 ml-2">(No aplica)</span>}
                  </span>
                </div>
                <div className="border-t border-orange-300 pt-3">
                  <div className="flex justify-between font-bold text-xl text-orange-700">
                    <span>TOTAL:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-600 mt-2">
                  <p>• IVA se aplica a contribuyentes especiales o compras &gt; $200</p>
                  <p>• Factura generada según normativa ecuatoriana del SRI</p>
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
              Generar Factura
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
