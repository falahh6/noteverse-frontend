'use client'

import { ArrowLeft, Globe, Link2, Share, UserRound } from 'lucide-react'
import { Button } from '../ui/button'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { baseURL } from '@/lib/utils'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { User, useUserContext, validateEmail } from '@/context/usersContext'
import { Input } from '../ui/Input'
import { toast } from 'sonner'

const ShareWith = ({
  authToken,
  notesTitle,
  isOwner,
}: {
  authToken: string
  notesTitle: string
  isOwner: boolean
}) => {
  const { data, status } = useSession()
  const { users } = useUserContext()
  const [Users, setUsers] = useState<User[] | null>([])
  const [viewList, setViewList] = useState(false)
  const [shareAccess, setShareAccess] = useState('viewer')

  const [sharedUsers, setSharedUsers] = useState<
    { email: string; name: string; permission: string }[]
  >([])

  useEffect(() => {
    setUsers(users)
  }, [])

  const [selectedUser, setSelectedUser] = useState<
    | {
        email: string
        permission: string
      }
    | undefined
  >()

  const shareNotesHandler = async () => {
    const response = await fetch(`${baseURL}/sharedstatuses/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        shared_by: data?.user?.email,
        shared_with: selectedUser?.email,
        permissions: selectedUser?.permission,
        note: 0,
      }),
    })

    if (response.ok) {
      toast.success(`Successfully sent the invite to ${selectedUser?.email}`)
    } else {
      toast.error('Error while sending the invite. Please try again.')
    }
  }

  return (
    <Dialog
      onOpenChange={() => {
        setViewList(false)
      }}
    >
      <DialogTrigger>
        <Button
          color="#dbeafe"
          className="p-1 px-8 h-fit mb-2 mr-1 font-semibold transition-all duration-300 ease-in-out hover:bg-blue-100"
          variant={'outline'}
        >
          <Share className="h-4 w-4 mr-1.5 transition-transform duration-300 ease-in-out group-hover:scale-110" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="max-sm:w-[90%] rounded-lg">
        <DialogHeader className="max-sm:text-left text-left">
          <DialogTitle className="flex flex-row items-center ">
            {' '}
            {selectedUser && (
              <Button
                variant={'ghost'}
                size={'icon'}
                className="mr-2 p-1 h-fit"
                onClick={() => {
                  setSelectedUser(undefined)
                }}
              >
                {' '}
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <p> Share '{notesTitle}'</p>
          </DialogTitle>
          <DialogDescription>
            {selectedUser ? (
              <>
                <div className="my-4  px-4">
                  <div className="text-base flex flex-row gap-2 items-center">
                    <p>Invite</p>
                    <span className="font-bold">
                      {' '}
                      {selectedUser.email}{' '}
                    </span> as{' '}
                    <Select
                      value={shareAccess}
                      onValueChange={(val) => setShareAccess(val)}
                    >
                      <SelectTrigger className="w-fit ring-0 outline-none p-1 px-2 h-fit focus:ring-0">
                        <SelectValue placeholder="Viewer" />
                      </SelectTrigger>
                      <SelectContent className="text-xs">
                        <SelectItem
                          value="viewer"
                          className="text-xs flex flex-row items-baseline"
                        >
                          Viewer
                        </SelectItem>
                        <SelectItem value="editor" className="text-xs">
                          Editor
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="my-4">
                  <Input
                    className="p-4 w-full"
                    type="text"
                    placeholder="Add people"
                    onBlur={async () => {
                      console.log('BL')
                      await new Promise((resolve) => setTimeout(resolve, 50))
                      setViewList(false)
                    }}
                    onClick={() => {
                      setViewList(true)
                    }}
                    onChange={(e) => {
                      const val = e.target.value
                      setViewList(true)
                      if (val.length > 0) {
                        const matchedUsers = users?.filter(
                          (user) =>
                            user.email.includes(val) || user.name.includes(val),
                        )
                        console.log(matchedUsers)
                        if (matchedUsers) {
                          setUsers(matchedUsers)
                        }
                      } else {
                        setUsers(users)
                      }
                    }}
                  />
                  <div className="absolute w-full bg-gray-100 max-w-[90%] max-sm:max-w-[86%] m-1 ml-0.5 rounded-md max-h-[25vh] overflow-scroll no-scrollbar">
                    {viewList && (
                      <>
                        {Users &&
                          Users.map((user) => (
                            <div
                              onClick={() => {
                                setSelectedUser({
                                  email: user.email,
                                  permission: '',
                                })
                                setViewList(false)
                              }}
                              className="hover:bg-gray-200 w-full p-2 rounded-md flex flex-row items-center hover:cursor-pointer"
                            >
                              <UserRound className="h-4 w-4 mr-2" />
                              <div>
                                <p>{user.name}</p>
                                <p>{user.email}</p>
                              </div>
                            </div>
                          ))}
                      </>
                    )}
                  </div>
                </div>
                <div className="my-4">
                  <p className="text-base font-semibold">People with access</p>
                </div>
                {isOwner && (
                  <div className="my-4">
                    <p className="text-base font-semibold">Publish</p>
                    <div className="flex flex-row justify-between items-center my-2 hover:bg-gray-100 p-2 rounded-md">
                      <div className="flex flex-row gap-2 ">
                        <Globe className="h-5 w-5 " /> Publish to the Featured
                        tab.{' '}
                      </div>
                      <Button
                        className="bg-blue-200 hover:bg-blue-100 border border-transparent hover:border-blue-300 text-blue-500 p-0.5 px-4"
                        size={'sm'}
                      >
                        Publish
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {selectedUser ? (
            <div className="flex flex-row gap-2 justify-between w-full">
              <Button size={'sm'} variant={'outline'}>
                <Link2 className="h-4 w- mr-2" /> Copy link
              </Button>
              <div className="flex flex-row gap-2">
                <Button
                  onClick={() => {
                    setSelectedUser(undefined)
                  }}
                  size={'sm'}
                  variant={'ghost'}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => shareNotesHandler()}
                  size={'sm'}
                  variant={'default'}
                >
                  Send
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-row justify-between w-full">
              {' '}
              <Button size={'sm'} variant={'outline'}>
                {' '}
                <Link2 className="h-4 w- mr-2" /> Copy link
              </Button>
              <Button size={'sm'} variant={'default'}>
                Done
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ShareWith
