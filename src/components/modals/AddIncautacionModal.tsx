
import { useState } from "react"
import { ShieldAlert, Calendar, MapPin, Users, FileText } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface AddIncautacionModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddIncautacionModal({ isOpen, onClose }: AddIncautacionModalProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    fecha: new Date().toISOString().split('T')[0],
    hora: new Date().toTimeString().split(' ')[0].substring(0, 5),
    ubicacion: "",
    provincia: "",
    canton: "",
    parroquia: "",
    coordenadas: "",
    responsableOperativo: "",
    unidadPolicial: "",
    numeroActa: "",
    especiesIncautadas: "",
    cantidadAnimales: "",
    estadoAnimales: "",
    destinoAnimales: "",
    sospechoso: {
      nombres: "",
      cedula: "",
      direccion: "",
      telefono: ""
    },
    observaciones: "",
    urgencia: "media"
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log("Registrando incautación:", formData)
    
    toast({
      title: "Incautación Registrada",
      description: `Acta ${formData.numeroActa} creada exitosamente`,
    })
    
    onClose()
    setFormData({
      fecha: new Date().toISOString().split('T')[0],
      hora: new Date().toTimeString().split(' ')[0].substring(0, 5),
      ubicacion: "",
      provincia: "",
      canton: "",
      parroquia: "",
      coordenadas: "",
      responsableOperativo: "",
      unidadPolicial: "",
      numeroActa: "",
      especiesIncautadas: "",
      cantidadAnimales: "",
      estadoAnimales: "",
      destinoAnimales: "",
      sospechoso: {
        nombres: "",
        cedula: "",
        direccion: "",
        telefono: ""
      },
      observaciones: "",
      urgencia: "media"
    })
  }

  const provinciasEcuador = [
    "Azuay", "Bolívar", "Cañar", "Carchi", "Chimborazo", "Cotopaxi", "El Oro",
    "Esmeraldas", "Galápagos", "Guayas", "Imbabura", "Loja", "Los Ríos",
    "Manabí", "Morona Santiago", "Napo", "Orellana", "Pastaza", "Pichincha",
    "Santa Elena", "Santo Domingo de los Tsáchilas", "Sucumbíos", "Tungurahua", "Zamora Chinchipe"
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-600" />
            Registro de Incautación - Policía Nacional del Ecuador
          </DialogTitle>
          <DialogDescription>
            Formulario oficial para el registro de incautación de fauna silvestre
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Temporal y Geográfica */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="w-4 h-4" />
                Información Temporal y Geográfica
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fecha">Fecha de Incautación *</Label>
                <Input
                  id="fecha"
                  type="date"
                  value={formData.fecha}
                  onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="hora">Hora de Incautación *</Label>
                <Input
                  id="hora"
                  type="time"
                  value={formData.hora}
                  onChange={(e) => setFormData({...formData, hora: e.target.value})}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="ubicacion">Ubicación Específica *</Label>
                <Input
                  id="ubicacion"
                  value={formData.ubicacion}
                  onChange={(e) => setFormData({...formData, ubicacion: e.target.value})}
                  placeholder="Dirección exacta, referencias importantes..."
                  required
                />
              </div>
              <div>
                <Label htmlFor="provincia">Provincia *</Label>
                <Select value={formData.provincia} onValueChange={(value) => setFormData({...formData, provincia: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar provincia" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinciasEcuador.map((provincia) => (
                      <SelectItem key={provincia} value={provincia}>
                        {provincia}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="coordenadas">Coordenadas GPS</Label>
                <Input
                  id="coordenadas"
                  value={formData.coordenadas}
                  onChange={(e) => setFormData({...formData, coordenadas: e.target.value})}
                  placeholder="Lat, Lng (opcional)"
                />
              </div>
            </CardContent>
          </Card>

          {/* Información Policial */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="w-4 h-4" />
                Información del Operativo Policial
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="responsableOperativo">Responsable del Operativo *</Label>
                <Input
                  id="responsableOperativo"
                  value={formData.responsableOperativo}
                  onChange={(e) => setFormData({...formData, responsableOperativo: e.target.value})}
                  placeholder="Grado y nombres completos"
                  required
                />
              </div>
              <div>
                <Label htmlFor="unidadPolicial">Unidad Policial *</Label>
                <Select value={formData.unidadPolicial} onValueChange={(value) => setFormData({...formData, unidadPolicial: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar unidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unidad-ambiental">Unidad de Protección Ambiental</SelectItem>
                    <SelectItem value="policia-judicial">Policía Judicial</SelectItem>
                    <SelectItem value="ucs">Unidad de Control y Seguridad</SelectItem>
                    <SelectItem value="gir">Grupo de Intervención y Rescate</SelectItem>
                    <SelectItem value="upc">Unidad de Policía Comunitaria</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="numeroActa">Número de Acta *</Label>
                <Input
                  id="numeroActa"
                  value={formData.numeroActa}
                  onChange={(e) => setFormData({...formData, numeroActa: e.target.value})}
                  placeholder="ACTA-AMB-2024-XXX"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Información de Especies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ShieldAlert className="w-4 h-4" />
                Especies Incautadas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="especiesIncautadas">Descripción de Especies *</Label>
                <Textarea
                  id="especiesIncautadas"
                  value={formData.especiesIncautadas}
                  onChange={(e) => setFormData({...formData, especiesIncautadas: e.target.value})}
                  placeholder="Detalle de especies (nombre común, científico si se conoce)"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cantidadAnimales">Cantidad Total *</Label>
                  <Input
                    id="cantidadAnimales"
                    type="number"
                    value={formData.cantidadAnimales}
                    onChange={(e) => setFormData({...formData, cantidadAnimales: e.target.value})}
                    placeholder="Número de animales"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="estadoAnimales">Estado de los Animales *</Label>
                  <Select value={formData.estadoAnimales} onValueChange={(value) => setFormData({...formData, estadoAnimales: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Estado general" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saludable">Saludable</SelectItem>
                      <SelectItem value="herido">Herido/Lesionado</SelectItem>
                      <SelectItem value="enfermo">Enfermo</SelectItem>
                      <SelectItem value="desnutrido">Desnutrido</SelectItem>
                      <SelectItem value="muerto">Muerto</SelectItem>
                      <SelectItem value="mixto">Estado Mixto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="destinoAnimales">Destino de los Animales *</Label>
                <Select value={formData.destinoAnimales} onValueChange={(value) => setFormData({...formData, destinoAnimales: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar destino" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="centro-rescate">Centro de Rescate Fauna Silvestre</SelectItem>
                    <SelectItem value="zoologico">Zoológico Autorizado</SelectItem>
                    <SelectItem value="liberacion">Liberación Inmediata</SelectItem>
                    <SelectItem value="veterinaria">Clínica Veterinaria</SelectItem>
                    <SelectItem value="necropsia">Necropsia (Animales Muertos)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Información del Sospechoso */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="w-4 h-4" />
                Información del Sospechoso
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sospechoso-nombres">Nombres Completos</Label>
                <Input
                  id="sospechoso-nombres"
                  value={formData.sospechoso.nombres}
                  onChange={(e) => setFormData({
                    ...formData, 
                    sospechoso: {...formData.sospechoso, nombres: e.target.value}
                  })}
                  placeholder="Nombres y apellidos completos"
                />
              </div>
              <div>
                <Label htmlFor="sospechoso-cedula">Cédula/Pasaporte</Label>
                <Input
                  id="sospechoso-cedula"
                  value={formData.sospechoso.cedula}
                  onChange={(e) => setFormData({
                    ...formData, 
                    sospechoso: {...formData.sospechoso, cedula: e.target.value}
                  })}
                  placeholder="Número de identificación"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="sospechoso-direccion">Dirección</Label>
                <Input
                  id="sospechoso-direccion"
                  value={formData.sospechoso.direccion}
                  onChange={(e) => setFormData({
                    ...formData, 
                    sospechoso: {...formData.sospechoso, direccion: e.target.value}
                  })}
                  placeholder="Dirección domiciliaria"
                />
              </div>
            </CardContent>
          </Card>

          {/* Observaciones */}
          <Card>
            <CardHeader>
              <CardTitle>Observaciones Adicionales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="urgencia">Nivel de Urgencia *</Label>
                <Select value={formData.urgencia} onValueChange={(value) => setFormData({...formData, urgencia: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baja">Baja - Seguimiento rutinario</SelectItem>
                    <SelectItem value="media">Media - Atención prioritaria</SelectItem>
                    <SelectItem value="alta">Alta - Intervención inmediata</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="observaciones">Observaciones Detalladas</Label>
                <Textarea
                  id="observaciones"
                  value={formData.observaciones}
                  onChange={(e) => setFormData({...formData, observaciones: e.target.value})}
                  placeholder="Detalles adicionales del operativo, condiciones encontradas, etc."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Botones */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-red-600 hover:bg-red-700">
              Registrar Incautación
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
