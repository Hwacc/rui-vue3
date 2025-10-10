<script lang="ts" setup>
import type { RangeCalendarGridProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { tvCalendarGrid } from '@rui/core/components/calendar'
import { RangeCalendarGrid, useForwardProps } from 'reka-ui'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  RangeCalendarGridProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
  }
>()

const { base } = tvCalendarGrid()
const forwarded = useForwardProps(props)
</script>

<template>
  <RangeCalendarGrid
    v-bind="forwarded"
    :class="base({ unstyled, class: propsClass })"
  >
    <slot />
  </RangeCalendarGrid>
</template>
