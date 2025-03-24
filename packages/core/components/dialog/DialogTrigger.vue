<script setup lang="ts">
import type { DialogTriggerProps } from 'reka-ui';
import { DialogTrigger } from 'reka-ui';

const { as = 'div', ...props } = defineProps<DialogTriggerProps>();
</script>

<template>
  <DialogTrigger :as="as" v-bind="props">
    <slot />
  </DialogTrigger>
</template>
