<script lang="ts" setup>
import type { CalendarGridBodyProps } from 'reka-ui'
import { CalendarGridBody, useForwardProps } from 'reka-ui'
import { prefix } from '.'

const { unstyled, ...props } = defineProps<
  CalendarGridBodyProps & {
    unstyled?: boolean
  }
>()
const forwarded = useForwardProps(props)
</script>

<template>
  <CalendarGridBody v-bind="forwarded" :class="!unstyled && `${prefix}-grid-body`">
    <slot />
  </CalendarGridBody>
</template>
