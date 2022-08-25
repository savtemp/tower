<template>
    <router-link :to="{name: 'TowerEventDetails', params:{eventId: event.id}}">
        <div class="bg-light border elevation-2 rounded selectable">
            <div class="p-1">
                <img class="img-fluid" :src="event.coverImg" alt="">
                <h3>{{event.name}}</h3>
                <h6>{{event.location}}</h6>
                <h6>{{event.startDate}}</h6>
            </div>
        </div>
    </router-link>
</template>


<script>
import { router } from '../router.js';

export default {
    props: {event: {type: Object, required: true}},
    setup(props){
        return{
            goTo(){
                router.push({name: 'TowerEventDetails', params:{eventId: props.event.id}})
            }
        }
    }
}
</script>


<style lang="scss" scoped>
</style>