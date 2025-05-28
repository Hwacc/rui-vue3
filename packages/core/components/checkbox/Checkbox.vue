<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { CheckboxVariantsProps } from '.'
import { cn } from '@rui/core/lib/utils'
import { Check, Minus } from 'lucide-vue-next'
import { CheckboxIndicator, CheckboxRoot, useForwardProps } from 'reka-ui'
import { computed, getCurrentInstance, ref, watch } from 'vue'
import { checkboxLabelVariants, checkboxRootVariants, checkboxVariants } from '.'
import { injectCheckboxGroupContext } from './CheckboxGroup.vue'

const {
  primary,
  size = 'base',
  labelClass,
  label = '',
  modelValue = false,
  stopPropagation = false,
  unstyled,
  ...props
} = defineProps<
  CheckboxRootProps & {
    primary?: boolean
    labelClass?: HTMLAttributes['class']
    label?: string
    class?: HTMLAttributes['class']
    size?: CheckboxVariantsProps['size']
    stopPropagation?: boolean // 有时checkbox作为checkable-item的子组件，需要阻止事件冒泡
    unstyled?: boolean
  }
>()
const emits = defineEmits<CheckboxRootEmits>()
/**
 * create checkbox group context, if not exist it will be null
 */
const groupContext = injectCheckboxGroupContext(null)
const innerModelValue = ref(modelValue)
if (groupContext) {
  // set instances
  const instance = getCurrentInstance()
  groupContext.setCheckboxInstance(instance, primary)
  // sync innerChecked
  watch(
    groupContext.collection,
    (collection) => {
      if (!primary) {
        innerModelValue.value = collection.includes(props.name as string)
      }
    },
    { immediate: true },
  )
}
watch(
  () => modelValue,
  val => (innerModelValue.value = val),
)
watch(innerModelValue, (val) => {
  if (groupContext) {
    groupContext.onChecked(props.name, val, primary)
  }
  // console.log('emits', val)
  emits('update:modelValue', val || false)
})

defineExpose({
  name: props.name,
  primary,
  innerModelValue,
  setChecked: (value: boolean | 'indeterminate' | null) => (innerModelValue.value = value),
})

const mergeSize = computed(() => {
  return groupContext?.size?.value || size
})
const checkboxClassName = computed(() =>
  cn(
    checkboxVariants({
      size: mergeSize.value,
      disabled: props.disabled,
      unstyled: groupContext?.unstyled?.value || unstyled,
    }),
  ),
)
const forwarded = useForwardProps(props)
</script>

<template>
  <label
    :class="
      cn(
        checkboxRootVariants({
          disabled: props.disabled,
          unstyled: groupContext?.unstyled?.value || unstyled,
        }),
        props.class,
      )
    "
    :disabled="props.disabled || undefined"
    :data-size="mergeSize"
    @click="
      (event) => {
        stopPropagation && event.stopPropagation()
      }
    "
    @keydown="
      (event) => {
        if (event.key === 'Enter') {
          stopPropagation && event.stopPropagation()
          if (innerModelValue === 'indeterminate') innerModelValue = true
          innerModelValue = !innerModelValue
        }
      }
    "
  >
    <CheckboxRoot
      v-model="innerModelValue"
      v-bind="forwarded"
      :class="checkboxClassName"
      :data-size="mergeSize"
    >
      <CheckboxIndicator class="flex h-full w-full items-center justify-center text-inherit">
        <slot
          name="indicator"
          v-bind="{ modelValue: innerModelValue }"
        >
          <Check
            v-if="innerModelValue !== 'indeterminate'"
            class="size-full stroke-black stroke-[.125rem] [&_path]:animate-check-dash"
          />
          <Minus
            v-if="innerModelValue === 'indeterminate'"
            class="size-full stroke-black stroke-[.125rem] [&_path]:animate-indeterminate-dash"
          />
        </slot>
      </CheckboxIndicator>
    </CheckboxRoot>
    <slot name="label">
      <span
        v-if="label"
        :class="
          cn(
            checkboxLabelVariants({
              size: mergeSize,
              unstyled: groupContext?.unstyled?.value || unstyled,
            }),
            labelClass,
          )
        "
      >
        {{ label }}
      </span>
    </slot>
  </label>
</template>
