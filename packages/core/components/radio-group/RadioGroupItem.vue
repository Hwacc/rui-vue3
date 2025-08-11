<script setup lang="ts">
import type { RadioGroupItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { RadioGroupItemVariants } from '.'
import { Check, Circle } from 'lucide-vue-next'
import { RadioGroupIndicator, RadioGroupItem, useForwardProps } from 'reka-ui'
import { computed } from 'vue'
import { tvRadioGroupItem } from '.'

const {
  class: propsClass,
  size = 'base',
  label,
  variant = 'default',
  unstyled,
  ui,
  ...props
} = defineProps<
  RadioGroupItemProps & {
    variant?: RadioGroupItemVariants['variant']
    class?: HTMLAttributes['class']
    size?: RadioGroupItemVariants['size']
    label?: string
    unstyled?: boolean
    ui?: {
      root?: {
        class?: HTMLAttributes['class']
      }
      wrapper?: {
        class?: HTMLAttributes['class']
      }
      indicator?: {
        class?: HTMLAttributes['class']
      }
      inner?: {
        class?: HTMLAttributes['class']
      }
      label?: {
        class?: HTMLAttributes['class']
      }
    }
  }
>()

const tvRadioGroupItemSlots = computed(() => {
  return tvRadioGroupItem({ disabled: props.disabled, variant, size, unstyled })
})
const forwardedProps = useForwardProps(props)
</script>

<template>
  <div :class="tvRadioGroupItemSlots.wrapper({ class: [ui?.wrapper?.class, propsClass] })">
    <RadioGroupItem
      v-bind="forwardedProps"
      :id="forwardedProps.id || label"
      :class="tvRadioGroupItemSlots.root({ class: ui?.root?.class })"
      :data-variant="variant"
    >
      <RadioGroupIndicator
        :class="tvRadioGroupItemSlots.indicator({ class: ui?.indicator?.class })"
        :data-variant="variant"
      >
        <Circle
          v-if="variant === 'default'"
          :class="tvRadioGroupItemSlots.inner({ class: ui?.inner?.class })"
          :data-variant="variant"
        />
        <Check
          v-if="variant === 'checkbox'"
          :class="tvRadioGroupItemSlots.inner({ class: ui?.inner?.class })"
          :data-variant="variant"
        />
      </RadioGroupIndicator>
    </RadioGroupItem>
    <slot name="label">
      <label
        v-if="label"
        :class="tvRadioGroupItemSlots.label({ class: ui?.label?.class })"
        :for="forwardedProps.id || label"
        :disabled="props.disabled ? '' : undefined"
      >
        {{ label }}
      </label>
    </slot>
  </div>
</template>
