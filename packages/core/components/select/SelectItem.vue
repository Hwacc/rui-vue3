<script setup lang="ts">
import type { SelectItemProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-vue-next';
import {
  injectSelectRootContext,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  useForwardProps,
} from 'reka-ui';
import { selectItemVariants } from '.';
import { isFunction } from 'lodash-es';

const {
  class: propsClass,
  disableRuiClass,
  ...props
} = defineProps<SelectItemProps & { class?: HTMLAttributes['class']; disableRuiClass?: boolean }>();
const { multiple } = injectSelectRootContext();

const slots = defineSlots<{
  default: () => any;
  indicator?: () => any;
}>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <SelectItem
    v-bind="forwardedProps"
    :class="
      cn(
        selectItemVariants({
          indicator: multiple || isFunction(slots.indicator),
          disableRuiClass
        }),
        propsClass
      )
    "
  >
    <template v-if="multiple || slots.indicator">
      <span class="absolute left-2 flex items-center justify-center size-3.5">
        <SelectItemIndicator>
          <slot name="indicator">
            <Check class="size-4 animate-check-dash" />
          </slot>
        </SelectItemIndicator>
      </span>
    </template>
    <SelectItemText>
      <slot />
    </SelectItemText>
  </SelectItem>
</template>
