<script setup lang="ts">
import type { DialogTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { DialogTrigger, useForwardProps } from 'reka-ui'

const { class: propsClass, ...props } = defineProps<
  DialogTriggerProps & { class?: HTMLAttributes['class'] }
>()
const forwarded = useForwardProps(props)
</script>

<template>
  <DialogTrigger
    v-bind="forwarded"
    :class="cn('rounded', propsClass)"
  >
    <slot />
  </DialogTrigger>
</template>
