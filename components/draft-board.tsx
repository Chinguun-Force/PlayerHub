"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample data - in a real app this would come from an API or database
const initialPlayers = [
  {
    id: 1,
    name: "James Wilson",
    position: "PG",
    college: "Duke",
    height: "6'2\"",
    weight: "185",
    ppg: 18.5,
    rpg: 4.2,
    apg: 7.8,
    fg: 0.46,
    threePt: 0.38,
    strengths: ["Playmaking", "Court vision", "Basketball IQ"],
    weaknesses: ["Defensive consistency", "Size for position"],
  },
  {
    id: 2,
    name: "Marcus Johnson",
    position: "SF",
    college: "Kentucky",
    height: "6'8\"",
    weight: "215",
    ppg: 16.2,
    rpg: 7.5,
    apg: 2.3,
    fg: 0.52,
    threePt: 0.34,
    strengths: ["Athleticism", "Transition offense", "Defensive versatility"],
    weaknesses: ["Outside shooting", "Free throw consistency"],
  },
  {
    id: 3,
    name: "Tyrone Williams",
    position: "C",
    college: "Gonzaga",
    height: "7'0\"",
    weight: "248",
    ppg: 14.8,
    rpg: 10.2,
    apg: 1.5,
    fg: 0.58,
    threePt: 0.29,
    strengths: ["Rim protection", "Rebounding", "Post moves"],
    weaknesses: ["Perimeter defense", "Free throw shooting"],
  },
  {
    id: 4,
    name: "DeAndre Smith",
    position: "SG",
    college: "UCLA",
    height: "6'5\"",
    weight: "200",
    ppg: 17.3,
    rpg: 5.1,
    apg: 3.2,
    fg: 0.45,
    threePt: 0.41,
    strengths: ["Shooting", "Scoring versatility", "Ball handling"],
    weaknesses: ["Defensive intensity", "Strength"],
  },
  {
    id: 5,
    name: "Jamal Thompson",
    position: "PF",
    college: "Michigan",
    height: "6'9\"",
    weight: "235",
    ppg: 15.7,
    rpg: 8.9,
    apg: 2.1,
    fg: 0.54,
    threePt: 0.33,
    strengths: ["Versatility", "Defensive switching", "Inside-out scoring"],
    weaknesses: ["Consistency", "Advanced playmaking"],
  },
]

export function DraftBoard() {
  const [players, setPlayers] = useState(initialPlayers)
  const [sortField, setSortField] = useState("id")
  const [sortDirection, setSortDirection] = useState("asc")
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null)

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }

    setPlayers(
      [...players].sort((a, b) => {
        if (sortDirection === "asc") {
          return a[field as keyof typeof a] > b[field as keyof typeof b] ? 1 : -1
        } else {
          return a[field as keyof typeof a] < b[field as keyof typeof b] ? 1 : -1
        }
      }),
    )
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Draft Board</CardTitle>
        <CardDescription>Evaluate and rank prospects for the upcoming NBA draft</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Rank</TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" onClick={() => handleSort("name")}>
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" onClick={() => handleSort("position")}>
                    Pos
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>College</TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" onClick={() => handleSort("ppg")}>
                    PPG
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" onClick={() => handleSort("rpg")}>
                    RPG
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" onClick={() => handleSort("apg")}>
                    APG
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player, index) => (
                <TableRow
                  key={player.id}
                  className={selectedPlayer === player.id ? "bg-muted/50" : ""}
                  onClick={() => setSelectedPlayer(player.id)}
                >
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{player.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{player.position}</Badge>
                  </TableCell>
                  <TableCell>{player.college}</TableCell>
                  <TableCell>{player.ppg}</TableCell>
                  <TableCell>{player.rpg}</TableCell>
                  <TableCell>{player.apg}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          if (index > 0) {
                            const newPlayers = [...players]
                            const temp = newPlayers[index]
                            newPlayers[index] = newPlayers[index - 1]
                            newPlayers[index - 1] = temp
                            setPlayers(newPlayers)
                          }
                        }}
                        disabled={index === 0}
                      >
                        <ChevronUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          if (index < players.length - 1) {
                            const newPlayers = [...players]
                            const temp = newPlayers[index]
                            newPlayers[index] = newPlayers[index + 1]
                            newPlayers[index + 1] = temp
                            setPlayers(newPlayers)
                          }
                        }}
                        disabled={index === players.length - 1}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {selectedPlayer && (
          <div className="mt-6 p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">
              {players.find((p) => p.id === selectedPlayer)?.name} - Detailed Profile
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p>
                  <span className="font-medium">Height:</span> {players.find((p) => p.id === selectedPlayer)?.height}
                </p>
                <p>
                  <span className="font-medium">Weight:</span> {players.find((p) => p.id === selectedPlayer)?.weight}{" "}
                  lbs
                </p>
                <p>
                  <span className="font-medium">FG%:</span>{" "}
                  {(players.find((p) => p.id === selectedPlayer)?.fg || 0) * 100}%
                </p>
                <p>
                  <span className="font-medium">3PT%:</span>{" "}
                  {(players.find((p) => p.id === selectedPlayer)?.threePt || 0) * 100}%
                </p>
              </div>
              <div>
                <p className="font-medium">Strengths:</p>
                <ul className="list-disc pl-5">
                  {players
                    .find((p) => p.id === selectedPlayer)
                    ?.strengths.map((strength, i) => (
                      <li key={i}>{strength}</li>
                    ))}
                </ul>
                <p className="font-medium mt-2">Weaknesses:</p>
                <ul className="list-disc pl-5">
                  {players
                    .find((p) => p.id === selectedPlayer)
                    ?.weaknesses.map((weakness, i) => (
                      <li key={i}>{weakness}</li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
