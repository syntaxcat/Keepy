import mitt from 'mitt'

export type UserMsg = {
  txt: string
  type?: 'success' | 'error' | 'info'
  content?: string
}

type Events = {
  'show-msg': UserMsg
}

export const eventBus = mitt<Events>()