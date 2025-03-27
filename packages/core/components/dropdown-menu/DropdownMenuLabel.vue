<script setup lang="ts">
import type { DropdownMenuLabelProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { DropdownMenuLabel, useForwardProps } from 'reka-ui';
import { computed } from 'vue';
import { dropdownMenuLabelVariant } from '.';

const props = defineProps<
  DropdownMenuLabelProps & { class?: HTMLAttributes['class']; inset?: boolean }
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
    :class="cn(dropdownMenuLabelVariant({ inset }), props.class)"
  >
    <slot />
  </DropdownMenuLabel>
</template>
