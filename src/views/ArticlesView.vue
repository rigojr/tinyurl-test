<script setup lang="ts">
import { ComputedRef, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import { Article, ArticleStatus } from '@/entities';
import { key } from '@/store/';
import ArticleExcerpt, { Props as ArticleExcerptProps } from '@/components/ArticleExcerpt.vue';

const router = useRouter();
const store = useStore(key);
const isLoading = computed(() => store.state.session.isArticlesLoading); // TODO: Improve these computed declaration.
const articles: ComputedRef<ArticleExcerptProps[]> = computed(() => getArticles(store.state.session.articles));

/**
 * Gets a collection of articles excerpt public properties.
 *
 * @param articles The article collection.
 */
function getArticles(articles: Article[]): ArticleExcerptProps[] {
  const publishedArticles = getPublishedArticles(articles);

  return publishedArticles.map((article) => buildArticleExcerptProps(article));
}

/**
 * Gets the published articles.
 *
 * @param articles The article collection.
 */
function getPublishedArticles(articles: Article[]): Article[] {
  return articles.filter((article ) => article.status === ArticleStatus.PUBLISH);
}

/**
 * Builds the article excerpt public properties.
 *
 * @param article The article entity.
 */
function buildArticleExcerptProps(article: Article): ArticleExcerptProps {
  return {
    'id': article.id,
    'date': article.date,
    'title': article.title,
    'content': article.excerpt
  };
}

/**
 * Occurs when an article has being clicked.
 *
 * @param id The article id.
 */
function onArticleClick(id: string): void {
  router.push({
    'name': 'article',
    'params': { id }
  });
}

onMounted(() => {
  if (store.state.session.articles.length > 0) {
    return;
  }

  store.dispatch('getArticles');
});
</script>

<template>
  <div class="articles-view">
    <p
      v-if="isLoading"
      class="articles-view__loading"
    >
      Please wait...
    </p>
    <div
      v-else
      class="articles-view__collection"
    >
      <ArticleExcerpt
        v-for="article in articles"
        :key="article.id"
        v-bind="article"
        @click="onArticleClick(article.id)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.articles-view {
  width: 50%;
  margin: auto;
}
</style>