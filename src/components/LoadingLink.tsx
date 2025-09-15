"use client"

import Link from 'next/link'
import { useGlobalLoading } from './GlobalLoadingProvider'
import { ReactNode, MouseEvent } from 'react'

interface LoadingLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
  [key: string]: unknown
}

export function LoadingLink({ href, children, onClick, ...props }: LoadingLinkProps) {
  const { setLoading } = useGlobalLoading()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Call the original onClick if provided
    if (onClick) {
      onClick(e)
    }
    
    // Only trigger loading if the click wasn't prevented
    if (!e.defaultPrevented) {
      setLoading(true)
    }
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}
