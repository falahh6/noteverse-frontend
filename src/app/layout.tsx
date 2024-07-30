import type { Metadata } from 'next'
import './globals.css'
import React from 'react'
import { GeistSans } from 'geist/font/sans'
import { BackgroundGrid } from '@/components/ui/BackgroundGrid'
import { AuthProvider } from './api/auth/providers'

export const metadata: Metadata = {
  title: 'Noteverse',
  description: 'The notes app which works for you.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        {' '}
        <AuthProvider>
          <BackgroundGrid className="">{children}</BackgroundGrid>
        </AuthProvider>
      </body>
    </html>
  )
}
