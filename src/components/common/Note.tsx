'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { NoteProps } from '@/lib/types/notes'

export default function Note({ note }: { note: NoteProps }) {
  const wasUpdated = note.updatedAt > note.createdAt
  const createdUpdatedAtTimestamp = (
    wasUpdated ? note.updatedAt : note.createdAt
  ).toDateString()

  const router = useRouter()

  return (
    <>
      <Card className="flex cursor-pointer flex-col justify-between transition-shadow hover:shadow-lg">
        <div>
          <CardHeader>
            <CardTitle>{note.title}</CardTitle>
            <CardDescription>
              {createdUpdatedAtTimestamp}
              {wasUpdated && ' (updated)'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line">{note.content}</p>
          </CardContent>
        </div>
        <CardFooter className="place-self-end">
          <Button
            onClick={() => {
              router.push(`/notes/${note.id}`)
            }}
            variant="outline"
            className="border border-gray-300"
          >
            <Edit className="mr-2 h-5 w-5" /> Edit
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}
