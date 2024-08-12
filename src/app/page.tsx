import MaxWidthWrapper from '@/components/layout/MaxwidthWrapper'
import { TypewriterEffectSmooth } from '@/components/ui/TypeWriterEffect'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

export default async function Home() {
  const session = await getServerSession(authOptions)

  console.log('HHHHH', session)

  return (
    <MaxWidthWrapper>
      <div className="text-center text-sm flex items-center min-h-screen justify-center flex-col">
        <TypewriterEffectSmooth
          words={[
            { text: 'Noteverse', className: 'first-letter:text-blue-700' },
          ]}
        />
      </div>
    </MaxWidthWrapper>
  )
}
