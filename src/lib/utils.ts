import { type ClassValue, clsx } from 'clsx'
import { Metadata } from 'next'
import { twMerge } from 'tailwind-merge'
import { SchemaChildNode } from './types/notes'

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
