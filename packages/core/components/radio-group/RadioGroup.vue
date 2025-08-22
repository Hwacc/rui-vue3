<script setup lang="ts">
import type { RadioGroupRootEmits, RadioGroupRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cn } from '@rui/core/lib/utils'
import { RadioGroupRoot, useForwardPropsEmits } from 'reka-ui'
import { prefix } from '.'

const { class: propsClass, ...props } = defineProps<
  RadioGroupRootProps & { class?: HTMLAttributes['class'] }
>()
const emits = defineEmits<RadioGroupRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <RadioGroupRoot
    v-bind="forwarded"
    :class="cn(prefix, propsClass)"
  >
    <slot />
  </RadioGroupRoot>
</template>
