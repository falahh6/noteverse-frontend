'use client'

import MaxWidthWrapper from '@/components/layout/MaxwidthWrapper'
import { PlateEditor } from '@/components/platejs/PlateEditor'
import { usePathContext } from '@/context/pathContext'
import { baseURL } from '@/lib/utils'
import { Empty, Skeleton } from 'antd'
import { useSession } from 'next-auth/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const Notes = ({
  params,
}: {
  params: {
    id: string
  }
}) => {
  const searchParams = useSearchParams()
  const editorMode = searchParams.get('mode')
  const pathname = usePathname()

  const [loading, setLoading] = useState(true)
  const [isOwner, setIsOwner] = useState(false)
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
  const [error, setError] = useState(false)

  const { addPage } = usePathContext()

  const [notesSharedWithData, setNotesSharedWithData] = useState()

  const getNotes = async (authToken: string | undefined) => {
    if (authToken) {
      try {
        const response = await fetch(`${baseURL}/notes/${params.id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })

        if (response.ok) {
          const responseData = await response.json()
          setIsOwner(responseData.owner === data?.user?.email)
          const notesData = responseData.data && JSON.parse(responseData.data)
          const parsedTitle = {
            type: 'h1',
            children: [{ text: responseData.title }],
            id: 'title',
          }

          addPage({
            title: responseData.title,
            pathname: pathname + `?mode=${editorMode}`,
            isActive: true,
            isStatic: false,
          })

          if (notesData) {
            setNotesData([parsedTitle, ...notesData])
          } else {
            setNotesData([parsedTitle])
          }
        } else {
          setError(true)
        }
      } catch (error) {
        console.log(error)
        setError(true)
      } finally {
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }

  let called = false
  useEffect(() => {
    if (status === 'authenticated' && !called) {
      getNotes(data.accessToken)
      called = true
    }
  }, [status])

  return (
    <>
      {error && (
        <MaxWidthWrapper className="mt-[10vh] px-0 md:px-2 lg:px-8 sm:px-2">
          <div className="h-full w-full pt-28 flex flex-col gap-6 overflow-hidden">
            {' '}
            <Empty
              description={
                <p className="z-[999]">
                  No notes found for this Id, Please check the link or try{' '}
                  <span
                    onClick={() => {
                      window.location.reload()
                    }}
                    className="text-blue-600 hover:cursor-pointer"
                  >
                    refresh.
                  </span>
                </p>
              }
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />{' '}
          </div>
        </MaxWidthWrapper>
      )}
      {loading ? (
        <MaxWidthWrapper className="mt-[10vh] px-0 md:px-2 lg:px-8 sm:px-2">
          <div className="h-full w-full pt-10 flex flex-col gap-6">
            <Skeleton.Button active block />
            <Skeleton.Button className="py-[15rem] -mt-[8rem]" active block />
          </div>
        </MaxWidthWrapper>
      ) : (
        <>
          {!error && (
            <PlateEditor
              mode={editorMode || 'view'}
              value={notesData}
              notesId={params.id}
              authToken={data?.accessToken!}
              isOwner={isOwner}
            />
          )}
        </>
      )}
    </>
  )
}

export default Notes
