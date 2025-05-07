"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

// Sample player data
const playerData = {
  "James Wilson": {
    stats: [
      { name: "Points", value: 18.5 },
      { name: "Rebounds", value: 4.2 },
      { name: "Assists", value: 7.8 },
      { name: "Steals", value: 1.6 },
      { name: "Blocks", value: 0.3 },
      { name: "Turnovers", value: 2.4 },
    ],
    skills: [
      { subject: "Shooting", A: 75, fullMark: 100 },
      { subject: "Passing", A: 90, fullMark: 100 },
      { subject: "Defense", A: 65, fullMark: 100 },
      { subject: "Athleticism", A: 70, fullMark: 100 },
      { subject: "Basketball IQ", A: 85, fullMark: 100 },
      { subject: "Potential", A: 80, fullMark: 100 },
    ],
  },
  "Marcus Johnson": {
    stats: [
      { name: "Points", value: 16.2 },
      { name: "Rebounds", value: 7.5 },
      { name: "Assists", value: 2.3 },
      { name: "Steals", value: 1.2 },
      { name: "Blocks", value: 0.8 },
      { name: "Turnovers", value: 1.7 },
    ],
    skills: [
      { subject: "Shooting", A: 65, fullMark: 100 },
      { subject: "Passing", A: 60, fullMark: 100 },
      { subject: "Defense", A: 80, fullMark: 100 },
      { subject: "Athleticism", A: 85, fullMark: 100 },
      { subject: "Basketball IQ", A: 70, fullMark: 100 },
      { subject: "Potential", A: 85, fullMark: 100 },
    ],
  },
  "Tyrone Williams": {
    stats: [
      { name: "Points", value: 14.8 },
      { name: "Rebounds", value: 10.2 },
      { name: "Assists", value: 1.5 },
      { name: "Steals", value: 0.6 },
      { name: "Blocks", value: 2.3 },
      { name: "Turnovers", value: 1.8 },
    ],
    skills: [
      { subject: "Shooting", A: 55, fullMark: 100 },
      { subject: "Passing", A: 45, fullMark: 100 },
      { subject: "Defense", A: 85, fullMark: 100 },
      { subject: "Athleticism", A: 75, fullMark: 100 },
      { subject: "Basketball IQ", A: 65, fullMark: 100 },
      { subject: "Potential", A: 80, fullMark: 100 },
    ],
  },
}

export function PlayerAnalysis() {
  const [selectedPlayer, setSelectedPlayer] = useState("James Wilson")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Player Analysis</CardTitle>
        <CardDescription>Detailed statistical breakdown of prospects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select value={selectedPlayer} onValueChange={setSelectedPlayer}>
            <SelectTrigger>
              <SelectValue placeholder="Select a player" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(playerData).map((player) => (
                <SelectItem key={player} value={player}>
                  {player}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="stats">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="skills">Skill Radar</TabsTrigger>
          </TabsList>
          <TabsContent value="stats" className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={playerData[selectedPlayer as keyof typeof playerData].stats}
                margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="skills" className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius={90} data={playerData[selectedPlayer as keyof typeof playerData].skills}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name={selectedPlayer} dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
