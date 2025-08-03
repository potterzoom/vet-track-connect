import { useState, useCallback, useMemo } from 'react'
import { Calendar as BigCalendar, dateFnsLocalizer, Views, View } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { es } from 'date-fns/locale'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, User, Stethoscope } from 'lucide-react'

const locales = {
  'es': es,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
})

interface CalendarEvent {
  id: number
  title: string
  start: Date
  end: Date
  resource: {
    type: 'cita' | 'vacuna' | 'cirugia' | 'revision'
    petName: string
    ownerName: string
    vetName: string
    status: 'confirmada' | 'pendiente' | 'cancelada'
    priority: 'alta' | 'media' | 'baja'
  }
}

// Mock data for calendar events
const mockEvents: CalendarEvent[] = [
  {
    id: 1,
    title: 'Consulta - Max (Golden Retriever)',
    start: new Date(2024, 7, 15, 9, 0),
    end: new Date(2024, 7, 15, 10, 0),
    resource: {
      type: 'cita',
      petName: 'Max',
      ownerName: 'María García',
      vetName: 'Dr. Rodriguez',
      status: 'confirmada',
      priority: 'media'
    }
  },
  {
    id: 2,
    title: 'Vacunación - Luna (Persa)',
    start: new Date(2024, 7, 15, 14, 0),
    end: new Date(2024, 7, 15, 14, 30),
    resource: {
      type: 'vacuna',
      petName: 'Luna',
      ownerName: 'Carlos López',
      vetName: 'Dra. Martinez',
      status: 'confirmada',
      priority: 'alta'
    }
  },
  {
    id: 3,
    title: 'Cirugía - Buddy (Labrador)',
    start: new Date(2024, 7, 16, 8, 0),
    end: new Date(2024, 7, 16, 11, 0),
    resource: {
      type: 'cirugia',
      petName: 'Buddy',
      ownerName: 'Ana Martínez',
      vetName: 'Dr. Rodriguez',
      status: 'confirmada',
      priority: 'alta'
    }
  }
]

export function CalendarView() {
  const [view, setView] = useState<View>(Views.WEEK)
  const [date, setDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  const handleSelectEvent = useCallback((event: CalendarEvent) => {
    setSelectedEvent(event)
  }, [])

  const handleSelectSlot = useCallback(({ start, end }: { start: Date; end: Date }) => {
    console.log('Crear nueva cita:', { start, end })
    // Aquí abriríamos un modal para crear nueva cita
  }, [])

  const eventStyleGetter = useCallback((event: CalendarEvent) => {
    let backgroundColor = '#3174ad'
    let borderColor = '#3174ad'
    
    switch (event.resource.type) {
      case 'cita':
        backgroundColor = '#3b82f6'
        borderColor = '#2563eb'
        break
      case 'vacuna':
        backgroundColor = '#10b981'
        borderColor = '#059669'
        break
      case 'cirugia':
        backgroundColor = '#ef4444'
        borderColor = '#dc2626'
        break
      case 'revision':
        backgroundColor = '#f59e0b'
        borderColor = '#d97706'
        break
    }

    if (event.resource.status === 'cancelada') {
      backgroundColor = '#6b7280'
      borderColor = '#4b5563'
    } else if (event.resource.status === 'pendiente') {
      backgroundColor = '#f59e0b'
      borderColor = '#d97706'
    }

    return {
      style: {
        backgroundColor,
        borderColor,
        border: `2px solid ${borderColor}`,
        borderRadius: '6px',
        opacity: event.resource.status === 'cancelada' ? 0.6 : 1,
        color: 'white',
        fontSize: '12px',
        fontWeight: '500'
      }
    }
  }, [])

  const CustomEvent = ({ event }: { event: CalendarEvent }) => (
    <div className="p-1">
      <div className="font-medium text-xs truncate">{event.resource.petName}</div>
      <div className="text-xs opacity-90 truncate">{event.resource.ownerName}</div>
      <div className="flex items-center gap-1 mt-1">
        <Badge 
          className="text-xs px-1 py-0 h-auto"
          variant={event.resource.priority === 'alta' ? 'destructive' : 'secondary'}
        >
          {event.resource.type}
        </Badge>
      </div>
    </div>
  )

  const messages = {
    allDay: 'Todo el día',
    previous: 'Anterior',
    next: 'Siguiente',
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    agenda: 'Agenda',
    date: 'Fecha',
    time: 'Hora',
    event: 'Evento',
    noEventsInRange: 'No hay eventos en este rango',
    showMore: (total: number) => `+ Ver más (${total})`
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" />
            Calendario de Citas
          </h2>
          <p className="text-muted-foreground">Gestión de citas y eventos veterinarios</p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={view === Views.DAY ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView(Views.DAY)}
          >
            Día
          </Button>
          <Button
            variant={view === Views.WEEK ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView(Views.WEEK)}
          >
            Semana
          </Button>
          <Button
            variant={view === Views.MONTH ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView(Views.MONTH)}
          >
            Mes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-4">
              <div style={{ height: '600px' }}>
                <BigCalendar
                  localizer={localizer}
                  events={mockEvents}
                  startAccessor="start"
                  endAccessor="end"
                  view={view}
                  onView={setView}
                  date={date}
                  onNavigate={setDate}
                  onSelectEvent={handleSelectEvent}
                  onSelectSlot={handleSelectSlot}
                  selectable
                  popup
                  eventPropGetter={eventStyleGetter}
                  components={{
                    event: CustomEvent
                  }}
                  messages={messages}
                  culture="es"
                  step={30}
                  timeslots={2}
                  min={new Date(0, 0, 0, 7, 0, 0)}
                  max={new Date(0, 0, 0, 20, 0, 0)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {/* Event Details */}
          {selectedEvent && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Detalles del Evento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{selectedEvent.resource.petName}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{selectedEvent.resource.ownerName}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    {format(selectedEvent.start, 'PPP p', { locale: es })}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <Badge 
                    variant={selectedEvent.resource.type === 'cirugia' ? 'destructive' : 'default'}
                  >
                    {selectedEvent.resource.type}
                  </Badge>
                  <Badge 
                    variant={selectedEvent.resource.status === 'confirmada' ? 'default' : 'secondary'}
                  >
                    {selectedEvent.resource.status}
                  </Badge>
                </div>
                
                <div className="pt-2">
                  <Button size="sm" className="w-full">
                    Ver Detalles
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Today's Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Eventos de Hoy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockEvents
                  .filter(event => 
                    format(event.start, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                  )
                  .map(event => (
                    <div 
                      key={event.id}
                      className="p-2 border rounded-lg cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="font-medium text-sm">{event.resource.petName}</div>
                      <div className="text-xs text-muted-foreground">
                        {format(event.start, 'HH:mm')} - {event.resource.type}
                      </div>
                    </div>
                  ))
                }
                {mockEvents.filter(event => 
                  format(event.start, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                ).length === 0 && (
                  <p className="text-sm text-muted-foreground">No hay eventos hoy</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}