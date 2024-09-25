'use client'

import Editor from '@/components/editor/editor'
import MaxWidthWrapper from '@/components/layout/MaxwidthWrapper'
import { type JSONContent } from 'novel'
import { useEffect, useState } from 'react'

import { Icons } from '@/components/icons'
import { MessageCircleMore } from 'lucide-react'
import { socket } from '../../socket'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import {
  avatarFallbackHandler,
  findDifferences,
  visibleLightColors,
} from '@/lib/utils'
import { Tooltip } from 'antd'

const Page = () => {
  const { data, status } = useSession()
  const params = useSearchParams()
  const notesId = params.get('id')

  const [initialValue, setInitialValue] = useState<JSONContent>({
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'hey there how you doun',
          },
        ],
      },
    ],
  })
  const [content, setContent] = useState<JSONContent>()

  const [isConnected, setIsConnected] = useState(false)
  const [transport, setTransport] = useState('N/A')

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

  useEffect(() => {
    if (init || status === 'loading') {
      return
    }

    if (socket.connected) {
      onConnect()
    }

    socket.on('contentUpdated', (newContent) => {
      setContent(newContent)
      console.log('new content : ', newContent)
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

  const onChange = (value: JSONContent) => {
    console.log(value)
    setContent(value)

    if (findDifferences(content, value) !== '/') {
      socket.emit('contentChanged', { notesId, content: value })
    }
  }

  useEffect(() => {
    console.log('connectedUsers : ', connectedUsers)
  }, [connectedUsers])

  return (
    <MaxWidthWrapper className="px-10 mt-[12vh] max-sm:px-4">
      <div className="border-b px-4 py-2 sm:px-12">
        <div className="py-2 flex flex-row justify-between">
          <input
            className="w-full  text-3xl font-bold outline-none ring-none "
            placeholder="Untitled"
          />
          <div className="flex flex-row gap-2">
            <div>
              {' '}
              <Icons.Share
                strokeWidth={2}
                className="text-gray-500 p-1 h-7 w-7 border border-gray-300 rounded-md hover:backdrop-blur-sm hover:bg-gray-100 hover:cursor-pointer"
              />
            </div>
            <div>
              <MessageCircleMore
                strokeWidth={2}
                className="text-gray-500 p-1 h-7 w-7 border border-gray-300 rounded-md hover:backdrop-blur-sm hover:bg-gray-100 hover:cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="py-2 flex flex-row justify-between">
          <div>falah</div>
          <div className="flex flex-row  gap-1">
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
                    className={`text-xs bg-gray-200 rounded-full p-2`}
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
          className="border-none rounded-none rounded-b-md mt-2 mb-10"
          content={content || initialValue}
          onChange={onChange}
          connectedUsers={connectedUsers}
          userData={data?.user}
          notesId={notesId || ''}
        />
      </div>
    </MaxWidthWrapper>
  )
}

export default Page
