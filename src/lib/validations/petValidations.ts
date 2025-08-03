import { z } from 'zod'

export const PetSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede superar los 50 caracteres'),
  
  species: z.enum(['perro', 'gato', 'otro'], {
    errorMap: () => ({ message: 'Selecciona una especie válida' })
  }),
  
  breed: z.string()
    .min(2, 'La raza debe tener al menos 2 caracteres')
    .max(100, 'La raza no puede superar los 100 caracteres'),
  
  age: z.string()
    .min(1, 'La edad es obligatoria'),
  
  weight: z.string()
    .regex(/^\d+(\.\d+)?\s*(kg|g)$/, 'Formato de peso inválido (ej: 25.5 kg)'),
  
  ownerId: z.number()
    .positive('ID del dueño debe ser positivo'),
  
  microchip: z.string()
    .regex(/^[A-Z0-9]{15}$/, 'El microchip debe tener 15 caracteres alfanuméricos'),
  
  phone: z.string()
    .regex(/^\+\d{1,3}\s\d{3}-\d{3}-\d{4}$/, 'Formato de teléfono inválido (+57 300-123-4567)'),
  
  status: z.enum(['saludable', 'tratamiento', 'cita_pendiente'], {
    errorMap: () => ({ message: 'Estado inválido' })
  })
})

export const AppointmentSchema = z.object({
  date: z.date()
    .min(new Date(), 'La fecha debe ser futura'),
  
  petId: z.number()
    .positive('ID de mascota inválido'),
  
  vetId: z.number()
    .positive('ID de veterinario inválido'),
  
  type: z.enum(['consulta', 'vacunacion', 'cirugia', 'revision', 'emergencia']),
  
  duration: z.number()
    .min(15, 'La duración mínima es 15 minutos')
    .max(480, 'La duración máxima es 8 horas'),
  
  notes: z.string()
    .max(500, 'Las notas no pueden superar los 500 caracteres')
    .optional()
})

export const MedicalRecordSchema = z.object({
  petId: z.number().positive(),
  
  diagnosis: z.string()
    .min(5, 'El diagnóstico debe tener al menos 5 caracteres')
    .max(1000, 'El diagnóstico no puede superar los 1000 caracteres'),
  
  treatment: z.string()
    .min(5, 'El tratamiento debe tener al menos 5 caracteres')
    .max(1000, 'El tratamiento no puede superar los 1000 caracteres'),
  
  weight: z.number()
    .positive('El peso debe ser positivo')
    .max(200, 'Peso máximo: 200kg'),
  
  temperature: z.number()
    .min(35, 'Temperatura mínima: 35°C')
    .max(45, 'Temperatura máxima: 45°C'),
  
  allergies: z.array(z.string())
    .max(20, 'Máximo 20 alergias'),
  
  medications: z.array(z.object({
    name: z.string().min(2, 'Nombre del medicamento obligatorio'),
    dosage: z.string().min(1, 'Dosis obligatoria'),
    frequency: z.string().min(1, 'Frecuencia obligatoria'),
    startDate: z.string().datetime(),
    endDate: z.string().datetime().optional()
  })).max(10, 'Máximo 10 medicamentos activos')
})

export const VaccinationSchema = z.object({
  petId: z.number().positive(),
  
  name: z.string()
    .min(2, 'Nombre de la vacuna obligatorio'),
  
  date: z.date()
    .max(new Date(), 'La fecha no puede ser futura'),
  
  nextDose: z.date()
    .min(new Date(), 'La próxima dosis debe ser futura'),
  
  batchNumber: z.string()
    .min(3, 'Número de lote obligatorio'),
  
  vetId: z.number().positive()
})

// Validation helpers
export function validatePet(data: unknown) {
  return PetSchema.safeParse(data)
}

export function validateAppointment(data: unknown) {
  return AppointmentSchema.safeParse(data)
}

export function validateMedicalRecord(data: unknown) {
  return MedicalRecordSchema.safeParse(data)
}

export function validateVaccination(data: unknown) {
  return VaccinationSchema.safeParse(data)
}