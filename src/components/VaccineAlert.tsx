
import { Calendar, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface VaccineAlertProps {
  petName: string
  vaccine: string
  daysUntilDue: number
  ownerName: string
}

export function VaccineAlert({ petName, vaccine, daysUntilDue, ownerName }: VaccineAlertProps) {
  const getUrgencyColor = (days: number) => {
    if (days <= 0) return "bg-red-100 text-red-800 border-red-200"
    if (days <= 7) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    return "bg-blue-100 text-blue-800 border-blue-200"
  }

  const getUrgencyText = (days: number) => {
    if (days <= 0) return "Vencida"
    if (days === 1) return "1 día"
    return `${days} días`
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800">{petName}</CardTitle>
          <Badge className={getUrgencyColor(daysUntilDue)}>
            {getUrgencyText(daysUntilDue)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span className="font-medium">{vaccine}</span>
          </div>
          <p className="text-sm text-gray-500">Dueño: {ownerName}</p>
          {daysUntilDue <= 0 && (
            <div className="flex items-center gap-1 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Requiere atención inmediata</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
