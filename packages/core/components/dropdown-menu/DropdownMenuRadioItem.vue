<script setup lang="ts">
import type { DropdownMenuRadioItemEmits, DropdownMenuRadioItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Circle } from 'lucide-vue-next'
import { DropdownMenuItemIndicator, DropdownMenuRadioItem, useForwardPropsEmits } from 'reka-ui'
import { tvItemRadio } from '.'

const {
  class: propsClass,
  prevent = true,
  unstyled,
  ui,
  ...props
} = defineProps<
  DropdownMenuRadioItemProps & {
    class?: HTMLAttributes['class']
    prevent?: boolean
    unstyled?: boolean
    ui?: {
      root?: {
        class?: HTMLAttributes['class']
      }
      indicator?: {
        class?: HTMLAttributes['class']
      }
    }
  }
>()

const emits = defineEmits<DropdownMenuRadioItemEmits>()
// @ts-expect-error tailwind-variants have base
const { base, indicator } = tvItemRadio()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DropdownMenuRadioItem
    v-bind="forwarded"
    :class="
      base({
        unstyled,
        class: [ui?.root?.class, propsClass],
      })
    "
    data-variant="radio"
    @select="
      (event) => {
        prevent && event.preventDefault()
        emits('select', event)
      }
    "
  >
    <DropdownMenuItemIndicator :class="indicator({ unstyled, class: ui?.indicator?.class })">
      <template #default="indicatorProps">
        <slot
          name="indicator"
          v-bind="indicatorProps"
        >
          <Circle class="h-2 w-2 motion-scale-in-0" />
        </slot>
      </template>
    </DropdownMenuItemIndicator>
    <slot />
  </DropdownMenuRadioItem>
</template>
