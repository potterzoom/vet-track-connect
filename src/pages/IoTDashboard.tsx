
import { useState, useEffect } from "react"
import { MapPin, Activity, Battery, Thermometer, Heart, Wifi, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { IoTDeviceCard } from "@/components/IoTDeviceCard"
import { PetLocationMap } from "@/components/PetLocationMap"

const mockDevices = [
  {
    id: 1,
    petName: "Max",
    deviceId: "GPS-001",
    status: "online",
    battery: 85,
    temperature: 38.2,
    heartRate: 75,
    activity: "walking",
    location: { lat: 19.4326, lng: -99.1332, address: "Parque México, Roma Norte" },
    lastUpdate: "Hace 2 min"
  },
  {
    id: 2,
    petName: "Luna",
    deviceId: "GPS-002",
    status: "online",
    battery: 42,
    temperature: 37.8,
    heartRate: 82,
    activity: "resting",
    location: { lat: 19.4284, lng: -99.1276, address: "Parque España, Condesa" },
    lastUpdate: "Hace 5 min"
  },
  {
    id: 3,
    petName: "Toby",
    deviceId: "GPS-003",
    status: "offline",
    battery: 12,
    temperature: 0,
    heartRate: 0,
    activity: "unknown",
    location: { lat: 19.4205, lng: -99.1374, address: "Última ubicación conocida" },
    lastUpdate: "Hace 2 horas"
  }
]

export default function IoTDashboard() {
  const [devices, setDevices] = useState(mockDevices)
  const [selectedDevice, setSelectedDevice] = useState<number | null>(null)

  // Simular actualizaciones en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setDevices(prev => prev.map(device => ({
        ...device,
        heartRate: device.status === 'online' ? Math.floor(Math.random() * 20) + 70 : 0,
        temperature: device.status === 'online' ? parseFloat((Math.random() * 2 + 37).toFixed(1)) : 0,
        battery: device.status === 'online' ? Math.max(device.battery - Math.random() * 0.1, 0) : device.battery,
        lastUpdate: device.status === 'online' ? "Ahora" : device.lastUpdate
      })))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const onlineDevices = devices.filter(d => d.status === 'online').length
  const lowBatteryDevices = devices.filter(d => d.battery < 20).length
  const alertDevices = devices.filter(d => d.status === 'offline' || d.battery < 15).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900">Monitoreo IoT</h1>
        <p className="text-gray-600">Control en tiempo real de dispositivos GPS y sensores de salud</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Wifi className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{onlineDevices}</div>
                <div className="text-sm text-gray-600">Dispositivos Online</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Battery className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">{lowBatteryDevices}</div>
                <div className="text-sm text-gray-600">Batería Baja</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{alertDevices}</div>
                <div className="text-sm text-gray-600">Alertas Activas</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{devices.length}</div>
                <div className="text-sm text-gray-600">Total Dispositivos</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Dispositivos Activos</h2>
          {devices.map((device) => (
            <IoTDeviceCard
              key={device.id}
              device={device}
              isSelected={selectedDevice === device.id}
              onSelect={() => setSelectedDevice(device.id)}
            />
          ))}
        </div>

        {/* Map */}
        <div className="lg:col-span-2">
          <PetLocationMap 
            devices={devices} 
            selectedDevice={selectedDevice}
            onDeviceSelect={setSelectedDevice}
          />
        </div>
      </div>
    </div>
  )
}
