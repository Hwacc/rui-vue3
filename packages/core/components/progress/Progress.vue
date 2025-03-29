<script setup lang="ts">
import { cn } from '@/lib/utils';
import { ProgressIndicator, ProgressRoot, type ProgressRootProps } from 'reka-ui';
import { toRefs, type HTMLAttributes } from 'vue';
import { progressVariants, progressIndicatorVariants, ProgressIndicatorVariants } from '.';
import { useIndicatorTransfer } from './useIndicatorTransfer';

const {
  class: propsClass,
  indicatorType = 'default',
  disableRuiClass,
  ...props
} = defineProps<
  ProgressRootProps & {
    class?: HTMLAttributes['class'];
    indicatorType?: ProgressIndicatorVariants['type'];
    disableRuiClass?: boolean;
  }
>();
const { modelValue } = toRefs(props);
const { indicatorRef, transferStyle } = useIndicatorTransfer(indicatorType, modelValue);
</script>

<template>
  <ProgressRoot v-bind="props" :class="cn(progressVariants({ disableRuiClass }), propsClass)">
    <ProgressIndicator
      :class="progressIndicatorVariants({ disableRuiClass, type: indicatorType })"
      ref="indicatorRef"
      :data-type="indicatorType"
      :style="
        indicatorType === 'transfer'
          ? transferStyle
          : `transform: translateX(-${100 - (modelValue ?? 0)}%);`
      "
    />
  </ProgressRoot>
</template>
