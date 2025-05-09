<script setup lang="ts">
import type {
  DropdownMenuSubContentEmits,
  DropdownMenuSubContentProps,
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { PopoverContentMotion } from '@rui/core/components/motion/PopoverContentMotion'
import { cn, spaceTimes } from '@rui/core/lib/utils'
import { AnimatePresence } from 'motion-v'
import { DropdownMenuSubContent, useForwardPropsEmits } from 'reka-ui'
import { dropdownMenuSubContentVariants } from '.'

const {
  class: propsClass,
  sideOffset = spaceTimes(2),
  unstyled,
  ...props
} = defineProps<
  DropdownMenuSubContentProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
  }
>()
const emits = defineEmits<DropdownMenuSubContentEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <AnimatePresence>
    <DropdownMenuSubContent v-bind="forwarded" :side-offset="sideOffset">
      <PopoverContentMotion
        :class="cn(dropdownMenuSubContentVariants({ unstyled }), propsClass)"
        side="right"
      >
        <slot />
      </PopoverContentMotion>
    </DropdownMenuSubContent>
  </AnimatePresence>
</template>
