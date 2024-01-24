import { Article, isArticle } from '@/entities';
import { isArray } from 'lodash';

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

  const isArticles = collection.every((value: unknown) => isArticle(value));

  console.log(collection);

  if (!isArticles) { // TODO: improve type guard.
    throw new Error('The response data collection is ill-formed');
  }

  return collection;
}