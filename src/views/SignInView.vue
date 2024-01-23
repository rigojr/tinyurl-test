<script setup lang="ts">
import { reactive } from 'vue';

import { searchLocation } from '@/services/location';
import SignInForm from '@/components/SignInForm.vue';

/**
 * The private component properties.
 */
type State = {
  query: string;
  suggestions: string[];
  isQueryLoading: boolean;
}

const state = reactive<State>({
  'suggestions': [],
  'query': '',
  'isQueryLoading': false
});

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
</script>

<template>
  <SignInForm
    :suggestions="state.suggestions"
    :is-searching="state.isQueryLoading"
    @search="onSearch"
  />
</template>
