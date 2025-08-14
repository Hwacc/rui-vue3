<script setup lang="ts">
import type { SelectLabelProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { injectSelectRootContext, SelectLabel } from 'reka-ui'
import { tvLabel } from '.'

const props = defineProps<
  SelectLabelProps & { class?: HTMLAttributes['class'], unstyled?: boolean }
>()
const { multiple } = injectSelectRootContext()
</script>

<template>
  <SelectLabel
    :class="tvLabel({ unstyled: props.unstyled, multiply: multiple, class: props.class })"
  >
    <slot />
  </SelectLabel>
</template>
