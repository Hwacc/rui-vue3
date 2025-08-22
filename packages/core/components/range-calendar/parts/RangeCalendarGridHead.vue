<script lang="ts" setup>
import type { RangeCalendarGridHeadProps } from 'reka-ui'
import { prefix } from '@rui/core/components/calendar'
import { RangeCalendarGridHead, useForwardProps } from 'reka-ui'

const { unstyled, ...props } = defineProps<
  RangeCalendarGridHeadProps & {
    unstyled?: boolean
  }
>()

const forwarded = useForwardProps(props)
</script>

<template>
  <RangeCalendarGridHead
    v-bind="forwarded"
    :class="!unstyled && `${prefix}-grid-head`"
  >
    <slot />
  </RangeCalendarGridHead>
</template>
