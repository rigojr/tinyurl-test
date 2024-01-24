<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

import { key } from '@/store/';
import { isNullish } from '@/utils/type-checking';
import { Article } from '@/entities';
import ArticleDetails, { Props as ArticleDetailsProps } from '@/components/ArticleDetails.vue';

/**
 * The component public properties.
 */
export interface Props {
  'id': string;
}

const store = useStore(key);
const props = defineProps<Props>();
const article = computed(() => getArticle(store.state.session.articles));

/**
 * Gets the article details public properties.
 */
function getArticle(articles: Article[]): ArticleDetailsProps | undefined {
  const article = articles.find((article) => article.id === props.id);

  if (isNullish(article)){
    return;
  }

  return {
    'id': article.id,
    'title': article.title,
    'content': article.content,
    'date': article.date,
    'status': article.status,
    'externalLink': article.link
  };
}

onMounted(() => {
  if (store.state.session.articles.length > 0) {
    return;
  }

  store.dispatch('getArticles');
});
</script>

<template>
  <div class="article-view">
    <p
      v-if="isNullish(article)"
      class="article-view__error-message"
    >
      Something went wrong, please try again later...
    </p>
    <ArticleDetails
      v-else
      v-bind="article"
    />
  </div>
</template>

<style scoped lang="scss">
.article-view {
  margin: 2rem;

  &__error-message {
    color: red;
  }
}
</style>