<script setup lang="ts">
import type { ToastDescriptionProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { ToastDescription } from 'reka-ui';
import { computed } from 'vue';

const { class: propsClass, ...props } = defineProps<
  ToastDescriptionProps & { class?: HTMLAttributes['class'] }
>();
const classNames = computed(() => {
  return cn('text-sm text-h88', propsClass);
});
</script>

<template>
  <ToastDescription :class="classNames" v-bind="props">
    <slot />
  </ToastDescription>
</template>
