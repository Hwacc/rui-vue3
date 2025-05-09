<script setup lang="ts">
import type {
  DropdownMenuContentEmits,
  DropdownMenuContentProps,
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { PopoverContentMotion } from '@rui/core/components/motion/PopoverContentMotion'
import { cn } from '@rui/core/lib/utils'
import { AnimatePresence } from 'motion-v'
import {
  DropdownMenuContent,
  DropdownMenuPortal,
  useForwardPropsEmits,
} from 'reka-ui'
import { dropdownMenuContentVariants } from '.'

const {
  class: propsClass,
  side = 'bottom',
  align = 'start',
  unstyled,
  ...props
} = defineProps<
  DropdownMenuContentProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
  }
>()

const emits = defineEmits<DropdownMenuContentEmits>()

const forwarded = useForwardPropsEmits(
  {
    side,
    align,
    ...props,
  },
  emits,
)
</script>

<template>
  <DropdownMenuPortal>
    <AnimatePresence>
      <DropdownMenuContent v-bind="forwarded">
        <PopoverContentMotion
          :class="cn(dropdownMenuContentVariants({ unstyled }), propsClass)"
        >
          <slot />
        </PopoverContentMotion>
      </DropdownMenuContent>
    </AnimatePresence>
  </DropdownMenuPortal>
</template>
