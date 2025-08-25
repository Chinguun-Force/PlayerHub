"use client"

import { cn } from "@/lib/utils"

interface SportsLoaderProps {
  className?: string
  size?: "sm" | "md" | "lg"
  text?: string
}

export function SportsLoader({ className, size = "md", text = "Loading..." }: SportsLoaderProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <span className={cn("loader", `loader-${size}`)} />

      {/* Loading Text */}
      {text && (
        <div className="text-center">
          <p className="text-sm font-medium text-muted-foreground animate-pulse">{text}</p>
        </div>
      )}
    </div>
  )
}
