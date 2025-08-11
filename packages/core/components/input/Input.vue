<script lang="ts">
import type { InputVariants } from '.';

interface Props extends PrimitiveProps {
  defaultValue?: string | number;
  modelValue?: string | number;
  class?: HTMLAttributes['class'];
  size?: InputVariants['size'];
  placeholder?: string;
  clearable?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  ui?: {
    base?: {
      class?: HTMLAttributes['class'];
    };
    inner?: {
      class?: HTMLAttributes['class'];
    };
    clearable?: {
      class?: HTMLAttributes['class'];
    };
  };
  unstyled?: boolean;
}
</script>

<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { useVModel } from '@vueuse/core';
import { CircleX } from 'lucide-vue-next';
import { Primitive, useForwardExpose } from 'reka-ui';
import { computed, ref } from 'vue';
import { tvInput } from '.';

const {
  class: propsClass,
  size = 'base',
  clearable = false,
  unstyled,
  ui,
  disabled,
  readonly,
  ...props
} = defineProps<Props>();
const emits = defineEmits<{
  'update:modelValue': [value: string | number];
  'focus': [e: Event];
  'blur': [e: Event];
  'input': [e: Event, value: string | number | undefined];
  'change': [e: Event, value: string | number | undefined];
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
function onBlur(event: Event) {
  setTimeout(() => {
    emits('blur', event);
    if (rejectBlur.value) {
      rejectBlur.value = false;
      return;
    }
    isFocus.value = false;
  });
}
const { root, inner, clearable: tvClearable } = tvInput();
const { forwardRef } = useForwardExpose();
</script>

<template>
  <Primitive
    :class="root({ size, unstyled, class: [ui?.base?.class, propsClass] })"
    :data-state="inputState"
    v-bind="props"
  >
    <slot name="prefix" />
    <input
      :ref="
        (r: any) => {
          inputRef = r as HTMLInputElement;
          forwardRef(r);
        }
      "
      v-model="modelValue"
      :class="inner({ size, unstyled, class: [ui?.inner?.class] })"
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
      :class="tvClearable({ size, unstyled, class: ui?.clearable?.class })"
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
    <slot name="suffix" />
  </Primitive>
</template>
