'use client'

import { User } from 'next-auth'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { toast } from 'sonner'

const AuthSignIn = ({ user }: { user: User | undefined }) => {
  const params = useSearchParams()
  const authCode = params.get('authCode')
  let init = false

  const autoSignin = useCallback(async () => {
    toast.loading('Please wait we are logging you in as Demo user.', {
      position: 'top-right',
    })
    await new Promise((res) => setTimeout(res, 2000))
    const response = await signIn('credentials', {
      redirect: false,
      email: process.env.NEXT_PUBLIC_AUTOSIGN_IN_EMAIL,
      password: process.env.NEXT_PUBLIC_AUTOSIGN_IN_PASS,
    })

    if (response?.ok) {
      window.location.href = '/'
      console.log('LOGGED IN')
    } else {
      toast.error('SignUp failed, Please try again.')
    }
  }, [])

  useEffect(() => {
    if (authCode === 'pepperonipizza' && !user && !init) {
      localStorage.removeItem('toast-shown')
      autoSignin()
      init = true
    }

    const toastShown = localStorage.getItem('toast-shown')

    if (
      user &&
      user.email === process.env.NEXT_PUBLIC_AUTOSIGN_IN_EMAIL &&
      !init &&
      toastShown !== 'true'
    ) {
      toast.success(`Successfully logged you in as Demo user. `, {
        position: 'top-center',
        closeButton: false,
      })
      localStorage.setItem('toast-shown', 'true')
      init = true
    }
  }, [])
  return <></>
}

export default AuthSignIn
