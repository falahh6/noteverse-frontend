'use client'

import MaxWidthWrapper from '@/components/layout/MaxwidthWrapper'
import { CheckCircle, Loader } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

const Page = () => {
  const [loading, setLoading] = useState(true)
  const params = useSearchParams()
  const vid = params.get('vid')

  const [error, setError] = useState('')

  const [verified, setVerified] = useState(false)

  const handleEmailVerification = useCallback(
    async (vid: string) => {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verificationToken: vid }),
      })
      const results = await response.json()
      return results
    },
    [vid],
  )

  useEffect(() => {
    if (!vid) {
      toast.error('Invalid verification link')
      return
    }

    handleEmailVerification(vid)
      .then(async (res) => {
        console.log(res)
        if (res.verified) {
          setVerified(true)
          setLoading(false)

          window.location.href = '/signin'
        }
      })
      .finally(() => setLoading(false))
  }, [vid])

  return (
    <MaxWidthWrapper className="h-screen w-full flex flex-col items-center justify-center rounded-lg">
      <div className="max-w-md max-sm:max-w-[80%] w-full mx-auto rounded-lg md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black border border-gray-300">
        {loading && (
          <div className="flex flex-row gap-4 items-center text-gray-600">
            <Loader className="h-4 w-4 md:h-6 md:w-6 animate-spin" />{' '}
            <h4 className="text-sm md:text-base">
              Please wait while we are verifying your email.
            </h4>
          </div>
        )}
        {verified && (
          <div className="flex flex-row gap-4 items-center text-green-600">
            {loading ? (
              <Loader className="h-4 w-4 md:h-6 md:w-6 animate-spin text-green-600" />
            ) : (
              <CheckCircle className="h-4 w-4 md:h-6 md:w-6 text-green-600" />
            )}
            <h4 className="text-sm md:text-base">
              Your email has been verified. Please wait while we are logging you
              in.
            </h4>
          </div>
        )}
        {error && (
          <div className="flex flex-row gap-4 items-center text-red-600">
            <h4 className="text-sm md:text-base">{error}</h4>
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  )
}

export default Page
