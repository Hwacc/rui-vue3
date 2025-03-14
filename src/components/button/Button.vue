<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { Primitive, TooltipContentProps, TooltipRootProps, type PrimitiveProps } from 'radix-vue';
import { type ButtonVariants, buttonVariants } from '.';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
  type TooltipContentVariants,
} from '../tooltip';

interface Props extends PrimitiveProps {
  type?: ButtonVariants['type'];
  size?: ButtonVariants['size'];
  class?: HTMLAttributes['class'];
  disabled?: boolean;
  limitWidth?: boolean;
  checked?: boolean;
  tooltip?: string;
  tooltipTheme?: TooltipContentVariants['theme'];
  tooltipRootProps?: TooltipRootProps;
  tooltipContentClass?: HTMLAttributes['class'];
  tooltipContentProps?: TooltipContentProps;
  tooltipArrowClass?: HTMLAttributes['class'];
}

const {
  as = 'button',
  type = 'default',
  size,
  class: propsClass,
  disabled,
  limitWidth = true,
  checked = false,
  tooltip,
  tooltipTheme = 'default',
  tooltipRootProps = {
    delayDuration: 0,
  },
  tooltipContentClass,
  tooltipContentProps = {
    side: 'top',
    align: 'start',
    sideOffset: 6,
  },
  tooltipArrowClass,
} = defineProps<Props>();

const slots = defineSlots<{
  default?: () => any;
  tooltip?: () => any;
}>();

const emits = defineEmits(['click']);

const buttonClass = computed(() =>
  cn(
    buttonVariants({
      type,
      size,
      limitWidth: type === 'icon' ? false : limitWidth,
      checked,
    }),
    propsClass
  )
);
</script>

<template>
  <Tooltip v-if="tooltip || slots.tooltip" v-bind="{ ...tooltipRootProps, disabled }">
    <TooltipTrigger
      :as="as"
      :asChild="asChild"
      :class="buttonClass"
      :disabled="disabled"
      :checked="checked"
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
      <TooltipArrow :class="tooltipArrowClass" :width="7" :height="3" force :theme="tooltipTheme" />
    </TooltipContent>
  </Tooltip>
  <Primitive
    v-else
    :as="as"
    :as-child="asChild"
    :class="buttonClass"
    :disabled="disabled"
    :checked="checked"
    @click="emits('click')"
  >
    <slot />
  </Primitive>
</template>
