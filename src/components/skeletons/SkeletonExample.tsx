"use client"

import { useState } from 'react'
import { WithSkeleton } from './WithSkeleton'
import { PlayersPageSkeleton, PlayerTableSkeleton } from './PlayerSkeletons'
import { TeamsPageSkeleton } from './TeamSkeletons'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function SkeletonExample() {
  const [playersLoading, setPlayersLoading] = useState(false)
  const [teamsLoading, setTeamsLoading] = useState(false)
  const [tableLoading, setTableLoading] = useState(false)

  const simulateLoading = (setter: (loading: boolean) => void, duration = 2000) => {
    setter(true)
    setTimeout(() => setter(false), duration)
  }

  return (
    <div className="space-y-8 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Skeleton Loading Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button onClick={() => simulateLoading(setPlayersLoading)}>
              Test Players Page Skeleton
            </Button>
            <Button onClick={() => simulateLoading(setTeamsLoading)}>
              Test Teams Page Skeleton
            </Button>
            <Button onClick={() => simulateLoading(setTableLoading, 1500)}>
              Test Table Skeleton
            </Button>
          </div>
        </CardContent>
      </Card>

      <WithSkeleton
        isLoading={playersLoading}
        skeleton={<PlayersPageSkeleton />}
      >
        <Card>
          <CardHeader>
            <CardTitle>Players Page Content</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is the actual players page content that would be shown after loading.</p>
          </CardContent>
        </Card>
      </WithSkeleton>

      <WithSkeleton
        isLoading={teamsLoading}
        skeleton={<TeamsPageSkeleton />}
      >
        <Card>
          <CardHeader>
            <CardTitle>Teams Page Content</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is the actual teams page content that would be shown after loading.</p>
          </CardContent>
        </Card>
      </WithSkeleton>

      <WithSkeleton
        isLoading={tableLoading}
        skeleton={<PlayerTableSkeleton rows={3} />}
      >
        <Card>
          <CardHeader>
            <CardTitle>Table Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">Position</th>
                    <th className="text-left p-2">Team</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2">John Doe</td>
                    <td className="p-2">Forward</td>
                    <td className="p-2">Team Alpha</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Jane Smith</td>
                    <td className="p-2">Midfielder</td>
                    <td className="p-2">Team Beta</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </WithSkeleton>
    </div>
  )
}
