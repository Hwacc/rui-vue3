<script setup lang="ts">
import type { DropdownMenuCheckboxItemEmits, DropdownMenuCheckboxItemProps } from 'reka-ui';
import { ref, watch, type HTMLAttributes } from 'vue';
import { cn } from '@/core/lib/utils';
import { DropdownMenuCheckboxItem, useForwardPropsEmits } from 'reka-ui';
import { dropdownMenuItemVariants } from '.';
import { Checkbox } from '@/core/components/checkbox';

const {
  class: propsClass,
  modelValue,
  prevent = true,
  unstyled,
  ...props
} = defineProps<
  DropdownMenuCheckboxItemProps & {
    class?: HTMLAttributes['class'];
    prevent?: boolean;
    unstyled?: boolean;
  }
>();
const emits = defineEmits<DropdownMenuCheckboxItemEmits>();

const innerModelValue = ref(modelValue);
watch(
  () => modelValue,
  (val) => (innerModelValue.value = val),
  { immediate: true }
);
watch(innerModelValue, (val) => emits('update:modelValue', val as boolean));

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <DropdownMenuCheckboxItem
    v-bind="forwarded"
    :class="
      cn(
        dropdownMenuItemVariants({
          variant: 'checkbox',
          unstyled,
        }),
        propsClass
      )
    "
    data-variant="checkbox"
    :model-value="innerModelValue"
    @update:model-value="(val) => (innerModelValue = val)"
    @select="
      (event) => {
        prevent && event.preventDefault();
        emits('select', event);
      }
    "
  >
    <span class="absolute left-2 flex size-3.5 items-center justify-center">
      <Checkbox v-model="innerModelValue" stop-propagation />
    </span>
    <slot />
  </DropdownMenuCheckboxItem>
</template>
