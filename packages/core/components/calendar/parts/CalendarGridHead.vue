<script lang="ts" setup>
import type { CalendarGridHeadProps } from 'reka-ui'
import { CalendarGridHead, useForwardProps } from 'reka-ui'
import { prefix } from '.'

const { unstyled, ...props } = defineProps<
  CalendarGridHeadProps & {
    unstyled?: boolean
  }
>()
const forwarded = useForwardProps(props)
</script>

<template>
  <CalendarGridHead
    v-bind="forwarded"
    :class="!unstyled && `${prefix}-grid-head`"
  >
    <slot />
  </CalendarGridHead>
</template>
