"use client"

import { ReactNode } from 'react'
import { useLoadingState } from '@/hooks/useLoadingState'

interface WithSkeletonProps {
  isLoading: boolean
  skeleton: ReactNode
  children: ReactNode
  delay?: number
  minLoadingTime?: number
}

export function WithSkeleton({ 
  isLoading, 
  skeleton, 
  children, 
  delay = 100,
  minLoadingTime = 500 
}: WithSkeletonProps) {
  const showSkeleton = useLoadingState(isLoading, { delay, minLoadingTime })
  
  return showSkeleton ? <>{skeleton}</> : <>{children}</>
}

// Higher-order component for easy integration
export function withSkeleton<T extends object>(
  Component: React.ComponentType<T>,
  SkeletonComponent: React.ComponentType,
  options: { delay?: number; minLoadingTime?: number } = {}
) {
  return function SkeletonWrapper(props: T & { isLoading: boolean }) {
    const { isLoading, ...restProps } = props
    
    return (
      <WithSkeleton
        isLoading={isLoading}
        skeleton={<SkeletonComponent />}
        delay={options.delay}
        minLoadingTime={options.minLoadingTime}
      >
        <Component {...(restProps as T)} />
      </WithSkeleton>
    )
  }
}
