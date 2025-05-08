import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Player } from "@/lib/data"
import { BarChart, XAxis, YAxis, CartesianGrid, Legend, Bar, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface PlayerStatsProps {
  player: Player
}

export function PlayerStats({ player }: PlayerStatsProps) {
  // Create some sample performance data for visualization
  const performanceData = [
    { month: "Jan", goals: 3, assists: 2, minutesPlayed: 270 },
    { month: "Feb", goals: 2, assists: 3, minutesPlayed: 360 },
    { month: "Mar", goals: 4, assists: 1, minutesPlayed: 270 },
    { month: "Apr", goals: 1, assists: 4, minutesPlayed: 360 },
    { month: "May", goals: 5, assists: 2, minutesPlayed: 450 },
    { month: "Jun", goals: 2, assists: 3, minutesPlayed: 270 },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Season Statistics</CardTitle>
          <CardDescription>Performance metrics for the current season</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <div className="flex flex-col items-center justify-center rounded-lg border p-4">
              <span className="text-sm text-muted-foreground">Games</span>
              <span className="text-2xl font-bold">{player.stats.gamesPlayed}</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border p-4">
              <span className="text-sm text-muted-foreground">Goals</span>
              <span className="text-2xl font-bold">{player.stats.goalsScored}</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border p-4">
              <span className="text-sm text-muted-foreground">Assists</span>
              <span className="text-2xl font-bold">{player.stats.assists}</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border p-4">
              <span className="text-sm text-muted-foreground">Yellow Cards</span>
              <span className="text-2xl font-bold">{player.stats.yellowCards}</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border p-4">
              <span className="text-sm text-muted-foreground">Red Cards</span>
              <span className="text-2xl font-bold">{player.stats.redCards}</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border p-4">
              <span className="text-sm text-muted-foreground">Win Rate</span>
              <span className="text-2xl font-bold">{Math.round(player.stats.winRate * 100)}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
          <CardDescription>Monthly performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer
              config={{
                goals: {
                  label: "Goals",
                  color: "hsl(var(--chart-1))",
                },
                assists: {
                  label: "Assists",
                  color: "hsl(var(--chart-2))",
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
                  <Bar dataKey="goals" fill="var(--color-goals)" name="Goals" />
                  <Bar dataKey="assists" fill="var(--color-assists)" name="Assists" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
