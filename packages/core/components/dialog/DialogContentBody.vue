<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { tvDialog } from '.'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<PrimitiveProps & { class?: HTMLAttributes['class'], unstyled?: boolean }>()

const { body } = tvDialog()
</script>

<template>
  <Primitive
    :class="body({ unstyled, class: propsClass })"
    v-bind="props"
  >
    <slot />
  </Primitive>
</template>
