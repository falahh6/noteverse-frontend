import { type ClassValue, clsx } from 'clsx'
import { Metadata } from 'next'
import { twMerge } from 'tailwind-merge'
import { SchemaChildNode } from './types/notes'
import { useMemo } from 'react'
import { JSONContent } from 'novel'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function constructMetadata({
  title = 'Noteverse',
  description = 'The everything notes app.',
  image = '/thumbnail.png',
  icons = '/noteverse-logo-md.svg',
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@ffalah_',
    },
    icons,
    metadataBase: new URL('https://localhost:3000'),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}

export function debounce(func: (noteContent: any) => void, wait: number) {
  let timeout: NodeJS.Timeout
  return function (...args: any[]) {
    const later = () => {
      clearTimeout(timeout)
      //@ts-ignore
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function extractText(nodes: SchemaChildNode[]): string {
  let result = ''

  for (const node of nodes) {
    if (node.text) {
      result += node.text
    }
    if (node.children && node.children.length > 0) {
      result += extractText(node.children)
    }
  }

  return result
}

export const baseURL = 'https://aadil611.live/api'

export function useExampleRoomId(roomId: string) {
  // const params = useSearchParams()
  const exampleId = '' //params?.get('exampleId')

  const exampleRoomId = useMemo(() => {
    return exampleId ? `${roomId}-${exampleId}` : roomId
  }, [roomId, exampleId])

  return exampleRoomId
}

export function avatarFallbackHandler(name: string) {
  let fallback: string = ''
  const nameParts = name.split(' ')

  if (nameParts.length === 1) {
    fallback = nameParts[0].slice(0, 1).toUpperCase()
  } else {
    fallback =
      nameParts[0].slice(0, 1).toUpperCase() +
      nameParts[nameParts.length - 1].slice(0, 1).toUpperCase()
  }

  return fallback
}

export function formatDate(inputDate: string): string {
  const date = new Date(inputDate)
  const today = new Date()

  // Reset time portion of the dates for accurate day difference calculation
  today.setHours(0, 0, 0, 0)
  date.setHours(0, 0, 0, 0)

  // Calculate the difference in time (milliseconds) and convert it to days
  const diffTime = today.getTime() - date.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return 'Today'
  } else if (diffDays === 1) {
    return 'Yesterday'
  } else if (diffDays > 1 && diffDays <= 5) {
    return `${diffDays} days ago`
  } else {
    // If more than 5 days, return the date in "7 Sept 2023" format
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }
    return date.toLocaleDateString('en-US', options)
  }
}

export const getAppUrl = () => {
  const appBaseUrl = window.location.href
  const url = new URL(appBaseUrl)
  const applicationBaseURL = `${url.protocol}//${url.hostname}${url.port ? `:${url.port}` : ''}`

  return applicationBaseURL
}

export const visibleLightColors = [
  '#ADD8E6', // Light Blue
  '#90EE90', // Light Green
  '#FFB6C1', // Light Pink
  '#FFD700', // Gold
  '#FFA07A', // Light Salmon
  '#87CEFA', // Light Sky Blue
  '#FF69B4', // Hot Pink
  '#BA55D3', // Medium Orchid
  '#9370DB', // Medium Purple
  '#FF6347', // Tomato
  '#40E0D0', // Turquoise
  '#48D1CC', // Medium Turquoise
  '#AFEEEE', // Pale Turquoise
  '#DB7093', // Pale Violet Red
  '#FFC0CB', // Pink
  '#FFDAB9', // Peach Puff
  '#EE82EE', // Violet
  '#DAA520', // Goldenrod
  '#CD5C5C', // Indian Red
  '#B0E0E6', // Powder Blue
]

export function findDifferences(
  obj1: JSONContent | undefined,
  obj2: JSONContent | undefined,
): string | null {
  if (obj1 == undefined || obj2 == undefined) return null
  // Helper function for deep equality
  function deepEqual(item1: any, item2: any): boolean {
    if (item1 === item2) return true

    if (
      typeof item1 !== 'object' ||
      typeof item2 !== 'object' ||
      item1 === null ||
      item2 === null
    ) {
      return false
    }

    const keys1 = Object.keys(item1)
    const keys2 = Object.keys(item2)

    if (keys1.length !== keys2.length) return false

    for (let key of keys1) {
      if (!keys2.includes(key) || !deepEqual(item1[key], item2[key])) {
        return false
      }
    }

    return true
  }

  // Check if both objects have content arrays
  if (Array.isArray(obj1?.content) && Array.isArray(obj2?.content)) {
    for (let i = 0; i < obj2.content.length; i++) {
      const item1 = obj1.content[i]
      const item2 = obj2.content[i]

      // If the items are not deeply equal, return the differing text
      if (!deepEqual(item1, item2)) {
        if (item2?.content?.[0]?.text) {
          return item2.content[0].text // Return the differing text
        }
        return 'Difference found, but no text content'
      }
    }
  }

  return null
}
