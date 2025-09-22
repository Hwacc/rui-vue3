<script setup lang="ts">
import type { SelectContentEmits, SelectContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import { PopoverContentMotion } from '@rui/core/components/motion/PopoverContentMotion'
import { cn, rem2px } from '@rui/core/lib/utils'
import { AnimatePresence } from 'motion-v'
import { SelectContent, SelectPortal, SelectViewport, useForwardPropsEmits } from 'reka-ui'
import {
  injectSelectRootContextEx,
  SelectScrollDownButton,
  SelectScrollUpButton,
  tvContent,
} from '.'

defineOptions({
  inheritAttrs: false,
})

const {
  class: propsClass,
  position = 'popper',
  scrollButton = false,
  side = 'bottom',
  align = 'start',
  sideOffset = rem2px(0.5),
  asChild = false,
  positionStrategy = 'absolute',
  unstyled,
  ui,
  ...props
} = defineProps<
  SelectContentProps & {
    class?: HTMLAttributes['class']
    scrollButton?: boolean
    unstyled?: boolean
    ui?: {
      portal?: {
        props?: ComponentProps<typeof SelectPortal>
      }
      wrapper?: {
        class?: HTMLAttributes['class']
      }
      content?: {
        class?: HTMLAttributes['class']
        innerClass?: HTMLAttributes['class']
      }
      viewport?: {
        class?: HTMLAttributes['class']
      }
      scrollButton?: {
        class?: (dir: 'up' | 'down') => HTMLAttributes['class']
      }
    }
  }
>()
const emits = defineEmits<SelectContentEmits>()
// default portal to select root element
const { rootElement } = injectSelectRootContextEx()

const { wrapper, content } = tvContent()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <SelectPortal
    :to="rootElement"
    v-bind="ui?.portal?.props"
  >
    <AnimatePresence>
      <SelectContent
        v-bind="{ ...forwarded, position, side, align, sideOffset, positionStrategy, ...$attrs }"
        :class="
          wrapper({
            unstyled,
            class: ui?.wrapper?.class,
          })
        "
      >
        <PopoverContentMotion
          :class="
            content({
              unstyled,
              position,
              class: [ui?.content?.class, propsClass],
            })
          "
          :side="side"
        >
          <!-- without scrollbar -->
          <div v-if="scrollButton">
            <SelectScrollUpButton :class="ui?.scrollButton?.class?.('up')" />
            <SelectViewport :class="cn(position === 'popper' && 'w-full', ui?.viewport?.class)">
              <slot :class="ui?.content?.innerClass" />
            </SelectViewport>
            <SelectScrollDownButton :class="ui?.scrollButton?.class?.('down')" />
          </div>
          <!-- with scrollbar -->
          <div
            v-else
            :class="
              cn(
                'w-full max-h-46 overflow-y-auto webkit-small-scrollbar-self',
                ui?.content?.innerClass,
              )
            "
          >
            <slot />
          </div>
        </PopoverContentMotion>
      </SelectContent>
    </AnimatePresence>
  </SelectPortal>
</template>
