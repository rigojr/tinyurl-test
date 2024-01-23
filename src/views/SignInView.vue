<script setup lang="ts">
import { reactive } from 'vue';

import { searchLocation } from '@/services/location';
import SignInForm, { SingInData } from '@/components/SignInForm.vue';
import CookieNotification from '@/components/CookieNotification.vue';
import { SignInResponse, signIn } from '@/services/auth';
import { isNullish } from '@/utils/type-checking';

/**
 * The private component properties.
 */
type State = {
  query: string;
  suggestions: string[];
  isQueryLoading: boolean;
  message?: string;
  isError: boolean;
}

const state = reactive<State>({
  'suggestions': [],
  'query': '',
  'isQueryLoading': false,
  'message': undefined,
  'isError': false
});

/**
 * Checks the sign in response.
 *
 * @param response The sign in response.
 */
function checkSingInResponse(response: SignInResponse): void {
  switch (response) {
    case SignInResponse.SUCCESSFUL:
      state.message = 'Sign in successfully completed.';
      state.isError = false;
      break;
    case SignInResponse.VALIDATION_ERROR:
      state.message = 'user or password is invalid.';
      state.isError = true;
      break
    case SignInResponse.SERVER_ERROR:
      state.message = 'Something is wrong with the server, try again later.';
      state.isError = true;
      break
    default:
      state.message = 'Something went wrong.';
      state.isError = true;
      break;
  }
}

/**
 * Occurs when search event has occurred.
 *
 * @param query The search query.
 */
function onSearch(query: string): void {
  if (state.isQueryLoading) {
    return;
  }

  state.isQueryLoading = true;

  searchLocation(query)
    .then((suggestions) => {
      state.suggestions = suggestions;
    })
    .catch((_err: unknown) => {
      // TODO: handle error.

      state.suggestions = [];
    })
    .finally(() => {
      state.isQueryLoading = false;
    });
}

/**
 * Occurs when the sign in event has occurred.
 */
function onSignIn(data: SingInData): void {
  signIn(data.name, data.password)
    .then((response) => {
      checkSingInResponse(response);
    })
    .catch((_err) => {
      // TODO: handle error.
    })
}
</script>

<template>
  <div class="sign-in-view">
    <SignInForm
      class="sing-in-view__form"
      :suggestions="state.suggestions"
      :is-searching="state.isQueryLoading"
      @search="onSearch"
      @sign-in="onSignIn"
    />
    <div
      v-if="!isNullish(state.message)"
      class="sign-in-view__message"
      :class="{'sign-in-view__message--error': state.isError}"
    >
      <p>{{ state.message }}</p>
    </div>
    <CookieNotification v-if="true"/>
  </div>
</template>

<style lang="scss" scoped>
.sign-in-view {
  &__message {
    font-weight: bold;

    &--error {
      color: red;
    }
  }
}
</style>
