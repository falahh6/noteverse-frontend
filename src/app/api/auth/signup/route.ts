import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
  const { email, password } = await request.json()

  return NextResponse.json({ email, password }, { status: 201 })
}
