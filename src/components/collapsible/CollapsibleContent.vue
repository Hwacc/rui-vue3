<script setup lang="ts">
import type { CollapsibleContentProps } from 'reka-ui';
import { CollapsibleContent } from 'reka-ui';
import { collapsibleContentVariants } from '.';
import { cn } from '@/lib/utils';
import { computed, HTMLAttributes } from 'vue';

const { class: propsClass, ...props } = defineProps<
  CollapsibleContentProps & {
    class?: HTMLAttributes['class'];
  }
>();

const classNames = computed(() => {
  return cn(collapsibleContentVariants(), propsClass);
});
</script>

<template>
  <CollapsibleContent v-bind="props" :class="classNames">
    <slot />
  </CollapsibleContent>
</template>
