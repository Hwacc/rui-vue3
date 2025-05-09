<script lang="ts">
import type { InputVariants } from './index'

interface Props extends PrimitiveProps {
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
  size?: InputVariants['size']
  innerClass?: HTMLAttributes['class']
  placeholder?: string
  clearable?: boolean
  disabled?: boolean
  readonly?: boolean
  unstyled?: boolean
}
</script>

<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { useVModel } from '@vueuse/core'
import { CircleX } from 'lucide-vue-next'
import { Primitive, useForwardExpose } from 'reka-ui'
import { computed, ref } from 'vue'
import { inputClearableVariants, inputInnerVariants, inputVariants } from '.'

const {
  class: propsClass,
  innerClass,
  size = 'base',
  clearable = false,
  unstyled,
  disabled,
  readonly,
  ...props
} = defineProps<Props>()
const emits = defineEmits<{
  'update:modelValue': [value: string | number]
  'focus': [e: Event]
  'blur': [e: Event]
  'input': [e: Event, value: string | number | undefined]
  'change': [e: Event, value: string | number | undefined]
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const isFocus = ref(false)
const inputState = computed(() => {
  if (disabled)
    return 'disabled'
  if (readonly)
    return 'readonly'
  return isFocus.value ? 'focused' : 'blur'
})
const inputRef = ref<HTMLInputElement | null>(null)
const rejectBlur = ref(false)
function onBlur(event: Event) {
  setTimeout(() => {
    emits('blur', event)
    if (rejectBlur.value) {
      rejectBlur.value = false
      return
    }
    isFocus.value = false
  })
}

const className = computed(() =>
  cn(inputVariants({ size, unstyled }), propsClass),
)
const innerClassName = computed(() =>
  cn(inputInnerVariants({ size, unstyled }), innerClass),
)
const { forwardRef } = useForwardExpose()
</script>

<template>
  <Primitive :class="className" :data-state="inputState" v-bind="props">
    <slot name="prefix" />
    <input
      :ref="
        (r: any) => {
          inputRef = r as HTMLInputElement;
          forwardRef(r);
        }
      "
      v-model="modelValue"
      :class="innerClassName"
      :placeholder="props.placeholder"
      :data-state="inputState"
      :disabled="disabled ? true : undefined"
      :readonly="readonly ? true : undefined"
      @focus="
        (event: Event) => {
          isFocus = true;
          emits('focus', event);
        }
      "
      @blur="onBlur"
      @input="(e: Event) => emits('input', e, modelValue)"
      @change="(e: Event) => emits('change', e, modelValue)"
    >
    <div
      v-if="inputState === 'focused' && clearable && modelValue"
      :class="inputClearableVariants({ size, unstyled })"
      @mousedown.stop="
        () => {
          rejectBlur = true
          inputRef?.focus()
          modelValue = ''
        }
      "
    >
      <CircleX />
    </div>
    <slot name="suffix" />
  </Primitive>
</template>
