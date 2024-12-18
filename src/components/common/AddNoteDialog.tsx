import { CreateNoteSchema, createNoteSchema } from '@/lib/validation/note'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/Input'
import LoadingButton from '@/components/ui/loading-button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

interface AddNoteDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  noteToEdit?: any
  authToken: string | undefined
}

export default function AddNoteDialog({
  open,
  setOpen,
  noteToEdit,
  authToken,
}: AddNoteDialogProps) {
  const [deleteInProgress] = useState(false)
  const router = useRouter()

  const form = useForm<CreateNoteSchema>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: noteToEdit?.title || '',
    },
  })

  const [loading, setLoading] = useState(false)
  async function onSubmit(input: CreateNoteSchema) {
    setLoading(true)

    try {
      const response = await fetch(`/api/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${authToken}`,
        },
        body: JSON.stringify({
          title: input.title,
        }),
      })

      if (response.ok) {
        const responseData = await response.json()
        router.push(`/notes/${responseData.data.id}`)
      } else {
        throw new Error('Error')
      }
    } catch (error) {
      console.log(error)
      setTimeout(() => {
        toast.error('Error creating your notes, Please try again.')
        setLoading(false)
      }, 2000)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-sm:w-[80%] max-sm:rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-left">
            {noteToEdit ? 'Edit Note' : 'Create Notes'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-1 sm:gap-0">
              <LoadingButton
                type="submit"
                loading={loading}
                disabled={deleteInProgress}
              >
                Create & Continue Editing
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
