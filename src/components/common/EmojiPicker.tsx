'use client'

import React, { Dispatch, SetStateAction, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Smile } from 'lucide-react'

const emojis = [
  { id: 'smile', emoji: '😊', name: 'Smiling face with smiling eyes' },
  { id: 'heart', emoji: '❤️', name: 'Red heart' },
  { id: 'thumbsup', emoji: '👍', name: 'Thumbs up' },
  { id: 'fire', emoji: '🔥', name: 'Fire' },
  { id: 'party', emoji: '🎉', name: 'Party popper' },
  { id: 'cry', emoji: '😢', name: 'Crying face' },
  { id: 'laugh', emoji: '😂', name: 'Face with tears of joy' },
]

export default function EmojiPicker({
  setValue,
}: {
  setValue: Dispatch<SetStateAction<string>>
}) {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmoji(emoji)
    setValue((prev: any) => (prev += emoji))
    setOpen(false)
  }

  return (
    <Popover open={open}>
      <PopoverTrigger asChild>
        <div
          onClick={() => setOpen((prev) => !prev)}
          onBlur={() => setOpen(false)}
          className="h-6 w-6 hover:bg-gray-200 hover:cursor-pointer flex justify-center items-center rounded-full"
        >
          <Smile className="h-4 w-4 text-gray-500" />
        </div>
      </PopoverTrigger>
      <PopoverContent side="left" className="w-64 p-2">
        <div className="grid grid-cols-4 gap-2">
          {emojis.map((emoji) => (
            <Button
              key={emoji.id}
              variant="ghost"
              className="h-10 w-10 p-0 text-lg"
              onClick={() => handleEmojiSelect(emoji.emoji)}
              title={emoji.name}
            >
              {emoji.emoji}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
