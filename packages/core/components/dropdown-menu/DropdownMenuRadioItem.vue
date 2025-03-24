<script setup lang="ts">
import type { DropdownMenuRadioItemEmits, DropdownMenuRadioItemProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { Circle } from 'lucide-vue-next';
import { DropdownMenuItemIndicator, DropdownMenuRadioItem, useForwardPropsEmits } from 'reka-ui';
import { dropdownMenuRadioItemClass } from '.';

const {
  class: propsClass,
  prevent = true,
  ...props
} = defineProps<
  DropdownMenuRadioItemProps & {
    class?: HTMLAttributes['class'];
    prevent?: boolean;
  }
>();

const emits = defineEmits<DropdownMenuRadioItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <DropdownMenuRadioItem
    v-bind="forwarded"
    :class="cn(dropdownMenuRadioItemClass, propsClass)"
    @select="
      (event) => {
        prevent && event.preventDefault();
        emits('select', event);
      }
    "
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuItemIndicator>
        <Circle class="h-2 w-2 animate-in zoom-in-1 fill-rz-green stroke-rz-green" />
      </DropdownMenuItemIndicator>
    </span>
    <slot />
  </DropdownMenuRadioItem>
</template>
