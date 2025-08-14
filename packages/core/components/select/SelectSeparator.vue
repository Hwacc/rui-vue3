<script setup lang="ts">
import type { SelectSeparatorProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { SelectSeparator } from 'reka-ui'
import { tvSeparator } from '.'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  SelectSeparatorProps & { class?: HTMLAttributes['class'], unstyled?: boolean }
>()
</script>

<template>
  <SelectSeparator
    v-bind="props"
    :class="tvSeparator({ unstyled, class: propsClass })"
  />
</template>
