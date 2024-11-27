'use client'

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useSession } from 'next-auth/react'

export type User = {
  id: string
  username: string
  email: string
}

type UsersContextType = {
  users: User[] | undefined
  loading: boolean
}

const UserContext = createContext<UsersContextType | undefined>(undefined)

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[] | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const { data, status } = useSession()

  useEffect(() => {
    const fetchUser = async () => {
      if (data?.accessToken) {
        try {
          const response = await fetch(`/api/users`, {
            headers: {
              Authorization: `${data.accessToken}`,
            },
          })
          if (response.ok) {
            const userData = await response.json()
            setUsers(userData.data)
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

    if (status === 'authenticated') {
      fetchUser()
    }
  }, [data, status])

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
