<script setup lang="ts">
import type { DropdownMenuLabelProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/core/lib/utils';
import { DropdownMenuLabel, useForwardProps } from 'reka-ui';
import { computed } from 'vue';
import { dropdownMenuLabelVariants } from '.';

const props = defineProps<
  DropdownMenuLabelProps & {
    class?: HTMLAttributes['class'];
    inset?: boolean;
    disableRuiClass?: boolean;
  }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <DropdownMenuLabel
    v-bind="forwardedProps"
    :class="
      cn(dropdownMenuLabelVariants({ inset, disableRuiClass: props.disableRuiClass }), props.class)
    "
  >
    <slot />
  </DropdownMenuLabel>
</template>
