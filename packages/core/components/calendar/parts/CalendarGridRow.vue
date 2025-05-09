<script lang="ts" setup>
import type { CalendarGridRowProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { CalendarGridRow, useForwardProps } from 'reka-ui'
import { prefix } from '.'

const {
  class: propsClass,
  unstyle,
  ...props
} = defineProps<
  CalendarGridRowProps & {
    class?: HTMLAttributes['class']
    unstyle?: boolean
  }
>()
const forwardedProps = useForwardProps(props)
</script>

<template>
  <CalendarGridRow
    :class="cn('flex', !unstyle && `${prefix}-grid-row`, propsClass)"
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarGridRow>
</template>
