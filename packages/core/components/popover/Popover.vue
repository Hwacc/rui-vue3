<script setup lang="ts">
import type { PopoverRootEmits, PopoverRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import type { PopoverProviderExProps } from './PopoverProviderEx';
import { omit, pick } from 'lodash-es';
import { PopoverRoot, useForwardPropsEmits } from 'reka-ui';
import { tvPopover } from '.';
import { PopoverProviderEx } from './PopoverProviderEx';

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<
  PopoverRootProps &
    PopoverProviderExProps & {
      class?: HTMLAttributes['class'];
      unstyled?: boolean;
    }
>();
const emits = defineEmits<PopoverRootEmits>();

const { root } = tvPopover();
const forwarded = useForwardPropsEmits(pick(props, ['modal', 'open', 'defaultOpen']), emits);
</script>

<template>
  <PopoverRoot
    :class="root({ unstyled, class: propsClass })"
    v-bind="forwarded"
    v-slot="{ open, close }"
  >
    <PopoverProviderEx v-bind="{ ...omit(props, ['modal', 'open', 'defaultOpen']) }">
      <slot v-bind="{ open, close }" />
    </PopoverProviderEx>
  </PopoverRoot>
</template>
