<script setup lang="ts">
import { cn } from '@/lib/utils';
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
  size = 'default',
  disableRuiClass,
  ...props
} = defineProps<
  SwitchRootProps & {
    class?: HTMLAttributes['class'];
    size?: SwitchVariantsProps['size'];
    thumbClass?: HTMLAttributes['class'];
    disableRuiClass?: boolean;
  }
>();
const emits = defineEmits<SwitchRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);

const switchRootClassName = computed(() => {
  return cn(
    switchVariants({
      size,
      disableRuiClass
    }),
    props.class
  );
});
const switchThumbClassName = computed(() => {
  return cn(
    switchThumbVariants({
      size,
      disableRuiClass
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
