
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, TestTube } from "lucide-react"

interface AddAnalysisModalProps {
  trigger?: React.ReactNode
}

export function AddAnalysisModal({ trigger }: AddAnalysisModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    mascota: "",
    dueno: "",
    tipoAnalisis: "",
    veterinario: "",
    laboratorio: "",
    prioridad: "normal",
    costo: "",
    observaciones: ""
  })

  const tiposAnalisis = [
    "Hemograma Completo",
    "Perfil Hepático",
    "Análisis de Orina",
    "Perfil Renal",
    "Química Sanguínea",
    "Coprológico",
    "Perfil Tiroideo",
    "Perfil Cardíaco",
    "Análisis de Piel",
    "Citología"
  ]

  const laboratorios = [
    "LabVet Central",
    "DiagnostiVet",
    "VetLab Especializado",
    "Laboratorio Clínico Veterinario",
    "BioVet Diagnósticos"
  ]

  const veterinarios = [
    "Dr. Rodríguez",
    "Dra. Martínez",
    "Dr. García",
    "Dra. López",
    "Dr. Fernández"
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Nuevo análisis:", {
      ...formData,
      fechaSolicitud: new Date().toISOString().split('T')[0],
      estado: "pendiente",
      id: Date.now()
    })
    setOpen(false)
    setFormData({
      mascota: "",
      dueno: "",
      tipoAnalisis: "",
      veterinario: "",
      laboratorio: "",
      prioridad: "normal",
      costo: "",
      observaciones: ""
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Análisis
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TestTube className="w-5 h-5 text-purple-600" />
            Solicitar Nuevo Análisis
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
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
              <Label htmlFor="dueno">Dueño *</Label>
              <Input
                id="dueno"
                value={formData.dueno}
                onChange={(e) => setFormData({...formData, dueno: e.target.value})}
                placeholder="Nombre del propietario"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tipoAnalisis">Tipo de Análisis *</Label>
              <Select value={formData.tipoAnalisis} onValueChange={(value) => setFormData({...formData, tipoAnalisis: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar análisis" />
                </SelectTrigger>
                <SelectContent>
                  {tiposAnalisis.map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="laboratorio">Laboratorio *</Label>
              <Select value={formData.laboratorio} onValueChange={(value) => setFormData({...formData, laboratorio: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar laboratorio" />
                </SelectTrigger>
                <SelectContent>
                  {laboratorios.map((lab) => (
                    <SelectItem key={lab} value={lab}>{lab}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="prioridad">Prioridad</Label>
              <Select value={formData.prioridad} onValueChange={(value) => setFormData({...formData, prioridad: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="urgente">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="costo">Costo Estimado ($)</Label>
            <Input
              id="costo"
              type="number"
              step="0.01"
              value={formData.costo}
              onChange={(e) => setFormData({...formData, costo: e.target.value})}
              placeholder="0.00"
            />
          </div>

          <div>
            <Label htmlFor="observaciones">Observaciones</Label>
            <Textarea
              id="observaciones"
              value={formData.observaciones}
              onChange={(e) => setFormData({...formData, observaciones: e.target.value})}
              placeholder="Instrucciones especiales, síntomas observados, etc."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              <TestTube className="w-4 h-4 mr-2" />
              Solicitar Análisis
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
