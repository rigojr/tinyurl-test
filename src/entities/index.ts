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
 * The article data entity.
 */
export type Article = {
  'id': number,
  'date': string,
  'status': ArticleStatus,
  'title': ArticleContent,
  'link': string,
  'content': ArticleContent
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
 * Indicates whether the value is Article or not.
 *
 * @param value The unknown value.
 */
export function isArticle(value: unknown): value is Article {
  return isObject(value)
    && isNumber(value.id)
    && isString(value.date)
    && isEnumValue(value.status, ArticleStatus)
    && isArticleContent(value.title)
    && isString(value.link)
    && isArticleContent(value.content);
}