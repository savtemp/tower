<template>
  <div class="d-flex bg-dark">

    <div>

      <div class="container-fluid p-2">
        <div class="row">
          <div class="col-12 p-0">
            <router-link class="p-0" :to="{ name: 'Home' }">
              <h1 class="text-light mx-5 my-0">Tower</h1>
            </router-link>
          </div>
        </div>
      </div>
  
      <main class="container-fluid p-2">
        <router-view />
      </main>
      <EventForm />

    </div>

    <div class="container-fluid right-bar text-center bg-secondary">
      <div class="row d-flex flex-column align-items-center right-bar">
        <div class="col-12 text-center">
          <Login />
        </div>

        <div class="col-12 p-2">
          <button type="button" class="btn btn-success mx-3" data-bs-toggle="modal" data-bs-target="#create-event">
              Create Event
          </button>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from './AppState';

export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.right-bar{
  height: 100vh;
  width: 200px;
}

.tower-header{
  width: 80vw;
}

main{
  max-height: 100vh;
  overflow-y: auto;
  padding-bottom: 5rem;
}

</style>
