'use client'

import {
  ArrowLeft,
  Globe,
  Link2,
  Loader,
  Share,
  Trash,
  UserRound,
} from 'lucide-react'
import { Button } from '../ui/button'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'

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
import { sharedStatus } from '@/lib/types/notes'

const ShareWith = ({
  authToken,
  notesTitle,
  isOwner,
  notesId,
  sharedStatuses,
}: {
  authToken: string
  notesTitle: string
  isOwner: boolean
  notesId: number
  sharedStatuses: sharedStatus[]
}) => {
  const { data, status } = useSession()
  const { users } = useUserContext()
  const [Users, setUsers] = useState<User[] | null>([])
  const [viewList, setViewList] = useState(false)
  const [shareAccess, setShareAccess] = useState('view')

  const [sharedUsers, setSharedUsers] = useState<
    { id: string; permission: string; email: string; name: string }[]
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

  const [sending, setSending] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)

  const getSharedStatuses = async () => {
    const response = await fetch(`${baseURL}/sharedstatuses/${notesId}/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })

    if (response.ok) {
      const results = await response.json()
      console.log(results)
    }
  }

  const removeSharedStatus = async (id: number) => {
    setActionLoading(true)
    try {
      const response = await fetch(`${baseURL}/sharedstatuses/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })

      if (response.ok) {
        const results = await response.json()
        toast.success(JSON.stringify(results))
        console.log(results)
      }
    } catch (error) {
    } finally {
      setActionLoading(false)
    }
  }

  const updateSharedStatus = async (id: number, permission: string) => {
    setActionLoading(true)
    try {
      const response = await fetch(`${baseURL}/sharedstatuses/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          permissions: permission,
        }),
      })

      if (response.ok) {
        const results = await response.json()
        console.log(results)
      }
    } catch (error) {
    } finally {
      setActionLoading(false)
    }
  }

  useEffect(() => {
    // const updatedUsers = sharedStatuses.map((status) => status.id)
    // setUsers()
    /* TODO : Filterout the shared Users and users to show in dropdown, also when new share status created */
  }, [])

  const shareNotesHandler = async () => {
    setSending(true)

    console.log({
      shared_by: data?.user.id as number,
      shared_with: 5,
      permissions: selectedUser?.permission,
      note: notesId,
    })
    try {
      const response = await fetch(`${baseURL}/sharedstatuses/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          shared_by: data?.user.id as number,
          shared_with: 5,
          permissions: selectedUser?.permission,
          note: notesId,
        }),
      })

      if (response.ok) {
        setSelectedUser(undefined)
        toast.success(`Successfully sent the invite to ${selectedUser?.email}`)
      } else {
        toast.error('Error while sending the invite. Please try again.')
      }
    } catch (error) {
      toast.error('Error while sending the invite. Please try again.')
    } finally {
      setSending(false)
    }
  }

  useEffect(() => {
    getSharedStatuses()
  }, [])

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
                          value="view"
                          className="text-xs flex flex-row items-baseline"
                        >
                          Viewer
                        </SelectItem>
                        <SelectItem value="edit" className="text-xs">
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
                  {viewList && (
                    <div className="absolute w-full bg-gray-100 max-w-[90%] max-sm:max-w-[86%] m-1 ml-0.5 rounded-md max-h-[25vh] overflow-scroll no-scrollbar shadow-md border z-50">
                      {Users &&
                        Users.map((user) => (
                          <div
                            onClick={() => {
                              setSelectedUser({
                                email: user.email,
                                permission: shareAccess,
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
                    </div>
                  )}
                </div>
                <div className="my-4">
                  <p className="text-base font-semibold">People with access</p>
                  <div className="flex flex-col gap-3 mt-2 max-h-44 overflow-y-auto custom-scrollbar pr-2">
                    {sharedStatuses.map((status) => (
                      <>
                        <div className="w-full bg-gray-100 p-2 rounded-md flex flex-row items-center justify-between">
                          <div>
                            <p className=" text-sm font-semibold">Falah</p>
                            <p>falah@gmail.com</p>
                          </div>
                          <div>
                            <Select
                              value={status.permissions}
                              onValueChange={(val) => {
                                if (val === 'remove') {
                                  removeSharedStatus(status.id)
                                  // remove the sharedStatuses
                                } else {
                                  updateSharedStatus(status.id, val)
                                }
                              }}
                              // disabled
                            >
                              <SelectTrigger className="w-fit ring-0 outline-none p-1 px-2 h-fit focus:ring-0">
                                {actionLoading ? (
                                  <Loader className="h-4 animate-spin w-4 mr-2" />
                                ) : (
                                  <SelectValue placeholder="View" />
                                )}
                              </SelectTrigger>
                              <SelectContent className="text-xs">
                                <SelectItem
                                  value="view"
                                  className="text-xs flex flex-row items-baseline"
                                >
                                  Viewer
                                </SelectItem>
                                <SelectItem value="edit" className="text-xs">
                                  Editor
                                </SelectItem>
                                <SelectItem
                                  value="remove"
                                  // onClick={() => removeSharedStatus(status.id)}
                                  className="text-xs text-red-500 hover:text-red-500"
                                >
                                  Remove
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>{' '}
                        {/* <p>{user.shared_with}</p> | <p>{user.permissions}</p> */}
                        {/* 
                          todo : shared with name and email, add switch with api call, remove shared status
                        */}
                      </>
                    ))}
                  </div>
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
                  disabled={sending}
                >
                  {sending ? (
                    <>
                      {' '}
                      <Loader className="h-4 animate-spin w-4 ml-1" /> Sending
                    </>
                  ) : (
                    'Send'
                  )}
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