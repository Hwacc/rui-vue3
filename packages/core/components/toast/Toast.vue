<script setup lang="ts">
import type { ToastRootEmits } from 'reka-ui';
import type { ToastProps } from '.';

import { cn } from '@/core/lib/utils';
import { ToastRoot, useForwardPropsEmits } from 'reka-ui';
import { computed, unref } from 'vue';
import { toastVariants } from '.';
import { injectToastProviderContextEx } from './ToastProvider.vue';

const {
  class: propsClass,
  variant = 'success',
  disableRuiClass,
  ...props
} = defineProps<ToastProps>();
const { position, swipeDirection } = injectToastProviderContextEx();
const emits = defineEmits<ToastRootEmits>();

const classNames = computed(() => {
  return cn(
    toastVariants({
      position: unref(position),
      swipeDirection: unref(swipeDirection),
      disableRuiClass,
    }),
    propsClass
  );
});
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ToastRoot
    v-bind="forwarded"
    :class="classNames"
    @update:open="onOpenChange"
    :data-variant="variant"
  >
    <slot />
  </ToastRoot>
</template>
