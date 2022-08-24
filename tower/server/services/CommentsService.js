import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"


class CommentsService{
    async create(newComment){
        const comment = await dbContext.Comments.create(newComment)
        await comment.populate('creator', 'name picture')
        return comment
    }

    async getAll(query = {}){
        const comments = await dbContext.Comments.find(query).populate('creator', 'name picture')
        return comments
    }

    async removeComment(id, userId){
        const comment = await dbContext.Comments.findById(id)
        // let comment = await this.removeComment(id)
        // @ts-ignore
        if(comment.creatorId != userId){
            throw new Forbidden('You do not have permission to remove this comment')
        }
        // @ts-ignore
        comment.remove()
        return ('deleted comment')
    }

}


export const commentsService = new CommentsService()