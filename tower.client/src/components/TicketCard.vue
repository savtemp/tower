<template>
    <div class="">
        <img class="img-fluid mx-2" :src="ticket.profile.picture" alt="">
    </div>
</template>


<script>
import { ticketsService } from '../services/TicketsService.js';
import Pop from '../utils/Pop.js';

export default {
    props: {ticket: {type: Object, required: true}},
    setup(props){
        return{
            // async removeTicket(){
            //     try {
            //         await ticketsService.removeTicket(props.ticket.id)
            //     } catch (error) {
            //         Pop.error(error)
            //     }
            // }
        }
}
}
</script>


<style lang="scss" scoped>
</style>