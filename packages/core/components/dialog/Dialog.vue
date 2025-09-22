<script setup lang="ts">
import type { DialogRootEmits, DialogRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { DialogRoot, useForwardPropsEmits } from 'reka-ui';
import { tvDialog } from '.';
import DialogProvider from './DialogRootProviderEx';

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<DialogRootProps & { class?: HTMLAttributes['class']; unstyled?: boolean }>();
const emits = defineEmits<DialogRootEmits>();

const { root } = tvDialog();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <DialogRoot
    v-slot="{ open, close }"
    v-bind="forwarded"
    :class="root({ unstyled, class: propsClass })"
  >
    <DialogProvider>
      <slot v-bind="{ open, close }" />
    </DialogProvider>
  </DialogRoot>
</template>
