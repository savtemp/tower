<template>
    <div class="row elevation-2">
        <div class="d-flex justify-content-between">
            <div class="col-3">
                <img class="img-fluid" :src="comment.creator.picture" alt="">
            </div>
            <div class="col-5">
                <p>{{comment.creator.name}}</p>
                <!-- <p>Attending event</p> -->
                <p>{{comment.body}}</p>
            </div>
            <div class="col-2 text-end">
                <button class="btn btn-danger">Delete Comment</button>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: {comment: {type: Object, required: true}},

    setup(){
        return{}
    }
}
</script>


<style lang="scss" scoped>
</style>