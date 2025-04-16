<script setup lang="ts">
import { cn } from '@/core/lib/utils'
import { Separator, type SeparatorProps } from 'reka-ui'
import { type HTMLAttributes } from 'vue'
import { separatorVariants, separatorLabelVariants } from '.'

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
          unstyled: unstyled
        }),
        propsClass
      )
    "
  >
    <span
      v-if="label"
      :class="
        cn(
          separatorLabelVariants({
            orientation: props.orientation,
            unstyled: unstyled
          }),
          labelClass
        )
      "
    >
      {{ label }}
    </span>
  </Separator>
</template>
