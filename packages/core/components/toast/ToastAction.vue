<script setup lang="ts">
import type { ToastActionProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { ToastAction } from 'reka-ui';
import { toastActionVariants, ToastVariants } from '.';

const {
  class: propsClass,
  disableRuiClass,
  variant,
  ...props
} = defineProps<
  ToastActionProps & {
    class?: HTMLAttributes['class'];
    variant: ToastVariants['variant'];
    disableRuiClass?: boolean;
  }
>();
</script>

<template>
  <ToastAction
    v-bind="props"
    :class="cn(toastActionVariants({ disableRuiClass, variant }), propsClass)"
  >
    <slot />
  </ToastAction>
</template>
