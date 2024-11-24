import prisma, {
  authTokenValidation,
  errorResponse,
  jsonResponse,
} from '@/lib/prisma'
import { NextRequest } from 'next/server'

export const POST = async (request: NextRequest) => {
  const authToken = request.headers.get('Authorization')
  const response = await authTokenValidation(authToken)
  const id = new URL(request.url).searchParams.get('notes_id')

  const { visibility } = await request.json()

  if (!['Public', 'Private', 'Shared'].includes(visibility)) {
    return errorResponse('visibility must be Private, Public or Shared', 400)
  }

  if (response && 'id' in response) {
    if (id) {
      const note = await prisma.note.update({
        where: { id: parseInt(id) },
        data: {
          visibility: visibility,
        },
      })
      return jsonResponse('Note visibility updated successfully', note)
    }
  } else {
    return errorResponse('Error fetching notes', 400)
  }
}
