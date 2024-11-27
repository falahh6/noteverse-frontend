'use client'

import { ArrowLeft, Check, Globe, Link2, Loader, UserRound } from 'lucide-react'
import { Button } from '../ui/button'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import useCustomEffect from '@/hooks/use-effect'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { getAppUrl } from '@/lib/utils'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { User, useUserContext } from '@/context/usersContext'
import { Input } from '../ui/Input'
import { toast } from 'sonner'
import { sharedStatus } from '@/lib/types/notes'
import { Icons } from '../icons'
import { Tooltip } from 'antd'

const ShareWith = ({
  authToken,
  notesTitle,
  isOwner,
  notesId,
  getNotes,
  visibility,
}: {
  authToken: string
  notesTitle: string
  isOwner: boolean
  notesId: number
  getNotes: (authToken: string) => void
  visibility: 'Public' | 'Private' | 'Shared'
}) => {
  const { data } = useSession()
  const { users, loading: loadingToGetUsers } = useUserContext()
  const [Users, setUsers] = useState<User[] | undefined>([])
  const [viewList, setViewList] = useState(false)
  const [shareAccess, setShareAccess] = useState('View')
  const [sharedStatuses, setSharedStatuses] = useState<sharedStatus[]>([])

  useEffect(() => {
    setUsers(users?.filter((u) => u.email !== data?.user.email))
    console.log(
      'FILTERED USERS: ',
      users?.filter((u) => u.email !== data?.user.email),
    )
  }, [users])

  const [selectedUser, setSelectedUser] = useState<
    | {
        email: string
        permission: string
        id: string
      }
    | undefined
  >()

  const [sending, setSending] = useState(false)
  const [actionLoading, setActionLoading] = useState<number | null>(null)
  const [publishLoading, setPublishLoading] = useState(false)

  const getSharedStatuses = async () => {
    const response = await fetch(
      `/api/notes/shared-statuses?notes_id=${notesId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `${authToken}`,
        },
      },
    )

    if (response.ok) {
      const results = await response.json()
      console.log('results (shared statuse): ', results.data)

      const sharedStatuses = results.data?.map((status: any) => ({
        id: status.id,
        permissions: status.permissions,
        shared_with: status.sharedWith,
        shared_by: status.sharedBy,
        note: status.noteId,
      }))

      console.log('sharedStatuses PPP: ', sharedStatuses)

      setSharedStatuses([
        { id: 'na', permissions: 'owner', shared_with: data?.user.email },
        ...sharedStatuses,
      ])
    }
  }

  const removeSharedStatus = async (id: number) => {
    setActionLoading(id)

    try {
      const response = await fetch(
        `/api/notes/shared-statuses?status_id=${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `${authToken}`,
          },
        },
      )

      if (response.status === 200) {
        getSharedStatuses().then(() => {
          setActionLoading(null)
        })
      } else {
        setActionLoading(null)
      }
    } catch (error) {
      console.error('Error removing shared status: ', error)
      setActionLoading(null)
    }
  }

  const updateSharedStatus = async (id: number, permission: string) => {
    setActionLoading(id)
    try {
      const response = await fetch(
        `/api/notes/shared-statuses?status_id=${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${authToken}`,
          },
          body: JSON.stringify({
            permissions: permission,
          }),
        },
      )

      if (response.ok) {
        const results = await response.json()
        console.log(results)
        getSharedStatuses().finally(() => {
          setActionLoading(null)
        })
      } else {
        setActionLoading(null)
      }
    } catch (error) {
      console.error('Error updating shared status: ', error)
      setActionLoading(null)
    }
  }

  const handleUsersListUpdate = () => {
    const excludeEmails = new Set(
      sharedStatuses.map((entry) => entry.shared_with?.email).filter(Boolean),
    )

    const updatedStatuses = users?.filter(
      (u) => !excludeEmails.has(u.email) && u.email !== data?.user.email,
    )
    setUsers(updatedStatuses)
  }

  const shareNotesHandler = async () => {
    setSending(true)
    try {
      const response = await fetch(`/api/notes/shared-statuses`, {
        method: 'POST',
        headers: {
          Authorization: `${authToken}`,
        },
        body: JSON.stringify({
          sharedWith: selectedUser,
          permissions: selectedUser?.permission,
          notes_id: notesId,
        }),
      })

      if (response.ok) {
        console.log('response : ', response)
        setSelectedUser(undefined)
        toast.success(`Successfully sent the invite to ${selectedUser?.email}`)
        getSharedStatuses()
      } else {
        toast.error('Error while sending the invite. Please try again.')
      }
    } catch (error) {
      toast.error('Error while sending the invite. Please try again.')
    } finally {
      setSending(false)
    }
  }

  const hanldleNotesPublish = async (visibility: 'Private' | 'Public') => {
    setPublishLoading(true)
    try {
      const response = await fetch(`/api/notes/publish?notes_id=${notesId}`, {
        method: 'POST',
        headers: {
          Authorization: `${authToken}`,
        },
        body: JSON.stringify({
          visibility: visibility,
        }),
      })

      if (response.ok) {
        getNotes(authToken)
        toast.success(`Successfully published the notes.`)
      } else {
        toast.error('Error while publishing the notes. Please try again.')
      }
    } catch (error) {
      toast.error('Error while publishing the notes. Please try again.')
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setPublishLoading(false)
    }
  }

  const [isCopied, setIsCopied] = useState(false)

  const copyHandler = () => {
    const notesUrl = getAppUrl() + `/notes/${notesId}`

    navigator.clipboard
      .writeText(notesUrl)
      .then(() => {
        toast.success('Notes URL copied to clipboard')
        setIsCopied(true)
      })
      .catch(() => {
        toast.error('Error copying URL.')
      })

    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  useEffect(() => {
    handleUsersListUpdate()
  }, [sharedStatuses, loadingToGetUsers])

  useCustomEffect(() => {
    getSharedStatuses()
  }, [])

  return (
    <Dialog
      onOpenChange={() => {
        setViewList(false)
      }}
    >
      <DialogTrigger>
        <Icons.Share
          strokeWidth={2}
          className="text-gray-500 h-7 w-7 border border-gray-300 rounded-md hover:backdrop-blur-sm hover:bg-gray-100 hover:cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent className="max-sm:w-[90%] rounded-lg">
        <DialogHeader className="max-sm:text-left text-left">
          <DialogTitle className="flex flex-row items-center text-wrap max-sm:file:max-w-[80%]">
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
            <p className="text-wrap max-sm:text-sm"> Share '{notesTitle}'</p>
          </DialogTitle>
          <DialogDescription>
            {selectedUser ? (
              <div className="my-4  px-4">
                <div className="text-base max-sm:text-sm flex flex-row gap-2 items-center">
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
                        value="View"
                        className="text-xs flex flex-row items-baseline"
                      >
                        Viewer
                      </SelectItem>
                      <SelectItem value="Edit" className="text-xs">
                        Editor
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
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
                            user.email.includes(val) ||
                            user.username.includes(val),
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
                      {Users?.map((user) => (
                        <div
                          role="button"
                          key={user.id}
                          tabIndex={0}
                          onClick={() => {
                            setSelectedUser({
                              email: user.email,
                              permission: shareAccess,
                              id: user.id,
                            })
                            setViewList(false)
                          }}
                          className="hover:bg-gray-200 w-full p-2 rounded-md flex flex-row items-center hover:cursor-pointer"
                        >
                          <UserRound className="h-4 w-4 mr-2" />
                          <div>
                            <p>{user.username}</p>
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
                          {status.permissions === 'owner' ? (
                            <div>
                              <p className=" text-sm font-semibold">
                                {data?.user.name}
                              </p>
                              <p> {data?.user.email}</p>
                            </div>
                          ) : (
                            <div>
                              <p className=" text-sm font-semibold">
                                {status.shared_with?.username}
                              </p>
                              <p>{status.shared_with?.email}</p>
                            </div>
                          )}
                          <div>
                            {status.permissions === 'owner' ? (
                              <Button
                                variant={'outline'}
                                className='className="w-fit ring-0 outline-none p-1 px-2 h-fit focus:ring-0"'
                                disabled
                              >
                                Owner
                              </Button>
                            ) : (
                              <Select
                                value={status.permissions}
                                onValueChange={(val) => {
                                  if (val === 'remove') {
                                    removeSharedStatus(status.id)
                                  } else {
                                    updateSharedStatus(status.id, val)
                                  }
                                }}
                                disabled={actionLoading === status.id}
                              >
                                <SelectTrigger className="w-fit ring-0 outline-none p-1 px-2 h-fit focus:ring-0">
                                  {actionLoading === status.id ? (
                                    <Loader className="h-4 animate-spin w-4 mr-2" />
                                  ) : (
                                    <SelectValue placeholder="View" />
                                  )}
                                </SelectTrigger>
                                <SelectContent className="text-xs">
                                  <SelectItem
                                    value="View"
                                    className="text-xs flex flex-row items-baseline"
                                  >
                                    Viewer
                                  </SelectItem>
                                  <SelectItem value="Edit" className="text-xs">
                                    Editor
                                  </SelectItem>
                                  <SelectItem
                                    value="remove"
                                    className="text-xs text-red-500 hover:text-red-500"
                                  >
                                    Remove
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          </div>
                        </div>{' '}
                      </>
                    ))}
                  </div>
                </div>
                {isOwner && (
                  <div className="my-4">
                    <p className="text-base font-semibold">Publish</p>
                    <div className="flex flex-row justify-between items-center my-2 hover:bg-gray-100 p-2 rounded-md">
                      <div className="flex flex-row gap-2 ">
                        <Globe className="h-5 w-5 " />
                        {visibility === 'Private'
                          ? 'Publish to the Featured tab.'
                          : 'Published to the Featured tab.'}
                      </div>
                      {visibility === 'Private' && (
                        <Button
                          className="bg-blue-200 hover:bg-blue-100 border border-transparent hover:border-blue-300 text-blue-500 p-0.5 px-4"
                          size={'sm'}
                          disabled={publishLoading}
                          onClick={() => {
                            hanldleNotesPublish('Public')
                          }}
                        >
                          {publishLoading && (
                            <Loader className="h-4 w-4 animate-spin mr-1" />
                          )}{' '}
                          Publish
                        </Button>
                      )}
                      {visibility === 'Public' && (
                        <Tooltip title="Make it Private">
                          <Button
                            className="bg-green-200 hover:bg-green-100 border border-transparent hover:border-green-300 text-green-500 p-0.5 px-4"
                            size={'sm'}
                            disabled={publishLoading}
                            onClick={() => {
                              hanldleNotesPublish('Private')
                            }}
                          >
                            {publishLoading && (
                              <Loader className="h-4 w-4 animate-spin" />
                            )}{' '}
                            Published
                          </Button>
                        </Tooltip>
                      )}
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
              <Button onClick={copyHandler} size={'sm'} variant={'outline'}>
                {!isCopied ? (
                  <>
                    {' '}
                    <Link2 className="h-4 w-4 mr-2" /> Copy link
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" /> Copied!
                  </>
                )}
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
              <Button onClick={copyHandler} size={'sm'} variant={'outline'}>
                {!isCopied ? (
                  <>
                    {' '}
                    <Link2 className="h-4 w- mr-2" /> Copy link
                  </>
                ) : (
                  <>
                    <Check className="h-4 w- mr-2" /> Copied!
                  </>
                )}
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
