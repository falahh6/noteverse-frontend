import { type ClassValue, clsx } from 'clsx'
import { Metadata } from 'next'
import { twMerge } from 'tailwind-merge'
import { SchemaChildNode } from './types/notes'
import { useMemo } from 'react'

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
  name.split(' ').forEach((name) => {
    fallback += name.slice(0, 1).toUpperCase()
  })

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
