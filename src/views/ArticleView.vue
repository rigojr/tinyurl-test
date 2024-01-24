<script setup lang="ts">
import { useStore } from 'vuex';

import { key } from '@/store/';

/**
 * The component public properties.
 */
export interface Props {
  'id': number;
}

const store = useStore(key);
const props = defineProps<Props>();
</script>

<template>
  <div>
    {{ props.id }}
  </div>
</template>