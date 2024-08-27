'use client'

import { useRouter } from 'next/navigation'
import { createContext, ReactNode, useContext, useState } from 'react'

type Page = {
  pathname: string
  title?: string
  isStatic: boolean
  isActive: boolean
}

type PathContextType = {
  pages: Page[]
  addPage: (newPage: Page) => void
  removePage: (pathname: string) => void
  toogleActivePage: (pathname: string) => void
  modifyPathname: (pathname: string) => void
}

const PathContext = createContext<PathContextType | undefined>(undefined)

export const PathContextProvider = ({ children }: { children: ReactNode }) => {
  const [pages, setPages] = useState<Page[]>([])
  const router = useRouter()

  const addPage = (newPage: Page) => {
    console.log('CALLED')

    // Check if a page with the same properties exists in the pages array
    const pageExists = pages.some((page) => page.pathname === newPage.pathname) // Assuming Page has an 'id' property
    console.log(pageExists)

    if (!pageExists) {
      console.log('CALLED 1')
      setPages((prevPages) => [...prevPages, newPage])
    }
  }

  const removePage = (pathname: string) => {
    setPages((prevPages) =>
      prevPages.filter((page) => page.pathname !== pathname),
    )

    router.push('/notes?type=featured')
  }

  const toogleActivePage = (pathname: string) => {
    setPages((prevPages) =>
      prevPages.map((prevpage) =>
        prevpage.pathname === pathname
          ? { ...prevpage, isActive: true }
          : { ...prevpage, isActive: false },
      ),
    )
  }

  const modifyPathname = (newPageName: string) => {
    console.log('@modify_path : ', newPageName)

    console.log(
      pages.map((prevpage) =>
        prevpage.pathname.includes('/notes?type=')
          ? { ...prevpage, pathname: newPageName }
          : prevpage,
      ),
    )
    setPages((prevPages) =>
      prevPages.map((prevpage) =>
        prevpage.pathname.includes('/notes?type=')
          ? { ...prevpage, pathname: newPageName }
          : prevpage,
      ),
    )
  }

  return (
    <PathContext.Provider
      value={{ pages, addPage, removePage, toogleActivePage, modifyPathname }}
    >
      {children}
    </PathContext.Provider>
  )
}

export const usePathContext = () => {
  const context = useContext(PathContext)
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider')
  }
  return context
}
