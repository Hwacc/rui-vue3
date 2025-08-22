<script setup lang="ts">
import type { CollapsibleContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { CollapsibleContent, useForwardProps } from 'reka-ui'
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

const forwarded = useForwardProps(props)
</script>

<template>
  <CollapsibleContent v-bind="forwarded" :class="classNames">
    <slot />
  </CollapsibleContent>
</template>
