import { InjectionKey } from 'vue';
import { ActionContext, createStore, Store } from 'vuex'

import { Article } from '@/entities';
import { getArticles as getArticlesAPI } from '@/services/articles';

/**
 * The store state interface.
 */
interface State {
  session: Session
}

/**
 * Defines typing store.
 */
export const key: InjectionKey<Store<State>> = Symbol(); // TODO: improve type definition.

/**
 * The user session data structure.
 */
type Session = {
  'isCookieAccepted'?: boolean;
  'articles': Article[];
  'isArticlesLoading': boolean;
  'articlesError'?: string;
};

/**
 * Sets the cookie notification.
 *
 * @param state            The store state.
 * @param isCookieAccepted Indicates whether the cookie is accepted or not.
 */
function setCookieNotification(state: State, isCookieAccepted: boolean): void {
  state.session.isCookieAccepted = isCookieAccepted;
}

/**
 * Sets the articles.
 *
 * @param state    The store state.
 * @param articles The articles collection.
 */
function setArticles(state: State, articles: Article[]): void {
  state.session.articles = articles;
}

/**
 * Sets the articles loading.
 *
 * @param state     The store state.
 * @param isLoading Indicates whether the articles is loading or not.
 */
function setArticlesLoading(state: State, isLoading: boolean): void {
  state.session.isArticlesLoading = isLoading;
}

/**
 * Sets the articles error message.
 *
 * @param state   The store state.
 * @param message The articles error message.
 */
function setArticlesError(state: State, message: string): void {
  state.session.articlesError = message;
}

/**
 * Accepts the cookie notification.
 *
 * @param context          The action context.
 * @param isCookieAccepted Indicates whether the cookie has being accepted or not.
 */
function updateCookieNotification({ commit }: ActionContext<State, State>, isCookieAccepted: boolean): void {
  commit('setCookieNotification', isCookieAccepted);
}

/**
 * Gets the articles.
 *
 * @param context The action context.
 */
function getArticles({ commit }: ActionContext<State, State>): void {
  commit('setArticlesLoading', true);

  getArticlesAPI()
    .then((articles) => commit('setArticles', articles))
    .catch((_err) => {
      // TODO: handle error.
      console.log(_err);
      commit('setArticlesError', 'Something went wrong.');
    })
    .finally(() => commit('setArticlesLoading', false));
}

export default createStore<State>({
  'state': {
    'session': {
      'isCookieAccepted': undefined,
      'articles': [],
      'isArticlesLoading': false,
      'articlesError': undefined
    }
  },
  'mutations': {
    setCookieNotification,
    setArticles,
    setArticlesLoading,
    setArticlesError
  },
  'actions': {
    updateCookieNotification,
    getArticles
  }
})
