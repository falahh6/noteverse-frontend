import { Icons } from '../icons'
import { Button } from '../ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import Composer from './Composer'

import Thread from './Thread'
import { useEffect, useState } from 'react'
import { baseURL } from '@/lib/utils'
import { Empty } from 'antd'
import { MessageCircleMore } from 'lucide-react'

const Comments = ({
  notesId,
  authToken,
}: {
  notesId: number
  authToken: string
}) => {
  const [focusedThread, setFocusedThread] = useState<number | null>(null)
  const [threadData, setThreadData] = useState<Thread[]>([])

  const getComments = async (
    getCommentFor: 'comment' | 'reply' = 'comment',
  ) => {
    const response = await fetch(`${baseURL}/comments/?note_id=${notesId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })

    if (response.ok) {
      const responseData = await response.json()
      setThreadData(responseData)

      const threadListElement = document.getElementById('thread_list')
      if (threadListElement && getCommentFor == 'comment') {
        await new Promise((resolve) => setTimeout(resolve, 100))
        threadListElement.scrollTop = threadListElement.scrollHeight
      }
    }
  }

  useEffect(() => {
    getComments()
  }, [])

  return (
    <>
      <Drawer direction={window.innerWidth < 768 ? 'bottom' : 'right'}>
        <DrawerTrigger asChild>
          <MessageCircleMore
            strokeWidth={2}
            className="text-gray-500 p-1 h-7 w-7 border border-gray-300 rounded-md hover:backdrop-blur-sm hover:bg-gray-100 hover:cursor-pointer"
          />
        </DrawerTrigger>
        <DrawerContent className="sm:width-[25vw]">
          <DrawerHeader>
            <DrawerTitle>Comments</DrawerTitle>
            <DrawerDescription className="text-xs">
              {' '}
              Engage with the community, share feedback, and collaborate on your
              notes for a more productive experience.
            </DrawerDescription>
          </DrawerHeader>
          <div className="w-full h-full">
            {threadData.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center">
                <Empty description={'No Comments yet.'} />
              </div>
            ) : (
              <div
                id="thread_list"
                className="h-[63vh] max-sm:h-[53vh] w-full flex flex-col gap-3 items-start text-xs px-4 overflow-y-auto"
              >
                {threadData.map((thread) => (
                  <Thread
                    key={thread.id}
                    focusedThread={focusedThread}
                    setFocusedThread={setFocusedThread}
                    threadData={thread}
                    notesId={notesId}
                    authToken={authToken}
                    getComments={getComments}
                  />
                ))}
              </div>
            )}
          </div>
          <DrawerFooter className="">
            <Composer
              notesId={notesId}
              authToken={authToken}
              getComments={getComments}
            />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Comments
