<script setup lang="ts">
import { ComputedRef, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

import { Article, ArticleStatus } from '@/entities';
import { key } from '@/store/';
import ArticleExcerpt, { Props as ArticleExcerptProps } from '@/components/ArticleExcerpt.vue';

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
  // TODO: should not be doing here, find other place.
  return {
    'id': article.id,
    'date': article.date,
    'status': article.status,
    'title': article.title.rendered,
    'content': article.content.rendered,
    'externalLink': article.link
  }
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
        v-bind="article"
      />
    </div>
  </div>
</template>