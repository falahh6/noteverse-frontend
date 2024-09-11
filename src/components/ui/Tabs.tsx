'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'

type Tab = {
  title: string
  value: string
  content?: string | React.ReactNode | any
}

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[]
  containerClassName?: string
  activeTabClassName?: string
  tabClassName?: string
  contentClassName?: string
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  const [active, setActive] = useState<Tab>(propTabs[0])
  const [tabs, setTabs] = useState<Tab[]>(propTabs)

  useEffect(() => {
    if (type) {
      setActive(propTabs.filter((tab) => tab.value === type)[0])
    } else {
      moveSelectedTabToTop(0, propTabs[0].value)
    }
  }, [])

  useEffect(() => {
    if (type) {
      setActive(propTabs.filter((tab) => tab.value === type)[0])
    }
  }, [type])

  const moveSelectedTabToTop = (idx: number, tabValue: string) => {
    // console.log(idx, tabValue)
    const newTabs = [...propTabs]
    const selectedTab = newTabs.splice(idx, 1)
    newTabs.unshift(selectedTab[0])
    setTabs(newTabs)
    setActive(newTabs[0])
    router.push(`/notes?type=${tabValue}`)
  }

  const [hovering, setHovering] = useState(false)

  return (
    <>
      <div
        className={cn(
          'flex flex-row items-center flex-wrap justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-fit',
          containerClassName,
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => {
              moveSelectedTabToTop(idx, tab.value)
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn(
              'relative px-4 py-1 text-sm font-bold max-sm:text-xs max-sm:font-semibold  rounded-full',
              tabClassName,
            )}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {active?.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                className={cn(
                  'absolute inset-0 bg-gray-200 dark:bg-zinc-800 rounded-full ',
                  activeTabClassName,
                )}
              />
            )}

            <span className="relative block text-black dark:text-white">
              {tab.title}
            </span>
          </button>
        ))}
      </div>
    </>
  )
}
