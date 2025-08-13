<script setup lang="ts">
import type { DropdownMenuCheckboxItemEmits, DropdownMenuCheckboxItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import { Checkbox } from '@rui/core/components/checkbox'
import { DropdownMenuCheckboxItem, useForwardPropsEmits } from 'reka-ui'
import { ref, watch } from 'vue'
import { tvItemCheckbox } from '.'

const {
  class: propsClass,
  modelValue,
  prevent = true,
  unstyled,
  ui,
  ...props
} = defineProps<
  DropdownMenuCheckboxItemProps & {
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
      checkbox?: ComponentProps<typeof Checkbox>
    }
  }
>()
const emits = defineEmits<DropdownMenuCheckboxItemEmits>()

const innerModelValue = ref(modelValue)
watch(
  () => modelValue,
  val => (innerModelValue.value = val),
  { immediate: true },
)
watch(innerModelValue, val => emits('update:modelValue', val as boolean))
// @ts-expect-error tailwind-variants have base
const { base, indicator } = tvItemCheckbox()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DropdownMenuCheckboxItem
    v-bind="forwarded"
    :class="base({ unstyled, class: [ui?.root?.class, propsClass] })"
    data-variant="checkbox"
    :model-value="innerModelValue"
    @update:model-value="(val) => (innerModelValue = val)"
    @select="
      (event) => {
        prevent && event.preventDefault()
        emits('select', event)
      }
    "
  >
    <span :class="indicator({ unstyled, class: ui?.indicator?.class })">
      <Checkbox
        v-bind="ui?.checkbox"
        v-model="innerModelValue"
        stop-propagation
      />
    </span>
    <slot />
  </DropdownMenuCheckboxItem>
</template>
