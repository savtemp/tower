<template>
  <div class="row justify-content-center">
    <HeroImage />
  </div>

  <div class="row py-3 justify-content-center">
    <div class="col-11">
      <div class="row d-flex bg-secondary rounded text-dark text-center">
        <div class="col-2 p-3 hover-filter selectable no-select" @click="filterTerm = ''">All</div>
        <div class="col-2 p-3 hover-filter selectable no-select" @click="filterTerm = 'concert'">Concert</div>
        <div class="col-2 p-3 hover-filter selectable no-select" @click="filterTerm = 'convention'">Convention</div>
        <div class="col-2 p-3 hover-filter selectable no-select" @click="filterTerm = 'sport'">Sport</div>
        <div class="col-2 p-3 hover-filter selectable no-select" @click="filterTerm = 'digital'">Digital</div>
        <div class="col-2 p-3 hover-filter selectable no-select" @click="filterTerm = 'misc'">Misc</div>
      </div>
    </div>
  </div>

  <div class="row justify-content-center bg-dark text-light">
    <div class="col-11">
      <div class="row justify-content-around">
        <div class="col-3 m-2" v-for="e in events" :key="e.id">
          <EventCard :event="e" />
        </div>
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
import HeroImage from '../components/HeroImage.vue';

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
    components: { EventCard, HeroImage }
}
</script>

<style scoped lang="scss">

.hover-filter:hover{
  color: #e27500;
  border-bottom: solid 4px #fd9a30;
}

</style>
