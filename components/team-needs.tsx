"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

// Sample team needs data
const teamNeeds = {
  "Your Team": {
    pointGuard: 85,
    shootingGuard: 40,
    smallForward: 60,
    powerForward: 30,
    center: 75,
    shooting: 65,
    defense: 50,
    playmaking: 80,
    athleticism: 45,
  },
  "League Average": {
    pointGuard: 50,
    shootingGuard: 50,
    smallForward: 50,
    powerForward: 50,
    center: 50,
    shooting: 50,
    defense: 50,
    playmaking: 50,
    athleticism: 50,
  },
}

export function TeamNeeds() {
  const [activeTab, setActiveTab] = useState("positions")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Needs Assessment</CardTitle>
        <CardDescription>Evaluate your team's current roster needs</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="positions" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="positions">Positions</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>
          <TabsContent value="positions" className="space-y-4 mt-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Point Guard</span>
                <span className="text-sm">{teamNeeds["Your Team"].pointGuard}%</span>
              </div>
              <Progress value={teamNeeds["Your Team"].pointGuard} className="h-2" />

              <div className="flex justify-between items-center">
                <span className="font-medium">Shooting Guard</span>
                <span className="text-sm">{teamNeeds["Your Team"].shootingGuard}%</span>
              </div>
              <Progress value={teamNeeds["Your Team"].shootingGuard} className="h-2" />

              <div className="flex justify-between items-center">
                <span className="font-medium">Small Forward</span>
                <span className="text-sm">{teamNeeds["Your Team"].smallForward}%</span>
              </div>
              <Progress value={teamNeeds["Your Team"].smallForward} className="h-2" />

              <div className="flex justify-between items-center">
                <span className="font-medium">Power Forward</span>
                <span className="text-sm">{teamNeeds["Your Team"].powerForward}%</span>
              </div>
              <Progress value={teamNeeds["Your Team"].powerForward} className="h-2" />

              <div className="flex justify-between items-center">
                <span className="font-medium">Center</span>
                <span className="text-sm">{teamNeeds["Your Team"].center}%</span>
              </div>
              <Progress value={teamNeeds["Your Team"].center} className="h-2" />
            </div>

            <div className="text-sm text-muted-foreground mt-4">
              <p>Higher percentages indicate greater need at that position.</p>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-4 mt-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Shooting</span>
                <span className="text-sm">{teamNeeds["Your Team"].shooting}%</span>
              </div>
              <Progress value={teamNeeds["Your Team"].shooting} className="h-2" />

              <div className="flex justify-between items-center">
                <span className="font-medium">Defense</span>
                <span className="text-sm">{teamNeeds["Your Team"].defense}%</span>
              </div>
              <Progress value={teamNeeds["Your Team"].defense} className="h-2" />

              <div className="flex justify-between items-center">
                <span className="font-medium">Playmaking</span>
                <span className="text-sm">{teamNeeds["Your Team"].playmaking}%</span>
              </div>
              <Progress value={teamNeeds["Your Team"].playmaking} className="h-2" />

              <div className="flex justify-between items-center">
                <span className="font-medium">Athleticism</span>
                <span className="text-sm">{teamNeeds["Your Team"].athleticism}%</span>
              </div>
              <Progress value={teamNeeds["Your Team"].athleticism} className="h-2" />
            </div>

            <div className="text-sm text-muted-foreground mt-4">
              <p>Higher percentages indicate greater need for that skill set.</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
