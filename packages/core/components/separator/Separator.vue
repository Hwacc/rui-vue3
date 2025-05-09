<script setup lang="ts">
import type { SeparatorProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { Separator } from 'reka-ui'
import { separatorLabelVariants, separatorVariants } from '.'

const {
  class: propsClass,
  labelClass,
  unstyled,
  label,
  ...props
} = defineProps<
  SeparatorProps & {
    class?: HTMLAttributes['class']
    labelClass?: HTMLAttributes['class']
    unstyled?: boolean
    label?: string
  }
>()
</script>

<template>
  <Separator
    v-bind="props"
    :class="
      cn(
        separatorVariants({
          orientation: props.orientation,
          unstyled,
        }),
        propsClass,
      )
    "
  >
    <span
      v-if="label"
      :class="
        cn(
          separatorLabelVariants({
            orientation: props.orientation,
            unstyled,
          }),
          labelClass,
        )
      "
    >
      {{ label }}
    </span>
  </Separator>
</template>
