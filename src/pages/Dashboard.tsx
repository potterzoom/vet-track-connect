
import { Heart, Users, Calendar, DollarSign, TrendingUp, AlertTriangle } from "lucide-react"
import { StatCard } from "@/components/StatCard"
import { VaccineAlert } from "@/components/VaccineAlert"
import { RecentActivity } from "@/components/RecentActivity"

const vaccineAlerts = [
  { petName: "Max", vaccine: "Vacuna Antirrábica", daysUntilDue: 3, ownerName: "María García" },
  { petName: "Luna", vaccine: "Refuerzo Múltiple", daysUntilDue: 0, ownerName: "Carlos López" },
  { petName: "Toby", vaccine: "Desparasitación", daysUntilDue: 7, ownerName: "Ana Martínez" },
  { petName: "Mimi", vaccine: "Vacuna Leucemia", daysUntilDue: -2, ownerName: "Pedro Ruiz" },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Resumen general de la clínica veterinaria</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Mascotas Registradas"
          value="247"
          icon={<Heart className="w-5 h-5" />}
          trend={{ value: "12%", isPositive: true }}
        />
        <StatCard
          title="Dueños Activos"
          value="189"
          icon={<Users className="w-5 h-5" />}
          trend={{ value: "8%", isPositive: true }}
        />
        <StatCard
          title="Vacunas Pendientes"
          value="15"
          icon={<Calendar className="w-5 h-5" />}
          trend={{ value: "3%", isPositive: false }}
        />
        <StatCard
          title="Ingresos del Mes"
          value="$12,450"
          icon={<DollarSign className="w-5 h-5" />}
          trend={{ value: "15%", isPositive: true }}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vaccine Alerts - Takes 2 columns */}
        <div className="lg:col-span-2">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              Alertas de Vacunación
            </h2>
            <p className="text-gray-600 text-sm">Próximas vacunas y vencimientos</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vaccineAlerts.map((alert, index) => (
              <VaccineAlert
                key={index}
                petName={alert.petName}
                vaccine={alert.vaccine}
                daysUntilDue={alert.daysUntilDue}
                ownerName={alert.ownerName}
              />
            ))}
          </div>
        </div>

        {/* Recent Activity - Takes 1 column */}
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">Rendimiento Mensual</h3>
            <p className="text-blue-100">La clínica ha registrado un crecimiento constante</p>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-8 h-8" />
            <span className="text-2xl font-bold">+18%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
