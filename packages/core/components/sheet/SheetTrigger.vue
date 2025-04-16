<script setup lang="ts">
import { DialogTrigger, type DialogTriggerProps } from 'reka-ui'
import { cn } from '@/core/lib/utils'
import { HTMLAttributes } from 'vue'

const { class: propsClass, ...props } = defineProps<
  DialogTriggerProps & { class?: HTMLAttributes['class'] }
>()
</script>

<template>
  <DialogTrigger :class="cn('rounded', propsClass)" v-bind="props">
    <slot />
  </DialogTrigger>
</template>
