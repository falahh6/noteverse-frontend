import { EditorBubble, useEditor } from 'novel'
import { removeAIHighlight } from 'novel/extensions'

import { type ReactNode, useEffect } from 'react'

interface EditorMenuProps {
  children: ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function EditorMenu({
  children,
  open,
  onOpenChange,
}: EditorMenuProps) {
  const { editor } = useEditor()

  useEffect(() => {
    if (!editor) return
    if (!open) removeAIHighlight(editor)
  }, [open])

  return (
    <EditorBubble
      tippyOptions={{
        placement: open ? 'bottom-start' : 'top',
        onHidden: () => {
          onOpenChange(false)
          editor?.chain().unsetAIHighlight().run()
        },
      }}
      className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
    >
      {!open && children}
    </EditorBubble>
  )
}
