<script lang="ts" setup>
import type { DropdownMenuRootEmits, DropdownMenuRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { DropdownMenuRoot, useForwardPropsEmits } from 'reka-ui'
import { tvDropdownMenu } from '.'
import { MenuTransfer } from '../menu-transfer'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  DropdownMenuRootProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
  }
>()

const emits = defineEmits<DropdownMenuRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DropdownMenuRoot v-bind="forwarded">
    <MenuTransfer :class="tvDropdownMenu({ class: propsClass, unstyled })">
      <slot />
    </MenuTransfer>
  </DropdownMenuRoot>
</template>
