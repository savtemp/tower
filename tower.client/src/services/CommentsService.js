import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class CommentsService {

    async createComment(newComment){
        const res = await api.post(`api/comments`, newComment)
        logger.log('Creating a comment', res.data)
        AppState.comments.push(res.data)
    }

    async getCommentsByEventId(eventId){
        const res = await api.get(`api/events/${eventId}/comments`)
        logger.log('Comments', res.data)
        AppState.comments = res.data
    }
}


export const commentsService = new CommentsService()