<script setup lang="ts">
import type { ToastCloseProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/core/lib/utils';
import { X } from 'lucide-vue-next';
import { ToastClose } from 'reka-ui';
import { computed } from 'vue';
import { toastCloseVariants } from '.';

const {
  class: propsClass,
  disableRuiClass,
  ...props
} = defineProps<
  ToastCloseProps & {
    class?: HTMLAttributes['class'];
    disableRuiClass?: boolean;
  }
>();

const classNames = computed(() => {
  return cn(toastCloseVariants({ disableRuiClass }), propsClass);
});
</script>

<template>
  <ToastClose v-bind="props" :class="classNames">
    <X class="size-full" />
  </ToastClose>
</template>
