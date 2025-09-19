<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { Button, type ButtonProps } from '@rui/core/components/button';
import { DialogClose, DialogCloseFrom, tvDialog } from '.';
import { cn } from '@rui/core/lib/utils';

const {
  class: propsClass,
  unstyled,
  ui,
} = defineProps<{
  class?: HTMLAttributes['class'];
  unstyled?: boolean;
  ui?: {
    root?: HTMLAttributes['class'];
    cancel?: {
      class?: HTMLAttributes['class'];
      text?: string;
      props?: ButtonProps;
    };
    ok?: {
      class?: HTMLAttributes['class'];
      text?: string;
      props?: ButtonProps;
    };
  };
}>();
const emits = defineEmits<{
  ok: [];
  cancel: [];
}>();

const { footer } = tvDialog();
</script>

<template>
  <div :class="footer({ unstyled, class: [ui?.root, propsClass] })">
    <slot>
      <DialogClose :close-from="DialogCloseFrom.CancelButton">
        <Button
          :class="cn('min-w-22.5 uppercase', ui?.cancel?.class)"
          variant="text"
          size="sm"
          v-bind="ui?.cancel?.props"
          @click="() => emits('cancel')"
        >
          {{ ui?.cancel?.text || 'Cancel' }}
        </Button>
      </DialogClose>
      <DialogClose :close-from="DialogCloseFrom.OKButton">
        <Button
          :class="cn('min-w-22.5 uppercase', ui?.ok?.class)"
          size="sm"
          v-bind="ui?.ok?.props"
          @click="() => emits('ok')"
        >
          {{ ui?.ok?.text || 'OK' }}
        </Button>
      </DialogClose>
    </slot>
  </div>
</template>
