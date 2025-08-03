export interface Pet {
  id: number
  name: string
  species: string
  breed: string
  age: string
  weight: string
  owner: string
  phone: string
  lastVisit: string
  status: "saludable" | "tratamiento" | "cita_pendiente"
  nextVaccine: string
  microchip: string
  ownerId: number
  photo?: string
}

export interface MedicalRecord {
  id: number
  petId: number
  visits: Visit[]
  allergies: string[]
  vaccinations: Vaccination[]
  currentMedications: Medication[]
}

export interface Visit {
  id: number
  date: string
  diagnosis: string
  treatment: string
  attachments: string[]
  vetId: number
  vetName: string
  weight: number
  temperature: number
  notes: string
}

export interface Vaccination {
  id: number
  name: string
  date: string
  nextDose: string
  batchNumber: string
  vetId: number
}

export interface Medication {
  id: number
  name: string
  dosage: string
  frequency: string
  startDate: string
  endDate: string
  instructions: string
}