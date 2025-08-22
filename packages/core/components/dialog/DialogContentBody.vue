<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive, useForwardProps } from 'reka-ui'
import { tvDialog } from '.'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<PrimitiveProps & { class?: HTMLAttributes['class'], unstyled?: boolean }>()

const { body } = tvDialog()
const forwarded = useForwardProps(props)
</script>

<template>
  <Primitive
    v-bind="forwarded"
    :class="body({ unstyled, class: propsClass })"
  >
    <slot />
  </Primitive>
</template>
