import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class TicketsService{
    async createTicket(newTicket){
        const res = await api.post(`api/tickets`, newTicket)
        logger.log('creating ticket', res.data)
        AppState.eventTickets.push(res.data)
        AppState.myTickets.push(res.data)
        AppState.activeTowerEvent.capacity --
        
    }

    async removeTicket(ticketId){
        const res = await api.delete(`api/tickets/${ticketId}`)
        logger.log('removing tickets', res.data)
        AppState.eventTickets = AppState.eventTickets.filter(t => t.id != ticketId)
        AppState.myTickets = AppState.myTickets.filter(t => t.id != ticketId)
        AppState.activeTowerEvent.capacity ++
    }

    async getTicketsByEvent(eventId){
        const res = await api.get(`api/events/${eventId}/tickets`)
        logger.log('getting this events tickets', res.data)
        AppState.eventTickets = res.data
    }

    async getMyTicketByAccount(){
        const res = await api.get(`account/tickets`)
        logger.log('getting my account tickets', res.data)
        AppState.myTickets = res.data
    }
}


export const ticketsService = new TicketsService