import { isNumber, isString } from 'lodash';

import { isEnumValue, isObject } from '@/utils/type-checking';

/**
 * The available articles status.
 */
export enum ArticleStatus {
  PUBLISH = 'publish',
  FUTURE = 'future',
  DRAFT = 'draft',
  PENDING = 'pending',
  PRIVATE = 'private'
}

/**
 * The article content.
 */
export type ArticleContent = {
  'rendered': string;
}

/**
 * The article API response data entity.
 */
export type ArticleApiResponse = {
  'id': number,
  'date': string,
  'status': ArticleStatus,
  'title': ArticleContent,
  'link': string,
  'content': ArticleContent,
  'excerpt': ArticleContent
}

/**
 * The article data entity.
 */
export type Article = {
  'id': string,
  'date': string,
  'status': ArticleStatus,
  'title': string,
  'link': string,
  'content': string,
  'excerpt': string
}

/**
 * Indicates whether the value is article content or not.
 *
 * @param value The unknown value.
 */
export function isArticleContent(value: unknown): value is ArticleContent {
  return isObject(value)
    && isString(value.rendered)
}

/**
 * Indicates whether the value is Article API response or not.
 *
 * @param value The unknown value.
 */
export function isArticlesApiResponse(value: unknown): value is ArticleApiResponse {
  return isObject(value)
    && isNumber(value.id)
    && isString(value.date)
    && isEnumValue(value.status, ArticleStatus)
    && isArticleContent(value.title)
    && isString(value.link)
    && isArticleContent(value.content)
    && isArticleContent(value.excerpt);
}
