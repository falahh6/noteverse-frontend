import './globals.css'
import React from 'react'
import { GeistSans } from 'geist/font/sans'
import Navigation from '@/components/layout/Navigation'
import { constructMetadata } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import { Toaster } from '@/components/ui/sonner'
import { authOptions } from './api/auth/[...nextauth]/authoptions'
import Providers from './providers'

export const metadata = constructMetadata()

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={GeistSans.className}>
        {' '}
        <Providers>
          <Navigation session={session} />
          {children}
          <Toaster richColors closeButton className="z-[999]" />
        </Providers>
      </body>
    </html>
  )
}
