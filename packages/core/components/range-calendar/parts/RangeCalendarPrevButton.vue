<script lang="ts" setup>
import type { ButtonVariants } from '@rui/core/components/button'
import type { RangeCalendarPrevProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { tvButton } from '@rui/core/components/button'
import { prefix } from '@rui/core/components/calendar'
import { ChevronLeft } from 'lucide-vue-next'
import { RangeCalendarPrev, useForwardProps } from 'reka-ui'

const {
  class: propsClass,
  variant = 'icon',
  size = 'base',
  unstyled,
  ...props
} = defineProps<
  RangeCalendarPrevProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
    variant?: ButtonVariants['variant']
    size?: ButtonVariants['size']
  }
>()

const { base } = tvButton()
const forwarded = useForwardProps(props)
</script>

<template>
  <RangeCalendarPrev
    v-bind="forwarded"
    :class="
      base({ size, variant, unstyled, class: [!unstyled && `${prefix}-prev`, propsClass] })
    "
    :data-variant="variant"
  >
    <slot>
      <ChevronLeft class="h-4 w-4" />
    </slot>
  </RangeCalendarPrev>
</template>
