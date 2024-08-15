import './globals.css'
import React from 'react'
import { GeistSans } from 'geist/font/sans'
import { BackgroundGrid } from '@/components/ui/BackgroundGrid'
import { AuthProvider } from './api/auth/providers'
import Navigation from '@/components/layout/Navigation'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import { constructMetadata } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { Toaster } from '@/components/ui/sonner'

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
        <AuthProvider>
          <ThemeProvider defaultTheme="light">
            <BackgroundGrid className="">
              <>
                <Navigation session={session} />
                {children}
              </>
              <Toaster richColors closeButton />
            </BackgroundGrid>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
