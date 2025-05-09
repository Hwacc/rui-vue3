<script lang="ts" setup>
import type { RangeCalendarGridHeadProps } from 'reka-ui'
import { prefix } from '@rui/core/components/calendar'
import { RangeCalendarGridHead } from 'reka-ui'

const { unstyled, ...props } = defineProps<
  RangeCalendarGridHeadProps & {
    unstyled?: boolean
  }
>()
</script>

<template>
  <RangeCalendarGridHead
    v-bind="props"
    :class="!unstyled && `${prefix}-grid-head`"
  >
    <slot />
  </RangeCalendarGridHead>
</template>
