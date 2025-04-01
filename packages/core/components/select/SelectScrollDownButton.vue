<script setup lang="ts">
import type { SelectScrollDownButtonProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/core/lib/utils';
import { ChevronDown } from 'lucide-vue-next';
import { SelectScrollDownButton, useForwardProps } from 'reka-ui';
import { selectScrollButtonVariants } from '.';

const {
  class: propsClass,
  disableRuiClass,
  ...props
} = defineProps<
  SelectScrollDownButtonProps & { class?: HTMLAttributes['class']; disableRuiClass?: boolean }
>();
const forwardedProps = useForwardProps(props);
</script>

<template>
  <SelectScrollDownButton
    v-bind="forwardedProps"
    :class="cn(selectScrollButtonVariants({ dir: 'down', disableRuiClass }), propsClass)"
    data-direction="down"
  >
    <slot>
      <ChevronDown class="size-4" />
    </slot>
  </SelectScrollDownButton>
</template>
