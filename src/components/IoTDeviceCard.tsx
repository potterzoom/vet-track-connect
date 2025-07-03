
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MapPin, Battery, Thermometer, Heart, Activity, Wifi, WifiOff } from "lucide-react"

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

interface IoTDeviceCardProps {
  device: IoTDevice
  isSelected: boolean
  onSelect: () => void
}

export function IoTDeviceCard({ device, isSelected, onSelect }: IoTDeviceCardProps) {
  const getStatusColor = (status: string) => {
    return status === 'online' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }

  const getBatteryColor = (battery: number) => {
    if (battery > 50) return 'bg-green-500'
    if (battery > 20) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getActivityIcon = (activity: string) => {
    switch (activity) {
      case 'walking': return <Activity className="w-3 h-3" />
      case 'running': return <Activity className="w-3 h-3" />
      case 'resting': return <Heart className="w-3 h-3" />
      default: return <Activity className="w-3 h-3" />
    }
  }

  return (
    <Card 
      className={`cursor-pointer hover:shadow-md transition-all ${
        isSelected ? 'ring-2 ring-blue-500 shadow-md' : ''
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-gray-900">{device.petName}</h3>
            <p className="text-xs text-gray-500">{device.deviceId}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(device.status)}>
              {device.status === 'online' ? (
                <Wifi className="w-3 h-3 mr-1" />
              ) : (
                <WifiOff className="w-3 h-3 mr-1" />
              )}
              {device.status}
            </Badge>
          </div>
        </div>

        {/* Battery */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="flex items-center gap-1">
              <Battery className="w-3 h-3" />
              Batería
            </span>
            <span>{Math.round(device.battery)}%</span>
          </div>
          <Progress 
            value={device.battery} 
            className="h-2"
            style={{ backgroundColor: '#f3f4f6' }}
          />
          <div 
            className="h-2 rounded-full transition-all"
            style={{ 
              width: `${device.battery}%`,
              backgroundColor: getBatteryColor(device.battery)
            }}
          />
        </div>

        {/* Vital Signs */}
        {device.status === 'online' && (
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Thermometer className="w-3 h-3 text-red-500" />
              <span className="text-xs">{device.temperature}°C</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-3 h-3 text-red-500" />
              <span className="text-xs">{device.heartRate} bpm</span>
            </div>
          </div>
        )}

        {/* Activity & Location */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {getActivityIcon(device.activity)}
            <span className="text-xs capitalize">{device.activity}</span>
          </div>
          
          <div className="flex items-start gap-2">
            <MapPin className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
            <span className="text-xs text-gray-600 line-clamp-2">{device.location.address}</span>
          </div>
          
          <div className="text-xs text-gray-500 pt-2 border-t">
            Actualizado: {device.lastUpdate}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
