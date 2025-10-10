<script lang="ts" setup>
import type { CalendarCellProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { CalendarCellVariants } from '.'
import { CalendarCell, useForwardProps } from 'reka-ui'
import { tvCalendarCell } from '.'

const {
  class: propsClass,
  unstyled,
  size = 'base',
  variant = 'day',
  ...props
} = defineProps<
  CalendarCellProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
    size?: CalendarCellVariants['size']
    variant?: CalendarCellVariants['variant']
  }
>()

const forwarded = useForwardProps(props)
</script>

<template>
  <CalendarCell
    :class="tvCalendarCell({ size, variant, unstyled, class: propsClass })"
    :data-variant="variant"
    v-bind="forwarded"
  >
    <slot />
  </CalendarCell>
</template>
