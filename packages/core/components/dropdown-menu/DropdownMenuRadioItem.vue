<script setup lang="ts">
import type { DropdownMenuRadioItemEmits, DropdownMenuRadioItemProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/core/lib/utils';
import { Circle } from 'lucide-vue-next';
import { DropdownMenuItemIndicator, DropdownMenuRadioItem, useForwardPropsEmits } from 'reka-ui';
import { dropdownMenuItemVariants } from '.';

const {
  class: propsClass,
  prevent = true,
  unstyled,
  ...props
} = defineProps<
  DropdownMenuRadioItemProps & {
    class?: HTMLAttributes['class'];
    prevent?: boolean;
    unstyled?: boolean;
  }
>();

const emits = defineEmits<DropdownMenuRadioItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <DropdownMenuRadioItem
    v-bind="forwarded"
    :class="
      cn(
        dropdownMenuItemVariants({
          variant: 'radio',
          unstyled,
        }),
        propsClass
      )
    "
    data-variant="radio"
    @select="
      (event) => {
        prevent && event.preventDefault();
        emits('select', event);
      }
    "
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuItemIndicator>
        <template #default="indicatorProps">
          <slot name="indicator" v-bind="indicatorProps">
            <Circle class="h-2 w-2 animate-in zoom-in-1" />
          </slot>
        </template>
      </DropdownMenuItemIndicator>
    </span>
    <slot />
  </DropdownMenuRadioItem>
</template>
