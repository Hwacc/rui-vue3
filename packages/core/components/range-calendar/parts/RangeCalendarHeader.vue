<script lang="ts" setup>
import type { RangeCalendarHeaderProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { calendarHeaderVariants } from '@rui/core/components/calendar'
import { cn } from '@rui/core/lib/utils'
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
const forwardedProps = useForwardProps(props)
</script>

<template>
  <RangeCalendarHeader
    :class="cn(calendarHeaderVariants({ unstyled }), propsClass)"
    v-bind="forwardedProps"
  >
    <slot />
  </RangeCalendarHeader>
</template>
