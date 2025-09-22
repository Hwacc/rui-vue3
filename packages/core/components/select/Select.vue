<script lang="tsx" setup>
import type { SelectRootEmits, SelectRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { SelectRoot, useForwardPropsEmits } from 'reka-ui'
import { tvSelect } from '.'
import { MenuTransfer } from '../menu-transfer'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  SelectRootProps & {
    class?: HTMLAttributes['class']
    unstyled?: boolean
  }
>()

const emits = defineEmits<SelectRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <SelectRoot v-bind="forwarded">
    <MenuTransfer :class="tvSelect({ class: propsClass, unstyled })">
      <slot />
    </MenuTransfer>
  </SelectRoot>
</template>
