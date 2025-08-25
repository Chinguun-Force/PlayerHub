import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { Player } from '@/lib/models'
import { ObjectId } from 'mongodb'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid player ID' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const playersCollection = db.collection<Player>('players')

    const playerData = await playersCollection.aggregate([
      { $match: { _id: new ObjectId(id) } },
      {
        $lookup: {
          from: 'teams',
          localField: 'teamId',
          foreignField: '_id',
          as: 'team'
        }
      },
      {
        $lookup: {
          from: 'playerstats',
          localField: '_id',
          foreignField: 'playerId',
          as: 'stats'
        }
      },
      {
        $addFields: {
          teamName: { $arrayElemAt: ['$team.teamName', 0] },
          teamLogo: { $arrayElemAt: ['$team.teamLogo', 0] }
        }
      },
      {
        $project: {
          team: 0 // Remove the full team object
        }
      }
    ]).toArray()

    if (playerData.length === 0) {
      return NextResponse.json(
        { error: 'Player not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(playerData[0])

  } catch (error) {
    console.error('Get player by ID API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}