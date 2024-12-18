'use client'

import React, { useCallback, useEffect, useState } from 'react'
import {
  EditorRoot,
  EditorCommand,
  EditorCommandItem,
  EditorCommandEmpty,
  EditorContent,
  type JSONContent,
  EditorCommandList,
  EditorBubble,
} from 'novel'
import { ImageResizer, handleCommandNavigation } from 'novel/extensions'
import { defaultExtensions } from './extensions'
import { NodeSelector } from './selectors/node-selector'
import { LinkSelector } from './selectors/link-selector'
import { ColorSelector } from './selectors/color-selector'

import { TextButtons } from './selectors/text-buttons'
import { slashCommand, suggestionItems } from './slash-command'
import { handleImageDrop, handleImagePaste } from 'novel/plugins'
import { uploadFn } from './image-upload'
import { Separator } from '../ui/separator'

import './style/prosemirror.css'
import { cn } from '@/lib/utils'
import { MultipleCarets } from './entensions/caret'
import { socket } from '@/socket'
import { TextSearch } from './entensions/search-text'
import { useEditorContext } from '@/context/editorContext'

interface EditorProp {
  content?: JSONContent
  onChange: (value: JSONContent) => void
  className?: string
  placeholder?: string
  connectedUsers?: any
  userData: any
  notesId: number
  canEdit: boolean
  authToken: string
}

const Editor = ({
  content,
  onChange,
  className,
  placeholder,
  connectedUsers,
  userData,
  notesId,
  canEdit,
  authToken,
}: EditorProp) => {
  const [openNode, setOpenNode] = useState(false)
  const [openColor, setOpenColor] = useState(false)
  const [openLink, setOpenLink] = useState(false)
  const [liveUsers, setLiveUsers] = useState<
    { userName: string; position?: number; color?: string }[]
  >([])

  const { editor, setEditor } = useEditorContext()

  useEffect(() => {
    if (editor && content) {
      const currentContent = editor.getJSON()
      const { to } = editor.state.selection
      console.log(`The Carret Position : ${to}`)

      if (JSON.stringify(currentContent) !== JSON.stringify(content)) {
        editor.commands.setContent(content)
      }
    }
  }, [content])

  const handleUpdate = () => {
    onChange(editor.getJSON())

    //@ts-ignore
    editor.commands.clearSearch()

    const { to } = editor.state.selection
    socket.emit(
      'updateUser',
      {
        userId: userData.id,
        notesId,
        updates: { position: to },
      },
      (response: any) => {
        if (response.success) {
          setLiveUsers(response.users)
        }
      },
    )

    connectedUsers = connectedUsers.map((u: any) => ({
      ...u,
      isActive: u.id === userData.id ? true : false,
    }))
  }

  const updateCarets = useCallback(
    (connectedUsers: any) => {
      if (editor && connectedUsers) {
        const carets = connectedUsers.map((u: any, i: number) => ({
          position: u.position,
          name: u.userName || 'Noteverse user ' + i,
          color: u.color,
        }))
        //@ts-ignore
        editor.commands.updateCarets(carets)
      }
    },
    [editor, connectedUsers],
  )

  useEffect(() => {
    if (editor && connectedUsers?.length > 0) {
      const updatesConnectedUsers = connectedUsers.filter(
        (u: any) => u.userId !== userData.id,
      )
      updateCarets(updatesConnectedUsers)
    }
  }, [connectedUsers])

  return (
    <EditorRoot>
      <EditorContent
        editable={canEdit}
        onCreate={({ editor }) => {
          setEditor(editor)
          // setEditorContext(editor)
        }}
        className={cn('border rounded-xl w-full pb-10', className)}
        {...(content && {
          initialContent: content,
        })}
        extensions={[
          ...defaultExtensions,
          slashCommand as any,
          TextSearch,
          MultipleCarets.configure({
            carets: connectedUsers.map((u: any) => ({
              position: u.position,
              name: u.userName,
              color: u.color,
              isActive: u.isActive || false,
            })),
          }),
        ]}
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
          handleDrop: (view, event, _slice, moved) =>
            handleImageDrop(view, event, moved, uploadFn),
          attributes: {
            class: `prose prose-sm dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full p-0`,
          },
        }}
        onUpdate={handleUpdate}
        slotAfter={<ImageResizer />}
      >
        <EditorCommand className="z-20 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
          <EditorCommandEmpty className="px-2 text-muted-foreground">
            No results
          </EditorCommandEmpty>
          <EditorCommandList>
            {suggestionItems.map((item) => (
              <EditorCommandItem
                value={item.title}
                onCommand={(val) => item.command?.(val)}
                className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent `}
                key={item.title}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </EditorCommandItem>
            ))}
          </EditorCommandList>
        </EditorCommand>

        <EditorBubble
          tippyOptions={{
            placement: 'top',
            zIndex: 10,
          }}
          className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
        >
          <Separator orientation="vertical" />
          <NodeSelector open={openNode} onOpenChange={setOpenNode} />
          <Separator orientation="vertical" />

          <LinkSelector open={openLink} onOpenChange={setOpenLink} />
          <Separator orientation="vertical" />
          <TextButtons />
          <Separator orientation="vertical" />
          <ColorSelector open={openColor} onOpenChange={setOpenColor} />
        </EditorBubble>
      </EditorContent>
    </EditorRoot>
  )
}

export default Editor
