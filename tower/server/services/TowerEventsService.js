import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class TowerEventsService{
    async create(newEvent){
        const event = await dbContext.Events.create(newEvent)
        await event.populate('creator', 'name picture')
        return event
    }

    async getAll(){
        const events = await dbContext.Events.find().sort({createdAt: -1}).populate('creator', 'name picture')
        return events
    }

    async getById(id){
        const event = await dbContext.Events.findById(id).populate('creator', 'name picture')
        if(!event){
            throw new BadRequest('no event by that id')
        }
        return event
    }

    async editEvent(id, body){
        let event = await this.getById(id)
        // @ts-ignore
        if(event.creatorId.toString() != body.creatorId){
            throw new Forbidden('You do not have permission to edit this')
        }

        if(event.isCanceled == true){
            throw new Forbidden('This event was cancelled, you cannot make changes to a cancelled event')
        }

        event.name = body.name || event.name
        event.description = body.description || event.description
        event.coverImg = body.coverImg || event.coverImg
        event.location = body.location || event.location
        event.startDate = body.startDate || event.startDate
        event.type = body.type || event.type

        let updatedEvent = await event.save()
        return updatedEvent
    }

    async cancelEvent(id, userId){
        let event = await this.getById(id)
        if(event.creatorId != userId){
            throw new Forbidden('You do not have permission to cancel this event')
        }
        event.isCanceled = event.isCanceled ? false : true
        await event.save()
        return event 
    }
}
export const towerEventsService = new TowerEventsService()
