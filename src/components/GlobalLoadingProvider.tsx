"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { SportsLoader } from './SportLoader'

interface GlobalLoadingContextType {
  isLoading: boolean
  setLoading: (loading: boolean) => void
}

const GlobalLoadingContext = createContext<GlobalLoadingContextType | undefined>(undefined)

export function useGlobalLoading() {
  const context = useContext(GlobalLoadingContext)
  if (context === undefined) {
    throw new Error('useGlobalLoading must be used within a GlobalLoadingProvider')
  }
  return context
}

interface GlobalLoadingProviderProps {
  children: React.ReactNode
}

export function GlobalLoadingProvider({ children }: GlobalLoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Reset loading state when route changes
  useEffect(() => {
    setIsLoading(false)
  }, [pathname, searchParams])

  // Set loading state when navigation starts
  useEffect(() => {
    const handleStart = () => setIsLoading(true)

    // Listen for navigation events
    window.addEventListener('beforeunload', handleStart)
    
    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleStart)
    }
  }, [])

  const setLoading = (loading: boolean) => {
    setIsLoading(loading)
  }

  return (
    <GlobalLoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="min-h-screen w-full flex items-center justify-center ">
            <SportsLoader size="lg" text="Loading..." />
          </div>
        </div>
      )}
    </GlobalLoadingContext.Provider>
  )
}
