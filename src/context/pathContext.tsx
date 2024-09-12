'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
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
  const searchParams = useSearchParams()
  const currPathname = usePathname()
  const editorMode = searchParams.get('mode')
  const router = useRouter()

  const addPage = (newPage: Page) => {
    const pageExists = pages.some((page) => page.pathname === newPage.pathname)
    console.log(pageExists)

    if (!pageExists) {
      setPages((prevPages) => [...prevPages, newPage])
    }
  }

  const removePage = (pathname: string) => {
    setPages((prevPages) =>
      prevPages.filter((page) => page.pathname !== pathname),
    )

    const element = pages.filter((page) => page.pathname === pathname)[0]
    const index = pages.indexOf(element)
    const prev = index > 0 ? pages[index - 1] : null

    if (element.isActive) {
      if (prev) {
        router.push(prev.pathname)
      } else {
        router.push('/notes?type=featured')
      }
    }
  }

  const toogleActivePage = (pathname: string) => {
    console.log('@toogleActivePage_pathname : ', pathname)
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
