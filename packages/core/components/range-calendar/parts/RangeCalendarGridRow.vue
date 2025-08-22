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
const forwarded = useForwardProps(props)
</script>

<template>
  <RangeCalendarGridRow
    v-bind="forwarded"
    :class="cn('flex', !unstyle && `${prefix}-grid-row`, propsClass)"
  >
    <slot />
  </RangeCalendarGridRow>
</template>
