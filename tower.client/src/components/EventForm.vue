<template>
<!-- SECTION Button trigger modal -->
<!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
Create Event
</button> -->

<!--SECTION  Modal -->
<div class="modal fade" id="create-event" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Create Event</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
        <div class="modal-body">
        <form @submit.prevent="handleSubmit" class="row bg-white p-4 elevation-2">
                <div class="col-12">What are the details?</div>
                <div class="col-6">
                    <label for="" class="form-label">Name</label>
                    <input type="text" v-model="editable.name" class="form-control" name="name" id="name">
                </div>
                <div class="col-6">
                    <label for="" class="form-label">Cover Image</label>
                    <input type="url" v-model="editable.coverImg" class="form-control" name="coverImg" id="coverImg"
                aria-describedby="helpId" placeholder="">
                </div>
                <div class="col-6">
                    <label for="" class="form-label">Start Date</label>
                    <input type="date" v-model="editable.startDate" class="form-control" name="startDate" id="startDate">
                </div>
                <div class="col-6">
                    <label for="" class="form-label">location</label>
                    <input type="text" v-model="editable.location" class="form-control" name="location" id="location">
                </div>
                <div class="col-6">
                    <label for="" class="form-label">Capacity</label>
                    <input type="number" v-model="editable.capacity" class="form-control" name="capacity" id="capacity">
                </div>
                <div class="col-6">
                    <label for="" class="form-label ">Category</label>
                    <select v-model="editable.category" name="" id="" class="form-control">
                        <option value="concert">Concert</option>
                        <option value="convention">Convention</option>
                        <option value="sport">Sport</option>
                        <option value="digital">Digital</option>
                        <option value="misc">Misc</option>
                    </select>
                </div>
                <div class="col-12">
                    <label for="" class="form-label">Description</label>
                    <textarea class="form-control" name="description" id="" cols="30" rows="8" placeholder="Tell us about the event ..." v-model="editable.description"></textarea>
                </div>
                <div class="col-12 my-3">
                    <button type="button" class="btn btn-success" @click="handleSubmit" data-bs-dismiss="modal">Submit</button>
                </div>
            </form>
        </div>
        <!-- <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-success">Submit</button>
        </div> -->
    </div>
    </div>
</div>



</template>


<script>
import { ref } from 'vue';
import { router } from '../router.js';
import { towerEventsService } from '../services/TowerEventsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
    setup(){
        const editable = ref({})

        return{
            editable,

            async handleSubmit(){
                try {
                    logger.log('creating event', editable.value)
                    const event = await towerEventsService.createEvent(editable.value)
                    Pop.toast('Event Created')
                    router.push({name: 'TowerEventDetails', params:{eventId: event.id }})
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
</style>