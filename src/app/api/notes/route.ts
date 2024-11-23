import prisma, {
  authTokenValidation,
  errorResponse,
  jsonResponse,
} from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
  const authToken = request.headers.get('Authorization')
  const response = await authTokenValidation(authToken)

  const { title } = await request.json()

  if (response && 'id' in response) {
    const notes = await prisma.note.create({
      data: {
        title: title,
        owner: {
          connect: {
            id: response.id,
          },
        },
      },
    })

    return NextResponse.json(
      { message: 'Note created', data: notes },
      { status: 201 },
    )
  } else {
    return NextResponse.json(
      { error: response.error || 'Error creating note' },
      { status: response.statusCode || 400 },
    )
  }
}

async function fetchNotes(
  userId: number,
  id: string | null,
  type: string | null,
) {
  if (type === 'shared') {
    return prisma.note.findMany({
      where: { sharedStatuses: { some: { sharedWith: { id: userId } } } },
      include: {
        sharedStatuses: true,
        owner: true,
        likes: true,
        comments: true,
      },
    })
  } else if (type === 'featured') {
    return prisma.note.findMany({
      where: { visibility: 'Public' },
      include: {
        sharedStatuses: true,
        owner: true,
        likes: true,
        comments: true,
      },
    })
  } else if (id) {
    return prisma.note.findFirst({
      where: { id: parseInt(id), ownerId: userId },
      include: {
        sharedStatuses: true,
        owner: true,
        likes: true,
        comments: true,
      },
    })
  }
  return prisma.note.findMany({
    where: { ownerId: userId },
    include: { sharedStatuses: true, owner: true, likes: true, comments: true },
  })
}

export const GET = async (request: NextRequest) => {
  const authToken = request.headers.get('Authorization')
  const response = await authTokenValidation(authToken)

  if ('error' in response) {
    return errorResponse(response.error, response.statusCode)
  }

  const params = new URL(request.url).searchParams
  const id = params.get('id')
  const type = params.get('type')

  const notes = await fetchNotes(response.id, id, type)
  if (!notes) {
    return errorResponse('Notes not found', 404)
  }

  return jsonResponse('Notes fetched successfully', notes)
}

export const PATCH = async (request: NextRequest) => {
  const authToken = request.headers.get('Authorization')
  const response = await authTokenValidation(authToken)
  const params = new URL(request.url).searchParams
  const id = params.get('id')

  const { title, content } = await request.json()

  if (title === '' || content === '') {
    return NextResponse.json(
      { error: 'Title and content are required' },
      { status: 400 },
    )
  }

  if (response && 'id' in response) {
    if (id) {
      const note = await prisma.note.update({
        data: {
          title: title,
          data: content,
        },
        where: {
          id: parseInt(id),
          ownerId: response.id,
        },
      })

      return NextResponse.json(
        { message: 'Note updated', data: note },
        { status: 200 },
      )
    }
  } else {
    return NextResponse.json(
      { error: response.error || 'Error creating note' },
      { status: response.statusCode || 400 },
    )
  }
}

export const DELETE = async (request: NextRequest) => {
  //delete a note
  const authToken = request.headers.get('Authorization')
  const response = await authTokenValidation(authToken)
  const params = new URL(request.url).searchParams
  const id = params.get('notes_id')

  if (response && 'id' in response) {
    if (id) {
      const note = await prisma.note.delete({
        where: {
          id: parseInt(id),
          ownerId: response.id,
        },
      })

      return jsonResponse('Note deleted successfully', note)
    }
  } else {
    return errorResponse(
      response.error || 'Error deleting note',
      response.statusCode || 400,
    )
  }
}
