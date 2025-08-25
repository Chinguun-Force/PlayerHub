import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { getUserFromRequest } from '@/lib/auth'
import { Player, Team } from '@/lib/models'
import { ObjectId } from 'mongodb'

export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase()
    const playersCollection = db.collection<Player>('players')

    const players = await playersCollection.aggregate([
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
          teamName: { $arrayElemAt: ['$team.teamName', 0] }
        }
      },
      {
        $project: {
          team: 0 // Remove the full team object, keep only teamName
        }
      }
    ]).toArray()

    return NextResponse.json({
      players,
      total: players.length
    })

  } catch (error) {
    console.error('Get players API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const userPayload = getUserFromRequest(request)

    const db = await getDatabase()
    const playersCollection = db.collection<Player>('players')
    const teamsCollection = db.collection<Team>('teams')

    const { name, position, age } = body
    if (!name || !position || !age) {
      return NextResponse.json(
        { error: 'Name, position, and age are required' },
        { status: 400 }
      )
    }

    const newPlayer: Player = {
      ...body,
      userId: userPayload ? new ObjectId(userPayload.user.id) : undefined,
      teamId: body.teamId ? new ObjectId(body.teamId) : undefined,
      status: body.status || 'ACTIVE',
      socialLinks: body.socialLinks || {},
      donationEnabled: body.donationEnabled || false,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await playersCollection.insertOne(newPlayer)

    if (body.teamId) {
      await teamsCollection.updateOne(
        { _id: new ObjectId(body.teamId) },
        { $addToSet: { teamMembers: result.insertedId } }
      )
    }

    return NextResponse.json({
      message: 'Player created successfully',
      player: { ...newPlayer, _id: result.insertedId }
    }, { status: 201 })

  } catch (error) {
    console.error('Create player API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()

    const userPayload = getUserFromRequest(request)
    if (!userPayload) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const db = await getDatabase()
    const playersCollection = db.collection<Player>('players')

    const { playerId, ...updateData } = body

    if (!playerId) {
      return NextResponse.json(
        { error: 'Player ID is required' },
        { status: 400 }
      )
    }

    const updateFields = {
      ...updateData,
      teamId: updateData.teamId ? new ObjectId(updateData.teamId) : undefined,
      updatedAt: new Date()
    }

    const result = await playersCollection.updateOne(
      { _id: new ObjectId(playerId) },
      { $set: updateFields }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Player not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Player updated successfully'
    })

  } catch (error) {
    console.error('Update player API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}