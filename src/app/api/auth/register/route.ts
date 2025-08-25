import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { hashPassword, validatePassword, generateToken } from '@/lib/auth'
import { User } from '@/lib/models'

export async function POST(request: NextRequest) {
  try {
    const { email, password, role } = await request.json()

    if (!email || !password || !role) {
      return NextResponse.json(
        { error: 'Email, password, and role are required' },
        { status: 400 }
      )
    }

    const passwordValidation = validatePassword(password)
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { error: passwordValidation.message },
        { status: 400 }
      )
    }

    const validRoles = ['ADMIN', 'FAN', 'OWNER', 'PLAYER']
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const usersCollection = db.collection<User>('users')

    const existingUser = await usersCollection.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 409 }
      )
    }

    const hashedPassword = await hashPassword(password)

    const newUser: User = {
      email,
      password: hashedPassword,
      role: role as User['role'],
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await usersCollection.insertOne(newUser)

    const token = generateToken({
      id: result.insertedId,
      email,
      role
    })

    return NextResponse.json({
      message: 'User registered successfully',
      token,
      user: {
        id: result.insertedId,
        email,
        role
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Registration API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}