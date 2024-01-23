<script setup lang="ts">
import { onMounted, reactive } from 'vue';

import { searchLocation } from '@/services/location';
import SignInForm from '@/components/SignInForm.vue';

/**
 * The private component properties.
 */
type State = {
  suggestions: string[];
}

const state = reactive<State>({
  'suggestions': [
    'Test 1',
    'Test 2',
    'Test 3',
    'Test 4',
    'Test 1',
    'Test 2',
    'Test 3',
    'Test 1',
    'Test 2',
    'Test 3',
  ]
});

onMounted(() => {
  searchLocation('london')
    .then((suggestions) => {
      console.log(suggestions);
    })
    .catch((err) => console.error(err));
});
</script>

<template>
  <SignInForm :suggestions="state.suggestions"/>
</template>
