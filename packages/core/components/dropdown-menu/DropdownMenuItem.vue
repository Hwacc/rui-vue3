<script setup lang="ts">
import type { DropdownMenuItemProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { DropdownMenuItem, useForwardProps } from 'reka-ui';
import { dropdownMenuItemClass } from '.';

const { class: propsClass, ...props } = defineProps<
  DropdownMenuItemProps & { class?: HTMLAttributes['class']; inset?: boolean }
>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <DropdownMenuItem
    v-bind="forwardedProps"
    :class="cn(dropdownMenuItemClass, props.inset && 'pl-8', propsClass)"
  >
    <slot />
  </DropdownMenuItem>
</template>
