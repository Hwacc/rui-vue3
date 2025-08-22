<script lang="ts" setup>
import type { RangeCalendarGridBodyProps } from 'reka-ui'
import { prefix } from '@rui/core/components/calendar'
import { RangeCalendarGridBody, useForwardProps } from 'reka-ui'

const { unstyled, ...props } = defineProps<
  RangeCalendarGridBodyProps & {
    unstyled?: boolean
  }
>()

const forwarded = useForwardProps(props)
</script>

<template>
  <RangeCalendarGridBody
    v-bind="forwarded"
    :class="!unstyled && `${prefix}-grid-body`"
  >
    <slot />
  </RangeCalendarGridBody>
</template>
