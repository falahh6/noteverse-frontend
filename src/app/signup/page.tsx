'use client'

import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/Input'
import { ArrowRight, CircleCheck, Loader } from 'lucide-react'
import MaxWidthWrapper from '@/components/layout/MaxwidthWrapper'
import Link from 'next/link'
import * as yup from 'yup'
import { toast } from 'sonner'
import { signIn, useSession } from 'next-auth/react'
import { SendVerificationEmail } from '@/lib/api'
import { Icons } from '@/components/icons'

interface IFormInput {
  name: string
  email: string
  password: string
}

const Page = () => {
  const [submitLoading, setSubmitLoading] = useState(false)
  const signupSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup
      .string()
      .email('Invalid email format')
      .required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long'),
  })

  const [resErrors, setResErrors] = useState<string>('')

  const { status } = useSession()

  useEffect(() => {
    if (status === 'authenticated') {
      window.location.href = '/'
    }
  }, [status])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(signupSchema),
  })

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setSubmitLoading(true)
    setResErrors('')
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const response = await res.json()
      console.log('Response:', response)

      if (response.email && response.email.length > 0) {
        if (response.verificationToken) {
          console.log('User not verified')

          //send email
          SendVerificationEmail(
            response.email,
            'Verify your email',
            window.location.host + `/verify?vid=${response.verificationToken}`,
          )
            .then(() => {
              toast.info(
                'We have sent you a verification email. Please verify your email to continue.',
                {
                  position: 'top-center',
                  closeButton: false,
                },
              )
            })
            .catch(() => {
              toast.error(
                'Failed to send verification email. Please try again.',
              )
            })
        } else {
          toast.success('Signup successful!')
        }
      } else {
        setResErrors(response.error)
      }
    } catch (error) {
      toast.error('Signup failed, Please try again.  #3')
    } finally {
      setSubmitLoading(false)
    }
  }

  return (
    <MaxWidthWrapper className="h-screen w-full flex flex-col items-center justify-center rounded-lg">
      <div className="max-w-md max-sm:max-w-[80%] w-full mx-auto rounded-lg md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black border border-gray-300">
        <h2 className="font-bold text-xl max-sm:text-lg text-neutral-800 dark:text-neutral-200">
          Sign Up to Noteverse
        </h2>
        <p className="text-neutral-600 text-sm max-sm:text-xs max-w-sm mt-2 dark:text-neutral-300">
          Effortlessly secure access to your account with Noteverse.
        </p>

        <form className="mt-6 max-sm:mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Tyler"
                type="text"
                {...register('name')}
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              {...register('password')}
            />
            {errors.password && (
              <div className="flex flex-row items-center">
                <CircleCheck
                  className="mr-1 text-white h-4 w-4"
                  fill="#ef4444"
                />
                <p className="text-red-500 text-xs font-bold">
                  {errors.password.message}
                </p>
              </div>
            )}
          </LabelInputContainer>

          {resErrors && (
            <div className="bg-red-100 text-red-500 p-2 rounded-md mb-4 text-xs">
              {resErrors}
            </div>
          )}

          <button
            className="bg-gradient-to-br text-sm group relative group/btn from-black dark:from-zinc
            -900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-m
            edium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px
            _0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign Up{' '}
            {submitLoading ? (
              <Loader className="h-5 w-5 inline animate-spin" />
            ) : (
              <ArrowRight className="h-5 w-5 inline transition-all duration-300 ease-in-out group-hover:ml-4" />
            )}
            <BottomGradient />
          </button>
        </form>
        <div className="flex flex-row justify-center items-center">
          <div
            className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to
-transparent my-4 h-[1px] w-full"
          />
          <span className="text-xs">or</span>
          <div
            className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to
-transparent my-4 h-[1px] w-full"
          />
        </div>
        <button
          className="border relative group/btn flex space-x-2 w-full items-center justify-center px-4 w-fu
ll text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_
0px_1px_1px_var(--neutral-800)]"
          onClick={() => signIn('google')}
        >
          <Icons.google
            width={20}
            height={20}
            className="text-neutral-800 dark:text-neutral-300"
          />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Continue with Google
          </span>
          <BottomGradient />
        </button>
        <div className="mt-4 w-full flex items-center justify-center">
          <p className="text-sm font-semibold text-gray-600">
            Already have an account?{' '}
            <span
              className="text-blue-500  transition-[text-decoration-line] duration-300 ease-in-
out hover:underline"
            >
              <Link href={'/signin'}>Login!</Link>
            </span>
          </p>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default Page

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  )
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn('flex flex-col space-y-2 w-full', className)}>
      {children}
    </div>
  )
}
