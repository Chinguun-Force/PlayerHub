"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, RefreshCw } from "lucide-react"

// Sample draft order and team data
const draftOrder = [
  { pick: 1, team: "Detroit Pistons" },
  { pick: 2, team: "Houston Rockets" },
  { pick: 3, team: "Orlando Magic" },
  { pick: 4, team: "Oklahoma City Thunder" },
  { pick: 5, team: "Cleveland Cavaliers" },
  { pick: 6, team: "Golden State Warriors" },
  { pick: 7, team: "Minnesota Timberwolves" },
  { pick: 8, team: "Toronto Raptors" },
  { pick: 9, team: "Sacramento Kings" },
  { pick: 10, team: "New Orleans Pelicans" },
  { pick: 11, team: "Charlotte Hornets" },
  { pick: 12, team: "San Antonio Spurs" },
  { pick: 13, team: "Indiana Pacers" },
  { pick: 14, team: "Your Team" },
]

// Sample players for mock draft
const draftPlayers = [
  { name: "James Wilson", position: "PG", college: "Duke" },
  { name: "Marcus Johnson", position: "SF", college: "Kentucky" },
  { name: "Tyrone Williams", position: "C", college: "Gonzaga" },
  { name: "DeAndre Smith", position: "SG", college: "UCLA" },
  { name: "Jamal Thompson", position: "PF", college: "Michigan" },
  { name: "Anthony Davis", position: "PF", college: "North Carolina" },
  { name: "Kevin Mitchell", position: "SG", college: "Arizona" },
  { name: "Chris Johnson", position: "C", college: "Texas" },
  { name: "Michael Brown", position: "PG", college: "Kansas" },
  { name: "David Lee", position: "SF", college: "Villanova" },
  { name: "Robert Harris", position: "PF", college: "Baylor" },
  { name: "Thomas Martin", position: "C", college: "USC" },
  { name: "Jason Rodriguez", position: "SG", college: "Florida" },
  { name: "Eric Thompson", position: "PG", college: "Ohio State" },
]

export function DraftSimulation() {
  const [mockDraft, setMockDraft] = useState<
    Array<{ pick: number; team: string; player: (typeof draftPlayers)[0] | null }>
  >([])
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationComplete, setSimulationComplete] = useState(false)

  const runSimulation = () => {
    setIsSimulating(true)
    setSimulationComplete(false)
    setMockDraft([])

    // Shuffle players to create randomness in the mock draft
    const shuffledPlayers = [...draftPlayers].sort(() => 0.5 - Math.random()).slice(0, draftOrder.length)

    // Create initial empty draft
    const initialDraft = draftOrder.map((pick) => ({
      ...pick,
      player: null,
    }))

    setMockDraft(initialDraft)

    // Simulate picks one by one with delay
    draftOrder.forEach((pick, index) => {
      setTimeout(
        () => {
          setMockDraft((prev) => {
            const updated = [...prev]
            updated[index] = {
              ...updated[index],
              player: shuffledPlayers[index],
            }
            return updated
          })

          // Check if simulation is complete
          if (index === draftOrder.length - 1) {
            setIsSimulating(false)
            setSimulationComplete(true)
          }
        },
        (index + 1) * 500,
      ) // Stagger the picks
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Mock Draft Simulation</CardTitle>
            <CardDescription>Simulate the draft to predict available players</CardDescription>
          </div>
          <Button onClick={runSimulation} disabled={isSimulating} className="flex items-center gap-2">
            {simulationComplete ? (
              <>
                <RefreshCw className="h-4 w-4" />
                Run Again
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Run Simulation
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {mockDraft.length > 0 ? (
            mockDraft.map((pick, index) => (
              <div
                key={pick.pick}
                className={`flex items-center p-2 rounded-md ${
                  pick.team === "Your Team"
                    ? "bg-primary/10 border border-primary/20"
                    : index % 2 === 0
                      ? "bg-muted/50"
                      : ""
                }`}
              >
                <div className="w-8 font-bold text-center">{pick.pick}</div>
                <div className="w-1/3 font-medium">{pick.team}</div>
                {pick.player ? (
                  <div className="flex items-center gap-2">
                    <span>{pick.player.name}</span>
                    <Badge variant="outline">{pick.player.position}</Badge>
                    <span className="text-sm text-muted-foreground">{pick.player.college}</span>
                  </div>
                ) : (
                  <div className="h-5 w-48 bg-muted/50 animate-pulse rounded"></div>
                )}
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              Run the simulation to see a mock draft projection
            </div>
          )}
        </div>

        {simulationComplete && (
          <div className="mt-6 p-4 bg-muted/20 rounded-lg border">
            <h3 className="font-semibold mb-2">Draft Analysis</h3>
            <p className="text-sm">
              Based on this simulation, you should consider targeting players that might fall to your position or
              potentially trading up if a high-value prospect is available.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
