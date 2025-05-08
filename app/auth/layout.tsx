import type React from "react"
import Link from "next/link"
import { UserCircle2 } from "lucide-react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Link href="/" className="flex items-center space-x-2">
              <UserCircle2 className="h-8 w-8" />
              <span className="font-bold text-xl">Player Management</span>
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
