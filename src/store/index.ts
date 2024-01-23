import { InjectionKey } from 'vue';
import { ActionContext, createStore, Store } from 'vuex'

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
 * Accepts the cookie notification.
 *
 * @param context The action context.
 */
function updateCookieNotification({ commit }: ActionContext<State, State>, isCookieAccepted: boolean): void {
  commit('setCookieNotification', isCookieAccepted);
}

export default createStore<State>({
  'state': {
    'session': {
      'isCookieAccepted': undefined
    }
  },
  'mutations': {
    setCookieNotification
  },
  'actions': {
    updateCookieNotification
  }
})
