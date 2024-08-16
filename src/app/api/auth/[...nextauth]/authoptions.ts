import { baseURL } from '@/lib/utils'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Sign In',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'bob@gmail.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = {
          name: 'Falah',
          email: 'falah@dev.com',
          emailVerified: false,
        }

        const response = await fetch(`${baseURL}/login/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          console.log('Logged In User : ', data)
          return {
            id: '1',
            email: credentials?.email,
            name: data.name,
            emailVerified: false,
            accessToken: data.access,
            refreshToken: data.refresh,
          }
        } else {
          const errorData = await response.json()
          console.log('errorData', errorData)
          if (response.status === 401) {
            throw new Error('Invalid email or password')
          } else {
            throw new Error(
              errorData.message || 'An error occurred during login',
            )
          }
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/signup', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken

      return session
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
}
