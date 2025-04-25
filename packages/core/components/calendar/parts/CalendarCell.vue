<script lang="ts" setup>
import type { CalendarCellProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/core/lib/utils'
import { CalendarCell, useForwardProps } from 'reka-ui'
import { calendarCellVariants, type CalendarCellVariantsProps } from '.'

const {
  class: propsClass,
  unstyled,
  size = 'base',
  ...props
} = defineProps<
  CalendarCellProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
    size?: CalendarCellVariantsProps['size']
  }
>()

const forwardedProps = useForwardProps(props)
</script>

<template>
  <CalendarCell
    :class="cn(calendarCellVariants({ size, unstyled }), propsClass)"
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarCell>
</template>
