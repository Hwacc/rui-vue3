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
}
</script>

<script setup lang="ts">
import { computed, ref, type HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { useVModel } from '@vueuse/core';
import { PrimitiveProps, useForwardExpose } from 'reka-ui';
import { inputInnerVariants, inputVariants, inputClearableVariants } from '.';
import { CircleX } from 'lucide-vue-next';

const {
  class: propsClass,
  innerClass,
  size = 'default',
  clearable = false,
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

const className = computed(() => cn(inputVariants({ size, focus: isFocus.value }), propsClass));
const innerClassName = computed(() =>
  cn(inputInnerVariants({ size, focus: isFocus.value }), innerClass)
);

const { forwardRef } = useForwardExpose();
</script>

<template>
  <div :class="className" :data-state="isFocus ? 'focus' : 'blur'">
    <slot name="prefix"></slot>
    <input
      :class="innerClassName"
      v-model="modelValue"
      :ref="forwardRef"
      :placeholder="props.placeholder"
      :data-state="isFocus ? 'focus' : 'blur'"
      @focus="
        (e: Event) => {
          isFocus = true;
          emits('focus', e);
        }
      "
      @blur="
        (e: Event) => {
          isFocus = false;
          emits('blur', e);
        }
      "
      @input="(e: Event) => emits('input', e, modelValue)"
      @change="(e: Event) => emits('change', e, modelValue)"
    />
    <div v-if="clearable && modelValue" class="flex-c" @click="modelValue = ''">
      <CircleX :class="inputClearableVariants({ size })" />
    </div>
    <slot name="suffix"></slot>
  </div>
</template>
