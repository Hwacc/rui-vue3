<script setup lang="ts">
import type { DropdownMenuItemProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { DropdownMenuItem, useForwardProps } from 'reka-ui';
import { dropdownMenuItemVariants } from '.';

const {
  class: propsClass,
  disableRuiClass,
  ...props
} = defineProps<
  DropdownMenuItemProps & {
    class?: HTMLAttributes['class'];
    inset?: boolean;
    disableRuiClass?: boolean;
  }
>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <DropdownMenuItem
    v-bind="forwardedProps"
    :class="
      cn(
        dropdownMenuItemVariants({ variant: 'default', disableRuiClass }),
        props.inset && 'pl-8',
        propsClass
      )
    "
    data-variant="default"
  >
    <slot />
  </DropdownMenuItem>
</template>
