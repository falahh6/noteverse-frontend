import { createServer } from 'node:http'
import next from 'next'
import { Server } from 'socket.io'

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
const app = next({ dev, hostname, port })
const handler = app.getRequestHandler()

const connectedUsers = {}

app.prepare().then(() => {
  const httpServer = createServer(handler)

  const io = new Server(httpServer)

  io.on('connection', (socket) => {
    console.log('Connected')

    //handle users connections
    socket.on('registerUser', ({ userId, userName, notesId }, cb) => {
      if (!connectedUsers[notesId]) {
        connectedUsers[notesId] = []
      }

      const isAlreadyConnected = connectedUsers[notesId].some(
        (user) => user.userId === userId || user.socket_id === socket.id,
      )

      if (!isAlreadyConnected) {
        connectedUsers[notesId].push({ socket_id: socket.id, userId, userName })
        console.log(
          `User registered: ${userName} (ID : ${userId}) in notes ${notesId}`,
        )
        console.log('TOTAL USERS : ', connectedUsers)
      } else {
        console.log(`User ${userName} (ID: ${userId}) is already connected.`)
      }

      io.to(notesId).emit('userList', connectedUsers[notesId])

      socket.join(notesId)

      cb({
        connectedUsers: connectedUsers[notesId],
      })
    })

    socket.on('updateUser', ({ userId, notesId, updates }, cb) => {
      console.log(
        `Updating user data for userId: ${userId} in notes: ${notesId}`,
      )

      if (connectedUsers[notesId]) {
        const userIndex = connectedUsers[notesId].findIndex(
          (user) => user.userId === userId,
        )

        if (userIndex !== -1) {
          connectedUsers[notesId][userIndex] = {
            ...connectedUsers[notesId][userIndex],
            ...updates,
          }

          console.log(`Updated user: ${connectedUsers[notesId][userIndex]}`)

          io.to(notesId).emit('userList', connectedUsers[notesId])

          if (cb) {
            cb({
              success: true,
              users: connectedUsers[notesId],
            })
          }
        } else {
          console.log(
            `User with userId: ${userId} not found in notes: ${notesId}`,
          )
          if (cb) {
            cb({
              success: false,
              error: 'User not found',
            })
          }
        }
      } else {
        console.log(`No users found for notesId: ${notesId}`)
        if (cb) {
          cb({
            success: false,
            error: 'No users in this note',
          })
        }
      }
    })

    //handle disconnection
    socket.on('disconnect', () => {
      console.log('Disconnected : ', socket.id)

      for (const notesId in connectedUsers) {
        connectedUsers[notesId] = connectedUsers[notesId].filter(
          (user) => user.socket_id !== socket.id,
        )

        io.to(notesId).emit('userList', connectedUsers[notesId])
      }
    })

    //content change
    socket.on('contentChanged', ({ notesId, content }) => {
      console.log(`Content changed in notes ${notesId} : `, content)
      socket.to(notesId).emit('contentUpdated', content)
    })

    //liveUsers
    socket.on('liveUsers', ({ notesId, users }, cb) => {
      console.log(`Live users for ${notesId} are : `, users)

      socket.to(notesId).emit('liveUsers', users)

      cb({
        liveUsers: users,
      })
    })
  })

  httpServer
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})
