<template>
<div class="row">
    <form @submit.prevent="handleSubmit">
        <div class="p-2 my-2">
            <textarea class="form-control elevation-3" name="body" id="" cols="30" rows="8" placeholder="Tell the people ..." v-model="editable.body"></textarea>
        </div>
        <div class="text-end">
            <button class="btn btn-warning" type="submit"><i class="fs-4 mdi mdi-send-circle"></i> Post</button>
        </div>
    </form>
</div>
</template>


<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import {commentsService} from '../services/CommentsService.js'

export default {
setup(){
    const editable = ref({})
    const route = useRoute()

    return{
        editable,

        async handleSubmit(){
            try {
                editable.value.eventId = route.params.eventId
                await commentsService.createComment(editable.value)
                editable.value = {}
                Pop.success('Comment Added!')
            } catch (error) {
                Pop.error(error)
            }
        }
    }
    }
}
</script>


<style lang="scss" scoped>
</style>