<script setup lang="ts">
import type { CollapsibleTriggerProps } from 'reka-ui';
import { CollapsibleTrigger } from 'reka-ui';
import { collapsibleTriggerVariants } from '.';
import { cn } from '@/lib/utils';
import { computed, HTMLAttributes } from 'vue';

const props = defineProps<
  CollapsibleTriggerProps & {
    class?: HTMLAttributes['class'];
  }
>();

const classNames = computed(() => {
  return cn(collapsibleTriggerVariants(), props.class);
});
</script>

<template>
  <CollapsibleTrigger v-bind="props" :class="classNames">
    <slot />
  </CollapsibleTrigger>
</template>
