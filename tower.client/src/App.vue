<template>
  <div class="d-flex bg-dark">

    <main class="container-fluid">
      <div class="row">
        <div class="col-10">
          <div class="row">
            <div class="col-12 p-0">
              <router-link class="p-0" :to="{ name: 'Home' }">
                <div class="fs-1 text-light mx-5 my-0 pt-2">Tower</div>
              </router-link>
            </div>
          </div>
          <div class="row pt-4">
            <div class="col-12 pb-3">
              <router-view />
            </div>
          </div>
        </div>
        <div class="col-2 bg-secondary">
          <div class="row d-flex flex-column align-items-center right-bar-row">
            <div class="col-12 text-center p-4">
              <Login />
            </div>

            <div class="col-12 p-2" v-if="account.id">
              <button
                type="button"
                class="btn btn-warning mx-3"
                data-bs-toggle="modal"
                data-bs-target="#create-event"
              >
                Create Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <EventForm />

  </div>
</template>

<script>
import { computed } from "vue";
import { AppState } from "./AppState";

export default {
  name: "App",
  setup() {
    return {
      appState: computed(() => AppState),
      account: computed(() => AppState.account),
    };
  },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.right-bar {
  // height: 100vh;S
  width: 200px;
}

.right-bar-row {
  height: 100%;
}

.tower-header {
  width: 80vw;
}
</style>
