import './globals.css'
import React from 'react'
import { GeistSans } from 'geist/font/sans'
import { AuthProvider } from './api/auth/providers'
import Navigation from '@/components/layout/Navigation'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import { constructMetadata } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import { Toaster } from '@/components/ui/sonner'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { authOptions } from './api/auth/[...nextauth]/authoptions'

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
          <AntdRegistry>
            <ThemeProvider defaultTheme="light">
              {/* <BackgroundGrid className="min-w-full"> */}
              <>
                <Navigation session={session} />
                {children}
              </>
              <Toaster richColors closeButton className="z-[999]" />
              {/* </BackgroundGrid> */}
            </ThemeProvider>
          </AntdRegistry>
        </AuthProvider>
      </body>
    </html>
  )
}
