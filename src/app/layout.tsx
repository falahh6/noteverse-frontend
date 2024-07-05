import type { Metadata } from 'next'
import './globals.css'
import React from 'react'
import { GeistSans } from 'geist/font/sans'

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
      <body className={GeistSans.className}>{children}</body>
    </html>
  )
}
