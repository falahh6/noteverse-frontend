import prisma, {
  authTokenValidation,
  errorResponse,
  jsonResponse,
} from '@/lib/prisma'
import { NextRequest } from 'next/server'

export const GET = async (request: NextRequest) => {
  const authToken = request.headers.get('Authorization')
  const response = await authTokenValidation(authToken)

  if ('error' in response) {
    return errorResponse(response.error, response.statusCode)
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      username: true,
    },
  })

  return jsonResponse('Users fetched successfully', users)
}
