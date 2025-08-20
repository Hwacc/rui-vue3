<script setup lang="ts">
import type { SeparatorProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Separator } from 'reka-ui'
import { tvSeparator } from '.'

const {
  class: propsClass,
  unstyled,
  label,
  ui,
  ...props
} = defineProps<
  SeparatorProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
    label?: string
    ui?: {
      root?: {
        class?: HTMLAttributes['class']
      }
      label?: {
        class?: HTMLAttributes['class']
      }
    }
  }
>()

const { base, label: tvLabel } = tvSeparator({
  orientation: props.orientation,
  unstyled,
})
</script>

<template>
  <Separator
    v-bind="props"
    :class="base({ class: [ui?.root?.class, propsClass] })"
  >
    <span
      v-if="label"
      :class="tvLabel({ class: ui?.label?.class })"
    >
      {{ label }}
    </span>
  </Separator>
</template>
