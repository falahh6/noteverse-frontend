import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { EditorContent, EditorRoot, JSONContent } from 'novel'
import { Dispatch, SetStateAction } from 'react'

const TextCapture = ({
  open,
  selectedText,
  setOpen,
}: {
  open: boolean
  selectedText: JSONContent | undefined
  setOpen: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val)
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            <EditorRoot>
              <EditorContent
                initialContent={selectedText}
                editable={false}
              ></EditorContent>
            </EditorRoot>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default TextCapture
