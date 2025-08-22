<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { BadgeVariants } from '.'
import { cn } from '@rui/core/lib/utils'
import { Primitive, useForwardProps } from 'reka-ui'
import { computed } from 'vue'
import { badgeVariants } from '.'

const {
  as,
  variant,
  size = 'base',
  class: propsClass,
  ...props
} = defineProps<
  PrimitiveProps & {
    variant?: BadgeVariants['variant']
    size?: BadgeVariants['size']
    class?: HTMLAttributes['class']
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
    :class="cn(badgeVariants({ variant, size }), propsClass)"
    :data-variant="variant"
  >
    <slot />
  </Primitive>
</template>
