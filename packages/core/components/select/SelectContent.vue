<script setup lang="ts">
import type { SelectContentEmits, SelectContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { PopoverContentMotion } from '@rui/core/components/motion/PopoverContentMotion'
import { cn } from '@rui/core/lib/utils'
import { AnimatePresence } from 'motion-v'
import { SelectContent, SelectPortal, SelectViewport, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { selectContentVariants, SelectScrollDownButton, SelectScrollUpButton } from '.'

defineOptions({
  inheritAttrs: false,
})

const {
  class: propsClass,
  position = 'popper',
  scrollButton = false,
  side = 'bottom',
  align = 'start',
  asChild = false,
  unstyled,
  ...props
} = defineProps<
  SelectContentProps & {
    class?: HTMLAttributes['class']
    scrollButton?: boolean
    unstyled?: boolean
  }
>()
const emits = defineEmits<SelectContentEmits>()

const classNames = computed(() => {
  return cn(selectContentVariants({ position, unstyled }), propsClass)
})
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <SelectPortal>
    <AnimatePresence>
      <SelectContent v-bind="{ ...forwarded, position, side, align, ...$attrs }" class="test">
        <PopoverContentMotion :class="classNames" :side="side">
          <!-- without scrollbar -->
          <div v-if="scrollButton">
            <SelectScrollUpButton />
            <SelectViewport :class="position === 'popper' && 'w-full'">
              <slot />
            </SelectViewport>
            <SelectScrollDownButton />
          </div>
          <!-- with scrollbar -->
          <div v-else class="w-full max-h-46 overflow-y-scroll webkit-small-scrollbar-self">
            <slot />
          </div>
        </PopoverContentMotion>
      </SelectContent>
    </AnimatePresence>
  </SelectPortal>
</template>
