
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Users, Heart } from "lucide-react"

interface UnifiedRegistrationModalProps {
  trigger?: React.ReactNode
  defaultTab?: "owner" | "pet"
}

export function UnifiedRegistrationModal({ trigger, defaultTab = "owner" }: UnifiedRegistrationModalProps) {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(defaultTab)
  
  const [ownerData, setOwnerData] = useState({
    nombre: "",
    cedula: "",
    telefono: "",
    email: "",
    direccion: "",
    ocupacion: "",
    notas: ""
  })

  const [petData, setPetData] = useState({
    nombre: "",
    especie: "",
    raza: "",
    edad: "",
    peso: "",
    color: "",
    sexo: "",
    observaciones: "",
    microchip: "",
    vacunas: ""
  })

  const handleOwnerSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Nuevo dueño registrado:", ownerData)
    setActiveTab("pet")
  }

  const handlePetSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Nueva mascota registrada:", { 
      ...petData, 
      dueno: ownerData.nombre,
      telefonoDueno: ownerData.telefono 
    })
    setOpen(false)
    // Reset forms
    setOwnerData({
      nombre: "", cedula: "", telefono: "", email: "", 
      direccion: "", ocupacion: "", notas: ""
    })
    setPetData({
      nombre: "", especie: "", raza: "", edad: "", peso: "", 
      color: "", sexo: "", observaciones: "", microchip: "", vacunas: ""
    })
    setActiveTab("owner")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Registro Completo
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            <Heart className="w-5 h-5 text-red-600" />
            Registro Unificado - Dueño y Mascota
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "owner" | "pet")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="owner" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Dueño
            </TabsTrigger>
            <TabsTrigger value="pet" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Mascota
            </TabsTrigger>
          </TabsList>

          <TabsContent value="owner">
            <form onSubmit={handleOwnerSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nombre">Nombre Completo *</Label>
                  <Input
                    id="nombre"
                    value={ownerData.nombre}
                    onChange={(e) => setOwnerData({...ownerData, nombre: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cedula">Cédula/DNI *</Label>
                  <Input
                    id="cedula"
                    value={ownerData.cedula}
                    onChange={(e) => setOwnerData({...ownerData, cedula: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="telefono">Teléfono *</Label>
                  <Input
                    id="telefono"
                    value={ownerData.telefono}
                    onChange={(e) => setOwnerData({...ownerData, telefono: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={ownerData.email}
                    onChange={(e) => setOwnerData({...ownerData, email: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="direccion">Dirección *</Label>
                <Input
                  id="direccion"
                  value={ownerData.direccion}
                  onChange={(e) => setOwnerData({...ownerData, direccion: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="ocupacion">Ocupación</Label>
                <Input
                  id="ocupacion"
                  value={ownerData.ocupacion}
                  onChange={(e) => setOwnerData({...ownerData, ocupacion: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="notas">Notas Adicionales</Label>
                <Textarea
                  id="notas"
                  value={ownerData.notas}
                  onChange={(e) => setOwnerData({...ownerData, notas: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Continuar con Mascota →
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="pet">
            <form onSubmit={handlePetSubmit} className="space-y-4">
              <div className="bg-blue-50 p-3 rounded-md mb-4">
                <p className="text-sm text-blue-800">
                  <strong>Dueño:</strong> {ownerData.nombre} - {ownerData.telefono}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="petNombre">Nombre de la Mascota *</Label>
                  <Input
                    id="petNombre"
                    value={petData.nombre}
                    onChange={(e) => setPetData({...petData, nombre: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="especie">Especie *</Label>
                  <Select value={petData.especie} onValueChange={(value) => setPetData({...petData, especie: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar especie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="perro">Perro</SelectItem>
                      <SelectItem value="gato">Gato</SelectItem>
                      <SelectItem value="conejo">Conejo</SelectItem>
                      <SelectItem value="ave">Ave</SelectItem>
                      <SelectItem value="reptil">Reptil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="raza">Raza</Label>
                  <Input
                    id="raza"
                    value={petData.raza}
                    onChange={(e) => setPetData({...petData, raza: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edad">Edad</Label>
                  <Input
                    id="edad"
                    placeholder="ej: 2 años, 6 meses"
                    value={petData.edad}
                    onChange={(e) => setPetData({...petData, edad: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="peso">Peso (kg)</Label>
                  <Input
                    id="peso"
                    type="number"
                    step="0.1"
                    value={petData.peso}
                    onChange={(e) => setPetData({...petData, peso: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    value={petData.color}
                    onChange={(e) => setPetData({...petData, color: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="sexo">Sexo</Label>
                  <Select value={petData.sexo} onValueChange={(value) => setPetData({...petData, sexo: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="macho">Macho</SelectItem>
                      <SelectItem value="hembra">Hembra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="microchip">Microchip</Label>
                  <Input
                    id="microchip"
                    value={petData.microchip}
                    onChange={(e) => setPetData({...petData, microchip: e.target.value})}
                    placeholder="Número de microchip"
                  />
                </div>
                <div>
                  <Label htmlFor="vacunas">Estado de Vacunas</Label>
                  <Select value={petData.vacunas} onValueChange={(value) => setPetData({...petData, vacunas: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Estado vacunal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="completas">Vacunas Completas</SelectItem>
                      <SelectItem value="incompletas">Vacunas Incompletas</SelectItem>
                      <SelectItem value="pendientes">Vacunas Pendientes</SelectItem>
                      <SelectItem value="desconocido">Desconocido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="observaciones">Observaciones Médicas</Label>
                <Textarea
                  id="observaciones"
                  value={petData.observaciones}
                  onChange={(e) => setPetData({...petData, observaciones: e.target.value})}
                  rows={3}
                  placeholder="Alergias, condiciones médicas, comportamiento, etc."
                />
              </div>

              <div className="flex justify-between gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setActiveTab("owner")}>
                  ← Volver a Dueño
                </Button>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    Registrar Completo
                  </Button>
                </div>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
