'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Edit, Share, Trash } from 'lucide-react'
import { NoteProps } from '@/lib/types/notes'
import { Button as AntdButton, Popconfirm } from 'antd'
import { toast } from 'sonner'
import { baseURL } from '@/lib/utils'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Icons } from '../icons'

import {
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
} from 'next-share'
import { useSearchParams } from 'next/navigation'

const trucateNotesContent = (content: string | null) => {
  if (content && content.length > 100) {
    return content.slice(0, 100) + '...'
  } else {
    return content
  }
}

const truncateNotesTitle = (title: string) => {
  if (title.length > 30) {
    return title.slice(0, 30) + '...'
  } else {
    return title
  }
}

export default function Note({
  note,
  authToken,
  getNotesList,
}: {
  note: NoteProps
  authToken: string | undefined
  getNotesList: (authToken: string) => {}
}) {
  const wasUpdated = note.updatedAt > note.createdAt
  const createdUpdatedAtTimestamp = (
    wasUpdated ? note.updatedAt : note.createdAt
  ).toDateString()

  const searchParams = useSearchParams()
  const type = searchParams.get('type')

  const handleDeleteNotes = async (notesId: string) => {
    if (authToken) {
      const response = await fetch(`${baseURL}/notes/${notesId}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })

      if (response.ok) {
        toast.warning('Deleted your notes.')
        getNotesList(authToken)
      } else {
        toast.error('Error deleting your notes, Please try again.')
      }
    }
  }

  return (
    <>
      <Card className="flex cursor-pointer flex-col justify-between transition-shadow hover:shadow-lg">
        <Link href={`/notes/${note.id}`}>
          <CardHeader>
            <CardTitle>{truncateNotesTitle(note.title)}</CardTitle>
            <CardDescription>
              {createdUpdatedAtTimestamp}
              {wasUpdated && ' (updated)'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line">
              {trucateNotesContent(note.content)}
            </p>
          </CardContent>
        </Link>
      </Card>
    </>
  )
}
