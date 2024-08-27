'use client'

import {
  Eye,
  Globe,
  LinkIcon,
  Lock,
  MailCheck,
  Pencil,
  Share,
  UserRoundPlus,
  Users,
} from 'lucide-react'
import { Button } from '../ui/button'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/ShadcnTabs'
import { Input } from 'antd'

const ShareWith = () => {
  const { data, status } = useSession()
  const [allUsers, setAllUsers] = useState()

  const getAllUsers = async () => {
    //call api here
  }

  useEffect(() => {}, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="ring-0 outline-0">
        <Button
          color="#dbeafe"
          className="p-1 px-8 h-fit mb-2 mr-1 font-semibold transition-all duration-300 ease-in-out hover:bg-blue-100"
          variant={'outline'}
        >
          <Share className="h-4 w-4 mr-1.5 transition-transform duration-300 ease-in-out group-hover:scale-110" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-[30vw] max-md:max-w-[50vw] max-lg:max-w-[50vw] max-sm:max-w-[60vw] mr-28 max-sm:mr-2 -mt-2 blur-0 rounded-lg shadow-xl">
        <Tabs defaultValue="share" className="">
          <TabsList className="text-xs h-fit w-full">
            {['share', 'export', 'publish'].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="w-full text-sm m-0.5 p-1 px-2 hover:bg-gray-100"
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="share" className="mt-1 flex flex-col gap-1">
            <div className="bg-gray-100 text-xs p-2 rounded-md">
              <div className="my-2">
                <div className="flex flex-row gap-2 items-center">
                  <Users className="h-4 w-4" />{' '}
                  <p className="text-sm font-semibold">Invite to collaborate</p>
                </div>
                <p className="text-gray-500">
                  For easy collaboration with anyone, without even a Noteverse
                  account.
                </p>
              </div>
              <Input
                className="w-full text-xs"
                style={{
                  fontSize: '12px',
                }}
                placeholder="Add emails to invite people"
              />
              <div className="flex flex-row justify-between my-4 mb-2 text-sm">
                <div className="flex flex-row items-center">
                  <UserRoundPlus className="h-6 w-6 mr-1 p-1 bg-gray-200 rounded-full" />{' '}
                  falahsss900@gmail.com
                </div>
                <div>
                  <Select defaultValue={'viewer'}>
                    <SelectTrigger className="w-fit h-fit px-3 py-[2px] outline-none right-0 border-none ">
                      <SelectValue defaultValue={'viewer'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="editor"
                        className="flex flex-row items-center"
                      >
                        <Lock className="h-3 w-3 mr-2 inline" />
                        <span className="text-xs mr-2">Editor</span>
                      </SelectItem>
                      <SelectItem
                        value="viewer"
                        className="flex flex-row items-center"
                      >
                        <Eye className="h-3 w-3 mr-2 inline" />
                        <span className="text-xs mr-2">Viewer</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 text-xs p-2 rounded-md w-full flex flex-row items-center gap-2">
              <Select defaultValue={'only-colab'}>
                <SelectTrigger className="w-full h-fit px-3 py-[5px] outline-none right-0 border-none">
                  <SelectValue defaultValue={'only-colab'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="only-colab"
                    className="flex flex-row items-center"
                  >
                    <Lock className="h-3 w-3 mr-2 inline" />
                    <span className="text-xs ">
                      Only collaborators can access
                    </span>
                  </SelectItem>
                  <SelectItem
                    value="can-view"
                    className="flex flex-row items-center"
                  >
                    <Eye className="h-3 w-3 mr-2 inline" />
                    <span className="text-xs ">
                      Anyone with the link can view
                    </span>
                  </SelectItem>
                  <SelectItem
                    value="can-edit"
                    className="flex flex-row items-center"
                  >
                    <Pencil className="h-3 w-3 mr-2 inline" />
                    <span className="text-xs ">
                      Anyone with the link can Edit
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button className="text-xs h-fit px-3 py-[5px] bg-gray-700 hover:bg-gray-500">
                {' '}
                <LinkIcon className="h-4 w-4 mr-1" /> Copy Link{' '}
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="export">Change your password here.</TabsContent>
          <TabsContent value="publish" className="mt-0 flex flex-col gap-1">
            <div className="bg-gray-100 text-xs p-2 rounded-md">
              <div className="my-2">
                <div className="flex flex-row gap-2 items-center">
                  <Globe className="h-4 w-4" />{' '}
                  <p className="text-sm font-semibold">Publish your notes</p>
                </div>
                <p className="text-gray-500">
                  Publish your notes and will be public for every user in <br />{' '}
                  the <span className="font-semibold">Featured</span> tab.
                </p>
              </div>
              <Button className="text-xs h-fit w-full px-3 py-1 mt-2 bg-gray-700 hover:bg-gray-500">
                {' '}
                <LinkIcon className="h-4 w-4 mr-1" /> Publish{' '}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ShareWith
