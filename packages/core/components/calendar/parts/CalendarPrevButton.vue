<script lang="ts" setup>
import type { ButtonVariants } from '@rui/core/components/button'
import type { CalendarPrevProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { buttonVariants } from '@rui/core/components/button'
import { cn } from '@rui/core/lib/utils'
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

const forwardedProps = useForwardProps(props)
</script>

<template>
  <CalendarPrev
    :class="
      cn(
        buttonVariants({ size, variant, unstyled }),
        [!unstyled && `${prefix}-prev`],
        propsClass,
      )
    "
    :data-variant="variant"
    v-bind="forwardedProps"
  >
    <slot>
      <ChevronLeft class="h-4 w-4" />
    </slot>
  </CalendarPrev>
</template>
