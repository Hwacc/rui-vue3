<script setup lang="ts">
import { cn } from '@rui/core/lib/utils';
import {
  SwitchRoot,
  type SwitchRootEmits,
  type SwitchRootProps,
  SwitchThumb,
  useForwardPropsEmits,
} from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';
import { switchThumbVariants, switchVariants, SwitchVariantsProps } from '.';

const {
  size = 'base',
  unstyled,
  ...props
} = defineProps<
  SwitchRootProps & {
    class?: HTMLAttributes['class'];
    size?: SwitchVariantsProps['size'];
    thumbClass?: HTMLAttributes['class'];
    unstyled?: boolean;
  }
>();
const emits = defineEmits<SwitchRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);

const switchRootClassName = computed(() => {
  return cn(
    switchVariants({
      size,
      unstyled
    }),
    props.class
  );
});
const switchThumbClassName = computed(() => {
  return cn(
    switchThumbVariants({
      size,
      unstyled
    }),
    props.thumbClass
  );
});
</script>

<template>
  <SwitchRoot v-bind="forwarded" :class="switchRootClassName">
    <SwitchThumb :class="switchThumbClassName">
      <slot name="thumb" />
    </SwitchThumb>
  </SwitchRoot>
</template>
