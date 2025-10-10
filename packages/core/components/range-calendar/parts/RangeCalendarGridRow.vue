<script lang="ts" setup>
import type { RangeCalendarGridRowProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { tvCalendarGrid } from '@rui/core/components/calendar'
import { RangeCalendarGridRow, useForwardProps } from 'reka-ui'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  RangeCalendarGridRowProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
  }
>()

const { row } = tvCalendarGrid()
const forwarded = useForwardProps(props)
</script>

<template>
  <RangeCalendarGridRow
    v-bind="forwarded"
    :class="row({ unstyled, class: propsClass })"
  >
    <slot />
  </RangeCalendarGridRow>
</template>
