<script lang="ts" setup>
import type { RangeCalendarGridProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/core/lib/utils'
import { RangeCalendarGrid, useForwardProps } from 'reka-ui'
import { calendarGridVariants } from '@/core/components/calendar'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  RangeCalendarGridProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
  }
>()

const forwardedProps = useForwardProps(props)
</script>

<template>
  <RangeCalendarGrid
    :class="cn(calendarGridVariants({ unstyled }), propsClass)"
    v-bind="forwardedProps"
  >
    <slot />
  </RangeCalendarGrid>
</template>
