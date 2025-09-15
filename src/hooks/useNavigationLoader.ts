"use client"

import { useRouter } from 'next/navigation'
import { useGlobalLoading } from '@/components/GlobalLoadingProvider'
import { useCallback } from 'react'

export function useNavigationLoader() {
  const router = useRouter()
  const { setLoading } = useGlobalLoading()

  const pushWithLoader = useCallback((href: string) => {
    setLoading(true)
    router.push(href)
  }, [router, setLoading])

  const replaceWithLoader = useCallback((href: string) => {
    setLoading(true)
    router.replace(href)
  }, [router, setLoading])

  const backWithLoader = useCallback(() => {
    setLoading(true)
    router.back()
  }, [router, setLoading])

  const forwardWithLoader = useCallback(() => {
    setLoading(true)
    router.forward()
  }, [router, setLoading])

  return {
    pushWithLoader,
    replaceWithLoader,
    backWithLoader,
    forwardWithLoader,
    // Also expose the original router methods
    push: router.push,
    replace: router.replace,
    back: router.back,
    forward: router.forward,
    refresh: router.refresh,
  }
}
