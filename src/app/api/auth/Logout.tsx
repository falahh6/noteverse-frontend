'use client'

import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
export const LogoutButton = () => {
  return (
    <Button
      variant={'secondary'}
      className="border mt-4"
      onClick={() => signOut()}
    >
      Logout
    </Button>
  )
}
