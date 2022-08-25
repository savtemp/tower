<template>
    <div class="container">
        <div class="row">
            <div class="col-3">
                <img class="img-fluid" :src="event.coverImg" alt="">
            </div>
            <div class="col-6 text-dark">
                <div class="row">
                    <div class="col-6">
                        <h2>{{event.name}}</h2>
                        <p>{{event.location}}</p>
                    </div>
                    <div class="col-6">
                        <p>{{event.startDate}}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <p>{{event.description}}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <p>{{event.capacity}} <span> spots left</span></p>
                    </div>
                    <div class="col-6">
                        <button class="btn btn-warning w-70">Attend</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <p>Tickets for the people attending - add images of attendees </p>
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="col-10 bg-secondary">
            <p>What are people saying</p>
        </div>
        <div class="col-10 bg-primary">
            <div class="text-end">
                <p>Join the conversation</p>
            </div>
            <div class="text-center">
                <CommentForm />
            </div>
        </div>
        <div class="col-10">
            <CommentCard :comment="c" v-for="c in comments" :key="c.id" /> 
        </div>
    </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { towerEventsService } from '../services/TowerEventsService.js';
import Pop from '../utils/Pop.js';
import CommentForm from '../components/CommentForm.vue';
import CommentCard from '../components/CommentCard.vue';
import { commentsService } from '../services/CommentsService.js';

export default {
    setup() {
        const route = useRoute();

        async function getEventById() {
            try {
                await towerEventsService.getById(route.params.eventId);
            }
            catch (error) {
                Pop.error(error);
            }
        }
        async function getCommentsByEventId(){
            try {
                await commentsService.getCommentsByEventId(route.params.eventId)
            } catch (error) {
                Pop.error(error)
            }
        }
        // async function getEventTickets(){
        //     try {
        //         await tickets service 
        //     } catch (error) {
        //         Pop.error(error)
        //     }
        // }
        onMounted(() => {
            getEventById();
            getCommentsByEventId()
            // getEventTickets()
        });
        return {
            event: computed(() => AppState.activeTowerEvent),
            comments: computed(() => AppState.comments),
            // eventTickets: computed(() => AppState.eventTicket)
        };
    },
    components: { CommentForm, CommentCard }
}
</script>


<style lang="scss" scoped>
</style>