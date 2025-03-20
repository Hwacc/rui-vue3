<script setup lang="ts">
import type { ToastRootEmits } from 'reka-ui';
import type { ToastProps } from '.';
import { cn } from '@/lib/utils';
import { ToastRoot, useForwardPropsEmits } from 'reka-ui';
import { computed, unref } from 'vue';
import { toastVariants } from '.';
import { injectToastProviderContextEx } from './ToastProvider.vue';

const { class: propsClass, ...props } = defineProps<ToastProps>();
const { position, swipeDirection } = injectToastProviderContextEx();
const emits = defineEmits<ToastRootEmits>();

const classNames = computed(() => {
  return cn(toastVariants({ position, swipeDirection: unref(swipeDirection) }), propsClass);
});
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ToastRoot
    v-bind="forwarded"
    :class="classNames"
    @update:open="onOpenChange"
    @swipe-start="
      (event) => {
        if (position === 'center') {
          console.log('swipe start', position, event);
          event.preventDefault();
          event.stopPropagation();
          event.detail.originalEvent.preventDefault();
          event.detail.originalEvent.stopPropagation();

        }
      }
    "
    @swipe-move="
      (event) => {
        console.log('swipe move', position);
        event.preventDefault();
        if (position === 'center') {
          
        }
      }
    "
  >
    <slot />
  </ToastRoot>
</template>
