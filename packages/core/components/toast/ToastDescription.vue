<script setup lang="ts">
import type { ToastDescriptionProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { ToastDescription } from 'reka-ui';
import { computed } from 'vue';
import { toastDescriptionVariants } from '.';

const {
  class: propsClass,
  disableRuiClass,
  ...props
} = defineProps<
  ToastDescriptionProps & { class?: HTMLAttributes['class']; disableRuiClass?: boolean }
>();
const classNames = computed(() => {
  return cn(toastDescriptionVariants({ disableRuiClass }), propsClass);
});
</script>

<template>
  <ToastDescription :class="classNames" v-bind="props">
    <slot />
  </ToastDescription>
</template>
