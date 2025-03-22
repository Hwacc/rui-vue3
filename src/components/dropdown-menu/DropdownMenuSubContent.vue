<script setup lang="ts">
import type { DropdownMenuSubContentEmits, DropdownMenuSubContentProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn, timexSpace } from '@/lib/utils';
import { DropdownMenuSubContent, useForwardPropsEmits } from 'reka-ui';
import { dropdownMenuSubContentClass } from '.';

const {
  class: propsClass,
  sideOffset = timexSpace(2),
  ...props
} = defineProps<DropdownMenuSubContentProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<DropdownMenuSubContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <DropdownMenuSubContent
    v-bind="forwarded"
    :side-offset="sideOffset"
    :class="cn(dropdownMenuSubContentClass, propsClass)"
  >
    <slot />
  </DropdownMenuSubContent>
</template>
