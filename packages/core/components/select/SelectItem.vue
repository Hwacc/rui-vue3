<script setup lang="ts">
import type { SelectItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { isFunction } from 'lodash-es'
import { Check } from 'lucide-vue-next'
import {
  injectSelectRootContext,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  useForwardProps,
} from 'reka-ui'
import { tvItem } from '.'

const {
  class: propsClass,
  unstyled,
  ui,
  ...props
} = defineProps<
  SelectItemProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
    ui?: {
      root?: {
        class?: HTMLAttributes['class']
      }
      indicator?: {
        class?: HTMLAttributes['class']
      }
      text?: {
        class?: HTMLAttributes['class']
      }
    }
  }
>()

const slots = defineSlots<{
  default: () => any
  indicator?: () => any
}>()

const { multiple } = injectSelectRootContext()

const { base, indicator, text } = tvItem()
const forwardedProps = useForwardProps(props)
</script>

<template>
  <SelectItem
    v-bind="forwardedProps"
    :class="
      base({
        unstyled,
        multiply: multiple || isFunction(slots.indicator),
        class: [ui?.root?.class, propsClass],
      })
    "
  >
    <template v-if="multiple || slots.indicator">
      <SelectItemIndicator :class="indicator({ unstyled, class: ui?.indicator?.class })">
        <slot name="indicator">
          <Check class="size-4 animate-check-dash" />
        </slot>
      </SelectItemIndicator>
    </template>
    <SelectItemText :class="text({ unstyled, class: ui?.text?.class })">
      <slot />
    </SelectItemText>
  </SelectItem>
</template>
