import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export const BackgroundGrid = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        'h-full min-h-full min-w-full w-full dark:bg-black bg-white dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] overflow-scroll fixed top-0 left-0 right-0 bottom-0',
        className,
      )}
    >
      <div className="fixed top-0  left-0 right-0 bottom-0  pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-gray-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] max-sm:[mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)]"></div>
      {children}
    </div>
  )
}

export const BackgroundDots = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-gray-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      {children}
    </div>
  )
}
