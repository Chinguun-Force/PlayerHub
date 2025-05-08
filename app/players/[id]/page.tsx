"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { players } from "@/lib/data"
import { ArrowLeft, Edit, Trash } from "lucide-react"

export default function PlayerDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const playerId = params.id as string

  const player = players.find((p) => p.id === playerId)

  if (!player) {
    return (
      <div className="container py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-2xl font-bold">Player Not Found</h1>
          <p>The player you are looking for does not exist.</p>
          <Button onClick={() => router.push("/players")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Players
          </Button>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/20 text-green-700 dark:text-green-400"
      case "Injured":
        return "bg-red-500/20 text-red-700 dark:text-red-400"
      case "Suspended":
        return "bg-amber-500/20 text-amber-700 dark:text-amber-400"
      case "Inactive":
        return "bg-gray-500/20 text-gray-700 dark:text-gray-400"
      default:
        return "bg-gray-500/20 text-gray-700 dark:text-gray-400"
    }
  }

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.push("/players")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{player.name}</h1>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">{player.position}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{player.team}</span>
              <span className="text-muted-foreground">•</span>
              <Badge className={getStatusColor(player.status)} variant="outline">
                {player.status}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive">
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Player Information</CardTitle>
            <CardDescription>Personal and physical details</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Age</dt>
                <dd className="text-lg">{player.age}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Jersey Number</dt>
                <dd className="text-lg">{player.jerseyNumber}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Height</dt>
                <dd className="text-lg">{player.height}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Weight</dt>
                <dd className="text-lg">{player.weight}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Nationality</dt>
                <dd className="text-lg">{player.nationality}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Team</dt>
                <dd className="text-lg">{player.team}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Statistics</CardTitle>
            <CardDescription>Season performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Games Played</dt>
                <dd className="text-lg">{player.stats.gamesPlayed}</dd>
                <Separator className="my-2" />
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Goals Scored</dt>
                <dd className="text-lg">{player.stats.goalsScored}</dd>
                <Separator className="my-2" />
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Assists</dt>
                <dd className="text-lg">{player.stats.assists}</dd>
                <Separator className="my-2" />
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Yellow Cards</dt>
                <dd className="text-lg">{player.stats.yellowCards}</dd>
                <Separator className="my-2" />
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Red Cards</dt>
                <dd className="text-lg">{player.stats.redCards}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
