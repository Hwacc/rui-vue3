<script setup lang="ts">
import type { DialogTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { DialogTrigger } from 'reka-ui'

const { class: propsClass, ...props } = defineProps<
  DialogTriggerProps & { class?: HTMLAttributes['class'] }
>()
</script>

<template>
  <DialogTrigger :class="cn('rounded', propsClass)" v-bind="props">
    <slot />
  </DialogTrigger>
</template>
