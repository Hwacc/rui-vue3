<script setup lang="ts">
import type { ToastTitleProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/core/lib/utils';
import { ToastTitle } from 'reka-ui';
import { computed } from 'vue';
import { toastTitleVariants } from '.';

const {
  class: propsClass,
  disableRuiClass,
  ...props
} = defineProps<ToastTitleProps & { class?: HTMLAttributes['class']; disableRuiClass?: boolean }>();

const classNames = computed(() => {
  return cn(toastTitleVariants({ disableRuiClass }), propsClass);
});
</script>

<template>
  <ToastTitle v-bind="props" :class="classNames">
    <slot />
  </ToastTitle>
</template>
