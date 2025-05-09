<script lang="ts" setup>
import type { CalendarNextProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ButtonVariants, buttonVariants } from '@rui/core/components/button'
import { cn } from '@rui/core/lib/utils'
import { ChevronRight } from 'lucide-vue-next'
import { CalendarNext, useForwardProps } from 'reka-ui'
import { prefix } from '../index'

const {
  class: propsClass,
  unstyled,
  variant = 'icon',
  ...props
} = defineProps<
  CalendarNextProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
    variant?: ButtonVariants['variant']
  }
>()

const forwardedProps = useForwardProps(props)
</script>

<template>
  <CalendarNext
    :class="
      cn(
        buttonVariants({ variant, unstyled }),
        [!unstyled && `${prefix}-next`],
        propsClass
      )
    "
    :data-variant="variant"
    v-bind="forwardedProps"
  >
    <slot>
      <ChevronRight class="h-4 w-4" />
    </slot>
  </CalendarNext>
</template>
