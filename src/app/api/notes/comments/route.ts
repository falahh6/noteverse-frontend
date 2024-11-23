import prisma, {
  authTokenValidation,
  errorResponse,
  jsonResponse,
} from '@/lib/prisma'
import { NextRequest } from 'next/server'

interface Comment {
  id: number
  createdAt: Date
  updatedAt: Date
  text: string
  noteId: number
  userId: number
  parentCommentId: number | null
}

interface CommentWithReplies extends Comment {
  replies: CommentWithReplies[]
  user: {
    id: number
    email: string
    username: string
  }
}

export const POST = async (request: NextRequest) => {
  const authToken = request.headers.get('Authorization')
  const response = await authTokenValidation(authToken)

  const { comment, notes_id, parent_comment } = await request.json()

  if (response && 'id' in response) {
    if (notes_id) {
      if (parent_comment) {
        const comments = await prisma.comment.create({
          data: {
            noteId: parseInt(notes_id),
            userId: response.id,
            text: comment,
            parentCommentId: parent_comment,
          },
        })

        return jsonResponse('comments created', comments)
      }
      const comments = await prisma.comment.create({
        data: {
          noteId: parseInt(notes_id),
          userId: response.id,
          text: comment,
        },
      })

      return jsonResponse('Comment created', comments)
    } else {
      return errorResponse('Note id is required', 400)
    }
  } else {
    return errorResponse('Error creating comment', 400)
  }
}

export const GET = async (request: NextRequest) => {
  const authToken = request.headers.get('Authorization')
  const response = await authTokenValidation(authToken)

  const params = new URL(request.url).searchParams
  const id = params.get('note_id')

  if (response && 'id' in response) {
    if (id) {
      let comments = await prisma.comment.findMany({
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
          replies: true,
        },
      })

      const commentMap: { [key: number]: any } = {}

      comments.forEach((comment) => {
        comment.replies = []
        commentMap[comment.id] = comment
      })

      const nestedComments: CommentWithReplies[] = []

      comments.forEach((comment) => {
        if (comment.parentCommentId) {
          commentMap[comment.parentCommentId].replies.push(comment)
        } else {
          nestedComments.push(comment as CommentWithReplies)
        }
      })

      comments = nestedComments

      return jsonResponse('Comments found', comments)
    } else {
      return errorResponse('Note id is required', 400)
    }
  } else {
    return errorResponse('Error fetching comments', 400)
  }
}
