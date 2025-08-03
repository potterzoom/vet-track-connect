import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Pet } from '../modules/pets/types/Pet'
import { PetRepository } from '../modules/pets/services/PetRepository'

interface PetState {
  pets: Pet[]
  currentPet: Pet | null
  loading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
  }
}

interface PetActions {
  setPets: (pets: Pet[]) => void
  addPet: (pet: Pet) => void
  updatePet: (id: number, data: Partial<Pet>) => void
  deletePet: (id: number) => void
  setCurrentPet: (pet: Pet | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  fetchPets: (params?: { page?: number; limit?: number; status?: string; species?: string; search?: string }) => Promise<void>
  fetchPetById: (id: number) => Promise<void>
  createPet: (petData: Omit<Pet, 'id'>) => Promise<void>
  updatePetById: (id: number, data: Partial<Pet>) => Promise<void>
  deletePetById: (id: number) => Promise<void>
}

type PetStore = PetState & PetActions

const petRepository = new PetRepository()

export const usePetStore = create<PetStore>()(
  devtools(
    (set, get) => ({
      // State
      pets: [],
      currentPet: null,
      loading: false,
      error: null,
      pagination: {
        page: 1,
        limit: 10,
        total: 0
      },

      // Actions
      setPets: (pets) => set({ pets }),
      
      addPet: (pet) => set((state) => ({ 
        pets: [...state.pets, pet] 
      })),
      
      updatePet: (id, data) => set((state) => ({
        pets: state.pets.map(pet => 
          pet.id === id ? { ...pet, ...data } : pet
        )
      })),
      
      deletePet: (id) => set((state) => ({
        pets: state.pets.filter(pet => pet.id !== id)
      })),
      
      setCurrentPet: (pet) => set({ currentPet: pet }),
      
      setLoading: (loading) => set({ loading }),
      
      setError: (error) => set({ error }),

      fetchPets: async (params) => {
        try {
          set({ loading: true, error: null })
          const result = await petRepository.findAll(params)
          set({ 
            pets: result.pets,
            pagination: {
              page: result.page,
              limit: result.limit,
              total: result.total
            }
          })
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Error fetching pets' })
        } finally {
          set({ loading: false })
        }
      },

      fetchPetById: async (id) => {
        try {
          set({ loading: true, error: null })
          const pet = await petRepository.findById(id)
          set({ currentPet: pet })
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Error fetching pet' })
        } finally {
          set({ loading: false })
        }
      },

      createPet: async (petData) => {
        try {
          set({ loading: true, error: null })
          const newPet = await petRepository.create(petData)
          set((state) => ({ 
            pets: [...state.pets, newPet],
            pagination: {
              ...state.pagination,
              total: state.pagination.total + 1
            }
          }))
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Error creating pet' })
          throw error
        } finally {
          set({ loading: false })
        }
      },

      updatePetById: async (id, data) => {
        try {
          set({ loading: true, error: null })
          const updatedPet = await petRepository.update(id, data)
          set((state) => ({
            pets: state.pets.map(pet => 
              pet.id === id ? updatedPet : pet
            ),
            currentPet: state.currentPet?.id === id ? updatedPet : state.currentPet
          }))
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Error updating pet' })
          throw error
        } finally {
          set({ loading: false })
        }
      },

      deletePetById: async (id) => {
        try {
          set({ loading: true, error: null })
          await petRepository.delete(id)
          set((state) => ({
            pets: state.pets.filter(pet => pet.id !== id),
            currentPet: state.currentPet?.id === id ? null : state.currentPet,
            pagination: {
              ...state.pagination,
              total: state.pagination.total - 1
            }
          }))
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Error deleting pet' })
          throw error
        } finally {
          set({ loading: false })
        }
      }
    }),
    {
      name: 'pet-store'
    }
  )
)