'use client'

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useSession } from 'next-auth/react'
import { baseURL } from '@/lib/utils'

export type User = {
  id: string
  name: string
  email: string
  // Add other user properties here
}

type UsersContextType = {
  users: User[] | undefined
  loading: boolean
}

const UserContext = createContext<UsersContextType | undefined>(undefined)

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[] | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession()
  let called: boolean

  useEffect(() => {
    const fetchUser = async () => {
      if (session?.accessToken && !called) {
        try {
          const response = await fetch(`${baseURL}/users/`, {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          })
          if (response.ok) {
            const userData = await response.json()
            setUsers(userData)
          }
        } catch (error) {
          console.error('Failed to fetch user:', error)
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    fetchUser()
  }, [session])

  return (
    <UserContext.Provider value={{ users, loading }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider')
  }
  return context
}

export function validateEmail(email: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}
