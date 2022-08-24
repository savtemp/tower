import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import { ticketsService } from "../services/TicketsService.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import BaseController from "../utils/BaseController.js";


export class TowerEventsController extends BaseController{
    constructor(){
        super(`api/events`)
        this.router
        .get('', this.getAll)
        .get('/:id', this.getById)
        .get('/:id/tickets', this.getTickets)
        .get('/:id/comments', this.getComments)
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.create)
        .put('/:id', this.editEvent)
        .delete('/:id', this.cancelEvent)
    }

    async create(req, res, next){
        try {
            req.body.creatorId = req.userInfo.id
            const event = await towerEventsService.create(req.body)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async getAll(req, res, next){
        try {
            const events = await towerEventsService.getAll()
            return res.send(events)
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next){
        try {
            const event = await towerEventsService.getById(req.params.id)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async editEvent(req, res, next){
        try {
            req.body.creatorId = req.userInfo.id
            let updatedEvent = await towerEventsService.editEvent(req.params.id, req.body)
            return res.send(updatedEvent)
        } catch (error) {
            next(error)
        }
    }

    async cancelEvent(req, res, next){
        try {
            const event = await towerEventsService.cancelEvent(req.params.id, req.userInfo.id)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async getTickets(req, res, next){
        try {
            let tickets = await ticketsService.getByEventId(req.params.id)
            return res.send(tickets)
        } catch (error) {
            next(error)
        }
    }

    async getComments(req, res, next){
        try {
            let comments = await commentsService.getAll({eventId: req.params.id})
            return res.send(comments)
        } catch (error) {
            next(error)
        }
    }


}