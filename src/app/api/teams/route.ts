import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { Team } from '@/lib/models'
import { ObjectId } from 'mongodb'

export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase()
    const teamsCollection = db.collection<Team>('teams')

    const teams = await teamsCollection.aggregate([
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
      },
      {
        $addFields: {
          memberCount: { $size: '$teamMembers' }
        }
      }
    ]).toArray()

    return NextResponse.json({
      teams,
      total: teams.length
    })

  } catch (error) {
    console.error('Get teams API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { teamName } = body
    if (!teamName) {
      return NextResponse.json(
        { error: 'Team name is required' },
        { status: 400 }
      )
    }
    const db = await getDatabase()
    const teamsCollection = db.collection<Team>('teams')

    const existingTeam = await teamsCollection.findOne({ teamName })
    if (existingTeam) {
      return NextResponse.json(
        { error: 'Team name already exists' },
        { status: 409 }
      )
    }

    const newTeam: Team = {
      ...body,
      teamMembers: body.teamMembers ? body.teamMembers.map((id: string) => new ObjectId(id)) : [],
      ownerId: body.ownerId ? new ObjectId(body.ownerId) : undefined,
      foundedYear: body.foundedYear || new Date().getFullYear(),
      isActive: body.isActive !== undefined ? body.isActive : true,
      teamAchievements: body.teamAchievements || [],
      teamSocialLinks: body.teamSocialLinks || [],
      games: body.games || [],
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await teamsCollection.insertOne(newTeam)

    return NextResponse.json({
      message: 'Team created successfully',
      team: { ...newTeam, _id: result.insertedId }
    }, { status: 201 })

  } catch (error) {
    console.error('Create team API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}