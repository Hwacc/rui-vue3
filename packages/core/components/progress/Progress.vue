<script setup lang="ts">
import type { ProgressRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ProgressIndicatorVariants } from '.'
import { ProgressIndicator, ProgressRoot, useForwardProps } from 'reka-ui'
import { computed } from 'vue'
import { tvProgress } from '.'
import { useIndicatorTransfer } from './useIndicatorTransfer'

const {
  class: propsClass,
  variant = 'default',
  unstyled,
  ui,
  modelValue,
  ...props
} = defineProps<
  ProgressRootProps & {
    class?: HTMLAttributes['class']
    variant?: ProgressIndicatorVariants['variant']
    unstyled?: boolean
    ui?: {
      root?: {
        class?: HTMLAttributes['class']
      }
      indicator?: {
        class?: HTMLAttributes['class']
      }
    }
  }
>()
const { indicatorRef, transferStyle } = useIndicatorTransfer(variant, computed(() => modelValue))

const { base, indicator } = tvProgress()
const forwarded = useForwardProps(props)
</script>

<template>
  <ProgressRoot
    v-bind="forwarded"
    :class="base({ unstyled, variant, class: [ui?.root?.class, propsClass] })"
  >
    <ProgressIndicator
      ref="indicatorRef"
      :class="indicator({ unstyled, variant, class: ui?.indicator?.class })"
      :data-variant="variant"
      :style="
        variant === 'transfer'
          ? transferStyle
          : `transform: translateX(-${100 - (modelValue ?? 0)}%);`
      "
    />
  </ProgressRoot>
</template>
