'use client'

import { Input } from 'antd'
import { useEffect, useState } from 'react'
import { useEditorContext } from '@/context/editorContext'

const Search = () => {
  const { editor } = useEditorContext()
  const [searchText, setSearchText] = useState('')
  const onChangeHandler = (text: string) => {
    editor.commands.search(text)
    setSearchText(text)
  }

  const clearHandler = () => {
    editor.commands.clearSearch()
  }

  useEffect(() => {
    console.log('@contenct : ', editor)
  }, [editor])

  return (
    <Input
      type="text"
      value={searchText}
      placeholder="Search"
      onChange={(e) => onChangeHandler(e.target.value)}
      allowClear
      onClear={clearHandler}
    />
  )
}

export default Search
