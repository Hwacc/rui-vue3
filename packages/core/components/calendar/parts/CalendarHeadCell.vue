<script lang="ts" setup>
import type { CalendarHeadCellProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { CalendarHeadCellVariants } from '.'
import { CalendarHeadCell, useForwardProps } from 'reka-ui'
import { tvCalendarHeadCell } from '.'

const {
  class: propsClass,
  size = 'base',
  unstyled,
  ...props
} = defineProps<
  CalendarHeadCellProps & {
    class?: HTMLAttributes['class']
    size?: CalendarHeadCellVariants['size']
    unstyled?: boolean
  }
>()
const forwarded = useForwardProps(props)
</script>

<template>
  <CalendarHeadCell
    v-bind="forwarded"
    :class="
      tvCalendarHeadCell({
        unstyled,
        size,
        class: propsClass,
      })
    "
  >
    <slot />
  </CalendarHeadCell>
</template>
