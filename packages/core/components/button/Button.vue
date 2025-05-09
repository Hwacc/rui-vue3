<script lang="ts">
import type { TooltipContentVariants } from '@rui/core/components/tooltip'
import type {
  PrimitiveProps,
  TooltipArrowProps,
  TooltipContentProps,
  TooltipRootProps,
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ButtonVariants } from '.'
import { useRipple } from '@rui/core/hooks/useRipple'
</script>

<script setup lang="ts">
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@rui/core/components/tooltip'
import { cn, getNodeCssVar } from '@rui/core/lib/utils'
import { Primitive, useForwardExpose } from 'reka-ui'
import { computed } from 'vue'
import { buttonVariants } from '.'

interface ButtonProps extends PrimitiveProps {
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
  ripple?: boolean
}

const {
  as = 'button',
  variant = 'default',
  size,
  class: propsClass,
  disabled,
  checked = false,
  unstyled,
  ripple = false,
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
    height: 3,
  },
} = defineProps<ButtonProps>()

const emits = defineEmits<{
  click: [event: MouseEvent]
}>()
const slots = defineSlots<{
  default?: () => any
  tooltip?: () => any
}>()
const { forwardRef, currentElement } = useForwardExpose()

const rippleColor = computed(() => {
  return getNodeCssVar(
    currentElement.value,
    '--rui-ripple-color',
    'transparent',
  )
})
const {
  onRipple,
  referenceRef: rippleReferenceRef,
  Ripple,
} = useRipple({
  color: rippleColor,
})

function onClick(event: MouseEvent) {
  onRipple(event)
  emits('click', event)
}

const buttonClass = computed(() =>
  cn(
    buttonVariants({
      variant: variant as ButtonVariants['variant'],
      size,
      unstyled,
    }),
    propsClass,
  ),
)
</script>

<template>
  <TooltipProvider v-if="tooltip || slots.tooltip">
    <Tooltip v-bind="{ ...tooltipRootProps, disabled }">
      <!-- data-state 已被Tooltip占用, 故使用data-switch-state -->
      <TooltipTrigger
        :ref="
          (r) => {
            forwardRef(r)
            rippleReferenceRef = r
          }
        "
        :as="as"
        :as-child="asChild"
        :class="buttonClass"
        :disabled="disabled"
        :data-variant="variant"
        :data-ripple="ripple ? true : undefined"
        :data-switch-state="
          variant === 'switch' ? (checked ? 'checked' : 'unchecked') : undefined
        "
        :data-size="size"
        @click="onClick"
      >
        <slot />
        <Ripple v-if="ripple" />
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
          variant="css"
          force
        />
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  <Primitive
    v-else
    :ref="
      (r) => {
        forwardRef(r)
        rippleReferenceRef = r
      }
    "
    :as="as"
    :as-child="asChild"
    :class="buttonClass"
    :disabled="disabled"
    :data-variant="variant"
    :data-ripple="ripple ? true : undefined"
    :data-switch-state="
      variant === 'switch' ? (checked ? 'checked' : 'unchecked') : undefined
    "
    :data-size="size"
    @click="onClick"
  >
    <slot />
    <Ripple v-if="ripple" />
  </Primitive>
</template>
