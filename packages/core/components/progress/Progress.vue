<script setup lang="ts">
import { cn } from '@rui/core/lib/utils';
import { ProgressIndicator, ProgressRoot, type ProgressRootProps } from 'reka-ui';
import { toRefs, type HTMLAttributes } from 'vue';
import { progressVariants, progressIndicatorVariants, ProgressIndicatorVariants } from '.';
import { useIndicatorTransfer } from './useIndicatorTransfer';

const {
  class: propsClass,
  variant = 'default',
  unstyled,
  ...props
} = defineProps<
  ProgressRootProps & {
    class?: HTMLAttributes['class'];
    variant?: ProgressIndicatorVariants['variant'];
    unstyled?: boolean;
  }
>();
const { modelValue } = toRefs(props);
const { indicatorRef, transferStyle } = useIndicatorTransfer(variant, modelValue);
</script>

<template>
  <ProgressRoot v-bind="props" :class="cn(progressVariants({ unstyled }), propsClass)">
    <ProgressIndicator
      :class="progressIndicatorVariants({ unstyled, variant })"
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
