import prisma, {
  authTokenValidation,
  errorResponse,
  jsonResponse,
} from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
  const authToken = request.headers.get('Authorization')
  const response = await authTokenValidation(authToken)

  const { comment, notes_id } = await request.json()

  if (response && 'id' in response) {
    if (notes_id) {
      const comments = await prisma.comment.create({
        data: {
          noteId: parseInt(notes_id),
          userId: response.id,
          text: comment,
        },
      })

      return NextResponse.json(
        { message: 'Comment created', data: comments },
        { status: 201 },
      )
    } else {
      return NextResponse.json(
        { error: 'Error creating comment' },
        { status: 400 },
      )
    }
  } else {
    return NextResponse.json(
      { error: response.error || 'Error creating comment' },
      { status: response.statusCode || 400 },
    )
  }
}

export const GET = async (request: NextRequest) => {
  const authToken = request.headers.get('Authorization')
  const response = await authTokenValidation(authToken)

  const params = new URL(request.url).searchParams
  const id = params.get('note_id')

  if (response && 'id' in response) {
    if (id) {
      const comments = await prisma.comment.findMany({
        where: {
          noteId: parseInt(id),
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
        },
      })

      return jsonResponse('Comments found', comments)
    } else {
      return errorResponse('Note id is required', 400)
    }
  } else {
    return errorResponse('Error fetching comments', 400)
  }
}
