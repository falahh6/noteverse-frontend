// import prisma, { authTokenValidation } from '@/lib/prisma'
// import { NextRequest, NextResponse } from 'next/server'

// export const POST = async (request: NextRequest) => {
//   const authToken = request.headers.get('Authorization')
//   const response = await authTokenValidation(authToken)

//   const params = new URL(request.url).searchParams
//   const id = params.get('id')

//   if (response && 'id' in response) {
//       if (id) {

//       }}

// }

// export const GET = async (request: NextRequest) => {
//     const authToken = request.headers.get('Authorization')
//     const response = await authTokenValidation(authToken)
//     const params = new URL(request.url).searchParams
//     const id = params.get('id')

//     if (response && 'id' in response) {
//         if (id) {

//         const comments = await prisma.comment.findMany({
//             where : {
//                 noteId: parseInt(id)
//             }
//         })

//         if (note) {
//             return NextResponse.json(
//             { message: 'Note found', data: note },
//             { status: 200 },
//             )
//         } else {
//             return NextResponse.json({ error: 'Note not found' }, { status: 404 })
//         }
//         } else {
//         const notes = await prisma.note.findMany({
//             where: {
//             ownerId: response.id,
//             },
//             include: {
//             sharedStatuses: true,
//             owner: true,
//             comments: true,
//             likes: true,
//             },
//         })

//         return NextResponse.json(
//             { message: 'Notes found', data: notes },
//             { status: 200 },
//         )
//         }
//     } else {
//         return NextResponse.json(
//         { error: response.error || 'Error fetching notes' },
//         { status: response.statusCode || 400 },
//         )
//     }
// }
