interface User {
  username: string
  avatar: string
  fallback: string
  email: string
  id: number
}

// Define the type for a Reply
interface Reply {
  id: number
  user: User
  note: number
  text: string
  createdAt: string
  username: string
}

// Define the type for a Thread
interface Thread {
  id: number
  user: User
  noteId: number
  text: string
  userId: number
  createdAt: string
  replies: Reply[]
}
