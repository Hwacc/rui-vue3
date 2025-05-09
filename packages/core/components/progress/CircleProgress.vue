<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type {
  CircleProgressIndicatorVariants,
  CircleProgressVariants,
} from '.'
import { cn } from '@rui/core/lib/utils'
import { computed, toRefs } from 'vue'
import {
  circleProgressIndicatorVariants,
  circleProgressVariants,
} from '.'
import { useIndicatorTransfer } from './useIndicatorTransfer'

const {
  class: propsClass,
  strokeWidth = 2,
  type = 'circle',
  indicatorClass,
  variant = 'default',
  unstyled,
  ...props
} = defineProps<{
  class?: HTMLAttributes['class']
  type?: CircleProgressVariants['type']
  modelValue?: number
  strokeWidth?: number
  indicatorClass?: HTMLAttributes['class']
  variant?: CircleProgressIndicatorVariants['variant']
  unstyled?: boolean
}>()
const area = computed(() => {
  const r = 24 - strokeWidth
  return Math.ceil(2 * Math.PI * r)
})

const arc = computed(() => {
  const r = 24 - strokeWidth
  const theta = (180 * 100) / (Math.PI * 22) // 以r = 22为基准计算圆心角
  return Math.ceil((theta * Math.PI * r) / 180)
})

const { modelValue } = toRefs(props)
const progress = computed(() => {
  if (type === 'arc') {
    return arc.value - ((modelValue.value ?? 0) / 100) * arc.value
  }
  else {
    return area.value - ((modelValue.value ?? 0) / 100) * area.value
  }
})
const { indicatorRef, transferStyle } = useIndicatorTransfer(
  variant,
  modelValue,
)
</script>

<template>
  <div
    :class="cn(circleProgressVariants({ unstyled }), propsClass)"
    :data-type="type"
  >
    <div
      v-if="type === 'arc'"
      ref="indicatorRef"
      :class="
        cn(
          circleProgressIndicatorVariants({ unstyled, variant }),
          indicatorClass,
        )
      "
      :data-variant="variant"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 56">
        <g fill="none">
          <circle
            cx="24"
            cy="24"
            :r="24 - strokeWidth"
            stroke="var(--rui-progress)"
            :stroke-width="strokeWidth"
            :stroke-dasharray="`${arc} 1000`"
            stroke-dashoffset="0"
            transform="rotate(140.5,24,24)"
          />
          <circle
            cx="24"
            cy="24"
            :r="24 - strokeWidth"
            :stroke="
              variant === 'transfer'
                ? transferStyle.background
                : 'var(--rui-progress-indicator)'
            "
            :stroke-width="strokeWidth"
            :stroke-dasharray="`${arc} 1000`"
            :stroke-dashoffset="progress"
            transform="rotate(140.5,24,24)"
          />
          <text
            v-show="modelValue && modelValue > 0"
            class="text-xs"
            x="50%"
            y="52"
            style="text-anchor: middle"
          >
            {{ modelValue && `${~~modelValue}%` }}
          </text>
        </g>
      </svg>
      <slot />
    </div>
    <div
      v-else
      ref="indicatorRef"
      :class="
        cn(
          circleProgressIndicatorVariants({ unstyled, variant }),
          indicatorClass,
        )
      "
      :data-variant="variant"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 56">
        <g fill="none">
          <circle
            cx="24"
            cy="24"
            :r="24 - strokeWidth"
            stroke="var(--rui-progress)"
            :stroke-width="strokeWidth"
            stroke-dasharray="1000"
            stroke-dashoffset="0"
          />
          <circle
            cx="24"
            cy="24"
            :r="24 - strokeWidth"
            :stroke="
              variant === 'transfer'
                ? transferStyle.background
                : 'var(--rui-progress-indicator)'
            "
            :stroke-width="strokeWidth"
            :stroke-dasharray="area"
            :stroke-dashoffset="progress"
            transform="rotate(-90, 24, 24)"
          />
        </g>
      </svg>
      <slot />
    </div>
  </div>
</template>
