<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from 'radix-vue';
import { cn } from '@/lib/utils';
import { Check, Minus } from 'lucide-vue-next';
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'radix-vue';
import { computed, getCurrentInstance, ref, watch, watchEffect, type HTMLAttributes } from 'vue';
import { checkboxVariants, CheckboxVariantsProps } from '.';
import { injectCheckboxGroupContext } from './CheckboxGroup.vue';
import { injectCheckboxGroupRootContext } from './CheckboxGroupRoot.vue';

/**
 * creat checkbox group root context, if not exist it will be null
 */
const groupRootContext = injectCheckboxGroupRootContext(null);
/**
 * create checkbox group context, if not exist it will be null
 */
const groupContext = injectCheckboxGroupContext(null);
const {
  primary,
  size = 'default',
  labelClass,
  label = '',
  checked: propsChecked = false,
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
const emits = defineEmits<
  CheckboxRootEmits & { 'update:indeterminate': [value: boolean | 'indeterminate'] }
>();
const forwarded = useForwardPropsEmits(props, emits);

const innerChecked = ref(propsChecked);
if (groupContext) {
  // set instances
  const instance = getCurrentInstance();
  groupContext.setCheckboxInstance(instance, primary);
  // sync innerChecked
  watchEffect(() => {
    const _intermediateCollection = groupContext.indeterminateCollection.value;
    if (_intermediateCollection?.includes(props.name as string)) {
      innerChecked.value = 'indeterminate';
      return;
    }
    if(!primary) {
      innerChecked.value = groupContext.collection.value.includes(props.name as string);
    }
  });
}
watch(
  () => propsChecked,
  (value) => {
    innerChecked.value = value;
  }
);
watch(innerChecked, (value) => {
  if (groupContext) {
    groupContext.onChecked(props.name, value, primary);
  }
  if (!groupContext && groupRootContext) {
    groupRootContext.onCheckboxChecked(props.name, value, primary);
  }
  value === 'indeterminate' ? emits('update:indeterminate', value) : emits('update:checked', value);
});

const checkboxRootClassName = computed(() => cn(checkboxVariants({ size })));

defineExpose({
  name: props.name,
  primary,
  innerChecked,
  setChecked: (value: boolean | 'indeterminate') => (innerChecked.value = value),
});
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
    <CheckboxRoot v-model:checked="innerChecked" v-bind="forwarded" :class="checkboxRootClassName">
      <CheckboxIndicator class="flex h-full w-full items-center justify-center text-current">
        <slot name="indicator">
          <Check
            v-if="innerChecked !== 'indeterminate'"
            class="size-full stroke-black stroke-[.125rem] [&_path]:check-dash-animate"
          />
          <Minus
            v-if="innerChecked === 'indeterminate'"
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
