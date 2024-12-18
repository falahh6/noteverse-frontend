export interface NoteProps {
  id: string
  title: string
  content: string | null
  userId: string
  createdAt: string
  updatedAt: string
  ownerEmail: string
  visibility: string
  likes: {
    id: string
    email: string
  }[]
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

export interface sharedStatus {
  id: number
  shared_by?: {
    id: number
    email: string
    username: string
  }
  shared_with?: {
    id: number
    email: string
    username: string
  }
  permissions: 'View' | 'Edit' | 'owner'
  shared_at?: Date
  note?: number
}

export type getNotesFnType = (
  authToken: string,
  silent?: boolean,
) => Promise<NoteProps[] | undefined>
