import MaxWidthWrapper from '@/components/layout/MaxwidthWrapper'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/authoptions'
import { Cover } from '@/components/ui/cover'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { BackgroundDots, BackgroundGrid } from '@/components/ui/BackgroundGrid'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session?.user) redirect('/notes')

  return (
    <BackgroundDots>
      <MaxWidthWrapper>
        <div className="text-center text-sm flex items-center min-h-screen justify-center flex-col">
          <div>
            <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
              Create simple and sleek notes <br /> with{' '}
              <Cover>
                <p>
                  <span className="text-blue-800">N</span>oteverse
                </p>
              </Cover>
            </h1>
            <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
              </span>
              <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10">
                <Link href={'/signup'}>
                  <span className="text-sm font-normal py-1 shadow-sm hover:shadow-xl">
                    Get Started now by Signing In
                  </span>
                </Link>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M10.75 8.75L14.25 12L10.75 15.25"
                  ></path>
                </svg>
              </div>
              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
            </button>
          </div>
        </div>
      </MaxWidthWrapper>
    </BackgroundDots>
  )
}
