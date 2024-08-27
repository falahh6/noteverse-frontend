'use client'

import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/Input'
import { ArrowRight, Loader } from 'lucide-react'
import MaxWidthWrapper from '@/components/layout/MaxwidthWrapper'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import * as yup from 'yup'
import { toast } from 'sonner'

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
})

interface IFormInput {
  email: string
  password: string
}

const Page = () => {
  const [error, setError] = useState<{ type: string; message: string }>()
  const [submitLoading, setSubmitLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setSubmitLoading(true)
    console.log(data)
    try {
      const response = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      })

      if (response?.ok) {
        window.location.href = '/'
      } else if (response?.error) {
        setError({
          type: 'invalid-credentials',
          message: 'Your Email or Password is Invalid.',
        })
      } else {
        toast.error('Sign in failed.')
      }
    } catch (error) {
      toast.error('Sign in failed.')
    } finally {
      setSubmitLoading(false)
    }
  }

  return (
    <MaxWidthWrapper className="h-screen w-full flex flex-col items-center justify-center rounded-lg">
      <div className="max-w-md max-sm:max-w-[80%] w-full mx-auto rounded-lg md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black border border-gray-300">
        <h2 className="font-bold text-xl max-sm:text-lg text-neutral-800 dark:text-neutral-200">
          Welcome back!
        </h2>
        <p className="text-neutral-600 text-sm max-sm:text-xs max-w-sm mt-2 dark:text-neutral-300">
          Securely access your account with ease using Noteverse.
        </p>

        <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
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
          <LabelInputContainer className="mb-4 w-full">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                {...register('password')}
                onChange={() => {
                  setError(undefined)
                }}
              />
            </div>
            {errors.password?.message && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
            {error?.type && (
              <p className="text-red-500 text-xs">{error.message}</p>
            )}
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br group relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
            disabled={submitLoading}
          >
            Log In{' '}
            {submitLoading ? (
              <Loader className="h-5 w-5 inline animate-spin" />
            ) : (
              <ArrowRight className="h-5 w-5 inline transition-all duration-300 ease-in-out group-hover:ml-4" />
            )}
            <BottomGradient />
          </button>

          <div className="mt-4 w-full flex items-center justify-center">
            <p className="text-sm font-semibold text-gray-600">
              Don&apos;t have an account?{' '}
              <span className="text-blue-500 hover:underline transition-all duration-300 ease-in-out">
                <Link href={'/signup'}>Create!</Link>
              </span>
            </p>
          </div>
        </form>
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
