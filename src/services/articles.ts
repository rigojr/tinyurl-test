import { Article, ArticleApiResponse, isArticlesApiResponse } from '@/entities';
import { isArray } from 'lodash';

/**
 * Builds the article data structure.
 *
 * @param article The article entity.
 */
function buildArticle(article: ArticleApiResponse): Article {
  return {
    'id': article.id.toString(),
    'date': article.date,
    'status': article.status,
    'title': article.title.rendered,
    'link': article.link,
    'content': article.content.rendered,
    'excerpt': article.excerpt.rendered
  };
}
/**
 * Gets the articles.
 */
export async function getArticles(): Promise<Article[]> {
  const url = 'https://tinyurl.aeros.io/wp-json/wp/v2/posts'; // TODO: should came from .env
  const response = await fetch(url);
  const collection = await response.json();

  if (!isArray(collection)) {
    throw new Error('The response data is ill-formed.');
  }

  const isArticles = collection.every((value: unknown) => isArticlesApiResponse(value));

  if (!isArticles) { // TODO: improve type guard.
    throw new Error('The response data collection is ill-formed');
  }

  return collection.map((article) => buildArticle(article));
}