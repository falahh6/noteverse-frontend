'use client'
import React from 'react'
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
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  SquareDashedBottomCode,
  User,
  User2Icon,
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import { DefaultSession } from 'next-auth'
import { Button } from '../ui/button'

const Navigation = ({
  className,
  session,
}: {
  className?: string
  session: DefaultSession | null
}) => {
  return (
    <div className="min-h-[10vh] px-20 max-sm:px-8 w-full bg-gradient-to-b from-gray-300  to-transparent fixed top-0 left-0 right-0 flex flex-row justify-between items-center backdrop:blur-0 backdrop-blur-lg">
      <div className="flex flex-row gap-2 items-center">
        <a href={'/'} className="flex flex-row items-center">
          <Image
            src={'/noteverse-logo-full.svg'}
            alt="logo-sm"
            height={48}
            width={200}
            className="max-sm:hidden"
          />
          <Image
            src={'/logo-sm.svg'}
            alt="logo-sm"
            height={48}
            width={48}
            className="max-sm:block hidden"
          />{' '}
        </a>
      </div>

      <div className="flex flex-row items-center gap-4">
        {session?.user && (
          <div>
            <Button
              variant={'outline'}
              className="bg-transparent h-fit py-1 border border-gray-300"
              asChild
            >
              <Link href={'/notes'}>
                <LayoutDashboard className="h-4 w-4 mr-2" /> Dashboard
              </Link>
            </Button>
          </div>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger className="border border-gray-300 p-2 rounded-full h-fit bg-gray-100 flex flex-row items-center gap-1 ring-0 outline-none">
            {session?.user ? (
              <User className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[20vw] max-md:w-[50vw] max-lg:w-[50vw] max-sm:w-[50vw] rounded-2xl mr-20 max-sm:mr-8 bg-white">
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
                >
                  <Link
                    href={'/profile'}
                    className="flex flex-row items-center"
                  >
                    <User2Icon className="h-4 w-4 mr-2 inline-block" />{' '}
                    <p className="text-sm">Profile</p>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="p-3 hover:bg-gray-100 hover:cursor-pointer rounded-md"
                >
                  <Link
                    href={'/setting'}
                    className="flex flex-row items-center"
                  >
                    <Settings className="h-4 w-4 mr-2 inline-block" />{' '}
                    <p className="text-sm">Setting</p>
                  </Link>
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator className="bg-gray-200" />
            <DropdownMenuItem
              asChild
              className="p-3 hover:bg-gray-100 hover:cursor-pointer rounded-md"
            >
              <Link href={'/developers'} className="flex flex-row items-center">
                <SquareDashedBottomCode className="h-4 w-4 mr-2 inline-block" />{' '}
                <p className="text-sm">Developers</p>
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
