import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class TowerEventsService{
    async getAll(){
        const res = await api.get(`api/events`)
        logger.log('Got events', res.data)
        AppState.towerEvents = res.data
    }

    async getById(id){
        const res = await api.get(`api/events/` + id)
        logger.log('Get event by Id', res.data)
        AppState.activeTowerEvent.res.data
    }

    async createEvent(newEvent){
        const res = await api.post(`api/events`, newEvent)
        logger.log('Create event', res.data)
        AppState.towerEvents.unshift(res.data)
    }

}

export const towerEventsService = new TowerEventsService()