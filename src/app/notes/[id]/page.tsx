'use client'

import Editor from '@/components/editor/editor'
import MaxWidthWrapper from '@/components/layout/MaxwidthWrapper'
import { type JSONContent } from 'novel'
import { useCallback, useEffect, useState } from 'react'

import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import {
  avatarFallbackHandler,
  debounce,
  findDifferences,
  visibleLightColors,
} from '@/lib/utils'
import { Empty, Skeleton, Tooltip } from 'antd'
import { socket } from '@/socket'
import { usePathContext } from '@/context/pathContext'
import { sharedStatus } from '@/lib/types/notes'
import Comments from '@/components/comments/Comments'
import { useUserContext } from '@/context/usersContext'
import Search from '@/components/search/search'
import ShareWith from '@/components/share/Share'
import { Dot, Loader } from 'lucide-react'

const Page = ({ params }: { params: { id: number } }) => {
  const { data, status } = useSession()
  const pathname = usePathname()
  const notesId = params.id

  const [authToken, setAuthToken] = useState('')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const { addPage } = usePathContext()

  const [notesSharedWithData, setNotesSharedWithData] = useState<any[]>([])
  const [isOwner, setIsOwner] = useState(false)

  const [notesData, setNotesData] = useState<JSONContent>()
  const [notesTitle, setNotesTitle] = useState<string>('')
  const [notesOwner, setNotesOwner] = useState('')
  const [notesVisibility, setNotesVisibility] = useState<
    'Public' | 'Private' | 'Shared'
  >('Private')

  const [notesSaving, setNotesSaving] = useState(false)

  const [content, setContent] = useState<JSONContent>()
  const setIsConnected = useState(false)[1]
  const setTransport = useState('N/A')[1]

  const [connectedUsers, setConnectedUsers] = useState<
    {
      socket_id: string
      userId: number
      userName: string
      position?: string
      color?: string
    }[]
  >([])

  let init: boolean = false

  const { users } = useUserContext()

  const getNotes = async (authToken: string | undefined) => {
    if (authToken) {
      try {
        const response = await fetch(`/api/notes?id=${params.id}`, {
          method: 'GET',
          headers: {
            Authorization: `${authToken}`,
          },
        })

        if (response.ok) {
          const results = await response.json()
          console.log('results : ', results)

          const responseData = results.data
          setIsOwner(responseData.owner.email === data?.user?.email)
          const notesData = responseData.data && JSON.parse(responseData.data)
          console.log('notesData : ', notesData)
          setNotesTitle(responseData.title)
          setNotesOwner(responseData.owner.email)

          console.log('@shared_statuses : ', responseData.sharedStatuses)
          setNotesSharedWithData(responseData.sharedStatuses)
          setNotesVisibility(responseData.visibility)

          addPage({
            title: responseData.title,
            pathname: pathname,
            isActive: true,
            isStatic: false,
          })

          if (notesData) {
            setNotesData(notesData)
          } else {
            setNotesData(notesData)
          }
        } else {
          setError(true)
        }
      } catch (error) {
        console.log(error)
        setError(true)
      } finally {
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (init || status === 'loading') {
      return
    }

    if (status === 'authenticated' && !init) {
      console.log('@access_token : ', data.accessToken)
      setAuthToken(data.accessToken)
      getNotes(data.accessToken)
    }

    if (socket.connected) {
      onConnect()
    }

    socket.on('contentUpdated', (newContent) => {
      setContent(newContent)
    })

    socket.on('userList', (users) => {
      setConnectedUsers(users)

      let connectedUsers: any = []
      users?.forEach((user: any, i: number) => {
        connectedUsers.push({
          ...user,
          userName: user.userName || 'Noteverse User ' + i,
          color: visibleLightColors[i],
        })
      })

      setConnectedUsers(connectedUsers)
    })

    function onConnect() {
      setIsConnected(true)
      setTransport(socket.io.engine.transport.name)

      socket.io.engine.on('upgrade', (transport) => {
        setTransport(transport.name)
      })

      console.log('connected : ', socket.id)

      socket.emit(
        'registerUser',
        {
          userId: data?.user.id,
          userName: data?.user.name,
          notesId: notesId,
        },
        (response: any) => {
          setConnectedUsers(
            response.connectedUsers?.map((u: any, i: number) => ({
              ...u,
              userName: u.userName || 'Noteverse User ' + i,
            })),
          )
        },
      )
    }

    function onDisconnect() {
      setIsConnected(false)
      setTransport('N/A')
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    init = true

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('userList')
      socket.off('contentUpdated')
    }
  }, [status])

  const saveNotes = useCallback(
    debounce(async (title: string, body: JSONContent) => {
      setNotesSaving(true)
      console.log('authToken : ', authToken)
      const response = await fetch(`/api/notes?id=${notesId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${authToken}`,
        },
        body: JSON.stringify({
          title: title,
          content: JSON.stringify(body),
        }),
      })

      if (response.ok) {
        const responseData = await response.json()
        console.log('Note saved:', responseData)
      }

      if (response) {
        setNotesSaving(false)
      }
    }, 1000),
    [authToken],
  )

  const onChange = (value: JSONContent) => {
    setContent(value)
    saveNotes(notesTitle, value)

    if (findDifferences(content, value) !== '/') {
      socket.emit('contentChanged', { notesId, content: value })
    }
  }

  return (
    <>
      {error && (
        <MaxWidthWrapper className="mt-[10vh] px-0 md:px-2 lg:px-8 sm:px-2">
          <div className="h-full w-full pt-28 flex flex-col gap-6 overflow-hidden">
            {' '}
            <Empty
              description={
                <p className="z-[999]">
                  No notes found for this Id, Please check the link or try{' '}
                  <span
                    onClick={() => {
                      window.location.reload()
                    }}
                    className="text-blue-600 hover:cursor-pointer"
                  >
                    refresh.
                  </span>
                </p>
              }
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />{' '}
          </div>
        </MaxWidthWrapper>
      )}

      {loading ? (
        <MaxWidthWrapper className="mt-[10vh] px-0 md:px-2 lg:px-8 sm:px-2">
          <div className="h-full w-full pt-10 flex flex-col gap-6">
            <Skeleton.Button active block />
            <Skeleton.Button className="py-[15rem] -mt-[8rem]" active block />
          </div>
        </MaxWidthWrapper>
      ) : (
        <MaxWidthWrapper className="px-10 mt-[12vh] max-sm:px-4">
          {!error && (
            <>
              <div className="border-b px-4 py-2 mb-6 sm:px-12 sticky top-[10vh] bg-white z-20">
                <div className="py-2 flex flex-row max-sm:flex-col gap-4 justify-between">
                  <input
                    className="w-full text-3xl max-sm:text-xl font-bold outline-none ring-none bg-transparent"
                    placeholder="Untitled"
                    value={notesTitle}
                    disabled={
                      notesSharedWithData.filter(
                        (d) =>
                          d.shared_with === data?.user.email &&
                          d.permissions === 'Edit',
                      ).length === 0 && !isOwner
                    }
                    onChange={(e) => {
                      setNotesTitle(e.target.value)
                      saveNotes(e.target.value, content!)
                    }}
                  />
                  <div className="flex flex-row gap-2 items-center">
                    <Search />
                    <Comments
                      notesId={notesId}
                      authToken={authToken}
                      // initialThreadData={initialCommentsData}
                    />
                    {isOwner && (
                      <ShareWith
                        notesId={notesId}
                        notesTitle={notesTitle}
                        authToken={authToken}
                        isOwner
                        getNotes={getNotes}
                        visibility={notesVisibility}
                      />
                    )}
                  </div>
                </div>
                <div className="py-2 flex flex-row justify-between">
                  <div className="bg-gray-200 p-2 px-2 rounded-xl text-xs">
                    <p className="text-xs">
                      Owner :{' '}
                      {users?.filter((u) => u.email === notesOwner)[0].username}
                      {'  '}
                      <span className="font-semibold text-blue-500">{`(${notesOwner})`}</span>{' '}
                      {notesOwner === data?.user.email && 'You'}
                    </p>
                  </div>
                  <div className="flex flex-row gap-1 items-center">
                    {notesSaving ? (
                      <div className="bg-gray-100 text-gray-500 rounded-lg border border-gray-200 h-fit p-1 px-2 flex flex-row gap-1 items-center">
                        <Loader className="h-4 w-4 animate-spin" />{' '}
                        <p className="text-xs font-medium ">Saving</p>
                      </div>
                    ) : (
                      <div className="bg-green-50 text-green-500 rounded-lg border border-green-200 h-fit p-1 px-2 flex flex-row gap-1 items-center">
                        <p className="text-xs font-medium ">Saved</p>
                      </div>
                    )}
                    {connectedUsers.length > 1 && (
                      <>
                        <Dot className="h-5 w-5 text-gray-400" />
                      </>
                    )}
                    {connectedUsers
                      .filter((u) => u.userId !== data?.user.id && u.position)
                      .map((item) => (
                        <Tooltip
                          title={item.userName}
                          color={item.color}
                          style={{
                            fontSize: '10px',
                            backgroundColor: item.color,
                            color: item.color,
                          }}
                        >
                          <div
                            className={`text-xs bg-gray-200 rounded-full p-2 h-6 w-6 flex items-center justify-center`}
                            style={{ backgroundColor: item.color }}
                          >
                            {avatarFallbackHandler(item.userName)}
                          </div>
                        </Tooltip>
                      ))}
                  </div>
                </div>
              </div>
              <div className="mb-10">
                <Editor
                  placeholder="Untitled"
                  authToken={authToken}
                  className="border-none rounded-none rounded-b-md mt-2 mb-10"
                  content={content || notesData}
                  onChange={onChange}
                  connectedUsers={connectedUsers}
                  userData={data?.user}
                  notesId={notesId}
                  canEdit={
                    notesSharedWithData.filter(
                      (d) =>
                        d.sharedWithId === data?.user.id &&
                        d.permissions === 'Edit',
                    ).length > 0 || isOwner
                  }
                />
              </div>
            </>
          )}
        </MaxWidthWrapper>
      )}
    </>
  )
}

export default Page
