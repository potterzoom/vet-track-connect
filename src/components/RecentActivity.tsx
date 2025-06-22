
import { Clock, Heart, FileText, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ActivityItem {
  id: number
  type: 'consulta' | 'vacuna' | 'historial'
  petName: string
  description: string
  time: string
}

const activities: ActivityItem[] = [
  {
    id: 1,
    type: 'consulta',
    petName: 'Max',
    description: 'Consulta general - Control de rutina',
    time: '10:30 AM'
  },
  {
    id: 2,
    type: 'vacuna',
    petName: 'Luna',
    description: 'Vacuna antirrábica aplicada',
    time: '11:15 AM'
  },
  {
    id: 3,
    type: 'historial',
    petName: 'Toby',
    description: 'Actualización de historial clínico',
    time: '12:00 PM'
  },
  {
    id: 4,
    type: 'consulta',
    petName: 'Mimi',
    description: 'Consulta por problemas digestivos',
    time: '14:30 PM'
  }
]

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'consulta':
      return <Heart className="w-4 h-4 text-blue-600" />
    case 'vacuna':
      return <Calendar className="w-4 h-4 text-green-600" />
    case 'historial':
      return <FileText className="w-4 h-4 text-purple-600" />
    default:
      return <Clock className="w-4 h-4 text-gray-600" />
  }
}

export function RecentActivity() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <Clock className="w-5 h-5" />
          Actividad Reciente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="mt-0.5">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.petName}</p>
                <p className="text-sm text-gray-600 truncate">{activity.description}</p>
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
