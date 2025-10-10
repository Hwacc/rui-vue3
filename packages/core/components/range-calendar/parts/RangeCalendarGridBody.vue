<script lang="ts" setup>
import type { RangeCalendarGridBodyProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { tvCalendarGrid } from '@rui/core/components/calendar'
import { RangeCalendarGridBody, useForwardProps } from 'reka-ui'

const {
  unstyled,
  class: propsClass,
  ...props
} = defineProps<
  RangeCalendarGridBodyProps & {
    unstyled?: boolean
    class?: HTMLAttributes['class']
  }
>()

const { body } = tvCalendarGrid()
const forwarded = useForwardProps(props)
</script>

<template>
  <RangeCalendarGridBody
    v-bind="forwarded"
    :class="body({ unstyled, class: propsClass })"
  >
    <slot />
  </RangeCalendarGridBody>
</template>
