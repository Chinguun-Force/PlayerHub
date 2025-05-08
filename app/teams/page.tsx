"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { teams } from "@/lib/data"
import { Search, Trophy } from "lucide-react"
import Image from "next/image"

export default function TeamsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTeams = teams.filter((team) => team.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="container py-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teams</h1>
          <p className="text-muted-foreground">Browse all teams in the league</p>
        </div>
      </div>

      <div className="mb-6 flex w-full max-w-sm items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search teams..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTeams.map((team) => (
          <Link key={team.id} href={`/teams/${team.id}`}>
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <div className="aspect-video w-full bg-muted/40 p-6 flex items-center justify-center">
                <Image
                  src={team.logo || "/placeholder.svg"}
                  alt={team.name}
                  width={100}
                  height={100}
                  className="h-20 w-20 object-contain"
                />
              </div>
              <CardHeader>
                <CardTitle>{team.name}</CardTitle>
                <CardDescription>Founded: {team.founded}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Coach:</span>
                    <p>{team.coach}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Home:</span>
                    <p>{team.homeVenue}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-primary" />
                  <span className="text-sm">{team.achievements.length} achievements</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
        {filteredTeams.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <Trophy className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium">No teams found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
