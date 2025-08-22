<script setup lang="ts">
import type { DialogTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { DialogTrigger, useForwardProps } from 'reka-ui'
import { tvDialog } from '.'

const {
  as = 'div',
  class: propsClass,
  unstyled,
  ...props
} = defineProps<DialogTriggerProps & { class?: HTMLAttributes['class'], unstyled?: boolean }>()

const { trigger } = tvDialog()
const forwarded = useForwardProps(props)
</script>

<template>
  <DialogTrigger
    v-bind="forwarded"
    :as="as"
    :class="trigger({ unstyled, class: propsClass })"
  >
    <slot />
  </DialogTrigger>
</template>
