<script setup lang="ts">
import type { DropdownMenuContentEmits, DropdownMenuContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import { DropdownMenuContent, DropdownMenuPortal, useForwardPropsEmits } from 'reka-ui'
import { watch } from 'vue'
import { tvContent } from '.'
import { injectMenuTransferContext } from '../menu-transfer'

const {
  class: propsClass,
  side = 'bottom',
  align = 'start',
  unstyled,
  ui,
  ...props
} = defineProps<
  DropdownMenuContentProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
    ui?: {
      portal?: ComponentProps<typeof DropdownMenuPortal> & {
        class?: HTMLAttributes['class']
      }
      content?: {
        class?: HTMLAttributes['class']
      }
    }
  }
>()

const emits = defineEmits<DropdownMenuContentEmits>()

const { rootElement, positionStrategy: rootPositionStrategy } = injectMenuTransferContext()
rootPositionStrategy.value = props.positionStrategy ?? 'fixed'
watch(
  () => props.positionStrategy,
  () => {
    rootPositionStrategy.value = props.positionStrategy ?? 'fixed'
  },
)

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
  <DropdownMenuPortal
    v-bind="ui?.portal"
    :to="props.positionStrategy === 'absolute' ? rootElement : undefined"
  >
    <DropdownMenuContent
      v-bind="forwarded"
      :class="
        tvContent({
          unstyled,
          class: [ui?.content?.class, propsClass],
        })
      "
    >
      <slot />
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>
