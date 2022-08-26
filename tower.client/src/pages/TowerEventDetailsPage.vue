<template>
 <!-- SECTION Event stuff -->
    <div class="container" :class="event.isCanceled ? 'is-canceled' : ''">
        <div class="row">
            <div class="col-3">
                <img class="img-fluid"  :src="event.coverImg" alt="">
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
                        <!-- add a v-if onto the button -->
                        <button v-if="isAttending" class="btn btn-danger w-70" @click="removeTicket">Remove</button>
                        <button v-if="!isAttending" class="btn btn-warning w-70" @click="createTicket">Attend</button>
                    </div>
                    <div class="offset-6 col-6">
                        <button class="btn btn-danger" @click="cancelEvent(event.id)">Cancel Event</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- SECTION Tickets stuff -->
    <div class="row justify-content-center">
        <div class="col-10 bg-secondary">
            <p>See who is attending</p>
        </div>
        <div class="col-10 bg-primary d-flex">
            <!-- <p>Theres definitely people in here hopefully</p> -->
            <TicketCard :ticket="t" v-for="t in eventTickets" :key="t.id" />
        </div>
    </div>

    <!-- SECTION Comments stuff -->
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
import TicketCard from '../components/TicketCard.vue';
import { ticketsService } from '../services/TicketsService.js';
import { logger } from '../utils/Logger.js';

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
        async function getEventTickets(){
            try {
                await ticketsService.getTicketsByEvent(route.params.eventId) 
            } catch (error) {
                Pop.error(error)
            }
        }
        onMounted(() => {
            getEventById();
            getCommentsByEventId()
            getEventTickets()
        });
        return {
            event: computed(() => AppState.activeTowerEvent),
            comments: computed(() => AppState.comments),
            eventTickets: computed(() => AppState.eventTickets),
            isAttending: computed(()=> AppState.myTickets.find(t=> t.eventId == route.params.eventId)),

            // FIXME this needs to be hidden when not logged in and when event is full 
            async createTicket(){
                try {
                    let newTicket = {
                        eventId: AppState.activeTowerEvent.id,
                        accountId: AppState.account.id
                    }
                    logger.log('creating', newTicket)
                    await ticketsService.createTicket(newTicket)
                } catch (error) {
                    Pop.error(error)
                }
            },

            async removeTicket(){
                try {
                    let ticketToRemove = AppState.myTickets.find(t => t.eventId == AppState.activeTowerEvent.id)
                    // Logs that ticketToRemove is undefined 
                    logger.log(ticketToRemove) 
                    await ticketsService.removeTicket(ticketToRemove.id)
                } catch (error) {
                    Pop.error(error)
                }
            },

            async cancelEvent(id){
                try {
                    const yes = await Pop.confirm('Cancel your event?')
                    if(!yes){return}
                    await towerEventsService.cancelEvent(id)
                } catch (error) {
                    logger.log('cancelling event')
                    Pop.error(error)
                }
            }
        };
        
    },
    components: { CommentForm, CommentCard, TicketCard }
}
</script>


<style lang="scss" scoped>
.is-canceled{
    filter: grayscale(1);
    pointer-events: none;
    cursor: not-allowed;
}
</style>