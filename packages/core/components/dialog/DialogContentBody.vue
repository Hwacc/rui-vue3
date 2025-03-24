<script setup lang="ts">
import { cn } from '@/lib/utils';
import { Primitive, PrimitiveProps } from 'reka-ui';
import { HTMLAttributes } from 'vue';
import { dialogContentBodyDefaultClass } from '.';

const { class: propsClass, ...props } = defineProps<
  PrimitiveProps & { class?: HTMLAttributes['class'] }
>();
</script>

<template>
  <Primitive :class="cn(dialogContentBodyDefaultClass, propsClass)" v-bind="props">
    <slot />
  </Primitive>
</template>
