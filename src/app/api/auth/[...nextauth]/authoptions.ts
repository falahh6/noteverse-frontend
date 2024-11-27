import prisma from '@/lib/prisma'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import GoogleProvider from 'next-auth/providers/google'
import cryptoo from 'crypto'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Sign In',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'bob@gmail.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          })

          console.log('User:', user)

          if (!user) {
            throw new Error('No user found')
          } else if (
            !(await bcrypt.compare(credentials.password, user.password))
          ) {
            throw new Error('Invalid password')
          }

          return {
            id: user.id,
            email: user.email,
            name: user.username,
            accessToken: user.authToken ?? undefined, // Ensure accessToken is string or undefined
            isEmailVerified: user.emailVerified,
            verificationToken: user.verificationToken ?? undefined,
          }
        } catch (error) {
          throw new Error('Authorization error: ' + error)
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CID ?? '',
      clientSecret: process.env.GOOGLE_CS ?? '',
    }),
  ],
  callbacks: {
    async jwt({ token, user, profile, account }) {
      if (account?.provider === 'google') {
        const existingUser = await prisma.user.findUnique({
          where: { email: profile?.email! },
        })

        if (existingUser) {
          token.id = existingUser.id
          token.accessToken = existingUser.authToken
          token.isEmailVerified = existingUser.emailVerified
          token.verificationToken = existingUser.verificationToken
        } else {
          const newUser = await prisma.user.create({
            data: {
              email: profile?.email!,
              username: profile?.name!,
              password: '', // Google users won't have a password
              authToken: cryptoo.randomBytes(64).toString('hex'),
              verificationToken: '',
              emailVerified: true,
            },
          })

          token.id = newUser.id
          token.accessToken = newUser.authToken
          token.isEmailVerified = newUser.emailVerified
          token.verificationToken = newUser.verificationToken
        }
      } else {
        if (user) {
          token.id = user.id
          token.accessToken = user.accessToken
          token.refreshToken = user.refreshToken
          token.isEmailVerified = user.isEmailVerified
          token.verificationToken = user.verificationToken
        }
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as number
      }
      console.log('Session:', token)
      session.accessToken = token.accessToken as string
      session.refreshToken = token.refreshToken as string
      session.isEmailVerified = token.isEmailVerified as boolean
      session.verificationToken = token.verificationToken as string
      return session
    },
  },
  pages: {
    signIn: '/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/signup',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
}
