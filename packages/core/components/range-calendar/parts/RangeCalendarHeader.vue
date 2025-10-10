<script lang="ts" setup>
import type { RangeCalendarHeaderProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { tvCalendarHeader } from '@rui/core/components/calendar'
import { RangeCalendarHeader, useForwardProps } from 'reka-ui'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  RangeCalendarHeaderProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
  }
>()
const forwarded = useForwardProps(props)
</script>

<template>
  <RangeCalendarHeader
    v-bind="forwarded"
    :class="tvCalendarHeader({ unstyled, class: propsClass })"
  >
    <slot />
  </RangeCalendarHeader>
</template>
