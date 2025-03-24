<script setup lang="ts">
import type { ToastCloseProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { X } from 'lucide-vue-next';
import { ToastClose } from 'reka-ui';
import { computed } from 'vue';

const {class: propsClass, ...props} = defineProps<
  ToastCloseProps & {
    class?: HTMLAttributes['class'];
  }
>();

const classNames = computed(() => {
  return cn([
    'size-3',
    'text-h88',
    'hover:text-hff',
  ], propsClass)
});
</script>

<template>
  <ToastClose
    v-bind="props"
    :class="classNames"
  >
    <X class="size-full" />
  </ToastClose>
</template>
