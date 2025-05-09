<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { Primitive } from 'reka-ui'
import { dialogContentBodyVariants } from '.'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  PrimitiveProps & { class?: HTMLAttributes['class'], unstyled?: boolean }
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
