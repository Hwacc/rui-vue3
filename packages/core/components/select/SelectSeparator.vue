<script setup lang="ts">
import type { SelectSeparatorProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { SelectSeparator, useForwardProps } from 'reka-ui'
import { tvSeparator } from '.'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  SelectSeparatorProps & { class?: HTMLAttributes['class'], unstyled?: boolean }
>()
const forwarded = useForwardProps(props)
</script>

<template>
  <SelectSeparator
    v-bind="forwarded"
    :class="tvSeparator({ unstyled, class: propsClass })"
  />
</template>
