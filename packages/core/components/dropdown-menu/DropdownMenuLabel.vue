<script setup lang="ts">
import type { DropdownMenuLabelProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { DropdownMenuLabel, useForwardProps } from 'reka-ui'
import { computed } from 'vue'
import { tvLabel } from '.'

const props = defineProps<
  DropdownMenuLabelProps & {
    class?: HTMLAttributes['class']
    inset?: boolean
    unstyled?: boolean
  }
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DropdownMenuLabel
    v-bind="forwardedProps"
    :class="tvLabel({ inset, unstyled: props.unstyled, class: props.class })"
  >
    <slot />
  </DropdownMenuLabel>
</template>
