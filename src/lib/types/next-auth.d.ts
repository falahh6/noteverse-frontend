import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: number | undefined
      name?: string | null
      email?: string | null
      image?: string | null
    } & DefaultSession['user']
    accessToken: string
    refreshToken: string
    isEmailVerified?: boolean
    verificationToken?: string
  }

  interface User {
    id: number | undefined
    name?: string | null
    email?: string | null
    image?: string | null
    accessToken?: string
    refreshToken?: string
    isEmailVerified?: boolean
    verificationToken?: string
  }
}
