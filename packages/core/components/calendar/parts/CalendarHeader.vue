<script lang="ts" setup>
import type { CalendarHeaderProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { CalendarHeader, useForwardProps } from 'reka-ui'
import { tvCalendarHeader } from '.'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  CalendarHeaderProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
  }
>()
const forwarded = useForwardProps(props)
</script>

<template>
  <CalendarHeader
    v-bind="forwarded"
    :class="tvCalendarHeader({ unstyled, class: propsClass })"
  >
    <slot />
  </CalendarHeader>
</template>
