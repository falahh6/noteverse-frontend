export interface NoteProps {
  id: string
  title: string
  content: string | null
  userId: string
  createdAt: Date
  updatedAt: Date
  ownerEmail: string
  visibility: string
}

export interface NotesSchemaTypeOne {
  children: {
    text: string
  }[]
  type: string
  id?: undefined
}

export interface NotesSchemaTypeTwo {
  children: {
    text: string
  }[]
  type: string
  id: string
}

export interface SchemaChildNode {
  children?: SchemaChildNode[]
  text?: string
  code?: boolean
  type?: string
  id?: string
  backgroundColor?: string
}
