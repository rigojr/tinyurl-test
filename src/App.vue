<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useStore } from 'vuex';

import NavHeader from '@/components/NavHeader.vue';
import CookieNotification from '@/components/CookieNotification.vue';
import { key } from '@/store/';
import { isNullish } from '@/utils/type-checking';

/**
 * The component private properties.
 */
type State = {
  logo: string; // TODO: should simulated
}

const store = useStore(key);
const state = reactive<State>({
  'logo': getLogo()
});

const isCookieNotificationVisible = computed(() => isNullish(store.state.session.isCookieAccepted));

function getLogo(): string { // TODO: here simulate the logo request.
  return require('@/assets/logo.png');
}

/**
 * Occurs when the cookie notification has being accepted.
 */
function onAccepted(): void {
  store.dispatch('updateCookieNotification', true);
}

/**
 * Occurs when the cookie notification has being rejected.
 */
function onRejected(): void {
  store.dispatch('updateCookieNotification', false);
}
</script>

<template>
  <NavHeader :logo="state.logo"/>
  <router-view/>
  <CookieNotification
    v-if="isCookieNotificationVisible"
    @accepted="onAccepted"
    @rejected="onRejected"
  />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
