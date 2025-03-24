<script setup lang="ts">
import { cn } from '@/lib/utils';
import { Circle, Check } from 'lucide-vue-next';
import {
  RadioGroupIndicator,
  RadioGroupItem,
  type RadioGroupItemProps,
  useForwardProps,
} from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';
import {
  RadioGroupItemVariants,
  radioGroupItemVariants,
  radioGroupItemInnerVariants,
  RadioGroupItemInnerVariants,
} from '.';

const {
  wrapClass,
  innerClass,
  labelClass,
  class: propsClass,
  size = 'default',
  label,
  type = 'default',
  ...props
} = defineProps<
  RadioGroupItemProps & {
    type?: RadioGroupItemInnerVariants['type'];
    wrapClass?: HTMLAttributes['class'];
    innerClass?: HTMLAttributes['class'];
    labelClass?: HTMLAttributes['class'];
    class?: HTMLAttributes['class'];
    size?: RadioGroupItemVariants['size'];
    label?: string;
  }
>();
const forwardedProps = useForwardProps(props);

const wrapClassName = computed(() => {
  return cn(
    ['flex items-center gap-2.5'],
    wrapClass
  );
});
const radioGroupItemClassName = computed(() => {
  return cn(radioGroupItemVariants({ type, size }), propsClass);
});
const radioGroupItemInnerClassName = computed(() => {
  return cn(radioGroupItemInnerVariants({ type, size }), innerClass);
});
const labelClassName = computed(() => {
  return cn(
    [
      'text-hcc text-sm hover:text-hff',
      props.disabled && ['opacity-30', 'hover:text-hcc'],
      size === 'sm' && 'text-xs',
      size === 'lg' && 'text-base',
    ],
    labelClass
  );
});
</script>

<template>
  <div :class="wrapClassName">
    <RadioGroupItem
      v-bind="forwardedProps"
      :id="forwardedProps.id || label"
      :class="radioGroupItemClassName"
    >
      <RadioGroupIndicator :class="['flex items-center justify-center']">
        <Circle v-if="type === 'default'" :class="radioGroupItemInnerClassName" />
        <Check v-if="type === 'checkbox'" :class="radioGroupItemInnerClassName" />
      </RadioGroupIndicator>
    </RadioGroupItem>
    <slot name="label">
      <label v-if="label" :class="labelClassName" :for="forwardedProps.id || label">
        {{ label }}
      </label>
    </slot>
  </div>
</template>
