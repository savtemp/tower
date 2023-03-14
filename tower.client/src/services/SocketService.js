import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('error', this.onError)
      .on('created:event', this.createdEvent)
  }

  onError(e) {
    Pop.toast(e.message, 'error')
  }

  createdEvent(payload){
    try {
      logger.log('[CREATED EVENT PAYLOAD]', payload)
      AppState.towerEvents.unshift(payload)
      Pop.toast(`${payload.name} event was just created!`)
    } catch (error) {
      console.error(error)
      // @ts-ignore 
      Pop.error(('[ERROR]'), error.message)
    }
  }

}

export const socketService = new SocketService()
