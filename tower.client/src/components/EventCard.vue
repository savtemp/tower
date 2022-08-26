<template>
<div class="row justify-content-around">
    <router-link class="col-10 bg-secondary rounded p-1" :to="{name: 'TowerEventDetails', params:{eventId: event.id}}">
    <div class="hero-img rounded" :style="`background-image: url(${event.coverImg})`">
        <div class="text">
            <h6><b>{{event.name}}</b></h6>
            <p class="m-0">{{event.location}}</p>
            <p class="m-0">{{new Date(event.startDate).toLocaleDateString('en-US')}}</p>
            <p class="m-0 text-end">{{event.capacity}}<span> spots left</span> </p>
        </div>
    
    </div>
    </router-link>
</div>
</template>

<!-- <img class="row img-fluid m-0" :src="event.coverImg" alt=""> -->

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

a {
    text-decoration: none;
    height: 29vh;
    width: 40vw;
}
.hero-img{
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 28vh;
}

.text{
    background: rgb(0 0 0 / 38%);
    backdrop-filter: blur(4px);
    border: solid #8d8b8b1f;
    // position: relative;
    // bottom: 50em;
    color: white;
    border-radius: 8px;
    padding: 0.5em;
    transform: translateY(6.3em);
    // width: 50em;
    height: 16vh;
    text-shadow: 10px 10px 10px black;
}
</style>