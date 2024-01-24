<script setup lang="ts">
import { ArticleStatus } from '@/entities';

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
</script>

<template>
  <div class="article-excerpt">
    <h2 class="article-excerpt__title">{{ props.title }}</h2>
  </div>
</template>