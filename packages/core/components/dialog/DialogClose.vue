<script setup lang="ts">
import type { DialogCloseProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { DialogCloseFrom } from '.'
import { cn } from '@rui/core/lib/utils'
import { DialogClose } from 'reka-ui'
import { injectDialogContext } from './DialogRootProviderEx'

const {
  as = 'div',
  class: propsClass,
  closeFrom,
  ...props
} = defineProps<
  DialogCloseProps & {
    as?: DialogCloseProps['as']
    class?: HTMLAttributes['class']
    closeFrom?: DialogCloseFrom
  }
>()
const { closeFrom: contextCloseFrom } = injectDialogContext()

function onClose() {
  contextCloseFrom.value = closeFrom
}
</script>

<template>
  <DialogClose :as="as" :class="cn(propsClass)" v-bind="props" @click="onClose">
    <slot />
  </DialogClose>
</template>
