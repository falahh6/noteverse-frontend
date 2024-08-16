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
import { Empty, Typography, Skeleton } from 'antd'

const Notes = () => {
  //@ts-ignore
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [allNotes, setAllNotes] = useState<
    {
      id: string
      title: string
      content: string | null
      userId: string
      createdAt: Date
      updatedAt: Date
    }[]
  >([])
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
          console.log('notesList : ', responseData)

          const parsedResponse = responseData?.map((data: any) => ({
            id: data.id,
            title: data.title,
            content: data.data && extractText(JSON.parse(data.data)),
            userId: 'na',
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at),
          }))

          console.log(parsedResponse)
          setAllNotes(parsedResponse)
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
    }
  }, [status])

  return (
    <MaxWidthWrapper className="h-full w-full flex flex-col items-center justify-center rounded-lg">
      <div className="w-full mx-auto rounded-lg md:rounded-2xl p-4 md:p-8 mt-20">
        <div className="flex flex-row justify-end w-full my-4">
          <Button
            onClick={() => {
              setDialogOpen(true)
            }}
            variant={'outline'}
            className="w-full"
          >
            {' '}
            <PenBoxIcon className="h-5 w-5 mr-2" /> Create new{' '}
          </Button>
        </div>
        {loading ? (
          <div className="h-screen w-full mt-14 flex flex-col gap-6">
            <Skeleton.Button active block />
            <Skeleton.Button active block />
            <Skeleton.Button active block />
            <Skeleton.Button active block />
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {allNotes.map((note) => (
              <Note
                key={note.id}
                note={note}
                authToken={data?.accessToken}
                getNotesList={getNotesList}
              />
            ))}
            {allNotes.length === 0 && (
              <div className="col-span-full text-center">
                <div className="h-screen w-full mt-10">
                  <div className="flex flex-row justify-center items-center">
                    <Empty
                      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                      imageStyle={{ height: 100 }}
                      description={
                        <Typography.Text>
                          You don't have any notes yet.
                        </Typography.Text>
                      }
                    ></Empty>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
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
