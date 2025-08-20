<script setup lang="ts">
import type { ProgressRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ProgressIndicatorVariants } from '.'
import { ProgressIndicator, ProgressRoot } from 'reka-ui'
import { toRefs } from 'vue'
import { tvProgress } from '.'
import { useIndicatorTransfer } from './useIndicatorTransfer'

const {
  class: propsClass,
  variant = 'default',
  unstyled,
  ui,
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
const { modelValue } = toRefs(props)
const { indicatorRef, transferStyle } = useIndicatorTransfer(variant, modelValue)

const { base, indicator } = tvProgress()
</script>

<template>
  <ProgressRoot
    v-bind="props"
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
