<script setup lang="ts">
import type { CollapsibleContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { CollapsibleContent } from 'reka-ui'
import { computed } from 'vue'
import { collapsibleContentClass } from '.'

const { class: propsClass, ...props } = defineProps<
  CollapsibleContentProps & {
    class?: HTMLAttributes['class']
  }
>()

const classNames = computed(() => {
  return cn(collapsibleContentClass, propsClass)
})
</script>

<template>
  <CollapsibleContent v-bind="props" :class="classNames">
    <slot />
  </CollapsibleContent>
</template>
