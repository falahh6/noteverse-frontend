interface User {
  name: string
  avatar: string
  fallback: string
}

// Define the type for a Reply
interface Reply {
  id: number
  user: User
  content: string
  date: string
}

// Define the type for a Thread
interface Thread {
  id: number
  user: User
  content: string
  date: string
  replies: Reply[] // Array of replies
}
