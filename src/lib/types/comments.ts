interface User {
  name: string
  avatar: string
  fallback: string
}

// Define the type for a Reply
interface Reply {
  id: number
  user: User
  note: number
  text: string
  created_at: string
  user_name: string
}

// Define the type for a Thread
interface Thread {
  id: number
  user: User
  note: number
  text: string
  created_at: string
  user_name: string
  replies: Reply[]
}
