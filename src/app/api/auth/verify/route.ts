import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
  try {
    const { verificationToken } = await request.json()

    if (!verificationToken) {
      return NextResponse.json(
        { error: 'Invalid verification token' },
        { status: 400 },
      )
    }

    const user = await prisma.user.findFirst({
      where: {
        verificationToken: verificationToken,
      },
    })

    if (user) {
      const updatedUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: true,
          verificationToken: null,
        },
      })

      if (updatedUser) {
        return NextResponse.json(
          {
            verified: true,
            user: {
              email: updatedUser.email,
              username: updatedUser.username,
            },
          },
          { status: 200 },
        )
      }
    } else {
      return NextResponse.json({ error: 'No User found.' }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Error Verifying email.' },
      { status: 400 },
    )
  }
}
