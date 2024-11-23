'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  FileText,
  Home,
  LogOut,
  Menu,
  Settings,
  SquareDashedBottomCode,
  User,
  User2Icon,
  X,
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import { DefaultSession } from 'next-auth'
import { Button } from '../ui/button'
import { usePathname, useSearchParams } from 'next/navigation'
import { Badge } from '../ui/badge'
import { usePathContext } from '@/context/pathContext'
import { DashboardIcon } from '@radix-ui/react-icons'

const Navigation = ({
  session,
}: {
  className?: string
  session: DefaultSession | null
}) => {
  const pathname = usePathname()
  const { pages, addPage, removePage, toogleActivePage, modifyPathname } =
    usePathContext()
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  const searchQuery = searchParams.get('s')
  let init = false

  useEffect(() => {
    if (
      !pages.some((page) => page.pathname.startsWith('/notes?type=')) &&
      !init
    ) {
      addPage({
        title: 'Home',
        pathname: '/notes?type=featured',
        isStatic: true,
        isActive: true,
      })
    }
    init = true
    if (pathname === '/notes') {
      if (searchQuery) {
        const sp = new URLSearchParams([['s', searchQuery]])
        console.log('@SP : ', sp)
        toogleActivePage(
          pathname === '/notes'
            ? pathname + `?type=${type || 'featured'}` + `&${sp}`
            : pathname,
        )
      } else {
        toogleActivePage(
          pathname === '/notes'
            ? pathname + `?type=${type || 'featured'}`
            : pathname,
        )
      }
    }

    if (pathname.includes('/notes/')) {
      toogleActivePage(pathname)
    }
  }, [pathname])

  //modify pathname
  useEffect(() => {
    if (type) {
      modifyPathname(`/notes?type=${type}`)
    }

    if (searchQuery) {
      modifyPathname(`/notes?type=${type}&s=${searchQuery}`)
    }
  }, [type, searchQuery])

  return (
    <div
      className={`min-h-[10vh] px-20 max-sm:px-8 w-full bg-gradient-to-b from-gray-300  ${pathname !== '/' ? 'to-white backdrop-blur-2xl' : 'to-transparent'} ${pathname === '/verify' && 'hidden'} fixed top-0 left-0 right-0 flex flex-row justify-between items-center z-50`}
    >
      <div className="flex flex-row gap-2 items-center">
        <a href={'/'} className="flex flex-row items-center">
          <Image
            src={'/noteverse-logo-full.svg'}
            alt="logo-sm"
            height={48}
            width={200}
            className="max-sm:hidden max-md:hidden max-lg:hidden"
          />
          <Image
            src={'/logo-sm.svg'}
            alt="logo-sm"
            height={48}
            width={48}
            className="max-sm:block max-md:block max-lg:block hidden min-h-[48px] min-w-[48px]"
          />{' '}
        </a>
      </div>
      <div>
        {session?.user && (
          <div className="flex flex-row justify-center gap-2 max-sm:gap-1 items-center max-sm:mx-2 max-sm:max-w-[80vw] max-lg:ml-20">
            {pages[0]?.title === 'Home' && (
              <Button
                variant={'secondary'}
                size={'sm'}
                className={`h-fit p-1.5 ml-1 group text-sm max-sm:text-xs hover:bg-gray-200 ${pages[0].isActive && pathname !== '/' ? 'bg-gray-300' : 'bg-transparent'} border border-transparent hover:border-gray-400`}
                asChild
              >
                <div>
                  {pages[0].title === 'Home' && (
                    <Link href={pages[0].pathname}>
                      <DashboardIcon className="h-4 w-4 inline" />
                      {pages.length < 4 && (
                        <span className="ml-1 max-sm:hidden">Dashboard</span>
                      )}
                    </Link>
                  )}
                </div>
              </Button>
            )}
            <div className="flex flex-row gap-2 max-sm:gap-1 items-center max-w-[60vw] max-sm:max-w-[40vw] overflow-y-auto no-scrollbar">
              {pages
                .filter((i) => i.title !== 'Home')
                .map((page) => (
                  <Button
                    variant={'secondary'}
                    size={'sm'}
                    className={`h-fit p-1.5 group text-sm max-sm:text-xs hover:bg-gray-200 ${page.isActive ? 'bg-gray-300' : 'bg-transparent'} border border-transparent hover:border-gray-400`}
                    asChild
                  >
                    <div>
                      {page.title === 'Home' ? (
                        <Link href={page.pathname}>
                          <Home className="h-4 w-4 inline" />
                          {pages.length < 4 && (
                            <span className="ml-1">{page.title}</span>
                          )}
                        </Link>
                      ) : (
                        <>
                          <FileText className="h-4 w-4 mr-1 group-hover:hidden" />
                          <span
                            onClick={() => {
                              removePage(page.pathname)
                            }}
                            className="hidden group-hover:block z-10 max-sm:truncate hover:cursor-pointer"
                          >
                            <X className="h-4 w-4 mr-1 hover:bg-gray-300 rounded-md " />
                          </span>
                          <Link href={page.pathname}>{page.title}</Link>
                        </>
                      )}{' '}
                    </div>
                  </Button>
                ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-row items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="border ml-[200px] max-sm:ml-0 border-gray-300 p-2 rounded-full h-fit bg-gray-100 flex flex-row items-center gap-1 ring-0 outline-none">
            {session?.user ? (
              <User className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[20vw] max-md:w-[50vw] max-lg:w-[50vw] max-sm:w-[70vw] rounded-2xl mr-20 max-sm:mr-8 bg-white shadow-2xl">
            {session?.user ? (
              <DropdownMenuLabel className="p-4">
                <div className="text-base">{session.user.name}</div>
                <Link
                  href={`mailto:${session.user.email}`}
                  className="text-sm font-normal text-gray-500"
                >
                  {session.user.email}
                </Link>
              </DropdownMenuLabel>
            ) : (
              <DropdownMenuItem
                className="p-3 hover:bg-gray-100 hover:cursor-pointer rounded-md rounded-tl-xl rounded-tr-xl"
                asChild
              >
                <Link href={'/signin'} className="flex flex-row items-center">
                  <User className="h-4 w-4 mr-2 inline-block" />{' '}
                  <p className="text-sm">Login</p>
                </Link>
              </DropdownMenuItem>
            )}

            {session?.user && (
              <>
                <DropdownMenuSeparator className="bg-gray-200" />
                <DropdownMenuItem
                  asChild
                  className="p-3 hover:bg-gray-100 hover:cursor-pointer rounded-md"
                  disabled
                >
                  <Link
                    href={'/profile'}
                    className="flex flex-row items-center"
                  >
                    <User2Icon className="h-4 w-4 mr-2 inline-block" />{' '}
                    <p className="text-sm">Profile</p>{' '}
                    <Badge className="ml-2" variant={'outline'}>
                      Coming soon
                    </Badge>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="p-3 hover:bg-gray-100 hover:cursor-pointer rounded-md"
                  disabled
                >
                  <Link
                    href={'/setting'}
                    className="flex flex-row items-center"
                  >
                    <Settings className="h-4 w-4 mr-2 inline-block" />{' '}
                    <p className="text-sm">Setting</p>
                    <Badge className="ml-2" variant={'outline'}>
                      Coming soon
                    </Badge>
                  </Link>
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator className="bg-gray-200" />
            <DropdownMenuItem
              asChild
              className="p-3 hover:bg-gray-100 hover:cursor-pointer rounded-md"
              disabled
            >
              <Link href={'/developers'} className="flex flex-row items-center">
                <SquareDashedBottomCode className="h-4 w-4 mr-2 inline-block" />{' '}
                <p className="text-sm">Developers</p>{' '}
                <Badge className="ml-2" variant={'outline'}>
                  Coming soon
                </Badge>
              </Link>
            </DropdownMenuItem>
            {session?.user && (
              <>
                <DropdownMenuSeparator className="bg-gray-200" />
                <DropdownMenuItem
                  className="p-3 hover:bg-gray-100 hover:cursor-pointer rounded-md rounded-bl-xl rounded-br-xl"
                  onClick={() =>
                    signOut({
                      redirect: true,
                      callbackUrl: '/',
                    })
                  }
                >
                  <LogOut className="h-4 w-4 mr-2 inline-block" />{' '}
                  <p className="text-sm">Logout</p>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default Navigation
