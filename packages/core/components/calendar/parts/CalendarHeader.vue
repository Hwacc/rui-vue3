<script lang="ts" setup>
import type { CalendarHeaderProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { CalendarHeader, useForwardProps } from 'reka-ui'
import { calendarHeaderVariants } from '.'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  CalendarHeaderProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
  }
>()
const forwardedProps = useForwardProps(props)
</script>

<template>
  <CalendarHeader
    :class="cn(calendarHeaderVariants({ unstyled }), propsClass)"
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarHeader>
</template>
