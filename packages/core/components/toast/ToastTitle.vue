<script setup lang="ts">
import type { ToastTitleProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { ToastTitle } from 'reka-ui';
import { computed } from 'vue';

const { class: propsClass, ...props } = defineProps<
  ToastTitleProps & { class?: HTMLAttributes['class'] }
>();

const classNames = computed(() => {
  return cn('text-base font-rob-bold', propsClass);
});
</script>

<template>
  <ToastTitle v-bind="props" :class="classNames">
    <slot />
  </ToastTitle>
</template>
