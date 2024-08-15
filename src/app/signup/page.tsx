'use client'

import React, { useState } from 'react'
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(signupSchema),
  })

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setSubmitLoading(true)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (res.status === 201) {
        // window.location.href = `/verify/${data.email}` //xau_8uR93fY4H4qv9jnNo3vt1vVjIz15dfRR6
        // router.replace(`/verify/${data.email}`)
        // // window.location.href = '/'
        // const result = await signIn('credentials', {
        //   redirect: false,
        //   email: data.email,
        //   password: data.password,
        // })
        // if (result?.ok) {
        //   window.location.href = '/'
        // } else {
        //   alert('Signin failed')
        // }
      } else {
        toast.error('Signup failed, Please try again.')
      }
    } catch (error) {
      toast.error('Signup failed, Please try again.')
    } finally {
      setSubmitLoading(false)
    }
  }

  return (
    <MaxWidthWrapper className="h-full w-full flex flex-col items-center justify-center rounded-lg">
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

          <button
            className="bg-gradient-to-br group relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
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

          <div className="mt-4 w-full flex items-center justify-center">
            <p className="text-sm font-semibold text-gray-600">
              Already have an account?{' '}
              <span className="text-blue-500  transition-[text-decoration-line] duration-300 ease-in-out hover:underline">
                <Link href={'/signin'}>Login!</Link>
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
