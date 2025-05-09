<script lang="ts" setup>
import type { RangeCalendarGridRowProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { prefix } from '@rui/core/components/calendar'
import { cn } from '@rui/core/lib/utils'
import { RangeCalendarGridRow, useForwardProps } from 'reka-ui'

const {
  class: propsClass,
  unstyle,
  ...props
} = defineProps<
  RangeCalendarGridRowProps & {
    class?: HTMLAttributes['class']
    unstyle?: boolean
  }
>()
const forwardedProps = useForwardProps(props)
</script>

<template>
  <RangeCalendarGridRow
    :class="cn('flex', !unstyle && `${prefix}-grid-row`, propsClass)"
    v-bind="forwardedProps"
  >
    <slot />
  </RangeCalendarGridRow>
</template>
