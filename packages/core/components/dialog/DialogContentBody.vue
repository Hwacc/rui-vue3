<script setup lang="ts">
import { cn } from '@/core/lib/utils'
import { Primitive, PrimitiveProps } from 'reka-ui'
import { HTMLAttributes } from 'vue'
import { dialogContentBodyVariants } from '.'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  PrimitiveProps & { class?: HTMLAttributes['class']; unstyled?: boolean }
>()
</script>

<template>
  <Primitive
    :class="cn(dialogContentBodyVariants({ unstyled }), propsClass)"
    v-bind="props"
  >
    <slot />
  </Primitive>
</template>
