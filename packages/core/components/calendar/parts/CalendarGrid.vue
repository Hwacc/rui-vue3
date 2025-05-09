<script lang="ts" setup>
import type { CalendarGridProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { CalendarGrid, useForwardProps } from 'reka-ui'
import { calendarGridVariants } from '.'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  CalendarGridProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
  }
>()
const forwardedProps = useForwardProps(props)
</script>

<template>
  <CalendarGrid
    :class="cn(calendarGridVariants({ unstyled }), propsClass)"
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarGrid>
</template>
