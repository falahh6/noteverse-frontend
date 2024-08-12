'use client'

import MaxWidthWrapper from '@/components/layout/MaxwidthWrapper'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import { useEffect } from 'react'

const Page = ({
  params,
}: {
  params: {
    email: string
  }
}) => {
  useEffect(() => {
    console.log(params.email)
  }, [])

  const sendEmail = async () => {
    const response = await fetch('/api/send-email', {
      method: 'POST',
    })

    console.log(response)
  }

  return (
    <MaxWidthWrapper className="h-full w-full flex flex-col items-center justify-center rounded-lg">
      <div className="max-w-md max-sm:max-w-[80%] w-full mx-auto rounded-lg md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black border border-gray-300">
        <h2 className="font-bold text-center text-xl max-sm:text-lg text-neutral-800 dark:text-neutral-200">
          Verify your email
        </h2>
        <p className="text-neutral-600 text-center text-sm max-sm:text-xs max-w-sm mt-2 dark:text-neutral-300 mb-4">
          Before continuing, could you verify your email address by clicking on
          link we just emailed to you? If you didn&apos;t recieve the email we
          will gladly send you another.
        </p>
        <div className="w-full flex flex-col gap-2">
          <Button
            onClick={async () => {
              sendEmail()
            }}
            className="rounded-lg"
          >
            Resend verification email
          </Button>
          <Button
            onClick={() => signOut()}
            className="rounded-lg"
            variant={'outline'}
          >
            Logout
          </Button>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default Page
