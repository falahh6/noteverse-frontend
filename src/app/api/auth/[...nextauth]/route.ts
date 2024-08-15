import { baseURL } from '@/lib/utils'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { authOptions } from './authoptions'

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
