<script setup lang="ts">
import SignInForm from '@/components/SignInForm.vue';
import { reactive } from 'vue';

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
</script>

<template>
  <SignInForm :suggestions="state.suggestions"/>
</template>
