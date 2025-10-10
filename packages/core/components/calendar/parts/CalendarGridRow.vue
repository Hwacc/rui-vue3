<script lang="ts" setup>
import type { CalendarGridRowProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { CalendarGridRow, useForwardProps } from 'reka-ui'
import { tvCalendarGrid } from '.'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  CalendarGridRowProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
  }
>()

const { row } = tvCalendarGrid()
const forwarded = useForwardProps(props)
</script>

<template>
  <CalendarGridRow
    v-bind="forwarded"
    :class="row({ unstyled, class: propsClass })"
  >
    <slot />
  </CalendarGridRow>
</template>
