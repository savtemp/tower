<template>
        <div class="row d-flex justify-content-between">
            <div class="col-2 text-center">
                <img class="img-fluid user-img" :src="comment.creator.picture" alt="" :title="comment.creator.name">
            </div>
            <div class="col-10 rounded elevation-3 bg-light text-dark d-flex justify-content-between p-0">
                    <div class="row p-2">
                        <div class="col-12">
                            <p>{{comment.creator.name}}</p>
                            <!-- <p>Attending event</p> -->
                            <p>{{comment.body}}</p>
                        </div>
                    </div>

                    <div class="row p-2">
                        <div class="col-12 pt-2 m-2">
                            <button class="btn btn-danger" @click="deleteCommentByCommentId(comment.id)" >Delete Comment</button>
                        </div>
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
.user-img{
    height: 5rem;
    width: 5rem;
    object-fit: cover;
    object-position: center;
    border-radius: 50px;
    border: #B6D369 solid 2px;
}
</style>