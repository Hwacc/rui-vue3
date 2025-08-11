<script setup lang="ts">
import type { SwitchRootEmits, SwitchRootProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import type { SwitchVariant } from '.';
import { SwitchRoot, SwitchThumb, useForwardPropsEmits } from 'reka-ui';
import { tvSwitch } from '.';

const {
  size = 'base',
  unstyled,
  ...props
} = defineProps<
  SwitchRootProps & {
    class?: HTMLAttributes['class'];
    size?: SwitchVariant['size'];
    thumbClass?: HTMLAttributes['class'];
    unstyled?: boolean;
    ui?: {
      root?: {
        class?: HTMLAttributes['class'];
      };
      thumb?: {
        class?: HTMLAttributes['class'];
      };
    };
  }
>();
const emits = defineEmits<SwitchRootEmits>();

const { root, thumb } = tvSwitch();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <SwitchRoot
    v-bind="forwarded"
    :class="root({ size, unstyled, class: [ui?.root?.class, props.class] })"
  >
    <SwitchThumb :class="thumb({ size, unstyled, class: [ui?.thumb?.class, props.thumbClass] })">
      <slot name="thumb" />
    </SwitchThumb>
  </SwitchRoot>
</template>
