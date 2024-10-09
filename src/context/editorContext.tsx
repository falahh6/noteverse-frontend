import { EditorInstance } from 'novel'
import { createContext, useState, ReactNode, useContext } from 'react'

interface MyContextType {
  editor: EditorInstance
  setEditor: (value: EditorInstance) => void
}

export const MyContext = createContext<MyContextType | undefined>(undefined)

interface MyProviderProps {
  children: ReactNode
}

export const EditorProvider = ({ children }: MyProviderProps) => {
  const [editor, setEditor] = useState<EditorInstance | any>()

  return (
    <MyContext.Provider value={{ editor, setEditor }}>
      {children}
    </MyContext.Provider>
  )
}

export const useEditorContext = () => {
  const context = useContext(MyContext)
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider')
  }
  return context
}
