<script lang="ts" setup>
import type { CalendarGridBodyProps } from 'reka-ui'
import { CalendarGridBody } from 'reka-ui'
import { prefix } from '.'

const { unstyled, ...props } = defineProps<
  CalendarGridBodyProps & {
    unstyled?: boolean
  }
>()
</script>

<template>
  <CalendarGridBody v-bind="props" :class="!unstyled && `${prefix}-grid-body`">
    <slot />
  </CalendarGridBody>
</template>
