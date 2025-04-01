<script lang="ts">
import type {
  PrimitiveProps,
  TooltipContentProps,
  TooltipRootProps,
  TooltipArrowProps,
  TooltipProviderProps,
} from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import type { TooltipContentVariants } from '../tooltip';
import type { ButtonVariants } from '.';

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant'];
  size?: ButtonVariants['size'];
  class?: HTMLAttributes['class'];
  disabled?: boolean;
  limitWidth?: boolean;
  checked?: boolean;
  tooltip?: string;
  tooltipTheme?: TooltipContentVariants['theme'];
  tooltipProviderProps?: TooltipProviderProps;
  tooltipRootProps?: TooltipRootProps;
  tooltipContentClass?: HTMLAttributes['class'];
  tooltipContentProps?: TooltipContentProps;
  tooltipArrowClass?: HTMLAttributes['class'];
  tooltipArrowProps?: TooltipArrowProps;
  disableRuiClass?: boolean;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/core/lib/utils';
import { Primitive } from 'reka-ui';
import { buttonVariants } from '.';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipArrow } from '../tooltip';

const {
  as = 'button',
  variant = 'default',
  size,
  class: propsClass,
  disabled,
  limitWidth = true,
  checked = false,
  disableRuiClass,
  tooltip,
  tooltipTheme = 'default',
  tooltipRootProps = {
    delayDuration: 0,
    disableHoverableContent: true,
    ignoreNonKeyboardFocus: true,
  },
  tooltipContentClass,
  tooltipContentProps = {
    side: 'top',
    align: 'start',
    sideOffset: 6,
  },
  tooltipArrowClass,
  tooltipArrowProps = {
    width: 6,
    height: 6,
  },
} = defineProps<Props>();

const slots = defineSlots<{
  default?: () => any;
  tooltip?: () => any;
}>();

const emits = defineEmits(['click']);

const buttonClass = computed(() =>
  cn(
    buttonVariants({
      variant,
      size,
      limitWidth: variant === 'icon' ? false : limitWidth,
      disableRuiClass,
    }),
    propsClass
  )
);
</script>

<template>
  <Tooltip v-if="tooltip || slots.tooltip" v-bind="{ ...tooltipRootProps, disabled }">
    <!-- data-state 已被Tooltip占用, 故使用data-switch-state -->
    <TooltipTrigger
      :as="as"
      :asChild="asChild"
      :class="buttonClass"
      :disabled="disabled"
      :data-variant="variant"
      :data-switch-state="variant === 'switch' ? (checked ? 'checked' : 'unchecked') : undefined"
      @click="emits('click')"
    >
      <slot />
    </TooltipTrigger>
    <TooltipContent
      v-bind="tooltipContentProps"
      :class="tooltipContentClass"
      :theme="tooltipTheme"
      :data-theme="tooltipTheme"
    >
      <slot name="tooltip">
        {{ tooltip }}
      </slot>
      <TooltipArrow
        :class="tooltipArrowClass"
        :theme="tooltipTheme"
        v-bind="tooltipArrowProps"
        force
      />
    </TooltipContent>
  </Tooltip>
  <Primitive
    v-else
    :as="as"
    :as-child="asChild"
    :class="buttonClass"
    :disabled="disabled"
    :data-variant="variant"
    :data-switch-state="variant === 'switch' ? (checked ? 'checked' : 'unchecked') : undefined"
    @click="emits('click')"
  >
    <slot />
  </Primitive>
</template>
