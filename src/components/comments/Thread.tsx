import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Loader, SendHorizonal } from 'lucide-react'
import { Button } from '../ui/button'

import { avatarFallbackHandler, cn, formatDate } from '@/lib/utils'
import EmojiPicker from '../common/EmojiPicker'

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
  getComments: (getCommentFor: 'reply' | 'comment') => Promise<any>
}) => {
  const isFocused = focusedThread === threadData.id
  const [replyValue, setReplyValue] = useState('')

  const [replyLoading, setReplyLoading] = useState(false)

  const addReply = async () => {
    setReplyLoading(true)
    try {
      const response = await fetch(`/api/notes/comments`, {
        method: 'POST',
        headers: {
          Authorization: `${authToken}`,
        },
        body: JSON.stringify({
          notes_id: notesId,
          comment: replyValue,
          parent_comment: threadData.id,
        }),
      })

      if (response.ok) {
        const responseData = await response.json()
        console.log('results : ', responseData)
        getComments('reply').finally(() => {
          setReplyLoading(false)
          setReplyValue('')
        })
      }
    } catch (error) {}
  }

  return (
    <>
      <div className={`shadow-sm rounded-xl border border-gray-200 w-full`}>
        <div className="flex flex-row gap-2 p-3">
          <Avatar className="h-6 w-6">
            <AvatarFallback>
              {avatarFallbackHandler(
                threadData.user.username || 'Noteverse User',
              )}
            </AvatarFallback>
          </Avatar>
          <div className="">
            <p className="font-semibold text-gray-600">
              {threadData.user.username || 'Noteverse User'}{' '}
              <span className="text-gray-400 mx-1">·</span>{' '}
              <span className="text-gray-400 font-normal">
                {formatDate(threadData.createdAt)}
              </span>
            </p>{' '}
            <p className="my-1 text-gray-600">{threadData.text}</p>
          </div>
        </div>
        {threadData.replies?.map((reply) => (
          <div className="flex flex-row gap-2 p-3">
            <Avatar className="h-6 w-6">
              <AvatarFallback>
                {' '}
                {avatarFallbackHandler(reply.user.username || 'Noteverse User')}
              </AvatarFallback>
            </Avatar>
            <div className="">
              <p className="font-semibold text-gray-600">
                {reply.user.username || 'Noteverse User'}{' '}
                <span className="text-gray-400 mx-1">·</span>{' '}
                <span className="text-gray-400 font-normal">
                  {formatDate(reply.createdAt)}
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
