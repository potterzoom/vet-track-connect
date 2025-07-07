
import { useState } from "react"
import { Calendar as CalendarIcon, Bell, AlertTriangle, CheckCircle, Clock, Users, Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface AlertEvent {
  id: number
  type: 'vacuna' | 'cita' | 'seguimiento' | 'corte'
  title: string
  petName?: string
  ownerName: string
  date: string
  priority: 'alta' | 'media' | 'baja'
  status: 'pendiente' | 'completado' | 'vencido'
  description: string
}

const alertEvents: AlertEvent[] = [
  {
    id: 1,
    type: 'vacuna',
    title: 'Vacuna Antirrábica - Max',
    petName: 'Max',
    ownerName: 'María García',
    date: '2024-07-10',
    priority: 'alta',
    status: 'pendiente',
    description: 'Refuerzo anual de vacuna antirrábica'
  },
  {
    id: 2,
    type: 'cita',
    title: 'Control Post-Quirúrgico - Luna',
    petName: 'Luna',
    ownerName: 'Carlos López',
    date: '2024-07-08',
    priority: 'alta',
    status: 'pendiente',
    description: 'Revisión de herida quirúrgica'
  },
  {
    id: 3,
    type: 'corte',
    title: 'Fecha límite pago - Ana Martínez',
    ownerName: 'Ana Martínez',
    date: '2024-07-12',
    priority: 'media',
    status: 'pendiente',
    description: 'Vencimiento factura F-003-2024 por $95.20'
  },
  {
    id: 4,
    type: 'seguimiento',
    title: 'Seguimiento Tratamiento - Toby',
    petName: 'Toby',
    ownerName: 'Ana Martínez',
    date: '2024-07-15',
    priority: 'media',
    status: 'pendiente',
    description: 'Evaluación de progreso del tratamiento'
  },
  {
    id: 5,
    type: 'vacuna',
    title: 'Triple Felina - Mimi',
    petName: 'Mimi',
    ownerName: 'Pedro Ruiz',
    date: '2024-07-05',
    priority: 'alta',
    status: 'vencido',
    description: 'Vacuna vencida desde hace 2 días'
  }
]

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [filterType, setFilterType] = useState<'todos' | 'vacuna' | 'cita' | 'seguimiento' | 'corte'>('todos')
  const [filterPriority, setFilterPriority] = useState<'todos' | 'alta' | 'media' | 'baja'>('todos')

  const filteredEvents = alertEvents.filter(event => {
    const matchesType = filterType === 'todos' || event.type === filterType
    const matchesPriority = filterPriority === 'todos' || event.priority === filterPriority
    return matchesType && matchesPriority
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'vacuna': return <Heart className="w-4 h-4" />
      case 'cita': return <CalendarIcon className="w-4 h-4" />
      case 'seguimiento': return <Clock className="w-4 h-4" />
      case 'corte': return <AlertTriangle className="w-4 h-4" />
      default: return <Bell className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'vacuna': return 'bg-blue-100 text-blue-800'
      case 'cita': return 'bg-green-100 text-green-800'
      case 'seguimiento': return 'bg-purple-100 text-purple-800'
      case 'corte': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'bg-red-100 text-red-800'
      case 'media': return 'bg-yellow-100 text-yellow-800'
      case 'baja': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completado': return 'bg-green-100 text-green-800'
      case 'pendiente': return 'bg-yellow-100 text-yellow-800'
      case 'vencido': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completado': return <CheckCircle className="w-4 h-4" />
      case 'vencido': return <AlertTriangle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const todayEvents = alertEvents.filter(event => {
    const eventDate = new Date(event.date)
    const today = new Date()
    return eventDate.toDateString() === today.toDateString()
  })

  const upcomingEvents = alertEvents.filter(event => {
    const eventDate = new Date(event.date)
    const today = new Date()
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    return eventDate > today && eventDate <= nextWeek
  })

  const overdueEvents = alertEvents.filter(event => event.status === 'vencido')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <CalendarIcon className="w-8 h-8 text-indigo-600" />
            Gestor de Calendario
          </h1>
          <p className="text-gray-600">Coordinación de alertas, fechas de corte y gestión de eventos</p>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{todayEvents.length}</div>
            <p className="text-sm text-gray-600">Eventos Hoy</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{upcomingEvents.length}</div>
            <p className="text-sm text-gray-600">Próximos 7 días</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{overdueEvents.length}</div>
            <p className="text-sm text-gray-600">Vencidos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">{alertEvents.length}</div>
            <p className="text-sm text-gray-600">Total Eventos</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Calendario</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Events List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Eventos y Alertas</span>
              <div className="flex gap-2">
                <Button
                  variant={filterType === 'todos' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterType('todos')}
                >
                  Todos
                </Button>
                <Button
                  variant={filterType === 'vacuna' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterType('vacuna')}
                >
                  Vacunas
                </Button>
                <Button
                  variant={filterType === 'cita' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterType('cita')}
                >
                  Citas
                </Button>
                <Button
                  variant={filterType === 'corte' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterType('corte')}
                >
                  Pagos
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <div key={event.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                  <div className={`p-2 rounded-full ${getTypeColor(event.type)}`}>
                    {getTypeIcon(event.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                        <p className="text-sm text-gray-600">{event.ownerName}</p>
                        <p className="text-xs text-gray-500 mt-1">{event.description}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Badge className={getPriorityColor(event.priority)}>
                          {event.priority}
                        </Badge>
                        <Badge className={`${getStatusColor(event.status)} flex items-center gap-1`}>
                          {getStatusIcon(event.status)}
                          {event.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-500">
                        {new Date(event.date).toLocaleDateString('es-ES', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                      <Button size="sm" variant="outline">
                        {event.status === 'pendiente' ? 'Marcar Completado' : 'Ver Detalles'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Urgent Alerts */}
      {overdueEvents.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Alertas Urgentes - Eventos Vencidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {overdueEvents.map((event) => (
                <div key={event.id} className="bg-white border border-red-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-red-900">{event.title}</h4>
                      <p className="text-sm text-red-700">{event.ownerName}</p>
                      <p className="text-xs text-red-600 mt-1">{event.description}</p>
                    </div>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      Resolver
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
