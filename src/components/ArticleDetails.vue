<script setup lang="ts">
import { computed } from 'vue';

import { ArticleStatus } from '@/entities';
import { getFormattedDate } from '@/utils/datetime';

/**
 * The component public properties.
 */
export interface Props {
  'id': string;
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
    <p class="article-details__meta-data-collection">
      <span class="article-details__meta-data">Published: {{ formattedDate }}</span> |
      <a
        class="article-details__meta-data article-details__meta-data--link"
        :href="props.externalLink"
        target="_blank"
      >
        Source
      </a>
    </p>
  </article>
</template>

<style lang="scss">
.article-details {

  &__content {
    text-align: left;
  }

  &__meta-data-collection {
    font-weight: lighter;
    text-align: left;
  }
}
</style>
