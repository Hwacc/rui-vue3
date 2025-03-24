<script setup lang="ts">
import type { ToastActionProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { ToastAction } from 'reka-ui';
import { toastActionClass } from '.';

const { class: propsClass, ...props } = defineProps<
  ToastActionProps & { class?: HTMLAttributes['class'] }
>();
</script>

<template>
  <ToastAction v-bind="props" :class="cn(toastActionClass, propsClass)">
    <slot />
  </ToastAction>
</template>
