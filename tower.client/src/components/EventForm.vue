<template>
<!-- SECTION Button trigger modal -->


<!--SECTION Modal -->
<div class="modal fade" id="create-event" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">

        <div class="modal-body">
            <form @submit.prevent="handleSubmit" class="row bg-white p-4 elevation-2">
                <div class="col-12">Create Event</div>
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
                    <label for="" class="form-label ">Category</label>
                    <select v-model="editable.category" name="" id="" class="form-control">
                        <option value="concert">Concert</option>
                        <option value="convention">Convention</option>
                        <option value="sport">Sport</option>
                        <option value="digital">Digital</option>
                        <option value="misc">Misc</option>
                    </select>
                </div>
                <button class="col-6 btn btn-success">Submit</button>
            </form>
        </div>

        </div>
    </div>
</div>



</template>


<script>
import { ref } from 'vue';
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
                    await towerEventsService.createEvent(editable.value)
                    Pop.toast('Event Created')
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