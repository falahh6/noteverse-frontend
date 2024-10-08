import { Loader, SendHorizonal, Smile } from 'lucide-react'
import { Button } from '../ui/button'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useState } from 'react'
import { baseURL } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import EmojiPicker from '../common/EmojiPicker'

const Composer = ({
  notesId,
  authToken,
  getComments,
}: {
  notesId: number
  authToken: string
  getComments: () => void
}) => {
  const [loading, setLoading] = useState(false)
  const [commentValue, setCommentValue] = useState('')

  const { data, status } = useSession()

  const addComment = async () => {
    setLoading(true)
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
          text: commentValue,
        }),
      })

      if (response.ok) {
        const responseData = await response.json()
        console.log('@responseData :', responseData)
        getComments()
        setCommentValue('')
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="shadow-lg p-3 rounded-xl border border-gray-300">
        <textarea
          value={commentValue}
          placeholder="Write a comment"
          onChange={(e) => {
            setCommentValue(e.target.value)
          }}
          className="w-full rounded-md outline-none ring-none text-sm p-1 resize-none overflow-auto"
        />

        <div className="mt-2 flex flex-row justify-between items-center">
          <div>
            <EmojiPicker setValue={setCommentValue} />
          </div>
          <div>
            <Button
              onClick={addComment}
              disabled={commentValue.length === 0}
              size={'icon'}
              className="h-fit p-1 px-0"
            >
              {loading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <SendHorizonal className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Composer
