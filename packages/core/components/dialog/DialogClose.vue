<script setup lang="ts">
import type { DialogCloseProps, PrimitiveProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import type { DialogCloseFrom } from '.';
import { Primitive, useForwardProps } from 'reka-ui';
import { tvDialog } from '.';
import { injectDialogContext } from './DialogRootProviderEx';

const {
  as = 'div',
  class: propsClass,
  closeFrom,
  unstyled,
  ...props
} = defineProps<
  PrimitiveProps & {
    as?: DialogCloseProps['as'];
    class?: HTMLAttributes['class'];
    closeFrom?: DialogCloseFrom;
    unstyled?: boolean;
  }
>();

const emits = defineEmits<{
  click: [e: Event];
  close: [from?: DialogCloseFrom];
}>();

const { onOpenChange, closeFrom: contextCloseFrom } = injectDialogContext();

function handleClose(from?: DialogCloseFrom) {
  contextCloseFrom.value = from ?? closeFrom;
  emits('close', contextCloseFrom.value);
  onOpenChange(false);
}

function onClose(event: Event, from?: DialogCloseFrom) {
  emits('click', event);
  console.log('click', event.defaultPrevented);
  if (event.defaultPrevented) return true;
  handleClose(from);
}

const { close } = tvDialog();
const forwarded = useForwardProps(props);
</script>

<template>
  <Primitive
    v-bind="forwarded"
    :as="as"
    :class="close({ unstyled, class: propsClass })"
    @click="(e) => onClose(e, closeFrom)"
  >
    <slot v-bind="{ close: handleClose }" />
  </Primitive>
</template>
