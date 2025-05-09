<script lang="ts" setup>
import type { RangeCalendarGridProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { calendarGridVariants } from '@rui/core/components/calendar'
import { cn } from '@rui/core/lib/utils'
import { RangeCalendarGrid, useForwardProps } from 'reka-ui'

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
