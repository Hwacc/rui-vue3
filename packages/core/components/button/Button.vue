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
import { merge } from 'lodash-es'
import { LoaderCircle } from 'lucide-vue-next'

export interface ButtonProps extends PrimitiveProps {
  variant?: ButtonVariants['variant'] | string
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  disabled?: boolean
  checked?: boolean
  tooltip?: string
  unstyled?: boolean
  ripple?: boolean
  loading?: boolean
  ui?: {
    root?: {
      class?: HTMLAttributes['class']
    }
    loading?: {
      class?: HTMLAttributes['class']
    }
    tooltip?: {
      theme?: TooltipContentVariants['theme']
      root?: {
        class?: HTMLAttributes['class']
        props?: TooltipRootProps
      }
      content?: {
        class?: HTMLAttributes['class']
        props?: TooltipContentProps
      }
      arrow?: {
        class?: HTMLAttributes['class']
        props?: TooltipArrowProps
      }
    }
  }
}
</script>

<script setup lang="ts">
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@rui/core/components/tooltip'
import { useRipple } from '@rui/core/composables/useRipple'
import { getNodeCssVar } from '@rui/core/lib/utils'
import { Primitive, useForwardExpose } from 'reka-ui'
import { computed } from 'vue'
import { tvButton } from '.'

const {
  as = 'button',
  variant = 'default',
  size = 'base',
  class: propsClass,
  disabled,
  checked = false,
  unstyled,
  ripple = false,
  loading = false,
  tooltip,
  ui,
} = defineProps<ButtonProps>()

const emits = defineEmits<{
  click: [event: MouseEvent]
}>()
const slots = defineSlots<{
  default?: () => any
  tooltip?: () => any
  loading?: () => any
}>()
const { forwardRef, currentElement } = useForwardExpose()

const rippleColor = computed(() => {
  return getNodeCssVar(currentElement.value, '--rui-ripple-color', 'transparent')
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

const mergedUI = computed(() => {
  return merge(
    {
      tooltip: {
        theme: 'default',
        root: {
          props: {
            delayDuration: 0,
            disableHoverableContent: true,
            ignoreNonKeyboardFocus: true,
          },
        },
        content: {
          props: {
            side: 'top',
            align: 'start',
            sideOffset: 6,
          },
        },
        arrow: {
          props: {
            width: 6,
            height: 3,
          },
        },
      },
    },
    ui,
  )
})
const { base, loading: tvLoading } = tvButton()

console.log(
  'loading class',
  tvLoading({
    variant: variant as ButtonVariants['variant'],
    size,
    unstyled,
    class: [ui?.loading?.class],
  }),
)
</script>

<template>
  <TooltipProvider v-if="tooltip || slots.tooltip">
    <Tooltip v-bind="{ ...mergedUI.tooltip.root.props, disabled }">
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
        :class="base({
          variant: variant as ButtonVariants['variant'],
          size,
          unstyled,
          loading,
          class: [ui?.root?.class, propsClass],
        })"
        :disabled="disabled"
        :data-variant="variant"
        :data-ripple="ripple ? true : undefined"
        :data-loading="loading ? true : undefined"
        :data-switch-state="variant === 'switch' ? (checked ? 'checked' : 'unchecked') : undefined"
        :data-size="size"
        @click="onClick"
      >
        <slot
          v-if="loading"
          name="loading"
        >
          <LoaderCircle
            :class="tvLoading({ variant: variant as ButtonVariants['variant'], size, unstyled, class: [ui?.loading?.class] })"
          />
        </slot>
        <slot />
        <Ripple v-if="ripple" />
      </TooltipTrigger>
      <TooltipContent
        v-bind="mergedUI.tooltip.content.props"
        :class="mergedUI.tooltip.content.class"
        :theme="mergedUI.tooltip.theme"
        :data-theme="mergedUI.tooltip.theme"
      >
        <slot name="tooltip">
          {{ tooltip }}
        </slot>
        <TooltipArrow
          :class="mergedUI.tooltip.arrow.class"
          :theme="mergedUI.tooltip.theme"
          v-bind="mergedUI.tooltip.arrow.props"
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
    :class="base({ variant: variant as ButtonVariants['variant'], size, unstyled, class: [ui?.root?.class, propsClass] })"
    :disabled="disabled"
    :data-variant="variant"
    :data-ripple="ripple ? true : undefined"
    :data-loading="loading ? true : undefined"
    :data-switch-state="variant === 'switch' ? (checked ? 'checked' : 'unchecked') : undefined"
    :data-size="size"
    @click="onClick"
  >
    <slot
      v-if="loading"
      name="loading"
    >
      <LoaderCircle
        :class="tvLoading({
          variant: variant as ButtonVariants['variant'],
          size,
          unstyled,
          loading,
          class: [ui?.loading?.class],
        })"
      />
    </slot>
    <slot />
    <Ripple v-if="ripple" />
  </Primitive>
</template>
