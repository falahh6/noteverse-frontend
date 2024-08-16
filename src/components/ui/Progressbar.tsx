'use client'

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

const ProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#004AAD"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  )
}

export default ProgressBarProvider
