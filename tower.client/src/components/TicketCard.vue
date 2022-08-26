<template>
    <div class="">
        <img class="img-fluid mx-2" :src="ticket.profile.picture" alt="" :title="ticket.profile.name">
    </div>
</template>


<script>
import { ticketsService } from '../services/TicketsService.js';
import Pop from '../utils/Pop.js';

export default {
    props: {ticket: {type: Object, required: true}},
    setup(props){
        return{

        }
}
}
</script>


<style lang="scss" scoped>
</style>