"use client"
import { TableRow, TableCell } from "@/components/ui/table"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Player } from "@/types/player"

interface Props {
  player: Player
  getStatusColor: (status: Player["status"]) => string
}

export default function PlayerTableRow({ player, getStatusColor }: Props) {

  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell className="font-medium">
        <Avatar className="w-16 h-16 ml-20">
          <AvatarImage src={player.profilePicture || undefined} alt={player.name} className="w-16 h-16 object-cover shadow-md" />
          <AvatarFallback>{player.name?.slice(0, 2)}</AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell className="font-medium">{player.name}</TableCell>
      <TableCell>{player.position}</TableCell>
      <TableCell>
        {/* <Image
          src={team?.teamLogo || null}
          alt="Team Logo"
          width={40}
          height={40}
          className="h-16 w-16 object-contain rounded-full"
        /> */}
      </TableCell>
      <TableCell>{player.age}</TableCell>
      <TableCell>#{player.jerseyNumber}</TableCell>
      <TableCell>
        <Badge className={getStatusColor(player.status)} variant="outline">{player.status}</Badge>
      </TableCell>
      <TableCell className="text-right">
        <Link href={`/players/${player._id}`}>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Link>
      </TableCell>
    </TableRow>
  )
}
