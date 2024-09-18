'use client'

import AddNoteDialog from '@/components/common/AddNoteDialog'
import Note from '@/components/common/Note'
import MaxWidthWrapper from '@/components/layout/MaxwidthWrapper'
import { Button } from '@/components/ui/button'
import { baseURL, cn, extractText } from '@/lib/utils'
import { Grid2X2, List, PenBoxIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Skeleton, Tooltip } from 'antd'
import { Tabs } from '@/components/ui/Tabs'
import { useSearchParams } from 'next/navigation'
import { NoteProps } from '@/lib/types/notes'
import EmptyNotesState from '@/components/common/EmptyNotesState'
import SearchNotes from '@/components/common/Search'

const fetchNotes = async (url: string, authToken: string) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${authToken}` },
    })
    if (response.ok) {
      const data = await response.json()
      return data.map((note: any) => ({
        id: note.id,
        title: note.title,
        content: note.data ? extractText(JSON.parse(note.data)) : '',
        userId: 'na',
        createdAt: new Date(note.created_at),
        updatedAt: new Date(note.updated_at),
        ownerEmail: note.owner,
        visibility: note.visibility,
        likes: note.likes,
      }))
    }
  } catch (error) {
    toast.error('Error fetching notes. Please refresh.')
  }
  return []
}

const Notes = () => {
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  const searchQuery = searchParams.get('s')

  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const [featuredNotes, setFeaturedNotes] = useState<NoteProps[]>([])
  const [sharedNotes, setSharedNotes] = useState<NoteProps[]>([])
  const [yourNotes, setYourNotes] = useState<NoteProps[]>([])

  const [listView, setListView] = useState<'list' | 'grid'>('grid')

  const { data, status } = useSession()

  const getNotesList = async (
    authToken: string | undefined,
    silent?: boolean,
  ) => {
    if (!silent) {
      setLoading(true)
    }
    if (authToken) {
      try {
        const parsedResponse: NoteProps[] = await fetchNotes(
          `${baseURL}/notes/`,
          authToken,
        )

        setYourNotes(
          parsedResponse.filter(
            (note) => note.ownerEmail === data?.user?.email,
          ),
        )

        if (silent) {
          return parsedResponse
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

  const getFeaturedNotes = async (
    authToken: string | undefined,
    silent?: boolean,
  ) => {
    if (!silent) {
      setLoading(true)
    }
    if (authToken) {
      try {
        const parsedResponse: NoteProps[] = await fetchNotes(
          `${baseURL}/notes/get-featured-notes/`,
          authToken,
        )

        setFeaturedNotes(parsedResponse)

        if (silent) {
          return parsedResponse
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

  const getSharedNotes = async (
    authToken: string | undefined,
    silent?: boolean,
  ) => {
    if (!silent) {
      setLoading(true)
    }

    if (authToken) {
      try {
        const parsedResponse: NoteProps[] = await fetchNotes(
          `${baseURL}/notes/get-shared-notes/`,
          authToken,
        )

        setSharedNotes(parsedResponse)

        if (silent) {
          return parsedResponse
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

  const filterNotes = (notes: NoteProps[]) => {
    if (!searchQuery) return notes

    const lowerCaseQuery = searchQuery.toLowerCase()

    return notes.filter((note) =>
      note.title.toLowerCase().includes(lowerCaseQuery),
    )
  }

  return (
    <MaxWidthWrapper className="h-full w-full flex flex-col items-center justify-center rounded-lg">
      <div className="w-full mx-auto rounded-lg md:rounded-2xl px-2 xl:px-6 lg:px-12 sm:px-10 mt-[10vh]">
        <div className="flex flex-row justify-between items-center w-full my-4 pb-2">
          <h1 className="text-xl font-bold text-gray-600">Home</h1>
          <SearchNotes />
          <Button
            onClick={() => {
              setDialogOpen(true)
            }}
            className="w-fit bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold max-sm:text-xs"
            size={'sm'}
          >
            {' '}
            <PenBoxIcon className="h-4 w-4 mr-2 max-sm:mr-0" />{' '}
            <span className="max-sm:hidden text-sm">Create new</span>{' '}
          </Button>
        </div>
        <div className="mt-2 mb-4 flex flex-row items-center gap-2 h-fit">
          <Tabs
            tabs={[
              { title: 'Featured', value: 'featured' },
              { title: 'Shared with me', value: 'shared' },
              { title: 'Your Notes', value: 'your-notes' },
            ]}
          />
          <div className="w-[3px] h-[20px] bg-gray-400 rounded-full max-sm:hidden" />
          <div className="flex flex-row gap-2 ml-2 max-sm:hidden">
            <Tooltip title="Grid view">
              <Button
                onClick={() => setListView('grid')}
                className={cn('h-fit w-fit p-1', {
                  'bg-gray-200': listView === 'grid',
                })}
                variant={'outline'}
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
            </Tooltip>
            <Tooltip title="List view">
              <Button
                onClick={() => setListView('list')}
                className={cn('h-fit w-fit p-1', {
                  'bg-gray-200': listView === 'list',
                })}
                variant={'outline'}
              >
                <List className="h-4 w-4" />
              </Button>
            </Tooltip>
          </div>
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
            <div
              className={`grid gap-3 ${listView === 'grid' && 'sm:grid-cols-2 lg:grid-cols-3'}`}
            >
              {type === 'featured' && (
                <>
                  {filterNotes(featuredNotes).length > 0 &&
                    filterNotes(featuredNotes).map((note) => (
                      <Note
                        listView={listView}
                        key={note.id}
                        note={note}
                        authToken={data?.accessToken}
                        getNotesList={getNotesList}
                        getFeaturedNotes={getFeaturedNotes}
                        getSharedNotes={getSharedNotes}
                      />
                    ))}
                </>
              )}
              {type === 'shared' && (
                <>
                  {filterNotes(sharedNotes).length > 0 &&
                    filterNotes(sharedNotes).map((note) => (
                      <Note
                        listView={listView}
                        key={note.id}
                        note={note}
                        authToken={data?.accessToken}
                        getNotesList={getNotesList}
                        getFeaturedNotes={getFeaturedNotes}
                        getSharedNotes={getSharedNotes}
                      />
                    ))}
                </>
              )}
              {type === 'your-notes' && (
                <>
                  {filterNotes(yourNotes).length > 0 &&
                    filterNotes(yourNotes).map((note) => (
                      <Note
                        listView={listView}
                        key={note.id}
                        note={note}
                        authToken={data?.accessToken}
                        getNotesList={getNotesList}
                        getFeaturedNotes={getFeaturedNotes}
                        getSharedNotes={getSharedNotes}
                      />
                    ))}
                </>
              )}

              {((type === 'featured' &&
                filterNotes(featuredNotes).length === 0) ||
                (type === 'shared' && filterNotes(sharedNotes).length === 0) ||
                (type === 'your-notes' &&
                  filterNotes(yourNotes).length === 0)) && (
                <>
                  {' '}
                  {searchQuery ? (
                    <EmptyNotesState
                      description={
                        <>
                          No notes found for search query : <b>{searchQuery}</b>
                        </>
                      }
                    />
                  ) : (
                    <EmptyNotesState description="You don't have any notes yet." />
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
