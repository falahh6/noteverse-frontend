import prisma, {
  authTokenValidation,
  errorResponse,
  jsonResponse,
} from '@/lib/prisma'
import { NextRequest } from 'next/server'

export const POST = async (request: NextRequest) => {
  const authToken = request.headers.get('Authorization')
  const response = await authTokenValidation(authToken)
  const params = new URL(request.url).searchParams
  const id = params.get('note_id')
  const type = params.get('type')

  if (response && 'id' in response) {
    if (id) {
      if (type === 'add') {
        const note = await prisma.note.update({
          where: { id: parseInt(id) },
          data: {
            likes: {
              connect: { id: response.id },
            },
          },
          include: {
            likes: true,
          },
        })
        return jsonResponse('Note liked successfully', {
          id: note.id,
          likes: note.likes?.map((like) => ({
            likeId: like.id,
            userId: like.email,
          })),
        })
      } else if (type === 'remove') {
        const note = await prisma.note.update({
          where: { id: parseInt(id) },
          data: {
            likes: {
              disconnect: { id: response.id },
            },
          },
          include: {
            likes: true,
          },
        })
        return jsonResponse('Note unliked successfully', {
          id: note.id,
          likes: note.likes?.map((like) => ({
            likeId: like.id,
            userId: like.email,
          })),
        })
      }
    }
  } else {
    return errorResponse(
      response.error || 'Error deleting note',
      response.statusCode || 400,
    )
  }
}
