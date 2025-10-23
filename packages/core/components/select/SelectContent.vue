<script setup lang="ts">
import type { SelectContentEmits, SelectContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import { PopoverContentMotion } from '@rui/core/components/motion/PopoverContentMotion'
import { cn, rem2px } from '@rui/core/lib/utils'
import { AnimatePresence } from 'motion-v'
import { SelectContent, SelectPortal, SelectViewport, useForwardPropsEmits } from 'reka-ui'
import { watch } from 'vue'
import { SelectScrollDownButton, SelectScrollUpButton, tvContent } from '.'
import { injectMenuTransferContext } from '../menu-transfer'

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
const { rootElement, positionStrategy: rootPositionStrategy } = injectMenuTransferContext()
rootPositionStrategy.value = props.positionStrategy ?? 'fixed'
watch(
  () => props.positionStrategy,
  () => {
    rootPositionStrategy.value = props.positionStrategy ?? 'fixed'
  },
)

const { wrapper, content } = tvContent()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <SelectPortal
    :to="props.positionStrategy === 'absolute' ? rootElement : undefined"
    v-bind="ui?.portal?.props"
  >
    <SelectContent
      v-bind="{ ...forwarded, position, side, align, sideOffset, positionStrategy, ...$attrs }"
      :class="
        wrapper({
          unstyled,
          class: ui?.wrapper?.class,
        })
      "
    >
      <div
        :class="
          content({
            unstyled,
            position,
            class: [ui?.content?.class, propsClass],
          })
        "
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
      </div>
    </SelectContent>
  </SelectPortal>
</template>
