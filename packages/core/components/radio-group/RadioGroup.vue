<script setup lang="ts">
import type { RadioGroupRootEmits, RadioGroupRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { RadioGroupRoot, useForwardPropsEmits } from 'reka-ui'

const { class: propsClass, ...props } = defineProps<
  RadioGroupRootProps & { class?: HTMLAttributes['class'] }
>()
const emits = defineEmits<RadioGroupRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <RadioGroupRoot :class="propsClass" v-bind="forwarded">
    <slot />
  </RadioGroupRoot>
</template>
