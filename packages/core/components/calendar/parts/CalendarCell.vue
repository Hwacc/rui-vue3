<script lang="ts" setup>
import type { CalendarCellProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { CalendarCellVariantsProps } from '.'
import { cn } from '@rui/core/lib/utils'
import { CalendarCell, useForwardProps } from 'reka-ui'
import { calendarCellVariants } from '.'

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
    size?: CalendarCellVariantsProps['size']
    variant?: CalendarCellVariantsProps['variant']
  }
>()

const forwardedProps = useForwardProps(props)
</script>

<template>
  <CalendarCell
    :class="cn(calendarCellVariants({ size, variant, unstyled }), propsClass)"
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarCell>
</template>
