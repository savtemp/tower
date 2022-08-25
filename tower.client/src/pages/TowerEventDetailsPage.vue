<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h2>Album Title</h2>
            </div>
            <div class="col-3">
                <img class="img-fluid" src="" alt="">
            </div>
        </div>
    </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { onMounted, popScopeId } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { towerEventsService } from '../services/TowerEventsService.js';
import Pop from '../utils/Pop.js';

export default {
    setup(){
        const route = useRoute()

        async function getEventById(){
            try {
                await towerEventsService.getById(route.params.eventId)
            } catch (error) {
                Pop.error(error)
            }
        }

        // async function getCommentsByEventId(){
        //     try {
        //         await commments service 
        //     } catch (error) {
        //         Pop.error(error)
        //     }
        // }

        onMounted(() => {
            getEventById()
            // getCommentsByEventId()
        })

        return{
            event: computed(() => AppState.activeTowerEvent),
            comments: computed(() => AppState.comments),

        }
    }
}
</script>


<style lang="scss" scoped>
</style>