import { BackgroundGrid } from '@/components/ui/BackgroundGrid'
import MaxWidthWrapper from '@/components/layout/MaxwidthWrapper'
import { TypewriterEffectSmooth } from '@/components/ui/TypeWriterEffect'

export default function Home() {
  return (
    <BackgroundGrid>
      <MaxWidthWrapper>
        <div className="text-center text-sm flex items-center h-screen justify-center ">
          <TypewriterEffectSmooth
            words={[
              { text: 'Noteverse', className: 'first-letter:text-blue-700' },
            ]}
          />
        </div>
      </MaxWidthWrapper>
    </BackgroundGrid>
  )
}
