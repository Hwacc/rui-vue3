<script lang="ts" setup>
import type { CalendarHeadCellProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { CalendarHeadCellVariantsProps } from '.'
import { cn } from '@rui/core/lib/utils'
import { CalendarHeadCell, useForwardProps } from 'reka-ui'
import { calendarHeadCellVariants } from '.'

const {
  class: propsClass,
  size = 'base',
  unstyled,
  ...props
} = defineProps<
  CalendarHeadCellProps & {
    class?: HTMLAttributes['class']
    size?: CalendarHeadCellVariantsProps['size']
    unstyled?: boolean
  }
>()
const forwarded = useForwardProps(props)
</script>

<template>
  <CalendarHeadCell
    v-bind="forwarded"
    :class="
      cn(
        calendarHeadCellVariants({
          unstyled,
          size,
        }),
        propsClass,
      )
    "
  >
    <slot />
  </CalendarHeadCell>
</template>
