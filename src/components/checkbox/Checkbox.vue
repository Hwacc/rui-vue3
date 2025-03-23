<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from 'reka-ui';
import { cn } from '@/lib/utils';
import { Check, Minus } from 'lucide-vue-next';
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'reka-ui';
import { computed, getCurrentInstance, ref, watch, type HTMLAttributes } from 'vue';
import { checkboxVariants, CheckboxVariantsProps, checkboxLabelVariants } from '.';
import { injectCheckboxGroupContext } from './CheckboxGroup.vue';

/**
 * create checkbox group context, if not exist it will be null
 */
const groupContext = injectCheckboxGroupContext(null);
const {
  primary,
  size = 'default',
  labelClass,
  label = '',
  modelValue = false,
  stopPropagation = false,
  ...props
} = defineProps<
  CheckboxRootProps & {
    primary?: boolean;
    labelClass?: HTMLAttributes['class'];
    label?: string;
    class?: HTMLAttributes['class'];
    size?: CheckboxVariantsProps['size'];
    stopPropagation?: boolean; // 有时checkbox作为checkable-item的子组件，需要阻止事件冒泡
  }
>();
const emits = defineEmits<CheckboxRootEmits>();

const innerModelValue = ref(modelValue);
if (groupContext) {
  // set instances
  const instance = getCurrentInstance();
  groupContext.setCheckboxInstance(instance, primary);
  // sync innerChecked
  watch(
    groupContext.collection,
    (collection) => {
      if (!primary) {
        innerModelValue.value = collection.includes(props.name as string);
      }
    },
    { immediate: true }
  );
}
watch(
  () => modelValue,
  (val) => (innerModelValue.value = val)
);
watch(innerModelValue, (val) => {
  if (groupContext) {
    groupContext.onChecked(props.name, val, primary);
  }
  emits('update:modelValue', val || false);
});

defineExpose({
  name: props.name,
  primary,
  innerModelValue,
  setChecked: (value: boolean | 'indeterminate' | null) => (innerModelValue.value = value),
});

const labelClassName = computed(() =>
  cn(checkboxLabelVariants({ disabled: props.disabled }), labelClass)
);
const checkboxRootClassName = computed(() => cn(checkboxVariants({ size })));
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <label
    :class="labelClassName"
    @click="
      (event) => {
        stopPropagation && event.stopPropagation();
      }
    "
  >
    <CheckboxRoot v-model="innerModelValue" v-bind="forwarded" :class="checkboxRootClassName">
      <CheckboxIndicator class="flex h-full w-full items-center justify-center text-current">
        <slot name="indicator">
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
        :class="cn(['text-sm'], [size === 'sm' && 'text-xs', size === 'lg' && 'text-base'])"
      >
        {{ label }}
      </span>
    </slot>
  </label>
</template>
