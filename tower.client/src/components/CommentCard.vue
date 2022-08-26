<template>
        <div class="row d-flex justify-content-between p-2">
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
                        <div class="col-12 pt-2 m-2" v-if="comment.creator.id == account.id">
                            <button class="btn btn-danger" @click="deleteCommentByCommentId(comment.id)" title="Delete Comment"><i class="mdi mdi-trash-can"></i></button>
                        </div>
                    </div>
            </div>
        </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import { AppState } from '../AppState.js';
import { commentsService } from '../services/CommentsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
    props: {comment: {type: Object, required: true}},

    setup(props){
        const deleting = ref(false)

        return{
            deleting,
            comments: computed(() => AppState.comments),
            account: computed(() => AppState.account),

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
    border: #e27500 solid 2px;
}
</style>