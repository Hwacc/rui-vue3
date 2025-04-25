<script lang="ts" setup>
import type { CalendarCellTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/core/lib/utils'
import { CalendarCellTrigger, useForwardProps } from 'reka-ui'
import {
  calendarCellTriggerVariants,
  type CalendarCellTriggerVariantsProps
} from '.'
const {
  unstyled,
  size = 'base',
  ...props
} = defineProps<
  CalendarCellTriggerProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
    size?: CalendarCellTriggerVariantsProps['size']
  }
>()
const forwardedProps = useForwardProps(props)
</script>

<template>
  <CalendarCellTrigger
    :class="
      cn(
        calendarCellTriggerVariants({
          size,
          unstyled
        }),
        props.class
      )
    "
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarCellTrigger>
</template>
