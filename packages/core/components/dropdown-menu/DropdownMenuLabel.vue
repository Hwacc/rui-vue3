<script setup lang="ts">
import type { DropdownMenuLabelProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { DropdownMenuLabel, useForwardProps } from 'reka-ui'
import { computed } from 'vue'
import { dropdownMenuLabelVariants } from '.'

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
    :class="
      cn(
        dropdownMenuLabelVariants({ inset, unstyled: props.unstyled }),
        props.class
      )
    "
  >
    <slot />
  </DropdownMenuLabel>
</template>
