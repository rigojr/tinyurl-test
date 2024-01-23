<script setup lang="ts">
import { reactive } from 'vue';

import NavHeader from '@/components/NavHeader.vue';
import CookieNotification from '@/components/CookieNotification.vue';

/**
 * The component private properties.
 */
type State = {
  logo: string; // TODO: should simulated
}

const state = reactive<State>({
  'logo': getLogo()
});

function getLogo(): string { // TODO: here simulate the logo request.
  return require('@/assets/logo.png');
}

</script>

<template>
  <NavHeader :logo="state.logo"/>
  <router-view/>
  <CookieNotification v-if="true"/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a {
  font-weight: bold;
  color: #2c3e50;

  &.router-link-exact-active {
    color: #42b983;
  }
}
</style>
