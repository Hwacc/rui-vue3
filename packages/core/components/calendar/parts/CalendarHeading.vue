<script lang="ts" setup>
import type { CalendarHeadingProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/core/lib/utils'
import { CalendarHeading, useForwardProps } from 'reka-ui'
import { calendarHeadingVariants, type CalendarHeadingVariantsProps } from '.'
import { CalendarPanel, injectCalendarContextEx } from '..'

const {
  class: propsClass,
  unstyled,
  size = 'base',
  ...props
} = defineProps<
  CalendarHeadingProps & {
    class?: HTMLAttributes['class']
    size?: CalendarHeadingVariantsProps['size']
    unstyled?: boolean
  }
>()

defineSlots<{
  default: (props: { headingValue: string }) => any
}>()

const contextEx = injectCalendarContextEx()

const forwardedProps = useForwardProps(props)
</script>

<template>
  <CalendarHeading
    v-slot="{ headingValue }"
    :class="cn(calendarHeadingVariants({ size, unstyled }), propsClass)"
    v-bind="forwardedProps"
    @click="() => (contextEx.panel.value = CalendarPanel.MONTH)"
  >
    <slot :heading-value="headingValue">
      {{ headingValue }}
    </slot>
  </CalendarHeading>
</template>
