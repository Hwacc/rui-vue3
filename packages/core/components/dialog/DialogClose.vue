<script setup lang="ts">
import type { DialogCloseProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { DialogCloseFrom } from '.'
import { DialogClose, useForwardProps } from 'reka-ui'
import { tvDialog } from '.'
import { injectDialogContext } from './DialogRootProviderEx'

const {
  as = 'div',
  class: propsClass,
  closeFrom,
  unstyled,
  ...props
} = defineProps<
  DialogCloseProps & {
    as?: DialogCloseProps['as']
    class?: HTMLAttributes['class']
    closeFrom?: DialogCloseFrom
    unstyled?: boolean
  }
>()
const { closeFrom: contextCloseFrom } = injectDialogContext()

function onClose() {
  contextCloseFrom.value = closeFrom
}

const { close } = tvDialog()
const forwarded = useForwardProps(props)
</script>

<template>
  <DialogClose
    v-bind="forwarded"
    :as="as"
    :class="close({ unstyled })"
    @click="onClose"
  >
    <slot />
  </DialogClose>
</template>
