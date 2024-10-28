import MaxWidthWrapper from '@/components/layout/MaxwidthWrapper'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/authoptions'
import { Cover } from '@/components/ui/cover'
import Link from 'next/link'
import { BackgroundDots } from '@/components/ui/BackgroundGrid'
import Image from 'next/image'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid'
import { RainbowButton } from '@/components/ui/rainbow-button'
import StyledBadge from '@/components/ui/styled-badge'
import { features } from '@/lib/data'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <BackgroundDots>
      <MaxWidthWrapper>
        <div className="text-center text-sm min-h-screen flex flex-col items-center justify-center h-full mb-72">
          <div className="mt-[30vh]">
            <StyledBadge text="In a developmental stage" />
            <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
              Create simple and sleek notes <br /> with{' '}
              <Cover>
                <p>
                  <span className="text-blue-800">N</span>oteverse
                </p>
              </Cover>
            </h1>

            <RainbowButton>
              {session?.user ? (
                <Link href={'/notes?type=featured'}>
                  <span className="text-sm font-normal py-1 shadow-sm hover:shadow-xl">
                    Go to your Dashboard
                  </span>
                </Link>
              ) : (
                <Link href={'/signup'}>
                  <span className="text-sm font-normal py-1 shadow-sm hover:shadow-xl">
                    Get Started for free
                  </span>
                </Link>
              )}
            </RainbowButton>
          </div>
          <ContainerScroll
            titleComponent={
              <>
                <h1 className="text-2xl font-semibold text-black dark:text-white">
                  I said simple <br />
                  <span className="text-3xl md:text-[4rem] font-bold mt-1 leading-none">
                    and I mean it.
                  </span>
                </h1>
              </>
            }
          >
            <Image
              src={`https://bvnp6cpie7oauwed.public.blob.vercel-storage.com/assets/Screenshot%202024-09-30%20at%205.19.23%E2%80%AFPM-IbRTguB3It0reF5OgzwweVXBwAUZKe.png`}
              alt="hero"
              height={620}
              width={1400}
              className="mx-auto rounded-2xl object-cover h-full object-left-top"
              draggable={false}
            />
          </ContainerScroll>

          <div className="flex flex-col justify-center items-center h-full w-[80%]">
            <h1 className="text-3xl text-center w-full font-semibold">
              Ofcourse it's realtime, and more
            </h1>
            <BentoGrid className="lg:grid-rows-3 py-10 text-left ">
              {features.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
              ))}
            </BentoGrid>
          </div>
        </div>
      </MaxWidthWrapper>
    </BackgroundDots>
  )
}
