'use client'

import { Input } from 'antd'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const { Search } = Input

/*
    Search functionality via query params
    handle the tab changes and url 
*/

const SearchNotes = () => {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const type = params.get('type')
  const searchQuery = params.get('s')
  const [value, setValue] = useState('')

  useEffect(() => {
    if (searchQuery) {
      setValue(searchQuery)
    }
  }, [])

  const handleValueChange = (val: string) => {
    setValue(val)
    let newParams = new URLSearchParams([['s', val]])
    if (val.length > 0) {
      router.push(pathname + `?type=${type}` + `&${newParams}`)
    } else {
      router.push(pathname + `?type=${type}`)
    }
  }

  return (
    <div className="max-w-[30vw] max-sm:max-w-[60vw] max-md:max-w-[40vw] max-lg:max-w-[50vw] w-full">
      <Search
        allowClear
        className="w-full p-2"
        style={{
          padding: '12px',
          fontSize: '12px',
        }}
        value={value}
        onChange={(e) => {
          handleValueChange(e.target.value)
        }}
        // loading
        enterButton
        placeholder="Search for any notes"
      />
    </div>
  )
}
export default SearchNotes
