<script lang="ts" setup>
import type { CalendarGridProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { CalendarGrid, useForwardProps } from 'reka-ui'
import { tvCalendarGrid } from '.'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  CalendarGridProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
  }
>()
const { base } = tvCalendarGrid()
const forwarded = useForwardProps(props)
</script>

<template>
  <CalendarGrid
    v-bind="forwarded"
    :class="base({ unstyled, class: propsClass })"
  >
    <slot />
  </CalendarGrid>
</template>
