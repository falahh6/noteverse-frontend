'use client'

import { ReactNode } from 'react'

import ProgressBarProvider from '@/components/ui/Progressbar'
import { PathContextProvider } from '@/context/pathContext'
import { UserContextProvider } from '@/context/usersContext'
import { EditorProvider } from '@/context/editorContext'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import { AuthProvider } from './api/auth/providers'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <ProgressBarProvider>
        <AntdRegistry>
          <ThemeProvider defaultTheme="light">
            <PathContextProvider>
              <UserContextProvider>
                <EditorProvider>{children}</EditorProvider>
              </UserContextProvider>
            </PathContextProvider>
          </ThemeProvider>
        </AntdRegistry>
      </ProgressBarProvider>
    </AuthProvider>
  )
}

export default Providers
