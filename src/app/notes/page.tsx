'use client'

import AddNoteDialog from '@/components/common/AddNoteDialog'
import Note from '@/components/common/Note'
import MaxWidthWrapper from '@/components/layout/MaxwidthWrapper'
import { Button } from '@/components/ui/button'
import { baseURL, extractText } from '@/lib/utils'
import { PenBoxIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Skeleton } from 'antd'
import { Tabs } from '@/components/ui/Tabs'
import { useSearchParams } from 'next/navigation'
import { NoteProps } from '@/lib/types/notes'
import EmptyNotesState from '@/components/common/EmptyNotesState'

const Notes = () => {
  const searchParams = useSearchParams()
  const type = searchParams.get('type')

  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const [allNotes, setAllNotes] = useState<NoteProps[]>([])
  const [featuredNotes, setFeaturedNotes] = useState<NoteProps[]>([])
  const [sharedNotes, setShareNotes] = useState<NoteProps[]>([])
  const [yourNotes, setYourNotes] = useState<NoteProps[]>([])

  const { data, status } = useSession()

  const getNotesList = async (authToken: string | undefined) => {
    setLoading(true)
    if (authToken) {
      try {
        const response = await fetch(`${baseURL}/notes/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })

        if (response.ok) {
          const responseData = await response.json()
          console.log('notesList (All): ', responseData)

          const parsedResponse: NoteProps[] = responseData?.map(
            (data: any) => ({
              id: data.id,
              title: data.title,
              content: data.data && extractText(JSON.parse(data.data)),
              userId: 'na',
              createdAt: new Date(data.created_at),
              updatedAt: new Date(data.updated_at),
              ownerEmail: data.owner,
              visibility: data.visibility,
            }),
          )

          setYourNotes(
            parsedResponse.filter(
              (note) => note.ownerEmail === data?.user?.email,
            ),
          )
        }
      } catch (error) {
        console.log(error)
        toast.error('Error Fetching your notes, Please Refresh.')
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      }
    } else {
      setLoading(false)
    }
  }
  const getFeaturedNotes = async (authToken: string | undefined) => {
    setLoading(true)
    if (authToken) {
      try {
        const response = await fetch(`${baseURL}/notes/get-featured-notes/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })

        if (response.ok) {
          const responseData = await response.json()
          console.log('notesList (Featured): ', responseData)

          const parsedResponse: NoteProps[] = responseData?.map(
            (data: any) => ({
              id: data.id,
              title: data.title,
              content: data.data && extractText(JSON.parse(data.data)),
              userId: 'na',
              createdAt: new Date(data.created_at),
              updatedAt: new Date(data.updated_at),
              ownerEmail: data.owner,
              visibility: data.visibility,
            }),
          )

          setFeaturedNotes(parsedResponse)
        }
      } catch (error) {
        console.log(error)
        toast.error('Error Fetching your notes, Please Refresh.')
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      }
    } else {
      setLoading(false)
    }
  }

  const getSharedNotes = async (authToken: string | undefined) => {
    setLoading(true)
    if (authToken) {
      try {
        const response = await fetch(`${baseURL}/notes/get-shared-notes/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })

        if (response.ok) {
          const responseData = await response.json()
          console.log('notesList (Shared): ', responseData)

          const parsedResponse: NoteProps[] = responseData?.map(
            (data: any) => ({
              id: data.id,
              title: data.title,
              content: data.data && extractText(JSON.parse(data.data)),
              userId: 'na',
              createdAt: new Date(data.created_at),
              updatedAt: new Date(data.updated_at),
              ownerEmail: data.owner,
              visibility: data.visibility,
            }),
          )

          setShareNotes(parsedResponse)
        }
      } catch (error) {
        console.log(error)
        toast.error('Error Fetching your notes, Please Refresh.')
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      }
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      getNotesList(data.accessToken)
      getFeaturedNotes(data.accessToken)
      getSharedNotes(data.accessToken)
    }
  }, [status])

  return (
    <MaxWidthWrapper className="h-full w-full flex flex-col items-center justify-center rounded-lg">
      <div className="w-full mx-auto rounded-lg md:rounded-2xl p-4 md:p-8 md:pt-0 mt-[10vh]">
        <div className="flex flex-row justify-between items-center w-full my-4 border-b pb-2">
          <h1 className="text-xl font-bold text-gray-600">Home</h1>
          <Button
            onClick={() => {
              setDialogOpen(true)
            }}
            className="w-fit bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold max-sm:text-xs"
            size={'sm'}
          >
            {' '}
            <PenBoxIcon className="h-5 w-5 mr-2" /> Create new{' '}
          </Button>
        </div>
        <div className="mt-2 mb-4">
          <Tabs
            tabs={[
              { title: 'Featured', value: 'featured' },
              { title: 'Shared with me', value: 'shared' },
              { title: 'Your Notes', value: 'your-notes' },
            ]}
          />
        </div>
        <div className="max-h-[65vh] h-[65vh] overflow-scroll no-scrollbar">
          {loading ? (
            <div className="h-full w-full mt-14 flex flex-col gap-6">
              <Skeleton.Button active block />
              <Skeleton.Button active block />
              <Skeleton.Button active block />
              <Skeleton.Button active block />
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {type === 'featured' && (
                <>
                  {featuredNotes.length > 0 ? (
                    featuredNotes.map((note) => (
                      <Note
                        key={note.id}
                        note={note}
                        authToken={data?.accessToken}
                        getNotesList={getNotesList}
                      />
                    ))
                  ) : (
                    <EmptyNotesState description="" />
                  )}
                </>
              )}
              {type === 'shared' && (
                <>
                  {sharedNotes.length > 0 ? (
                    sharedNotes.map((note) => (
                      <Note
                        key={note.id}
                        note={note}
                        authToken={data?.accessToken}
                        getNotesList={getNotesList}
                      />
                    ))
                  ) : (
                    <EmptyNotesState description="" />
                  )}
                </>
              )}
              {type === 'your-notes' && (
                <>
                  {yourNotes.length > 0 ? (
                    yourNotes.map((note) => (
                      <Note
                        key={note.id}
                        note={note}
                        authToken={data?.accessToken}
                        getNotesList={getNotesList}
                      />
                    ))
                  ) : (
                    <EmptyNotesState description="" />
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
      {data?.accessToken && (
        <AddNoteDialog
          authToken={data?.accessToken}
          open={dialogOpen}
          setOpen={setDialogOpen}
        />
      )}
    </MaxWidthWrapper>
  )
}

export default Notes
