import { baseURL } from '@/lib/utils'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
  const { email, password } = await request.json()

  const response = await fetch(`${baseURL}/signup/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password1: password,
      password2: password,
    }),
  })

  console.log(response)
  if (response.ok) {
    const responseData = await response.json()
    console.log('responseData', responseData)
    return NextResponse.json({ email, password }, { status: 201 })
  } else {
    console.log('responseData', response)
    return NextResponse.json(
      { error: 'Error signing in', password },
      { status: 400 },
    )
  }
}
