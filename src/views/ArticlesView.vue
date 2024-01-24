<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from 'vuex';

import { key } from '@/store/';

const store = useStore(key);

onMounted(() => {
  if (store.state.session.articles.length > 0) {
    return;
  }

  store.dispatch('getArticles');
});
</script>

<template>
  <p>Hello there</p>
</template>