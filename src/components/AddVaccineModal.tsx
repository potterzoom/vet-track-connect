
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Plus } from "lucide-react"

interface AddVaccineModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddVaccineModal({ isOpen, onClose }: AddVaccineModalProps) {
  const [formData, setFormData] = useState({
    petId: "",
    vaccine: "",
    appliedDate: "",
    nextDue: "",
    lot: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simular registro en blockchain
    const blockchainHash = `0x${Math.random().toString(16).substring(2, 66)}`
    
    alert(`Vacuna registrada exitosamente!\n\nBlockchain Hash: ${blockchainHash}\n\nEl registro es ahora inmutable y verificable.`)
    
    // Reset form
    setFormData({
      petId: "",
      vaccine: "",
      appliedDate: "",
      nextDue: "",
      lot: ""
    })
    
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            Registrar Nueva Vacuna
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="petId">Mascota</Label>
            <Select value={formData.petId} onValueChange={(value) => setFormData({...formData, petId: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar mascota" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Max - María García</SelectItem>
                <SelectItem value="2">Luna - Carlos López</SelectItem>
                <SelectItem value="3">Toby - Ana Martínez</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="vaccine">Tipo de Vacuna</Label>
            <Select value={formData.vaccine} onValueChange={(value) => setFormData({...formData, vaccine: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar vacuna" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rabia">Vacuna Antirrábica</SelectItem>
                <SelectItem value="multiple">Refuerzo Múltiple</SelectItem>
                <SelectItem value="desparasitacion">Desparasitación</SelectItem>
                <SelectItem value="leucemia">Vacuna Leucemia</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="appliedDate">Fecha Aplicada</Label>
              <Input
                id="appliedDate"
                type="date"
                value={formData.appliedDate}
                onChange={(e) => setFormData({...formData, appliedDate: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nextDue">Próxima Dosis</Label>
              <Input
                id="nextDue"
                type="date"
                value={formData.nextDue}
                onChange={(e) => setFormData({...formData, nextDue: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lot">Número de Lote</Label>
            <Input
              id="lot"
              placeholder="Ej: RAB-2024-001"
              value={formData.lot}
              onChange={(e) => setFormData({...formData, lot: e.target.value})}
              required
            />
          </div>
          
          {/* Blockchain Info */}
          <div className="bg-green-50 border border-green-200 rounded p-3">
            <div className="flex items-center gap-2 text-green-800">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Registro Blockchain</span>
            </div>
            <p className="text-xs text-green-700 mt-1">
              Este registro será almacenado de forma inmutable en blockchain para garantizar su autenticidad.
            </p>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Registrar en Blockchain
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
