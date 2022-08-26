<template>
  <div class="row text-warning">
    <div class="fs-2">My Upcoming Events</div>
  </div>

  <div class="row justify-content-center">
    <div class="col-10 bg-secondary elevation-3 rounded my-3" v-for="t in myTickets" :key="t.id"> 
      <div class="row">
        <div class="col-4 p-0">
          <img class="img-fluid m-2 p-2" :src="t.event.coverImg" alt="">
        </div>
        <div class="col-8 p-3 text text-dark">
          <div class="fs-5 p-2"><b>{{t.event.name}}</b></div>
          <p>{{t.event.location}}</p>
          <p>{{new Date(t.event.startDate).toLocaleDateString('en-US')}}</p>
          <div class="text-end p-2">
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
  max-width: 200px;
}

.text{
  text-shadow: 0px 0px 1px black;
}
</style>
