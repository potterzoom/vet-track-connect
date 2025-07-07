
import { useState } from "react"
import { FileText, Shield, Printer, Download } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface ReportePoliciailModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ReportePoliciailModal({ isOpen, onClose }: ReportePoliciailModalProps) {
  const { toast } = useToast()
  const [tipoReporte, setTipoReporte] = useState("")
  const [formData, setFormData] = useState({
    numeroReporte: `RPT-AMB-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
    fecha: new Date().toISOString().split('T')[0],
    responsable: "",
    unidad: "",
    asunto: "",
    descripcion: "",
    recomendaciones: "",
    adjuntos: ""
  })

  const tiposReporte = [
    { value: "incautacion", label: "Reporte de Incautación" },
    { value: "seguimiento", label: "Seguimiento de Especies" },
    { value: "alerta", label: "Alerta Ambiental" },
    { value: "coordinacion", label: "Coordinación Interinstitucional" },
    { value: "estadistico", label: "Reporte Estadístico" }
  ]

  const handleGenerate = () => {
    console.log("Generando reporte:", { tipoReporte, ...formData })
    
    toast({
      title: "Reporte Generado",
      description: `Reporte ${formData.numeroReporte} creado exitosamente`,
    })
    
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Generador de Reportes Policiales Ambientales
          </DialogTitle>
          <DialogDescription>
            Sistema oficial de reportes para la Policía Nacional del Ecuador
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Encabezado Oficial */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-900">POLICÍA NACIONAL DEL ECUADOR</h3>
                  <p className="text-blue-700 text-sm">Unidad de Protección Ambiental</p>
                  <p className="text-blue-600 text-xs">Sistema Integrado de Reportes Ambientales</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información Básica */}
          <Card>
            <CardHeader>
              <CardTitle>Información del Reporte</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="numeroReporte">Número de Reporte</Label>
                  <Input
                    id="numeroReporte"
                    value={formData.numeroReporte}
                    onChange={(e) => setFormData({...formData, numeroReporte: e.target.value})}
                    className="font-mono"
                  />
                </div>
                <div>
                  <Label htmlFor="fecha">Fecha</Label>
                  <Input
                    id="fecha"
                    type="date"
                    value={formData.fecha}
                    onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="tipoReporte">Tipo de Reporte *</Label>
                <Select value={tipoReporte} onValueChange={setTipoReporte}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo de reporte" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposReporte.map((tipo) => (
                      <SelectItem key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="responsable">Responsable del Reporte *</Label>
                  <Input
                    id="responsable"
                    value={formData.responsable}
                    onChange={(e) => setFormData({...formData, responsable: e.target.value})}
                    placeholder="Grado y nombres completos"
                  />
                </div>
                <div>
                  <Label htmlFor="unidad">Unidad/Dependencia *</Label>
                  <Select value={formData.unidad} onValueChange={(value) => setFormData({...formData, unidad: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar unidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upa-nacional">UPA Nacional</SelectItem>
                      <SelectItem value="upa-regional">UPA Regional</SelectItem>
                      <SelectItem value="policia-judicial">Policía Judicial</SelectItem>
                      <SelectItem value="gir">Grupo de Intervención y Rescate</SelectItem>
                      <SelectItem value="ucs">Unidad de Control y Seguridad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contenido del Reporte */}
          <Card>
            <CardHeader>
              <CardTitle>Contenido del Reporte</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="asunto">Asunto *</Label>
                <Input
                  id="asunto"
                  value={formData.asunto}
                  onChange={(e) => setFormData({...formData, asunto: e.target.value})}
                  placeholder="Resumen del asunto a reportar"
                />
              </div>
              <div>
                <Label htmlFor="descripcion">Descripción Detallada *</Label>
                <Textarea
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                  placeholder="Descripción completa de los hechos, hallazgos o situación reportada"
                  rows={6}
                />
              </div>
              <div>
                <Label htmlFor="recomendaciones">Recomendaciones y Acciones</Label>
                <Textarea
                  id="recomendaciones"
                  value={formData.recomendaciones}
                  onChange={(e) => setFormData({...formData, recomendaciones: e.target.value})}
                  placeholder="Recomendaciones, acciones tomadas o por tomar"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Vista Previa */}
          {tipoReporte && (
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle className="text-sm text-gray-600">Vista Previa del Reporte</CardTitle>
              </CardHeader>
              <CardContent className="bg-gray-50 p-4">
                <div className="text-sm space-y-2">
                  <div className="border-b pb-2">
                    <p><strong>REPORTE:</strong> {tiposReporte.find(t => t.value === tipoReporte)?.label}</p>
                    <p><strong>No.:</strong> {formData.numeroReporte}</p>
                    <p><strong>FECHA:</strong> {new Date(formData.fecha).toLocaleDateString('es-ES')}</p>
                  </div>
                  <div className="border-b pb-2">
                    <p><strong>RESPONSABLE:</strong> {formData.responsable || "[Por completar]"}</p>
                    <p><strong>UNIDAD:</strong> {formData.unidad || "[Por completar]"}</p>
                  </div>
                  <div>
                    <p><strong>ASUNTO:</strong> {formData.asunto || "[Por completar]"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Botones de Acción */}
          <div className="flex justify-between gap-2">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Printer className="w-4 h-4 mr-2" />
                Imprimir
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar PDF
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button onClick={handleGenerate} className="bg-blue-600 hover:bg-blue-700">
                Generar Reporte
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
