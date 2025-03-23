<script setup lang="ts">
import type { SelectItemProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-vue-next';
import { SelectItem, SelectItemIndicator, SelectItemText, useForwardProps } from 'reka-ui';
import { selectItemClass } from '.';

const { class: propsClass, ...props } = defineProps<
  SelectItemProps & { class?: HTMLAttributes['class'] }
>();
const slots = defineSlots<{
  default: () => any;
  indicator?: () => any;
}>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <SelectItem v-bind="forwardedProps" :class="cn(selectItemClass, propsClass)">
    <template v-if="slots.indicator">
      <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectItemIndicator>
          <slot name="indicator">
            <Check class="size-4" />
          </slot>
        </SelectItemIndicator>
      </span>
    </template>
    <SelectItemText>
      <slot />
    </SelectItemText>
  </SelectItem>
</template>
