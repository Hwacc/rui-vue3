<script setup lang="ts">
import type { SwitchRootEmits, SwitchRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { SwitchVariantsProps } from '.'
import { cn } from '@rui/core/lib/utils'
import { SwitchRoot, SwitchThumb, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { switchThumbVariants, switchVariants } from '.'

const {
  size = 'base',
  unstyled,
  ...props
} = defineProps<
  SwitchRootProps & {
    class?: HTMLAttributes['class']
    size?: SwitchVariantsProps['size']
    thumbClass?: HTMLAttributes['class']
    unstyled?: boolean
  }
>()
const emits = defineEmits<SwitchRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)

const switchRootClassName = computed(() => {
  return cn(
    switchVariants({
      size,
      unstyled,
    }),
    props.class,
  )
})
const switchThumbClassName = computed(() => {
  return cn(
    switchThumbVariants({
      size,
      unstyled,
    }),
    props.thumbClass,
  )
})
</script>

<template>
  <SwitchRoot v-bind="forwarded" :class="switchRootClassName">
    <SwitchThumb :class="switchThumbClassName">
      <slot name="thumb" />
    </SwitchThumb>
  </SwitchRoot>
</template>
