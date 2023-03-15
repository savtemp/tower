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
      .on('joined:room', this.joinedRoom)
      .on('left:room', this.leftRoom)
      .on('created:comment', this.createComment)
      .on('toUser:createdTicket', this.notifyEventCreator)
      .on('created:ticket', this.createdTicket)
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

  joinedRoom(payload){
    try {
      if(payload && payload.id != AppState.account.id){
        Pop.toast(`${payload.name} has joined the room!`)
      }
    } catch (error) {
      console.error(error)
      // @ts-ignore 
      Pop.error(('[ERROR]'), error.message)
    }
  }

  leftRoom(payload){
    try {
      if(payload){
        Pop.toast(`${payload.name} has left the room.`)
      }
    } catch (error) {
      console.error(error)
      // @ts-ignore 
      Pop.error(('[ERROR]'), error.message)
    }
  }

  createComment(payload){
    try {
      AppState.comments.push(payload)

      if(payload.creatorId != AppState.account.id){
        Pop.toast(`${payload.creator.name} has just posted a new comment.`)
      }

    } catch (error) {
      console.error(error)
      // @ts-ignore 
      Pop.error(('[ERROR]'), error.message)
    }
  }

  createdTicket(payload){
    try {
      AppState.eventTickets.push(payload)
      AppState.activeTowerEvent.capacity --
      if(payload.creatorId == AppState.account.id){
        AppState.myTickets.push(payload)
      }
    } catch (error) {
      console.error(error)
      // @ts-ignore 
      Pop.error(('[ERROR]'), error.message)
    }
  }

  notifyEventCreator(payload){
    Pop.toast(`${payload.profile.name} has purchased a ticket to ${payload.event.name}`)
  }

}

export const socketService = new SocketService()
