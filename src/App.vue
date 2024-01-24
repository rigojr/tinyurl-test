<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';
import { useStore } from 'vuex';

import NavHeader from '@/components/NavHeader.vue';
import CookieNotification from '@/components/CookieNotification.vue';
import { key } from '@/store/';
import { isNullish } from '@/utils/type-checking';
import { getBackendLogo } from './services/logo';

/**
 * The component private properties.
 */
type State = {
  logo: string;
}

const store = useStore(key);
const state = reactive<State>({
  'logo': require('@/assets/logo.png')
});

const isCookieNotificationVisible = computed(() => isNullish(store.state.session.isCookieAccepted));

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

onMounted(() => {
  getBackendLogo()
    .then((imgUrl) => {
      state.logo = imgUrl;
    })
    .catch((_err) => {
      // TODO: handle error.
    })
});
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
