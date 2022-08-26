<template>
<!-- SECTION Event stuff -->
    <div class="row justify-content-center" :class="event.isCanceled ? 'is-canceled' : ''">
        <div class="col-11 box-border p-0 elevation-5">
            <div class="hero-img" :style="`background-image: url(${event.coverImg})`">
                
                <div class="row m-0 bg-text justify-content-between">
                    <div class="col-5 p-2">
                        <img class="img-fluid" :src="event.coverImg" alt="">
                    </div>

                    <div class="col-7 text-light p-3">
                        <div class="row p-2 justify-content-between">
                            <div class="col-7 p-2">
                                <h5>{{event.name}}</h5>
                                <p class="m-0">{{event.location}}</p>
                            </div>
                            <div class="col-5 text-end">
                                <p class="m-0">{{new Date(event.startDate).toLocaleDateString('en-US')}}</p>
                            </div>
                        </div>

                        <div class="row p-3">
                            <div class="col-12">
                                <p class="m-0">{{event.description}}</p>
                            </div>
                        </div>

                        <div class="row p-3 justify-content-baseline">
                            <div class="col-6 my-2">
                                <p class="m-0">{{event.capacity}} <span> spots left</span></p>
                            </div>
                            <!-- FIXME v-if="account.name" -->
                            <div class="col-6 my-2 text-end">
                                <!-- add a v-if onto the button -->
                                <button v-if="isAttending" class="btn btn-danger w-70" @click="removeTicket">Remove</button>
                                <button v-if="!isAttending" class="btn btn-warning w-70" @click="createTicket">Attend</button>
                            </div>   
                        </div>
                    </div>
                    
                    <!-- FIXME v-if="event.creator.id == account.id" -->
                    <div class="col-12 my-2">
                        <button class="btn btn-danger" @click="cancelEvent(event.id)">Cancel Event</button>
                    </div>
                </div>    
            </div>
        </div>



    <!-- SECTION Tickets stuff -->
    <div class="row my-5 justify-content-center">
        <div class="col-11 bg-dark">
            <p class="text-light">See who is attending</p>
        </div>
        <div class="col-11 rounded bg-secondary d-flex">
            <!-- <p>Theres definitely people in here hopefully</p> -->
            <TicketCard :ticket="t" v-for="t in eventTickets" :key="t.id" />
        </div>
    </div>

    <!-- SECTION Comments stuff -->
    <div class="row rounded justify-content-center">
        <div class="col-10 bg-dark">
            <p class="text-light">What are people saying</p>
        </div>

        <div class="col-10 rounded bg-secondary">
            <div class="row rounded-top p-3">
                <div class="text-success text-end">
                    <p class="m-0">Join the conversation</p>
                </div>
                <!-- FIXME v-if="account.name" -->
                <div class="text-center">
                    <CommentForm />
                </div>
            </div>
            <div class="row p-3">
                <CommentCard :comment="c" v-for="c in comments" :key="c.id" /> 
            </div>
        </div>
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
                    const yes = await Pop.confirm('Are you sure you do not want to attend this event?')
                    if(!yes){return}
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

.box-border{
    box-shadow: 0 1px 5px black;
    border: solid 1px black;
    box-sizing: border-box;
}

.bg-text{
    background: rgb(0 0 0 / 38%);
    backdrop-filter: blur(4px);
    border: solid #8d8b8b1f;
    color: white;
    border-radius: 8px;
    text-shadow: 10px 10px 10px black;
    padding: 0.5em;
    // position: relative;
    // top: 50%;
    // left: 50%;
    width: 93%;
    transform: translate(2em, 1.3em);

}

.hero-img{
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 60vh;
    // margin: 1em;
}
.is-canceled{
    filter: grayscale(1);
    pointer-events: none;
    cursor: not-allowed;
}
</style>