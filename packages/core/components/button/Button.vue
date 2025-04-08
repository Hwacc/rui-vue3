<script lang="ts">
import type {
  PrimitiveProps,
  TooltipContentProps,
  TooltipRootProps,
  TooltipArrowProps
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { TooltipContentVariants } from '@/core/components/tooltip'
import type { ButtonVariants } from '.'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant'] | string
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  disabled?: boolean
  checked?: boolean
  tooltip?: string
  tooltipTheme?: TooltipContentVariants['theme']
  tooltipRootProps?: TooltipRootProps
  tooltipContentClass?: HTMLAttributes['class']
  tooltipContentProps?: TooltipContentProps
  tooltipArrowClass?: HTMLAttributes['class']
  tooltipArrowProps?: TooltipArrowProps
  unstyled?: boolean
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/core/lib/utils'
import { Primitive, useForwardExpose } from 'reka-ui'
import { buttonVariants } from '.'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
  TooltipProvider
} from '@/core/components/tooltip'

const {
  as = 'button',
  variant = 'default',
  size,
  class: propsClass,
  disabled,
  checked = false,
  unstyled,
  tooltip,
  tooltipTheme = 'default',
  tooltipRootProps = {
    delayDuration: 0,
    disableHoverableContent: true,
    ignoreNonKeyboardFocus: true
  },
  tooltipContentClass,
  tooltipContentProps = {
    side: 'top',
    align: 'start',
    sideOffset: 6
  },
  tooltipArrowClass,
  tooltipArrowProps = {
    width: 6,
    height: 3
  }
} = defineProps<Props>()

const slots = defineSlots<{
  default?: () => any
  tooltip?: () => any
}>()

const emits = defineEmits(['click'])

const { forwardRef } = useForwardExpose()
const buttonClass = computed(() =>
  cn(
    buttonVariants({
      variant: variant as ButtonVariants['variant'],
      size,
      unstyled
    }),
    propsClass
  )
)
</script>

<template>
  <TooltipProvider v-if="tooltip || slots.tooltip">
    <Tooltip v-bind="{ ...tooltipRootProps, disabled }">
      <!-- data-state 已被Tooltip占用, 故使用data-switch-state -->
      <TooltipTrigger
        :as="as"
        :asChild="asChild"
        :class="buttonClass"
        :disabled="disabled"
        :ref="forwardRef"
        :data-variant="variant"
        :data-switch-state="
          variant === 'switch' ? (checked ? 'checked' : 'unchecked') : undefined
        "
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
          variant="svg"
          force
        />
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  <Primitive
    v-else
    :as="as"
    :as-child="asChild"
    :class="buttonClass"
    :ref="forwardRef"
    :disabled="disabled"
    :data-variant="variant"
    :data-switch-state="
      variant === 'switch' ? (checked ? 'checked' : 'unchecked') : undefined
    "
    @click="emits('click')"
  >
    <slot />
  </Primitive>
</template>
