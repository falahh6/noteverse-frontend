'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ArrowBigUp,
  Check,
  Copy,
  ExternalLink,
  Loader,
  Trash2,
} from 'lucide-react'
import { getNotesFnType, NoteProps } from '@/lib/types/notes'
import { Popconfirm, Tooltip } from 'antd'
import { toast } from 'sonner'
import { formatDate, getAppUrl } from '@/lib/utils'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

const trucateNotesContent = (content: string | null, length: number) => {
  if (content && content.length > length) {
    return content.slice(0, length) + '...'
  } else {
    return content
  }
}

const truncateNotesTitle = (title: string, length: number) => {
  if (title.length > length) {
    return title.slice(0, length) + '...'
  } else {
    return title
  }
}

export default function Note({
  note,
  authToken,
  getNotesList,
  getFeaturedNotes,
  getSharedNotes,
  listView,
}: {
  note: NoteProps
  authToken: string | undefined
  getNotesList: getNotesFnType
  getFeaturedNotes: getNotesFnType
  getSharedNotes: getNotesFnType
  listView: 'list' | 'grid'
}) {
  const wasUpdated = note.updatedAt > note.createdAt
  const createdUpdatedAtTimestamp = wasUpdated ? note.updatedAt : note.createdAt
  const [noteLikes, setNoteLikes] = useState<
    {
      id: string
      email: string
    }[]
  >(note.likes)

  const { data } = useSession()

  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  const [deleteLoading, setDeleteLoading] = useState(false)

  const handleDeleteNotes = async (notesId: string) => {
    if (authToken) {
      setDeleteLoading(true)
      const response = await fetch(`/api/notes?notes_id=${notesId}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `${authToken}`,
        },
      })

      if (response.ok) {
        await Promise.all([
          getFeaturedNotes(authToken, true),
          getNotesList(authToken, true),
        ])
          .then(() => {
            console.log('deleted n fetched')
          })
          .finally(() => {
            setDeleteLoading(false)
            toast.warning('Deleted your notes.')
          })
      } else {
        toast.error('Error deleting your notes, Please try again.')
        setDeleteLoading(false)
      }
    }
  }

  const [isCopied, setIsCopied] = useState(false)

  const copyHandler = () => {
    const notesUrl = getAppUrl() + `/notes/${note.id}`

    navigator.clipboard
      .writeText(notesUrl)
      .then(() => {
        toast.success('Notes URL copied to clipboard')
        setIsCopied(true)
      })
      .catch(() => {
        toast.error('Error copying URL.')
      })

    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  const [voteLoading, setVoteLoading] = useState(false)

  const voteHandler = async (type: 'add' | 'remove') => {
    setVoteLoading(true)
    try {
      if (authToken) {
        const response = await fetch(
          `/api/notes/upvotes?note_id=${note.id}&type=${type}`,
          {
            method: 'POST',
            headers: {
              Authorization: `${authToken}`,
            },
          },
        )

        if (response.ok) {
          setVoteLoading(false)
          if (data?.user) {
            if (type === 'add') {
              setNoteLikes((prev) => [
                ...prev,
                {
                  id: data?.user.id as unknown as string,
                  email: data?.user.email as string,
                },
              ])
            } else {
              setNoteLikes((prev) =>
                prev.filter((d) => d.email !== data?.user.email),
              )
            }
          }

          console.log('upvote : ', await response.json())
          await Promise.all([
            getFeaturedNotes(authToken, true),
            getSharedNotes(authToken, true),
            getNotesList(authToken, true),
          ])
        } else {
          toast.error('Error, please try again!')
          setVoteLoading(false)
        }
      }
    } catch (error) {
      toast.error('Error, please try again!')
    }
  }

  return (
    <Card
      className={`flex cursor-pointer flex-col justify-between transition-shadow hover:shadow-md`} //${type !== 'your-notes' && 'pb-3'}
    >
      <Link href={`/notes/${note.id}`}>
        <CardHeader className="pb-2 max-sm:p-4">
          <CardTitle className="text-lg">
            {truncateNotesTitle(note.title, listView === 'grid' ? 35 : 100)}
          </CardTitle>
          <CardDescription className="text-sm">
            {formatDate(createdUpdatedAtTimestamp)}
            {wasUpdated && ' (updated)'}
          </CardDescription>
        </CardHeader>
        <CardContent className="py-2 max-sm:py-0 max-sm:px-4 text-sm">
          <p className="whitespace-pre-line">
            {trucateNotesContent(note.content, listView === 'grid' ? 100 : 200)}
          </p>
        </CardContent>
      </Link>
      <div className="p-2 px-6 pb-3 w-full text-center bg-gradient-to-t from-gray-100 via-gray-50 to-white rounded-bl-sm rounded-br-sm">
        <div
          className={`flex flex-row ${listView === 'grid' ? 'justify-between' : 'justify-start gap-4'} items-center gap-2`}
        >
          <div className="flex flex-row bg-gray-100 justify-center items-center  rounded-2xl border">
            <Tooltip
              title={
                noteLikes?.find((d) => d.email === data?.user.email) ? (
                  <p className="text-xs">Down vote</p>
                ) : (
                  <p className="text-xs">Up vote</p>
                )
              }
            >
              <button
                onClick={() =>
                  voteHandler(
                    noteLikes?.find((d) => d.email === data?.user.email)
                      ? 'remove'
                      : 'add',
                  )
                }
                className="rounded-full hover:bg-gray-200 p-1 group disabled:cursor-wait"
                disabled={voteLoading}
              >
                <ArrowBigUp
                  strokeWidth={1}
                  fill={
                    noteLikes?.find((d) => d.email === data?.user.email)
                      ? '#60a5fa'
                      : '#00000000'
                  }
                  className="text-gray-700 inline h-6 w-6 group-hover:text-blue-400"
                />{' '}
              </button>
            </Tooltip>
            <span className="text-xs font-bold text-gray-600 pr-3">
              {noteLikes.length}
            </span>
          </div>
          {type === 'your-notes' && (
            <div className="flex flex-row justify-between gap-2">
              <Link href={`/notes/${note.id}`} target="_blank">
                <ExternalLink className="h-6 w-6 text-gray-500 p-1 hover:bg-gray-200 rounded-md" />
              </Link>
              {isCopied ? (
                <Check className="h-6 w-6 text-blue-600 p-1 hover:bg-gray-200 rounded-md" />
              ) : (
                <Copy
                  onClick={copyHandler}
                  className="h-6 w-6 text-blue-600 p-1 hover:bg-gray-200 rounded-md"
                />
              )}
              <Popconfirm
                placement="top"
                title={<b>Are you sure want to delete this notes?</b>}
                onConfirm={() => {
                  handleDeleteNotes(note.id)
                }}
                okText="Yes"
                cancelText="No"
                disabled={deleteLoading}
              >
                {deleteLoading ? (
                  <Loader className="h-6 w-6 p-1 animate-spin" />
                ) : (
                  <Trash2 className="h-6 w-6 text-red-500 p-1 hover:bg-gray-200 rounded-md" />
                )}
              </Popconfirm>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
