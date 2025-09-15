import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
  children?: React.ReactNode
}

export function Skeleton({ className, children, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted/50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Pre-built skeleton components
export function SkeletonText({ 
  lines = 1, 
  className = "h-4 w-full" 
}: { 
  lines?: number
  className?: string 
}) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          className={cn(
            i === lines - 1 ? "w-3/4" : "w-full",
            className
          )} 
        />
      ))}
    </div>
  )
}

export function SkeletonAvatar({ 
  size = "md",
  className 
}: { 
  size?: "sm" | "md" | "lg"
  className?: string 
}) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10", 
    lg: "h-12 w-12"
  }
  
  return (
    <Skeleton 
      className={cn(
        "rounded-full",
        sizeClasses[size],
        className
      )} 
    />
  )
}

export function SkeletonButton({ 
  size = "md",
  className 
}: { 
  size?: "sm" | "md" | "lg"
  className?: string 
}) {
  const sizeClasses = {
    sm: "h-8 w-16",
    md: "h-10 w-20",
    lg: "h-12 w-24"
  }
  
  return (
    <Skeleton 
      className={cn(
        "rounded-md",
        sizeClasses[size],
        className
      )} 
    />
  )
}

export function SkeletonCard({ 
  className,
  children 
}: { 
  className?: string
  children?: React.ReactNode 
}) {
  return (
    <div className={cn(
      "rounded-lg border bg-card p-6",
      className
    )}>
      {children}
    </div>
  )
}
