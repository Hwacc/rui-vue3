<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { BadgeVariants } from '.'
import { Primitive, useForwardProps } from 'reka-ui'
import { computed } from 'vue'
import { tvBadge } from '.'

const {
  as,
  variant,
  size = 'base',
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  PrimitiveProps & {
    variant?: BadgeVariants['variant']
    size?: BadgeVariants['size']
    class?: HTMLAttributes['class']
    unstyled?: boolean
  }
>()

const computedAs = computed(() => {
  if (as)
    return as
  if (variant === 'dot') {
    return 'sup'
  }
  return 'div'
})

const forwarded = useForwardProps(props)
</script>

<template>
  <Primitive
    :as="computedAs"
    v-bind="forwarded"
    :class="tvBadge({ variant, size, unstyled, class: propsClass })"
    :data-variant="variant"
  >
    <slot />
  </Primitive>
</template>
