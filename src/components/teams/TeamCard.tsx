import { Trophy } from 'lucide-react'
import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import Image from 'next/image'
import Link from 'next/link'

interface TeamProps {
  _id: string
  teamName: string
  teamNameEn: string
  teamLogo: string
}
const TeamCard: React.FC<{team:TeamProps}> = ({team}) => {
  return (
    <Link key={team._id} href={`/teams/${team._id}`}>
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <div className="aspect-video w-full bg-muted/40 p-6 flex items-center justify-center">
                <Image
                  src={team.teamLogo || "/placeholder.svg"}
                  alt={team.teamName}
                  width={400}
                  height={400}
                  className="h-40 w-40 object-contain"
                />
              </div>
              <CardHeader>
                <CardTitle>{team.teamName}</CardTitle>
                {}
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Coach:</span>
                    {}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Home:</span>
                    {}
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-primary" />
                  {}
                </div>
              </CardContent>
            </Card>
          </Link>
  )
}

export default TeamCard