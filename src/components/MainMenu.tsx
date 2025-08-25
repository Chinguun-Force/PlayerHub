"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Award, Home, Menu, Trophy, Users } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Menus() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    {
      href: "/",
      label: "Нүүр хуудас",
      active: pathname === "/",
      icon: <Home className="h-4 w-4 mr-2" />,
    },
    {
      href: "/players",
      label: "Тамирчид",
      active: pathname === "/players" || pathname?.startsWith("/players/"),
      icon: <Users className="h-4 w-4 mr-2" />,
    },
    {
      href: "/teams",
      label: "Баг",
      active: pathname === "/teams" || pathname?.startsWith("/teams/"),
      icon: <Trophy className="h-4 w-4 mr-2" />,
    },
    {
      href: "/playoffs",
      label: "Плэй-офф",
      active: pathname === "/playoffs",
      icon: <Award className="h-4 w-4 mr-2" />,
    },
  ]

  return (
    <div className="flex items-center">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon" className="mr-2">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <nav className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 font-semibold" onClick={() => setIsOpen(false)}>
              <Trophy className="h-6 w-6" />
              <span className="font-bold">PlayerHub</span>
            </Link>
            <div className="grid gap-2 pt-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md",
                    route.active ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {route.icon}
                  {route.label}
                </Link>
              ))}
            </div>
          </nav>
        </SheetContent>
      </Sheet>
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <Trophy className="h-6 w-6" />
        <span className="font-bold hidden md:inline-block">PlayerHub</span>
      </Link>
      <nav className="mx-6 hidden items-center space-x-4 lg:space-x-6 lg:flex">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              route.active ? "text-primary" : "text-muted-foreground",
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
