import { eventBus } from './event-bus-service'

export function showMsg(txt: string, type: 'success' | 'error' | 'info' = 'info', content?: string) {
  eventBus.emit('show-msg', { txt, type, content })
}