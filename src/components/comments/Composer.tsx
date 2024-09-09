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

const Composer = () => {
  const [loading, setLoading] = useState(false)
  const [commentValue, setCommentValue] = useState('')

  const addComment = async () => {
    setLoading(true)

    await new Promise((res) => setTimeout(res, 2000))
    setLoading(false)
    console.log(`'@reply'\n comment_content : ${commentValue}`)
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
            <Popover>
              <PopoverTrigger asChild>
                <div className="h-6 w-6 hover:bg-gray-200 hover:cursor-pointer flex justify-center items-center rounded-full">
                  <Smile className="h-4 w-4 text-gray-500" />
                </div>
              </PopoverTrigger>
              <PopoverContent
                side="left"
                className="w-fit p-0 border-0 rounded-lg"
              >
                <Picker
                  data={data}
                  onEmojiSelect={(val: any) =>
                    setCommentValue((prev) => (prev += val.native))
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Button
              onClick={addComment}
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
