export type NoteType = 'NoteTxt' | 'NoteImg' | 'NoteTodos' | 'NoteVideo'

export interface Note {
  id: string
  type: NoteType
  isPinned: boolean
  titleTxt: string
  info: any
  style?: { backgroundColor: string }
}