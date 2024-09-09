import { Empty, Input } from 'antd'
import { Icons } from '../icons'
import { Button } from '../ui/button'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import Composer from './Composer'

import { toast } from 'sonner'
import Thread from './Thread'
import { useState } from 'react'
import { threads } from '@/lib/sampleData'

const { TextArea } = Input

const Comments = ({}: { notesId: number; authToken: string }) => {
  const [focusedThread, setFocusedThread] = useState<number | null>(null)

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            color="#dbeafe"
            className="p-1 px-4 mr-1 h-fit mb-2 font-semibold transition-all duration-300 ease-in-out hover:bg-blue-100"
            variant={'outline'}
          >
            <Icons.commentAdd className="h-4 w-4 mr-1.5 transition-transform duration-300 ease-in-out group-hover:scale-110" />
            Comments
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Comments</DrawerTitle>
            <DrawerDescription className="text-xs">
              {' '}
              Engage with the community, share feedback, and collaborate on your
              notes for a more productive experience.
            </DrawerDescription>
          </DrawerHeader>
          <div className="w-full h-full">
            <div className="h-full flex flex-col items-center justify-center">
              <Empty description={'No Comments yet.'} />
            </div>
            {/* <div className="h-[63vh] max-sm:h-[53vh] w-full flex flex-col gap-3 items-start text-xs px-4 overflow-y-auto">
              {threads.map((thread) => (
                <Thread
                  key={thread.id}
                  focusedThread={focusedThread}
                  setFocusedThread={setFocusedThread}
                  threadData={thread}
                />
              ))}
            </div> */}
          </div>
          <DrawerFooter className="">
            {/* Composer */}
            <Composer />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Comments
