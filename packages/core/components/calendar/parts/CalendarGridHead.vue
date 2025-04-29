<script lang="ts" setup>
import type { CalendarGridHeadProps } from 'reka-ui'
import { CalendarGridHead } from 'reka-ui'
import { prefix } from '.'

const { unstyled, ...props } = defineProps<
  CalendarGridHeadProps & {
    unstyled?: boolean
  }
>()
</script>

<template>
  <CalendarGridHead
    v-bind="props"
    :class="!unstyled && `${prefix}-grid-head`"
  >
    <slot />
  </CalendarGridHead>
</template>
