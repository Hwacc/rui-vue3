<script setup lang="ts">
import type { SelectContentEmits, SelectContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import { cn, rem2px } from '@rui/core/lib/utils'
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

const { base, inner } = tvContent()
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
        base({
          unstyled,
          position,
          class: [ui?.content?.class, propsClass],
        })
      "
      :data-position="position"
    >
      <!-- without scrollbar -->
      <div v-if="scrollButton">
        <SelectScrollUpButton :class="ui?.scrollButton?.class?.('up')" />
        <SelectViewport :class="cn(position === 'popper' && 'w-full', ui?.viewport?.class)">
          <slot :class="inner({ unstyled, class: ui?.content?.innerClass })" />
        </SelectViewport>
        <SelectScrollDownButton :class="ui?.scrollButton?.class?.('down')" />
      </div>
      <!-- with scrollbar -->
      <div
        v-else
        :class="inner({ unstyled, class: ui?.content?.innerClass })"
      >
        <slot />
      </div>
    </SelectContent>
  </SelectPortal>
</template>
