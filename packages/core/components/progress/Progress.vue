<script setup lang="ts">
import { cn } from '@/core/lib/utils';
import { ProgressIndicator, ProgressRoot, type ProgressRootProps } from 'reka-ui';
import { toRefs, type HTMLAttributes } from 'vue';
import { progressVariants, progressIndicatorVariants, ProgressIndicatorVariants } from '.';
import { useIndicatorTransfer } from './useIndicatorTransfer';

const {
  class: propsClass,
  variant = 'default',
  disableRuiClass,
  ...props
} = defineProps<
  ProgressRootProps & {
    class?: HTMLAttributes['class'];
    variant?: ProgressIndicatorVariants['variant'];
    disableRuiClass?: boolean;
  }
>();
const { modelValue } = toRefs(props);
const { indicatorRef, transferStyle } = useIndicatorTransfer(variant, modelValue);
</script>

<template>
  <ProgressRoot v-bind="props" :class="cn(progressVariants({ disableRuiClass }), propsClass)">
    <ProgressIndicator
      :class="progressIndicatorVariants({ disableRuiClass, variant })"
      ref="indicatorRef"
      :data-variant="variant"
      :style="
        variant === 'transfer'
          ? transferStyle
          : `transform: translateX(-${100 - (modelValue ?? 0)}%);`
      "
    />
  </ProgressRoot>
</template>
