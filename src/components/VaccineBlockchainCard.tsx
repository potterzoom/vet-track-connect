
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Calendar, ExternalLink } from "lucide-react"

interface VaccineBlockchainCardProps {
  vaccine: {
    id: number
    petName: string
    ownerName: string
    vaccine: string
    appliedDate: string
    nextDue: string
    status: string
    lot: string
    blockchainHash: string
  }
  statusColor: string
  statusIcon: React.ReactNode
}

export function VaccineBlockchainCard({ vaccine, statusColor, statusIcon }: VaccineBlockchainCardProps) {
  const handleVerifyBlockchain = () => {
    // Simular verificación blockchain
    alert(`Verificando en blockchain:\nHash: ${vaccine.blockchainHash}\nEstado: Verificado ✓`)
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">
              {vaccine.petName}
            </CardTitle>
            <p className="text-sm text-gray-600">{vaccine.ownerName}</p>
          </div>
          <Badge className={`${statusColor} flex items-center gap-1`}>
            {statusIcon}
            {vaccine.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-900">{vaccine.vaccine}</h4>
          <p className="text-sm text-gray-600">Lote: {vaccine.lot}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-gray-600">Aplicada:</p>
            <p className="font-medium">{vaccine.appliedDate}</p>
          </div>
          <div>
            <p className="text-gray-600">Próxima:</p>
            <p className="font-medium">{vaccine.nextDue}</p>
          </div>
        </div>
        
        {/* Blockchain Section */}
        <div className="border-t pt-3 mt-3">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">Registro Blockchain</span>
          </div>
          <div className="bg-gray-100 p-2 rounded text-xs font-mono text-gray-700">
            {vaccine.blockchainHash.substring(0, 20)}...
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-2"
            onClick={handleVerifyBlockchain}
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            Verificar en Blockchain
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
