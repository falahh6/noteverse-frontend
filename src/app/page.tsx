import { BackgroundGrid } from '@/components/ui/BackgroundGrid'
import MaxWidthWrapper from '@/components/layout/MaxwidthWrapper'
import { TypewriterEffectSmooth } from '@/components/ui/TypeWriterEffect'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { Button } from '@/components/ui/button'
import { LogoutButton } from './api/auth/Logout'
import Link from 'next/link'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <MaxWidthWrapper>
      {/* <div>USER</div>
      <p>Server Call</p>
      <p>{JSON.stringify(session)}</p> */}
      <div className="text-center text-sm flex items-center min-h-screen justify-center flex-col">
        <TypewriterEffectSmooth
          words={[
            { text: 'Noteverse', className: 'first-letter:text-blue-700' },
          ]}
        />

        <>
          {session?.user ? (
            <>
              <p className="text-xl font-bold">{session.user.email}</p>{' '}
              <LogoutButton />
            </>
          ) : (
            <div className="flex flex-row gap-2">
              <Button variant={'ghost'} asChild className="bg-blue-500">
                <Link href={'/signin'} className="text-sm font-bold text-white">
                  Log In
                </Link>
              </Button>
              <Button variant={'ghost'} asChild className="bg-blue-500">
                <Link href={'/signup'} className="text-sm font-bold text-white">
                  Sign Up
                </Link>
              </Button>
            </div>
          )}
        </>
      </div>
    </MaxWidthWrapper>
  )
}
