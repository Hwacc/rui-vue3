<script setup lang="ts">
import type { DialogTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { DialogTrigger } from 'reka-ui'
import { tvDialog } from '.'

const {
  as = 'div',
  class: propsClass,
  unstyled,
  ...props
} = defineProps<DialogTriggerProps & { class?: HTMLAttributes['class'], unstyled?: boolean }>()

const { trigger } = tvDialog()
</script>

<template>
  <DialogTrigger
    :as="as"
    :class="trigger({ unstyled, class: propsClass })"
    v-bind="props"
  >
    <slot />
  </DialogTrigger>
</template>
