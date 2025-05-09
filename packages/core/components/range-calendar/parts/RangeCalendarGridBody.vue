<script lang="ts" setup>
import type { RangeCalendarGridBodyProps } from 'reka-ui'
import { prefix } from '@rui/core/components/calendar'
import { RangeCalendarGridBody } from 'reka-ui'

const { unstyled, ...props } = defineProps<
  RangeCalendarGridBodyProps & {
    unstyled?: boolean
  }
>()
</script>

<template>
  <RangeCalendarGridBody
    v-bind="props"
    :class="!unstyled && `${prefix}-grid-body`"
  >
    <slot />
  </RangeCalendarGridBody>
</template>
