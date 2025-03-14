<script setup lang="ts">
import {
  RadioGroupRoot,
  type RadioGroupRootEmits,
  type RadioGroupRootProps,
  useForwardPropsEmits,
} from 'radix-vue';
import { type HTMLAttributes } from 'vue';

const { class: propsClass, ...props } = defineProps<
  RadioGroupRootProps & { class?: HTMLAttributes['class'] }
>();
const emits = defineEmits<RadioGroupRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <RadioGroupRoot :class="propsClass" v-bind="forwarded">
    <slot />
  </RadioGroupRoot>
</template>
