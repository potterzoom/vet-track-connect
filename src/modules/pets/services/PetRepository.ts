import { Pet, MedicalRecord } from "../types/Pet"

export class PetRepository {
  private baseUrl = "/api/pets"

  async create(petData: Omit<Pet, "id">): Promise<Pet> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(petData),
    })
    
    if (!response.ok) {
      throw new Error("Error creating pet")
    }
    
    return response.json()
  }

  async findById(id: number): Promise<Pet | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`)
      
      if (!response.ok) {
        if (response.status === 404) return null
        throw new Error("Error fetching pet")
      }
      
      return response.json()
    } catch (error) {
      console.error("Error fetching pet:", error)
      return null
    }
  }

  async findByOwner(ownerId: number): Promise<Pet[]> {
    try {
      const response = await fetch(`${this.baseUrl}?ownerId=${ownerId}`)
      
      if (!response.ok) {
        throw new Error("Error fetching pets by owner")
      }
      
      return response.json()
    } catch (error) {
      console.error("Error fetching pets by owner:", error)
      return []
    }
  }

  async findAll(params?: { 
    page?: number 
    limit?: number 
    status?: string 
    species?: string 
    search?: string 
  }): Promise<{ pets: Pet[], total: number, page: number, limit: number }> {
    try {
      const queryParams = new URLSearchParams()
      
      if (params?.page) queryParams.set('page', params.page.toString())
      if (params?.limit) queryParams.set('limit', params.limit.toString())
      if (params?.status) queryParams.set('status', params.status)
      if (params?.species) queryParams.set('species', params.species)
      if (params?.search) queryParams.set('search', params.search)

      const response = await fetch(`${this.baseUrl}?${queryParams}`)
      
      if (!response.ok) {
        throw new Error("Error fetching pets")
      }
      
      return response.json()
    } catch (error) {
      console.error("Error fetching pets:", error)
      return { pets: [], total: 0, page: 1, limit: 10 }
    }
  }

  async update(id: number, petData: Partial<Pet>): Promise<Pet> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(petData),
    })
    
    if (!response.ok) {
      throw new Error("Error updating pet")
    }
    
    return response.json()
  }

  async delete(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    })
    
    if (!response.ok) {
      throw new Error("Error deleting pet")
    }
  }

  async getMedicalRecord(petId: number): Promise<MedicalRecord | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${petId}/medical-record`)
      
      if (!response.ok) {
        if (response.status === 404) return null
        throw new Error("Error fetching medical record")
      }
      
      return response.json()
    } catch (error) {
      console.error("Error fetching medical record:", error)
      return null
    }
  }

  async uploadPhoto(petId: number, photo: File): Promise<string> {
    const formData = new FormData()
    formData.append('photo', photo)

    const response = await fetch(`${this.baseUrl}/${petId}/photo`, {
      method: "POST",
      body: formData,
    })
    
    if (!response.ok) {
      throw new Error("Error uploading photo")
    }
    
    const result = await response.json()
    return result.photoUrl
  }
}