<script lang="ts" setup>
import type { RangeCalendarHeadingProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/core/lib/utils'
import { RangeCalendarHeading, useForwardProps } from 'reka-ui'
import {
  calendarHeadingVariants,
  type CalendarHeadingVariantsProps
} from '@/core/components/calendar'

const {
  class: propsClass,
  unstyled,
  size = 'base',
  ...props
} = defineProps<
  RangeCalendarHeadingProps & {
    class?: HTMLAttributes['class']
    size?: CalendarHeadingVariantsProps['size']
    unstyled?: boolean
  }
>()

defineSlots<{
  default: (props: { headingValue: string }) => any
}>()

const forwardedProps = useForwardProps(props)
</script>

<template>
  <RangeCalendarHeading
    v-slot="{ headingValue }"
    :class="cn(calendarHeadingVariants({ size, unstyled }), propsClass)"
    v-bind="forwardedProps"
  >
    <slot :heading-value>
      {{ headingValue }}
    </slot>
  </RangeCalendarHeading>
</template>
