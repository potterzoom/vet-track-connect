import { createContext, useContext, useState, ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

interface LoadingContextType {
  isLoading: boolean
  setLoading: (loading: boolean) => void
  loadingMessage?: string
  setLoadingMessage: (message?: string) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState<string>()

  const setLoading = (loading: boolean) => {
    setIsLoading(loading)
    if (!loading) {
      setLoadingMessage(undefined)
    }
  }

  return (
    <LoadingContext.Provider value={{ 
      isLoading, 
      setLoading, 
      loadingMessage, 
      setLoadingMessage 
    }}>
      {isLoading && <GlobalSpinner message={loadingMessage} />}
      {children}
    </LoadingContext.Provider>
  )
}

function GlobalSpinner({ message }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 shadow-xl flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">
          {message || 'Cargando...'}
        </p>
      </div>
    </div>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}