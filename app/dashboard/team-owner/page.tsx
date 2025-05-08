"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { players, teams } from "@/lib/data"
import { BarChart, XAxis, YAxis, CartesianGrid, Legend, Bar, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Download, Plus, Users } from "lucide-react"
import Link from "next/link"

// Assume the logged-in team owner owns the Red Dragons
const teamId = "102"
const team = teams.find((t) => t.id === teamId)
const teamPlayers = players.filter((p) => p.team === "Red Dragons")

export default function TeamOwnerDashboard() {
  // Sample performance data for visualization
  const performanceData = [
    { month: "Jan", wins: 3, losses: 1, draws: 1 },
    { month: "Feb", wins: 2, losses: 2, draws: 0 },
    { month: "Mar", wins: 4, losses: 0, draws: 0 },
    { month: "Apr", wins: 1, losses: 2, draws: 1 },
    { month: "May", wins: 3, losses: 1, draws: 0 },
    { month: "Jun", wins: 2, losses: 0, draws: 2 },
  ]

  return (
    <div className="container py-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Owner Dashboard</h1>
          <p className="text-muted-foreground">Manage your team and view performance metrics</p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Player
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Players</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamPlayers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {team
                ? Math.round((team.stats.wins / (team.stats.wins + team.stats.losses + team.stats.draws)) * 100)
                : 0}
              %
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">League Position</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{team?.stats.leaguePosition || "N/A"}</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="roster">
          <TabsList>
            <TabsTrigger value="roster">Team Roster</TabsTrigger>
            <TabsTrigger value="performance">Team Performance</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          <TabsContent value="roster" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Roster</CardTitle>
                <CardDescription>Manage your team's players</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Player</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Jersey #</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamPlayers.map((player) => (
                      <TableRow key={player.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={`/placeholder.svg?height=32&width=32&text=${player.name.charAt(0)}`}
                                alt={player.name}
                              />
                              <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{player.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{player.position}</TableCell>
                        <TableCell>{player.age}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              player.status === "Active"
                                ? "bg-green-500/20 text-green-700 dark:text-green-400"
                                : player.status === "Injured"
                                  ? "bg-red-500/20 text-red-700 dark:text-red-400"
                                  : "bg-amber-500/20 text-amber-700 dark:text-amber-400"
                            }
                          >
                            {player.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{player.jerseyNumber}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/players/${player.id}`}>View</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="performance" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
                <CardDescription>Monthly performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ChartContainer
                    config={{
                      wins: {
                        label: "Wins",
                        color: "hsl(var(--chart-1))",
                      },
                      losses: {
                        label: "Losses",
                        color: "hsl(var(--chart-2))",
                      },
                      draws: {
                        label: "Draws",
                        color: "hsl(var(--chart-3))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="wins" fill="var(--color-wins)" name="Wins" />
                        <Bar dataKey="losses" fill="var(--color-losses)" name="Losses" />
                        <Bar dataKey="draws" fill="var(--color-draws)" name="Draws" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="achievements" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Achievements</CardTitle>
                <CardDescription>Trophies and awards won by your team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {team?.achievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-start gap-4 rounded-lg border p-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
