<script lang="ts">
import type { IconifyIcon } from '@iconify/vue'

export interface IconProps {
  icon: string | IconifyIcon
}
</script>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { IconVariantsProps } from '.'
import { Icon } from '@iconify/vue'
import { useForwardProps } from 'reka-ui'
import { tvIcon } from '.'

const {
  class: propsClass,
  unstyled,
  icon,
  size,
  ...props
} = defineProps<
  IconProps & {
    class?: HTMLAttributes['class']
    size?: IconVariantsProps['size']
    unstyled?: boolean
  }
>()

useForwardProps(props)
</script>

<template>
  <Icon
    :class="tvIcon({ size, unstyled, class: propsClass })"
    :icon="icon"
    v-bind="props"
  />
</template>
