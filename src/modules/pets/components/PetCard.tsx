import { Heart, Calendar, User, Stethoscope } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Pet } from "../types/Pet"

interface PetCardProps {
  pet: Pet
  onView: (id: number) => void
  onEdit: (id: number) => void
}

export function PetCard({ pet, onView, onEdit }: PetCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "saludable": return "bg-green-100 text-green-800"
      case "tratamiento": return "bg-yellow-100 text-yellow-800"
      case "cita_pendiente": return "bg-blue-100 text-blue-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getSpeciesColor = (species: string) => {
    return species === "perro" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <LazyLoadImage
            src={`/api/pets/${pet.id}/photo`}
            placeholderSrc="/placeholder.jpg"
            alt={`${pet.name} photo`}
            className="w-16 h-16 rounded-full object-cover"
            effect="blur"
          />
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                <h3 className="font-semibold text-lg">{pet.name}</h3>
              </div>
              <Badge className={getStatusColor(pet.status)}>
                {pet.status.replace("_", " ")}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <Badge className={getSpeciesColor(pet.species)} variant="outline">
                  {pet.species}
                </Badge>
                <p className="text-gray-600 mt-1">{pet.breed}</p>
              </div>
              <div>
                <p>{pet.age}</p>
                <p className="text-gray-600">{pet.weight}</p>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <User className="w-3 h-3 text-gray-400" />
                <span className="text-sm">{pet.owner}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-gray-400" />
                <span className="text-sm">Última visita: {new Date(pet.lastVisit).toLocaleDateString('es-ES')}</span>
              </div>
              <div className="flex items-center gap-1">
                <Stethoscope className="w-3 h-3 text-gray-400" />
                <span className="text-sm">Próxima vacuna: {new Date(pet.nextVaccine).toLocaleDateString('es-ES')}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button size="sm" variant="outline" onClick={() => onView(pet.id)}>
                Ver
              </Button>
              <Button size="sm" variant="outline" onClick={() => onEdit(pet.id)}>
                Editar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}