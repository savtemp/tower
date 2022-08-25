<template>
    <div class="row elevation-2">
        <div class="d-flex justify-content-between">
            <div class="col-3">
                <img class="img-fluid" :src="comment.creator.picture" alt="">
            </div>
            <div class="col-5">
                <p>{{comment.creator.name}}</p>
                <!-- <p>Attending event</p> -->
                <p>{{comment.body}}</p>
            </div>
            <div class="col-2 text-end">
                <button class="btn btn-danger" @click="deleteCommentByCommentId(comment.id)" >Delete Comment</button>
            </div>
        </div>
    </div>
</template>


<script>
import { ref } from 'vue';
import { commentsService } from '../services/CommentsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
    props: {comment: {type: Object, required: true}},

    setup(props){
        const deleting = ref(false)

        return{
            deleting,

            async deleteCommentByCommentId(commentId){
                try {
                    const yes = await Pop.confirm('Delete this comment?')
                    if(!yes){return}
                    await commentsService.deleteCommentByCommentId(commentId)
                } catch (error) {
                    logger.error('deleting comment')
                    Pop.error(error)
                }
            }
        }

    }
}
</script>


<style lang="scss" scoped>
</style>