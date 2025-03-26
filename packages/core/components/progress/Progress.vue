<script setup lang="ts">
import { cn, getCssColor } from '@/lib/utils';
import { ProgressIndicator, ProgressRoot, type ProgressRootProps } from 'reka-ui';
import { type HTMLAttributes } from 'vue';
import { progressClass, progressIndicatorClass } from '.';

const { class: propsClass, ...props } = defineProps<
  ProgressRootProps & { class?: HTMLAttributes['class'] }
>();

console.log('color:', getCssColor('test'))

</script>

<template>
  <ProgressRoot v-bind="props" :class="cn(progressClass, 'bg-test', propsClass)">
    <ProgressIndicator
      :class="progressIndicatorClass"
      :style="`transform: translateX(-${100 - (props.modelValue ?? 0)}%);`"
    />
  </ProgressRoot>
</template>
