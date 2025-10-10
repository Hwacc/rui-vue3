<script lang="ts" setup>
import type { CalendarCellTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { CalendarCellTriggerVariants } from '.'
import { CalendarCellTrigger, useForwardProps } from 'reka-ui'
import { tvCalendarCellTrigger } from '.'

const {
  class: propsClass,
  unstyled,
  size = 'base',
  ...props
} = defineProps<
  CalendarCellTriggerProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
    size?: CalendarCellTriggerVariants['size']
  }
>()
const forwarded = useForwardProps(props)
</script>

<template>
  <CalendarCellTrigger
    v-bind="forwarded"
    :class="
      tvCalendarCellTrigger({
        size,
        unstyled,
        class: propsClass,
      })
    "
  >
    <slot />
  </CalendarCellTrigger>
</template>
