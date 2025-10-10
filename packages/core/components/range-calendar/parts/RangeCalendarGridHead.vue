<script lang="ts" setup>
import type { RangeCalendarGridHeadProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { tvCalendarGrid } from '@rui/core/components/calendar'
import { RangeCalendarGridHead, useForwardProps } from 'reka-ui'

const { unstyled, class: propsClass, ...props } = defineProps<
  RangeCalendarGridHeadProps & {
    unstyled?: boolean
    class?: HTMLAttributes['class']
  }
>()

const { head } = tvCalendarGrid()
const forwarded = useForwardProps(props)
</script>

<template>
  <RangeCalendarGridHead
    v-bind="forwarded"
    :class="head({ unstyled, class: propsClass })"
  >
    <slot />
  </RangeCalendarGridHead>
</template>
