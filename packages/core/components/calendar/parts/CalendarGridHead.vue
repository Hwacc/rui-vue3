<script lang="ts" setup>
import type { CalendarGridHeadProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { CalendarGridHead, useForwardProps } from 'reka-ui'
import { tvCalendarGrid } from '.'

const {
  unstyled,
  class: propsClass,
  ...props
} = defineProps<
  CalendarGridHeadProps & {
    unstyled?: boolean
    class?: HTMLAttributes['class']
  }
>()
const { head } = tvCalendarGrid()
const forwarded = useForwardProps(props)
</script>

<template>
  <CalendarGridHead
    v-bind="forwarded"
    :class="head({ unstyled, class: propsClass })"
  >
    <slot />
  </CalendarGridHead>
</template>
