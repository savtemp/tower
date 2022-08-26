<template>
    <div class="p-2">
        <img class="img-fluid user-img px-1" :src="ticket.profile.picture" alt="" :title="ticket.profile.name">
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
.user-img{
    height: 3rem;
    width: 3rem;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    border: #e27500 solid 2px;
}
</style>