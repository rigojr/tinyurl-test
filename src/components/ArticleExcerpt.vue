<script setup lang="ts">
import { ArticleStatus } from '@/entities';
import { computed } from 'vue';

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

/**
 * Gets the formatted date.
 *
 * @param date The given unformatted date.
 */
function getFormattedDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US');
}
</script>

<template>
  <div class="article-excerpt">
    <h2 class="article-excerpt__title">{{ props.title }}</h2>
    <!-- FIXME: content should be checked before be loaded as v-html security issue here -->
    <p class="article-excerpt__content" v-html="props.content"></p>
    <div class="article-excerpt__meta-data-collection">
      <p class="article-excerpt__meta-data">Published: {{ formattedDate }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.article-excerpt {
  margin: 1rem;
  padding: 1rem;

  border-radius: 1rem;
  cursor: pointer;
  transition: all ease-in-out .25s;

  &:hover {
    background-color: rgba(0,0,0,.15);
  }

  &__content {
    text-align: justify;
  }

  &__meta-data-collection {
    font-weight: bold;
    text-align: left;
  }
}
</style>