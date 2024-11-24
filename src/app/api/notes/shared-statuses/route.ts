import prisma, {
  authTokenValidation,
  errorResponse,
  jsonResponse,
} from '@/lib/prisma'
import { NextRequest } from 'next/server'

export const POST = async (request: NextRequest) => {
  const authToken = request.headers.get('Authorization')
  const response = await authTokenValidation(authToken)

  console.log('RESPONSE : ', response)

  const { sharedWith, permissions, notes_id } = await request.json()

  if (response && 'id' in response) {
    if (notes_id) {
      const sharedStatuses = await prisma.sharedStatus.create({
        data: {
          sharedById: response.id,
          sharedWithId: sharedWith.id,
          noteId: parseInt(notes_id),
          permissions: permissions,
        },
      })

      return jsonResponse(
        'Shared statuses fetched successfully',
        sharedStatuses,
      )
    } else {
      return errorResponse('Note id is required', 400)
    }
  } else {
    return errorResponse('Error fetching shared statuses', 400)
  }
}

export const GET = async (request: NextRequest) => {
  const authToken = request.headers.get('Authorization')
  const response = await authTokenValidation(authToken)

  const id = new URL(request.url).searchParams.get('notes_id')
  if (response && 'id' in response) {
    if (id) {
      const sharedStatuses = await prisma.sharedStatus.findMany({
        where: {
          noteId: parseInt(id),
        },
        select: {
          sharedWith: {
            select: {
              id: true,
              email: true,
              username: true,
            },
          },
          noteId: true,
          permissions: true,
          id: true,
          sharedBy: {
            select: {
              id: true,
              email: true,
              username: true,
            },
          },
        },
      })

      return jsonResponse(
        'Shared statuses fetched successfully',
        sharedStatuses,
      )
    } else {
      return errorResponse('Note id is required', 400)
    }
  } else {
    return errorResponse('Error fetching shared statuses', 400)
  }
}

export const PATCH = async (request: NextRequest) => {
  const authToken = request.headers.get('Authorization')
  const response = await authTokenValidation(authToken)

  const { permissions } = await request.json()
  const sharedStatusId = new URL(request.url).searchParams.get('status_id')

  if (response && 'id' in response) {
    if (sharedStatusId) {
      const sharedStatus = await prisma.sharedStatus.update({
        where: { id: parseInt(sharedStatusId) },
        data: {
          permissions: permissions,
        },
      })

      return jsonResponse('Shared statuses updated successfully', sharedStatus)
    } else {
      return errorResponse('Shared status id is required', 400)
    }
  } else {
    return errorResponse('Error updating shared statuses', 400)
  }
}

export const DELETE = async (request: NextRequest) => {
  const authToken = request.headers.get('Authorization')
  const response = await authTokenValidation(authToken)

  const sharedStatusId = new URL(request.url).searchParams.get('status_id')

  if (response && 'id' in response) {
    if (sharedStatusId) {
      const sharedStatus = await prisma.sharedStatus.delete({
        where: {
          id: parseInt(sharedStatusId),
        },
      })

      return jsonResponse('Shared statuses deleted successfully', sharedStatus)
    } else {
      return errorResponse('Shared status id is required', 400)
    }
  } else {
    return errorResponse('Error deleting shared statuses', 400)
  }
}
