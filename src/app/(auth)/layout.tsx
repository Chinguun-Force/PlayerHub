import type React from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full flex justify-center items-center mt-20">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          {children}
        </div>
      </div>
    </div>
  )
}
