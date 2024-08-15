'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { useMotionTemplate, useMotionValue, motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from './button'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const radius = 100 // change this to increase the rdaius of the hover effect
    const [visible, setVisible] = React.useState(false)

    const [showPassword, setShowPassword] = React.useState(false)
    const showPasswordHandler = (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setShowPassword(!showPassword)

      if (ref && typeof ref === 'object' && ref.current) {
        ref.current.focus()
        const length = ref.current.value.length
        ref.current.selectionStart = ref.current.selectionEnd = length
      }
    }

    let mouseX = useMotionValue(0)
    let mouseY = useMotionValue(0)

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      let { left, top } = currentTarget.getBoundingClientRect()

      mouseX.set(clientX - left)
      mouseY.set(clientY - top)
    }

    return (
      <motion.div
        style={{
          background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
          var(--blue-500),
          transparent 80%
        )
      `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="p-[2px] rounded-lg transition duration-300 group/input relative"
      >
        <input
          type={
            type === 'password' ? (showPassword ? 'text' : 'password') : type
          }
          className={cn(
            `flex h-10 w-full border bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
          focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
           disabled:cursor-not-allowed disabled:opacity-50
           dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
           group-hover/input:shadow-none transition duration-400  ${type === 'password' && 'pr-10'}
           `,
            className,
          )}
          ref={ref}
          {...props}
        />
        {type === 'password' && (
          <Button
            type="button"
            // variant={'outline'}
            className="absolute right-1.5 top-[7px] h-fit w-fit p-1 m-0 hover:bg-gray-100 border border-transparent hover:border-gray-300 bg-transparent"
            onClick={showPasswordHandler}
            onMouseDown={(e) => e.preventDefault()}
          >
            {showPassword ? (
              <EyeOff className=" text-gray-600 hover:text-gray-400 h-5 w-5" />
            ) : (
              <Eye className=" text-gray-600  hover:text-gray-400 h-5 w-5" />
            )}
          </Button>
        )}
      </motion.div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
