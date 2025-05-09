<script setup lang="ts">
import type { RadioGroupItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { RadioGroupItemInnerVariants, RadioGroupItemVariants } from '.'
import { cn } from '@rui/core/lib/utils'
import { Check, Circle } from 'lucide-vue-next'
import { RadioGroupIndicator, RadioGroupItem, useForwardProps } from 'reka-ui'
import { computed } from 'vue'
import { radioGroupItemInnerVariants, radioGroupItemVariants } from '.'

const {
  wrapClass,
  innerClass,
  labelClass,
  class: propsClass,
  size = 'base',
  label,
  variant = 'default',
  unstyled,
  ...props
} = defineProps<
  RadioGroupItemProps & {
    variant?: RadioGroupItemInnerVariants['variant']
    wrapClass?: HTMLAttributes['class']
    innerClass?: HTMLAttributes['class']
    labelClass?: HTMLAttributes['class']
    class?: HTMLAttributes['class']
    size?: RadioGroupItemVariants['size']
    label?: string
    unstyled?: RadioGroupItemInnerVariants['unstyled']
  }
>()
const forwardedProps = useForwardProps(props)

const wrapClassName = computed(() => {
  return cn(['flex items-center gap-2.5'], wrapClass)
})
const radioGroupItemClassName = computed(() => {
  return cn(radioGroupItemVariants({ size, unstyled }), propsClass)
})
const radioGroupItemInnerClassName = computed(() => {
  return cn(
    radioGroupItemInnerVariants({ variant, size, unstyled }),
    innerClass,
  )
})
const labelClassName = computed(() => {
  return cn(
    [
      'text-hcc text-sm hover:text-hff',
      props.disabled && ['opacity-(--disabled-opacity)', 'hover:text-hcc'],
      size === 'sm' && 'text-xs',
      size === 'lg' && 'text-base',
    ],
    labelClass,
  )
})
</script>

<template>
  <div :class="wrapClassName">
    <RadioGroupItem
      v-bind="forwardedProps"
      :id="forwardedProps.id || label"
      :class="radioGroupItemClassName"
      :data-variant="variant"
    >
      <RadioGroupIndicator
        class="flex items-center justify-center"
        :data-variant="variant"
      >
        <Circle
          v-if="variant === 'default'"
          :class="radioGroupItemInnerClassName"
          :data-variant="variant"
        />
        <Check
          v-if="variant === 'checkbox'"
          :class="radioGroupItemInnerClassName"
          :data-variant="variant"
        />
      </RadioGroupIndicator>
    </RadioGroupItem>
    <slot name="label">
      <label
        v-if="label"
        :class="labelClassName"
        :for="forwardedProps.id || label"
      >
        {{ label }}
      </label>
    </slot>
  </div>
</template>
