"use client"

import { useState, useEffect, useRef, useCallback } from 'react'

interface UseLoadingStateOptions {
  initialLoading?: boolean
  delay?: number // Delay before showing loading state (prevents flash)
  minLoadingTime?: number // Minimum time to show loading state
}

export function useLoadingState(
  isLoading: boolean,
  options: UseLoadingStateOptions = {}
) {
  const { 
    initialLoading = false, 
    delay = 0, 
    minLoadingTime = 0 
  } = options

  const [showLoading, setShowLoading] = useState(initialLoading)
  const loadingStartTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (isLoading) {
      // Start loading timer
      loadingStartTimeRef.current = Date.now()
      
      // Show loading after delay
      if (delay > 0) {
        const timer = setTimeout(() => {
          setShowLoading(true)
        }, delay)
        return () => clearTimeout(timer)
      } else {
        setShowLoading(true)
      }
    } else {
      // Ensure minimum loading time
      if (loadingStartTimeRef.current && minLoadingTime > 0) {
        const elapsed = Date.now() - loadingStartTimeRef.current
        const remaining = minLoadingTime - elapsed
        
        if (remaining > 0) {
          const timer = setTimeout(() => {
            setShowLoading(false)
            loadingStartTimeRef.current = null
          }, remaining)
          return () => clearTimeout(timer)
        }
      }
      
      setShowLoading(false)
      loadingStartTimeRef.current = null
    }
  }, [isLoading, delay, minLoadingTime])

  return showLoading
}

// Hook for async operations with loading state
export function useAsyncLoading<T>(
  asyncFn: () => Promise<T>,
  deps: unknown[] = []
) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const execute = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const result = await asyncFn()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
    } finally {
      setIsLoading(false)
    }
  }, [asyncFn])

  useEffect(() => {
    execute()
  }, [execute, deps])

  return { data, isLoading, error, refetch: execute }
}
