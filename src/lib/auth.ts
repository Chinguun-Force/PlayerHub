import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { NextRequest } from 'next/server'
import { ObjectId } from 'mongodb'

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET_KEY

if (!JWT_SECRET) {
  throw new Error('ACCESS_TOKEN_SECRET_KEY is not defined in environment variables')
}

export interface JWTPayload {
  user: {
    id: string
    email: string
    role: string
  }
}

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

export function generateToken(user: { id: string | ObjectId, email: string, role: string }): string {
  const payload: JWTPayload = {
    user: {
      id: user.id.toString(),
      email: user.email,
      role: user.role
    }
  }

  return jwt.sign(payload, JWT_SECRET!, { expiresIn: '24h' })
}

export function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, JWT_SECRET!) as JWTPayload
}

export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.substring(7)
}

export function getUserFromRequest(request: NextRequest): JWTPayload | null {
  try {
    const authHeader = request.headers.get('authorization')
    const token = extractTokenFromHeader(authHeader)

    if (!token) {
      return null
    }

    return verifyToken(token)
  } catch (error) {
    return error instanceof jwt.JsonWebTokenError ? null : { user: { id: '', email: '', role: '' } }
  }
}

export function validatePassword(password: string): { isValid: boolean, message?: string } {
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' }
  }

  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' }
  }

  if (!/[0-9]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' }
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one special character' }
  }

  return { isValid: true }
}