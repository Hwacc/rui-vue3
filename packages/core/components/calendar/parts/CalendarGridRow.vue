<script lang="ts" setup>
import type { CalendarGridRowProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { CalendarGridRow, useForwardProps } from 'reka-ui'
import { prefix } from '.'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  CalendarGridRowProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
  }
>()
const forwarded = useForwardProps(props)
</script>

<template>
  <CalendarGridRow
    v-bind="forwarded"
    :class="cn('flex', !unstyled && `${prefix}-grid-row`, propsClass)"
  >
    <slot />
  </CalendarGridRow>
</template>
