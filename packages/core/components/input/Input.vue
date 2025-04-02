<script lang="ts">
import type { InputVariants } from './index';
interface Props extends PrimitiveProps {
  defaultValue?: string | number;
  modelValue?: string | number;
  class?: HTMLAttributes['class'];
  size?: InputVariants['size'];
  innerClass?: HTMLAttributes['class'];
  placeholder?: string;
  clearable?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  disableRuiClass?: boolean;
}
</script>

<script setup lang="ts">
import { computed, ref, type HTMLAttributes } from 'vue';
import { cn } from '@/core/lib/utils';
import { useVModel } from '@vueuse/core';
import { PrimitiveProps, useForwardExpose } from 'reka-ui';
import { inputInnerVariants, inputVariants, inputClearableVariants } from '.';
import { CircleX } from 'lucide-vue-next';

const {
  class: propsClass,
  innerClass,
  size = 'base',
  clearable = false,
  disableRuiClass,
  disabled,
  readonly,
  ...props
} = defineProps<Props>();
const emits = defineEmits<{
  'update:modelValue': [value: string | number];
  focus: [e: Event];
  blur: [e: Event];
  input: [e: Event, value: string | number | undefined];
  change: [e: Event, value: string | number | undefined];
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
});

const isFocus = ref(false);
const inputState = computed(() => {
  if (disabled) return 'disabled';
  if (readonly) return 'readonly';
  return isFocus.value ? 'focused' : 'blur';
});
const inputRef = ref<HTMLInputElement | null>(null);
const rejectBlur = ref(false);
const onBlur = (event: Event) => {
  setTimeout(() => {
    emits('blur', event);
    if (rejectBlur.value) {
      rejectBlur.value = false;
      return;
    }
    isFocus.value = false;
  });
};

const className = computed(() => cn(inputVariants({ size, disableRuiClass }), propsClass));
const innerClassName = computed(() =>
  cn(inputInnerVariants({ size, disableRuiClass }), innerClass)
);
const { forwardRef } = useForwardExpose();
</script>

<template>
  <div :class="className" :data-state="inputState">
    <slot name="prefix"></slot>
    <input
      :class="innerClassName"
      v-model="modelValue"
      :ref="
        (r: any) => {
          inputRef = r as HTMLInputElement;
          forwardRef(r);
        }
      "
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
    />
    <div
      v-if="inputState === 'focused' && clearable && modelValue"
      :class="inputClearableVariants({ size, disableRuiClass })"
      @mousedown.stop="
        () => {
          rejectBlur = true;
          inputRef?.focus();
          modelValue = '';
        }
      "
    >
      <CircleX />
    </div>
    <slot name="suffix"></slot>
  </div>
</template>
