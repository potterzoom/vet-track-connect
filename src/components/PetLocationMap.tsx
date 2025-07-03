
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation, Zap } from "lucide-react"

interface IoTDevice {
  id: number
  petName: string
  deviceId: string
  status: string
  battery: number
  temperature: number
  heartRate: number
  activity: string
  location: {
    lat: number
    lng: number
    address: string
  }
  lastUpdate: string
}

interface PetLocationMapProps {
  devices: IoTDevice[]
  selectedDevice: number | null
  onDeviceSelect: (deviceId: number) => void
}

export function PetLocationMap({ devices, selectedDevice, onDeviceSelect }: PetLocationMapProps) {
  const selectedDeviceData = devices.find(d => d.id === selectedDevice)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            Mapa de Ubicaciones en Tiempo Real
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Simulación del Mapa */}
          <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-lg p-8 min-h-[400px] relative overflow-hidden">
            {/* Elementos decorativos del mapa */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-4 w-16 h-8 bg-green-300 rounded"></div>
              <div className="absolute top-12 right-8 w-20 h-6 bg-blue-300 rounded"></div>
              <div className="absolute bottom-8 left-8 w-12 h-12 bg-green-400 rounded-full"></div>
            </div>

            {/* Marcadores de dispositivos */}
            {devices.map((device, index) => (
              <div
                key={device.id}
                className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 ${
                  selectedDevice === device.id ? 'scale-125 z-10' : ''
                }`}
                style={{
                  left: `${20 + index * 25}%`,
                  top: `${30 + index * 20}%`
                }}
                onClick={() => onDeviceSelect(device.id)}
              >
                <div className={`relative ${device.status === 'online' ? 'animate-pulse' : ''}`}>
                  <div className={`w-6 h-6 rounded-full border-2 border-white shadow-lg ${
                    device.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    <MapPin className="w-4 h-4 text-white absolute top-0.5 left-0.5" />
                  </div>
                  
                  {/* Nombre de la mascota */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <span className="bg-white px-2 py-1 rounded text-xs font-medium shadow-sm">
                      {device.petName}
                    </span>
                  </div>
                  
                  {/* Indicador de actividad */}
                  {device.status === 'online' && (
                    <div className="absolute -top-1 -right-1">
                      <div className={`w-3 h-3 rounded-full ${
                        device.activity === 'walking' ? 'bg-yellow-400' :
                        device.activity === 'running' ? 'bg-orange-400' :
                        'bg-blue-400'
                      } animate-pulse`}></div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Leyenda */}
            <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-md">
              <div className="text-xs font-medium mb-2">Estado:</div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-xs">Online</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-xs">Offline</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Device Details */}
      {selectedDeviceData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-blue-600" />
              Detalles de {selectedDeviceData.petName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm text-gray-600">Ubicación Actual</div>
                <div className="font-medium">{selectedDeviceData.location.address}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {selectedDeviceData.location.lat.toFixed(4)}, {selectedDeviceData.location.lng.toFixed(4)}
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm text-gray-600">Estado del Dispositivo</div>
                <div className={`font-medium ${
                  selectedDeviceData.status === 'online' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {selectedDeviceData.status === 'online' ? 'Conectado' : 'Desconectado'}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Batería: {Math.round(selectedDeviceData.battery)}%
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-sm text-gray-600">Signos Vitales</div>
                <div className="font-medium">
                  {selectedDeviceData.status === 'online' ? (
                    <>
                      {selectedDeviceData.temperature}°C, {selectedDeviceData.heartRate} bpm
                    </>
                  ) : (
                    'No disponible'
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1 capitalize">
                  Actividad: {selectedDeviceData.activity}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
