
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, FileText, Download, BarChart3 } from "lucide-react"

interface ReportsModalProps {
  trigger?: React.ReactNode
}

export function ReportsModal({ trigger }: ReportsModalProps) {
  const [open, setOpen] = useState(false)
  const [reportData, setReportData] = useState({
    tipoReporte: "",
    fechaInicio: "",
    fechaFin: "",
    veterinario: "",
    cliente: "",
    formato: "pdf"
  })

  const tiposReporte = [
    { value: "ventas", label: "Reporte de Ventas" },
    { value: "facturas", label: "Reporte de Facturas" },
    { value: "productos", label: "Productos Más Vendidos" },
    { value: "clientes", label: "Clientes Frecuentes" },
    { value: "veterinarios", label: "Productividad por Veterinario" },
    { value: "financiero", label: "Reporte Financiero" },
    { value: "inventario", label: "Estado de Inventario" }
  ]

  const veterinarios = [
    "Todos",
    "Dr. Rodríguez",
    "Dra. Martínez",
    "Dr. García",
    "Dra. López",
    "Dr. Fernández"
  ]

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Generando reporte:", reportData)
    // Aquí se implementaría la lógica para generar el reporte
    alert(`Generando ${reportData.tipoReporte} desde ${reportData.fechaInicio} hasta ${reportData.fechaFin}`)
    setOpen(false)
  }

  const handleExport = (formato: string) => {
    console.log(`Exportando reporte en formato ${formato}`)
    alert(`Reporte exportado en formato ${formato.toUpperCase()}`)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Reportes
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-orange-600" />
            Generar Reportes
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <Label htmlFor="tipoReporte">Tipo de Reporte *</Label>
              <Select value={reportData.tipoReporte} onValueChange={(value) => setReportData({...reportData, tipoReporte: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo de reporte" />
                </SelectTrigger>
                <SelectContent>
                  {tiposReporte.map((tipo) => (
                    <SelectItem key={tipo.value} value={tipo.value}>{tipo.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fechaInicio">Fecha Inicio *</Label>
                <Input
                  id="fechaInicio"
                  type="date"
                  value={reportData.fechaInicio}
                  onChange={(e) => setReportData({...reportData, fechaInicio: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="fechaFin">Fecha Fin *</Label>
                <Input
                  id="fechaFin"
                  type="date"
                  value={reportData.fechaFin}
                  onChange={(e) => setReportData({...reportData, fechaFin: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="veterinario">Veterinario (Opcional)</Label>
                <Select value={reportData.veterinario} onValueChange={(value) => setReportData({...reportData, veterinario: value})}>
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
                <Label htmlFor="cliente">Cliente (Opcional)</Label>
                <Input
                  id="cliente"
                  value={reportData.cliente}
                  onChange={(e) => setReportData({...reportData, cliente: e.target.value})}
                  placeholder="Buscar cliente específico"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="formato">Formato de Exportación</Label>
              <Select value={reportData.formato} onValueChange={(value) => setReportData({...reportData, formato: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                <BarChart3 className="w-4 h-4 mr-2" />
                Generar Reporte
              </Button>
            </div>
          </form>

          {/* Reportes Rápidos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reportes Rápidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={() => handleExport('pdf')} className="justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Ventas del Mes
                </Button>
                <Button variant="outline" onClick={() => handleExport('excel')} className="justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Facturas Pendientes
                </Button>
                <Button variant="outline" onClick={() => handleExport('pdf')} className="justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Productos Top 10
                </Button>
                <Button variant="outline" onClick={() => handleExport('excel')} className="justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Balance Financiero
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
