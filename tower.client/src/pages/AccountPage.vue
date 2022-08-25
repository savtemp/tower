<template>
  <!-- <div class="row">
    <div class="col-12">
      <p>My Events</p>
    </div>
    <div class="col-3">
      Event component 
    </div>
  </div> -->

  <div class="row">
    <h1>Upcoming Events</h1>
  </div>

  <div class="row justify-content-center">
    <div class="col-10 bg-primary my-3" v-for="t in myTickets" :key="t.id"> 
      <div class="row">
        <div class="col-3">
          <img class="img-fluid" :src="t.event.coverImg" alt="">
        </div>
        <div class="col-9">
          <p>{{t.event.name}}</p>
          <p>{{t.event.location}}</p>
          <p>{{t.event.startDate}}</p>
          <div class="text-end">
            <!-- use the same function from tower events details but pull the id needed -->
              <button class="btn btn-danger">Not Going</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { ticketsService } from '../services/TicketsService.js'
import Pop from '../utils/Pop.js'
export default {
  name: 'Account',

  setup() {

    // async function getTickets(){
    //   try {
    //     await ticketsService.getMyTicketByAccount()
    //   } catch (error) {
    //     Pop.error(error)
    //   }
    // }

                // async removeTicket(){
            //     try {
            //         await ticketsService.removeTicket(props.ticket.id)
            //     } catch (error) {
            //         Pop.error(error)
            //     }
            // }

    onMounted(() => {
      // getTickets()
    })
    return {
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.myTickets)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
