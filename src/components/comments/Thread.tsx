import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Loader, SendHorizonal } from 'lucide-react'
import { Button } from '../ui/button'
import data from '@emoji-mart/data'

import { avatarFallbackHandler, baseURL, cn, formatDate } from '@/lib/utils'
import EmojiPicker from '../common/EmojiPicker'
import { useSession } from 'next-auth/react'

const Thread = ({
  threadData,
  focusedThread,
  setFocusedThread,
  authToken,
  notesId,
  getComments,
}: {
  threadData: Thread
  focusedThread: number | null
  setFocusedThread: (id: number | null) => void
  authToken: string
  notesId: number
  getComments: (getCommentFor: 'reply' | 'comment') => void
}) => {
  const isFocused = focusedThread === threadData.id
  const [replyValue, setReplyValue] = useState('')

  const [replyLoading, setReplyLoading] = useState(false)
  const { data } = useSession()

  const addReply = async () => {
    setReplyLoading(true)
    try {
      const response = await fetch(`${baseURL}/comments/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          note: notesId,
          user: data?.user.id,
          text: replyValue,
          parent_comment: threadData.id,
        }),
      })

      if (response.ok) {
        const responseData = await response.json()
        getComments('reply')
        setReplyValue('')
      }
    } catch (error) {
    } finally {
      setReplyLoading(false)
    }
    setReplyLoading(false)
  }

  return (
    <>
      <div className={`shadow-sm rounded-xl border border-gray-200 w-full`}>
        <div className="flex flex-row gap-2 p-3">
          <Avatar className="h-6 w-6">
            <AvatarImage src={threadData.user.avatar} />
            <AvatarFallback>
              {avatarFallbackHandler(threadData.user_name || 'Noteverse User')}
            </AvatarFallback>
          </Avatar>
          <div className="">
            <p className="font-semibold text-gray-600">
              {threadData.user_name || 'Noteverse User'}{' '}
              <span className="text-gray-400 mx-1">·</span>{' '}
              <span className="text-gray-400 font-normal">
                {formatDate(threadData.created_at)}
              </span>
            </p>{' '}
            <p className="my-1 text-gray-600">{threadData.text}</p>
          </div>
        </div>
        {threadData.replies?.map((reply) => (
          <div className="flex flex-row gap-2 p-3">
            <Avatar className="h-6 w-6">
              <AvatarImage src={reply.user.avatar} />
              <AvatarFallback>
                {' '}
                {avatarFallbackHandler(
                  threadData.user_name || 'Noteverse User',
                )}
              </AvatarFallback>
            </Avatar>
            <div className="">
              <p className="font-semibold text-gray-600">
                {reply.user_name || 'Noteverse User'}{' '}
                <span className="text-gray-400 mx-1">·</span>{' '}
                <span className="text-gray-400 font-normal">
                  {formatDate(reply.created_at)}
                </span>
              </p>{' '}
              <p className="my-1 text-gray-600">{reply.text}</p>
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
              {/* <Popover>
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
                    className="flex-1 overflow-auto"
                    data={data}
                    onEmojiSelect={(val: any) => {
                      setReplyValue((prev) => (prev += val.native))
                    }}
                  />
                </PopoverContent>
              </Popover> */}
              <EmojiPicker setValue={setReplyValue} />
              <div>
                <Button
                  disabled={replyValue.length === 0}
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
