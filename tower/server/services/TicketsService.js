import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { towerEventsService } from "./TowerEventsService.js"


class TicketsService{

    async create(newTicket){
        const event = await dbContext.Events.findById(newTicket.eventId)
        // @ts-ignore
        if (event.capacity <= 0 ) {
            throw new BadRequest("There are no more spots")
        }
        const ticket = await dbContext.Tickets.create(newTicket)
        await ticket.populate('profile')
        await ticket.populate('event')

        // @ts-ignore
        event.capacity -= 1
        
        // @ts-ignore
        await event.save()
        return ticket 
    }

    // GET the tickets from my account
    async getByAccountId(accountId){
        const tickets = await dbContext.Tickets.find({accountId: accountId})
        .populate('profile')
        .populate('event')
        return tickets
    }

    // GET the tickets for people who have tickets to a specific event 
    async getByEventId(eventId){
        let tickets = await dbContext.Tickets.find({eventId: eventId})
        .populate('profile')
        .populate('event')
        return tickets
    }

    async remove(ticketId, userId){
        const foundTicket = await dbContext.Tickets.findById(ticketId)
        // @ts-ignore
        const event = await dbContext.Events.findById(foundTicket.eventId)
        
        if(!foundTicket){
            throw new BadRequest('no ticket at that id')
        }
        if(foundTicket.accountId != userId){
            throw new Forbidden('You cannot remove a ticket of another user')
        }
        await foundTicket.remove()
        // @ts-ignore
        event.capacity += 1
        // @ts-ignore
        event.save()
        return event
    }
}


export const ticketsService = new TicketsService()