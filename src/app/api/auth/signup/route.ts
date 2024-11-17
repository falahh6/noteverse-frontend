import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import cryptoo from 'crypto'

export const POST = async (request: NextRequest) => {
  const { email, password, name } = await request.json()

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })

  if (existingUser) {
    return NextResponse.json(
      {
        error:
          'User already exists. Please Log In or try with another account.',
      },
      { status: 400 },
    )
  }

  const user = await prisma.user.create({
    data: {
      username: name,
      email: email,
      password: await bcrypt.hash(password, 10),
      authToken: cryptoo.randomBytes(64).toString('hex'),
      verificationToken: cryptoo.randomBytes(32).toString('hex'),
    },
  })

  if (user) {
    console.log('User created:', user)
    return NextResponse.json(
      {
        email: user.email,
        password: user.password,
        verificationToken: user.verificationToken,
      },
      { status: 201 },
    )
  } else {
    return NextResponse.json({ error: 'Error signing in' }, { status: 400 })
  }
}
