import { useEffect, useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Loader, SendHorizonal, Smile } from 'lucide-react'
import { Button } from '../ui/button'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { avatarFallbackHandler, cn } from '@/lib/utils'

const Thread = ({
  threadData,
  focusedThread,
  setFocusedThread,
}: {
  threadData: Thread
  focusedThread: number | null
  setFocusedThread: (id: number | null) => void
}) => {
  const isFocused = focusedThread === threadData.id
  const [replyValue, setReplyValue] = useState('')

  const [replyLoading, setReplyLoading] = useState(false)

  const addReply = async () => {
    setReplyLoading(true)
    console.log(
      `'@reply'\n comment_id : ${threadData.id}\n comment_content : ${replyValue}`,
    )

    await new Promise((res) => setTimeout(res, 2000))
    setReplyLoading(false)
  }

  return (
    <>
      <div className="shadow-sm rounded-xl border border-gray-200 w-full">
        <div className="flex flex-row gap-2 p-3">
          <Avatar className="h-6 w-6">
            <AvatarImage src={threadData.user.avatar} />
            <AvatarFallback>
              {avatarFallbackHandler(threadData.user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="">
            <p className="font-semibold text-gray-600">
              {threadData.user.name}{' '}
              <span className="text-gray-400 mx-1">·</span>{' '}
              <span className="text-gray-400 font-normal">
                {threadData.date}
              </span>
            </p>{' '}
            <p className="my-1 text-gray-600">{threadData.content}</p>
          </div>
        </div>
        {threadData.replies.map((reply) => (
          <div className="flex flex-row gap-2 p-3">
            <Avatar className="h-6 w-6">
              <AvatarImage src={reply.user.avatar} />
              <AvatarFallback>{reply.user.fallback}</AvatarFallback>
            </Avatar>
            <div className="">
              <p className="font-semibold text-gray-600">
                {reply.user.name} <span className="text-gray-400 mx-1">·</span>{' '}
                <span className="text-gray-400 font-normal">{reply.date}</span>
              </p>{' '}
              <p className="my-1 text-gray-600">{reply.content}</p>
            </div>
          </div>
        ))}
        <div className="w-full text-xs border-t p-2">
          <input
            value={replyValue}
            onClick={() => setFocusedThread(threadData.id)}
            onChange={(e) => {
              setReplyValue(e.target.value)
            }}
            placeholder="Reply to this thread..."
            className="w-full rounded-md outline-none ring-none text-xs p-1 resize-none overflow-auto"
          />

          {(isFocused || replyValue) && (
            <div className="mt-1 flex flex-row justify-between items-center">
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="h-6 w-6 hover:bg-gray-200 hover:cursor-pointer flex justify-center items-center rounded-full">
                      <Smile className="h-4 w-4 text-gray-500" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent
                    side="left"
                    className="w-fit p-0 border-0 rounded-lg z-[999]"
                  >
                    <Picker
                      data={data}
                      onEmojiSelect={(val: any) => {
                        setReplyValue((prev) => (prev += val.native))
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Button
                  size={'icon'}
                  variant={'default'}
                  className={cn(`h-fit p-1 px-0 `)}
                  onClick={addReply}
                >
                  {replyLoading ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    <SendHorizonal className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Thread
