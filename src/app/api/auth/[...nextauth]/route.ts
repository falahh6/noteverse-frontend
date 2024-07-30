import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const users = [{ id: '1', name: 'Falah', email: 'falah@dev.com' }]

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Sign In',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'bob@gmail.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = { id: '1', name: 'Falah', email: 'falah@dev.com' }

        return user
        // if (credentials?.email === user.email) {
        //   return user
        // } else {
        //   return null
        // }
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
    session: ({ session, token }) => {
      console.log('Session Callback : ', { session, token })
      return session
    },
    jwt: ({ token, user }) => {
      console.log('JWT Callback : ', { token, user })
      return token
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
