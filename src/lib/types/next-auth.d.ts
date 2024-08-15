// /types/next-auth.d.ts
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    refreshToken?: string
  }

  interface User {
    accessToken?: string
    refreshToken?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
    refreshToken?: string
  }
}
