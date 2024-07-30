'use client'

import { useSession } from 'next-auth/react'

export const User = () => {
  const { data: Session } = useSession()
  return <pre>{JSON.stringify(Session)}</pre>
}
