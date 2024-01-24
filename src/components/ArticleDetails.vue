<script setup lang="ts">
import { computed } from 'vue';

import { ArticleStatus } from '@/entities';
import { getFormattedDate } from '@/utils/datetime';

/**
 * The component public properties.
 */
export interface Props {
  'id': number;
  'date': string;
  'status': ArticleStatus;
  'title': string;
  'content': string;
  'externalLink': string;
}

const props = defineProps<Props>();
const formattedDate = computed(() => getFormattedDate(props.date));
</script>

<template>
  <article class="article-details">
    <h2 class="article-details__title">{{ props.title }}</h2>
    <!-- FIXME: content should be checked before be loaded as v-html security issue here -->
    <p class="article-details__content" v-html="props.content"></p>
    <div class="article-details__meta-data-collection">
      <p class="article-details__meta-data">Published: {{ formattedDate }}</p>
    </div>
  </article>
</template>

<style lang="scss">
</style>
