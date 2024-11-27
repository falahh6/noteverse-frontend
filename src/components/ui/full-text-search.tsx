'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Search, FileText, Hash } from 'lucide-react'
import { useEffect, useState } from 'react'

const FloatingElement = ({
  children,
  delay = 0,
  isAnimating,
  className = '',
}: any) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setPosition({
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
    })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={
        isAnimating
          ? {
              opacity: 0.7,
              scale: 1,
              x: position.x,
              y: position.y,
              rotate: Math.random() * 360,
            }
          : { opacity: 0.7, scale: 1 }
      }
      transition={{
        duration: 20,
        delay,
        repeat: Infinity,
        repeatType: 'reverse',
      }}
      className={`absolute w-full ${className}`}
    >
      {children}
    </motion.div>
  )
}

const ColorfulShape = ({ color, size, delay, isAnimating }: any) => (
  <FloatingElement
    delay={delay}
    isAnimating={isAnimating}
    className={`${color} ${size}`}
  >
    <div
      className="rounded-full w-full"
      style={{ width: '100%', height: '100%' }}
    ></div>
  </FloatingElement>
)

export default function FullTextSearchBackground() {
  const [isAnimating, setIsAnimating] = useState(true)

  return (
    <div className="w-full fixed inset-0 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="relative w-full h-full">
        <AnimatePresence>
          {isAnimating && (
            <>
              <FloatingElement
                delay={0}
                isAnimating={isAnimating}
                className="text-blue-500"
              >
                <Search className="w-16 h-16" />
              </FloatingElement>
              <FloatingElement
                delay={2}
                isAnimating={isAnimating}
                className="text-green-500"
              >
                <FileText className="w-12 h-12" />
              </FloatingElement>
              <FloatingElement
                delay={4}
                isAnimating={isAnimating}
                className="text-yellow-500"
              >
                <Hash className="w-10 h-10" />
              </FloatingElement>
              <FloatingElement
                delay={1}
                isAnimating={isAnimating}
                className="text-purple-500"
              >
                <div className="text-2xl font-bold">ABC</div>
              </FloatingElement>
              <FloatingElement
                delay={3}
                isAnimating={isAnimating}
                className="text-pink-500"
              >
                <div className="text-xl font-medium">XYZ</div>
              </FloatingElement>
              <FloatingElement
                delay={5}
                isAnimating={isAnimating}
                className="text-orange-500"
              >
                <div className="text-lg">123</div>
              </FloatingElement>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
