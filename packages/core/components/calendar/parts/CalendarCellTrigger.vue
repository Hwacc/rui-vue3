<script lang="ts" setup>
import type { CalendarCellTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { CalendarCellTrigger, useForwardProps } from 'reka-ui'
import {
  calendarCellTriggerVariants,
  type CalendarCellTriggerVariantsProps
} from '.'
const {
  class: propsClass,
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
        propsClass
      )
    "
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarCellTrigger>
</template>
