<script lang="ts" setup>
import type { CalendarGridBodyProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { CalendarGridBody, useForwardProps } from 'reka-ui'
import { tvCalendarGrid } from '.'

const { unstyled, class: propsClass, ...props } = defineProps<
  CalendarGridBodyProps & {
    unstyled?: boolean
    class?: HTMLAttributes['class']
  }
>()
const { body } = tvCalendarGrid()
const forwarded = useForwardProps(props)
</script>

<template>
  <CalendarGridBody
    v-bind="forwarded"
    :class="body({ unstyled, class: propsClass })"
  >
    <slot />
  </CalendarGridBody>
</template>
