import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { Team } from '@/lib/models'
import { ObjectId } from 'mongodb'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid team ID' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const teamsCollection = db.collection<Team>('teams')

    const teamData = await teamsCollection.aggregate([
      { $match: { _id: new ObjectId(id) } },
      {
        $lookup: {
          from: 'players',
          localField: 'teamMembers',
          foreignField: '_id',
          as: 'teamMembersDetails'
        }
      },
      {
        $lookup: {
          from: 'owners',
          localField: 'ownerId',
          foreignField: '_id',
          as: 'ownerDetails'
        }
      }
    ]).toArray()

    if (teamData.length === 0) {
      return NextResponse.json(
        { error: 'Team not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(teamData[0])

  } catch (error) {
    console.error('Get team by ID API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid team ID' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const teamsCollection = db.collection<Team>('teams')

    const updateFields = {
      ...body,
      teamMembers: body.teamMembers ? body.teamMembers.map((memberId: string) => new ObjectId(memberId)) : undefined,
      ownerId: body.ownerId ? new ObjectId(body.ownerId) : undefined,
      updatedAt: new Date()
    }

    const result = await teamsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Team not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Team updated successfully'
    })

  } catch (error) {
    console.error('Update team API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid team ID' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const teamsCollection = db.collection<Team>('teams')

    const updateFields = {
      ...body,
      teamMembers: body.teamMembers ? body.teamMembers.map((memberId: string) => new ObjectId(memberId)) : undefined,
      ownerId: body.ownerId ? new ObjectId(body.ownerId) : undefined,
      updatedAt: new Date()
    }

    const result = await teamsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Team not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'Team updated successfully'
    })

  } catch (error) {
    console.error('Patch team API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}