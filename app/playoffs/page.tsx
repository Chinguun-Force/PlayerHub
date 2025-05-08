"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { playoffMatches } from "@/lib/data"
import { Calendar, Clock, Video } from "lucide-react"
import Link from "next/link"

export default function PlayoffsPage() {
  // Group matches by stage
  const matchesByStage = playoffMatches.reduce(
    (acc, match) => {
      if (!acc[match.stage]) {
        acc[match.stage] = []
      }
      acc[match.stage].push(match)
      return acc
    },
    {} as Record<string, typeof playoffMatches>,
  )

  const stages = Object.keys(matchesByStage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-red-500/20 text-red-700 dark:text-red-400"
      case "Completed":
        return "bg-green-500/20 text-green-700 dark:text-green-400"
      case "Scheduled":
        return "bg-blue-500/20 text-blue-700 dark:text-blue-400"
      case "Postponed":
        return "bg-amber-500/20 text-amber-700 dark:text-amber-400"
      default:
        return "bg-gray-500/20 text-gray-700 dark:text-gray-400"
    }
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Playoffs</h1>
        <p className="text-muted-foreground">Follow the playoff matches and results</p>
      </div>

      <Tabs defaultValue={stages[0]}>
        <TabsList className="mb-6">
          {stages.map((stage) => (
            <TabsTrigger key={stage} value={stage}>
              {stage}
            </TabsTrigger>
          ))}
        </TabsList>
        {stages.map((stage) => (
          <TabsContent key={stage} value={stage}>
            <div className="grid gap-6">
              {matchesByStage[stage].map((match) => (
                <Card key={match.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        {match.homeTeam} vs {match.awayTeam}
                      </CardTitle>
                      <Badge className={getStatusColor(match.status)} variant="outline">
                        {match.status}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {match.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-1 flex-col items-center">
                        <div className="text-2xl font-bold">{match.homeTeam}</div>
                        {match.status !== "Scheduled" && (
                          <div className="text-3xl font-bold mt-2">{match.homeScore}</div>
                        )}
                      </div>
                      <div className="px-4 text-center">
                        <div className="text-sm font-medium uppercase text-muted-foreground">VS</div>
                        {match.status === "Scheduled" && (
                          <div className="mt-2 flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Upcoming</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col items-center">
                        <div className="text-2xl font-bold">{match.awayTeam}</div>
                        {match.status !== "Scheduled" && (
                          <div className="text-3xl font-bold mt-2">{match.awayScore}</div>
                        )}
                      </div>
                    </div>
                    {match.highlights && (
                      <div className="mt-4 flex justify-center">
                        <Button variant="outline" asChild>
                          <Link href={match.highlights} target="_blank" rel="noopener noreferrer">
                            <Video className="mr-2 h-4 w-4" />
                            Watch Highlights
                          </Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
