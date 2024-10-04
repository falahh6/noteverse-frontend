'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  BoldIcon,
  CodeIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from 'lucide-react'
import { EditorBubbleItem, JSONContent, useEditor } from 'novel'
import type { SelectorItem } from './node-selector'
import { toast } from 'sonner'
import TextCapture from '../actions/text-capture'
import { useState } from 'react'

export const TextButtons = () => {
  const { editor } = useEditor()
  if (!editor) return null
  const [open, setOpen] = useState(false)
  const [selectedText, setSelectedText] = useState<JSONContent>()
  const items: SelectorItem[] = [
    {
      name: 'bold',
      isActive: (editor) => (editor ? editor.isActive('bold') : false),
      command: (editor) => editor?.chain().focus().toggleBold().run(),
      icon: BoldIcon,
    },
    {
      name: 'italic',
      isActive: (editor) => (editor ? editor.isActive('italic') : false),
      command: (editor) => editor?.chain().focus().toggleItalic().run(),
      icon: ItalicIcon,
    },
    {
      name: 'underline',
      isActive: (editor) => (editor ? editor.isActive('underline') : false),
      //@ts-ignore
      command: (editor) => editor?.chain().focus().toggleUnderline().run(),
      icon: UnderlineIcon,
    },
    {
      name: 'strike',
      isActive: (editor) => (editor ? editor.isActive('strike') : false),
      command: (editor) => editor?.chain().focus().toggleStrike().run(),
      icon: StrikethroughIcon,
    },
    {
      name: 'code',
      isActive: (editor) => (editor ? editor.isActive('code') : false),
      command: (editor) => editor?.chain().focus().toggleCode().run(),
      icon: CodeIcon,
    },
  ]
  return (
    <div className="flex">
      {items.map((item) => (
        <EditorBubbleItem
          key={item.name}
          onSelect={(editor) => {
            item.command(editor)
          }}
        >
          <Button size="sm" className="rounded-none" variant="ghost">
            <item.icon
              className={cn('h-4 w-4', {
                'text-blue-500': item.isActive(editor),
              })}
            />
          </Button>
        </EditorBubbleItem>
      ))}
      {/* <EditorBubbleItem
        key={'text-capture'}
        onSelect={(editor) => {
          const getSelectedJSONContent = (editor: any) => {
            const { from, to } = editor.state.selection
            const selectedContent = editor.state.doc.cut(from, to)

            const jsonContent = selectedContent.toJSON()

            if (!Array.isArray(jsonContent)) {
              return {
                type: 'doc',
                content: [jsonContent],
              }
            }

            return {
              type: 'doc',
              content: jsonContent,
            }
          }

          const selectedJSONContent = getSelectedJSONContent(editor)
          toast.success(JSON.stringify(selectedJSONContent))
          setSelectedText(selectedJSONContent)
          setOpen(true)
        }}
      >
        <Button size="sm" className="rounded-none" variant="ghost">
          Capture
        </Button>
      </EditorBubbleItem>
       <TextCapture open={open} setOpen={setOpen} selectedText={selectedText} /> */}
    </div>
  )
}
