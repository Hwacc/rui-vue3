<script lang="ts" setup>
import type { ButtonVariants } from '@rui/core/components/button'
import type { CalendarPrevProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { tvButton } from '@rui/core/components/button'
import { ChevronLeft } from 'lucide-vue-next'
import { CalendarPrev, useForwardProps } from 'reka-ui'
import { prefix } from '../index'

const {
  class: propsClass,
  variant = 'icon',
  size = 'base',
  unstyled,
  ...props
} = defineProps<
  CalendarPrevProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
    variant?: ButtonVariants['variant']
    size?: ButtonVariants['size']
  }
>()

const forwarded = useForwardProps(props)

const { base } = tvButton()
</script>

<template>
  <CalendarPrev
    v-bind="forwarded"
    :class="base({ variant, unstyled, class: [!unstyled && `${prefix}-prev`, propsClass] })"
    :data-variant="variant"
  >
    <slot>
      <ChevronLeft class="h-4 w-4" />
    </slot>
  </CalendarPrev>
</template>
