<script setup lang="ts">
import type { SelectScrollUpButtonProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { ChevronUp } from 'lucide-vue-next';
import { SelectScrollUpButton, useForwardProps } from 'reka-ui';

const { class: propsClass, ...props } = defineProps<
  SelectScrollUpButtonProps & { class?: HTMLAttributes['class'] }
>();
const forwardedProps = useForwardProps(props);
</script>

<template>
  <SelectScrollUpButton
    v-bind="forwardedProps"
    :class="cn('flex cursor-default items-center justify-center py-1', propsClass)"
  >
    <slot>
      <ChevronUp class="size-4" />
    </slot>
  </SelectScrollUpButton>
</template>
