<script lang="ts" setup>
import type { CalendarCellTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { CalendarCellTriggerVariantsProps } from '.'
import { cn } from '@rui/core/lib/utils'
import { CalendarCellTrigger, useForwardProps } from 'reka-ui'
import { calendarCellTriggerVariants } from '.'

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
const forwarded = useForwardProps(props)
</script>

<template>
  <CalendarCellTrigger
    v-bind="forwarded"
    :class="
      cn(
        calendarCellTriggerVariants({
          size,
          unstyled,
        }),
        propsClass,
      )
    "
  >
    <slot />
  </CalendarCellTrigger>
</template>
