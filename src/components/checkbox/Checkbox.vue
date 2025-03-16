<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from 'reka-ui';
import { cn } from '@/lib/utils';
import { Check, Minus } from 'lucide-vue-next';
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'reka-ui';
import { computed, getCurrentInstance, ref, watch, type HTMLAttributes } from 'vue';
import { checkboxVariants, CheckboxVariantsProps } from '.';
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
  ...props
} = defineProps<
  CheckboxRootProps & {
    primary?: boolean;
    labelClass?: HTMLAttributes['class'];
    label?: string;
    class?: HTMLAttributes['class'];
    size?: CheckboxVariantsProps['size'];
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

const checkboxRootClassName = computed(() => cn(checkboxVariants({ size })));
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <label
    :class="
      cn(
        ['flex', 'items-center', 'gap-2.5', 'cursor-pointer', 'text-hcc', 'hover:text-hff'],
        props.disabled && ['opacity-30', 'cursor-not-allowed', 'hover:text-hcc'],
        labelClass
      )
    "
  >
    <CheckboxRoot v-model="innerModelValue" v-bind="forwarded" :class="checkboxRootClassName">
      <CheckboxIndicator class="flex h-full w-full items-center justify-center text-current">
        <slot name="indicator">
          <Check
            v-if="innerModelValue !== 'indeterminate'"
            class="size-full stroke-black stroke-[.125rem] [&_path]:check-dash-animate"
          />
          <Minus
            v-if="innerModelValue === 'indeterminate'"
            class="size-full stroke-black stroke-[.125rem] [&_path]:check-indeterminate-dash-animate"
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
