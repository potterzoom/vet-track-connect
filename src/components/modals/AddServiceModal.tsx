
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus } from "lucide-react"

interface AddServiceModalProps {
  trigger?: React.ReactNode
}

export function AddServiceModal({ trigger }: AddServiceModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    descripcion: "",
    precio: "",
    duracion: "",
    veterinario: "",
    especieCompatible: "",
    requiereAnestesia: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Nuevo servicio:", formData)
    // Aquí iría la lógica para guardar el servicio
    setOpen(false)
    setFormData({
      nombre: "",
      categoria: "",
      descripcion: "",
      precio: "",
      duracion: "",
      veterinario: "",
      especieCompatible: "",
      requiereAnestesia: false
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Servicio
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Servicio</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nombre">Nombre del Servicio *</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="categoria">Categoría *</Label>
              <Select value={formData.categoria} onValueChange={(value) => setFormData({...formData, categoria: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cirugías">Cirugías</SelectItem>
                  <SelectItem value="Consultas">Consultas</SelectItem>
                  <SelectItem value="Reproductivo">Reproductivo</SelectItem>
                  <SelectItem value="Laboratorio">Laboratorio</SelectItem>
                  <SelectItem value="Emergencias">Emergencias</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              value={formData.descripcion}
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="precio">Precio ($) *</Label>
              <Input
                id="precio"
                type="number"
                step="0.01"
                value={formData.precio}
                onChange={(e) => setFormData({...formData, precio: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="duracion">Duración (minutos)</Label>
              <Input
                id="duracion"
                type="number"
                value={formData.duracion}
                onChange={(e) => setFormData({...formData, duracion: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="veterinario">Veterinario Responsable</Label>
              <Input
                id="veterinario"
                value={formData.veterinario}
                onChange={(e) => setFormData({...formData, veterinario: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="especieCompatible">Especie Compatible</Label>
              <Select value={formData.especieCompatible} onValueChange={(value) => setFormData({...formData, especieCompatible: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar especie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="perros">Solo Perros</SelectItem>
                  <SelectItem value="gatos">Solo Gatos</SelectItem>
                  <SelectItem value="ambos">Ambos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="anestesia"
              checked={formData.requiereAnestesia}
              onCheckedChange={(checked) => setFormData({...formData, requiereAnestesia: checked as boolean})}
            />
            <Label htmlFor="anestesia">Requiere anestesia</Label>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Crear Servicio
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
