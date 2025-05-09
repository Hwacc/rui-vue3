<script setup lang="ts">
import type { ProgressRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ProgressIndicatorVariants } from '.'
import { cn } from '@rui/core/lib/utils'
import { ProgressIndicator, ProgressRoot } from 'reka-ui'
import { toRefs } from 'vue'
import { progressIndicatorVariants, progressVariants } from '.'
import { useIndicatorTransfer } from './useIndicatorTransfer'

const {
  class: propsClass,
  variant = 'default',
  unstyled,
  ...props
} = defineProps<
  ProgressRootProps & {
    class?: HTMLAttributes['class']
    variant?: ProgressIndicatorVariants['variant']
    unstyled?: boolean
  }
>()
const { modelValue } = toRefs(props)
const { indicatorRef, transferStyle } = useIndicatorTransfer(variant, modelValue)
</script>

<template>
  <ProgressRoot v-bind="props" :class="cn(progressVariants({ unstyled }), propsClass)">
    <ProgressIndicator
      ref="indicatorRef"
      :class="progressIndicatorVariants({ unstyled, variant })"
      :data-variant="variant"
      :style="
        variant === 'transfer'
          ? transferStyle
          : `transform: translateX(-${100 - (modelValue ?? 0)}%);`
      "
    />
  </ProgressRoot>
</template>
