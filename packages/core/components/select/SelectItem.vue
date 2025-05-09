<script setup lang="ts">
import type { SelectItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { isFunction } from 'lodash-es'
import { Check } from 'lucide-vue-next'
import {
  injectSelectRootContext,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  useForwardProps,
} from 'reka-ui'
import { selectItemVariants } from '.'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<SelectItemProps & { class?: HTMLAttributes['class'], unstyled?: boolean }>()
const slots = defineSlots<{
  default: () => any
  indicator?: () => any
}>()

const { multiple } = injectSelectRootContext()

const forwardedProps = useForwardProps(props)
</script>

<template>
  <SelectItem
    v-bind="forwardedProps"
    :class="
      cn(
        selectItemVariants({
          indicator: multiple || isFunction(slots.indicator),
          unstyled,
        }),
        propsClass,
      )
    "
  >
    <template v-if="multiple || slots.indicator">
      <span class="absolute left-2 flex items-center justify-center size-3.5">
        <SelectItemIndicator>
          <slot name="indicator">
            <Check class="size-4 animate-check-dash" />
          </slot>
        </SelectItemIndicator>
      </span>
    </template>
    <SelectItemText>
      <slot />
    </SelectItemText>
  </SelectItem>
</template>
