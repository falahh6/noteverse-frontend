'use client'

import MaxWidthWrapper from '@/components/layout/MaxwidthWrapper'
import { PlateEditor } from '@/components/platejs/PlateEditor'
import { baseURL } from '@/lib/utils'
import { Skeleton } from 'antd'
import { Loader } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const Notes = ({
  params,
}: {
  params: {
    id: string
  }
}) => {
  const [loading, setLoading] = useState(true)
  const [notesData, setNotesData] = useState<
    (
      | {
          children: {
            text: string
          }[]
          type: string
          id?: undefined
        }
      | {
          children: {
            text: string
          }[]
          type: string
          id: string
        }
    )[]
  >([])

  const { data, status } = useSession()

  const getNotes = async (authToken: string | undefined) => {
    if (authToken) {
      console.log('API CALLED')
      try {
        const response = await fetch(`${baseURL}/notes/${params.id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })

        if (response.ok) {
          const responseData = await response.json()
          console.log(responseData)
          const data = responseData.data && JSON.parse(responseData.data)
          console.log('DATA : ', data)
          const parsedTitle = {
            type: 'h1',
            children: [{ text: responseData.title }],
            id: 'title',
          }

          if (data) {
            setNotesData([parsedTitle, ...data])
          } else {
            setNotesData([parsedTitle])
          }
        }
      } catch (error) {
        console.log(error)
        toast.error('Error Fetching your notes, Please Refresh.')
      } finally {
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log(data, status)
    if (status === 'authenticated') {
      getNotes(data.accessToken)
      console.log(data.accessToken)
    }
  }, [status])

  return (
    <>
      {loading ? (
        <MaxWidthWrapper className="mt-[10vh] px-0 md:px-2 lg:px-8 sm:px-2">
          <div className="h-screen w-full pt-10 flex flex-col gap-6 overflow-hidden">
            <Skeleton.Button active block />
            <Skeleton.Button className="py-[15rem] -mt-[8rem]" active block />
          </div>
        </MaxWidthWrapper>
      ) : (
        <PlateEditor
          value={notesData}
          notesId={params.id}
          authToken={data?.accessToken!}
        />
      )}
    </>
  )
}

export default Notes
