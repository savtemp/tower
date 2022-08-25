<template>
  <div class="container-fluid">
    <div class="row bg-dark py-1 px-5 text-light">
      <div class="col-12">
        <h2>Events</h2>
      </div>
      <div class="col-12">
        filter <i class="mdi mdi-filter"></i>
      </div>
      <div class="col-2 btn btn-outline-light rounded-pill" @click="filterTerm = ''">All</div>
      <div class="col-2 btn btn-outline-light rounded-pill" @click="filterTerm = 'concert'">Concert</div>
      <div class="col-2 btn btn-outline-light rounded-pill" @click="filterTerm = 'convention'">Convention</div>
      <div class="col-2 btn btn-outline-light rounded-pill" @click="filterTerm = 'sport'">Sport</div>
      <div class="col-2 btn btn-outline-light rounded-pill" @click="filterTerm = 'digital'">Digital</div>
      <div class="col-2 btn btn-outline-light rounded-pill" @click="filterTerm = 'misc'">Misc</div>
    </div>
    <div class="row bg-dark">
      <div class="col-3 my-2" v-for="e in events" :key="e.id">
        <EventCard :event="e" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import {towerEventsService} from '../services/TowerEventsService.js'
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import EventCard from '../components/EventCard.vue';

export default {
  name: "Home",
    setup() {
        const filterTerm = ref('');

        async function getEvents() {
            try {
                await towerEventsService.getAll();
            }
            catch (error) {
                Pop.error(error);
            }
        }
        onMounted(() => {
            getEvents();
        });
        return {
            filterTerm,
            events: computed(() => AppState.towerEvents.filter(e => filterTerm.value ? e.type == filterTerm.value : true))
        };
    },
    components: { EventCard }
}
</script>

<style scoped lang="scss">

</style>
