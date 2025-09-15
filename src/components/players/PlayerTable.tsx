"use client"
import { Table, TableHeader, TableRow, TableHead, TableBody } from "@/components/ui/table"
import PlayerTableRow from "./PlayerTableRow"
import { Player } from "@/types/player"

interface Props {
  players: Player[]
  getStatusColor: (status: Player["status"]) => string
}

export default function PlayerTable({ players, getStatusColor }: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-28">Зураг</TableHead>
            <TableHead>Нэр</TableHead>
            <TableHead>Байрлал</TableHead>
            <TableHead>Баг</TableHead>
            <TableHead>Нас</TableHead>
            <TableHead>Дугаар</TableHead>
            <TableHead>Төлөв</TableHead>
            <TableHead>Дэлгэрэнгүй</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player) => (
            <PlayerTableRow key={player._id} player={player} getStatusColor={getStatusColor} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
