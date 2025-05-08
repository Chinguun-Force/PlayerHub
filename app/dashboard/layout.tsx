import type React from "react"
import { MainNav } from "@/components/main-nav"
import { ModeToggle } from "@/components/theme-provider"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <div className="flex items-center gap-4">
            <ModeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}
