import prisma, { authTokenValidation } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
  const authToken = request.headers.get('Authorization')
  const response = await authTokenValidation(authToken)

  const params = new URL(request.url).searchParams
  const id = params.get('id')

  if (response && 'id' in response) {
    if (id) {
    }
  }
}

export const GET = async (request: NextRequest) => {
  const authToken = request.headers.get('Authorization')
  const response = await authTokenValidation(authToken)
  const params = new URL(request.url).searchParams
  const id = params.get('id')
}
