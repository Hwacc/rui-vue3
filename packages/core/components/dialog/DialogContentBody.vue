<script setup lang="ts">
import { cn } from '@/lib/utils';
import { Primitive, PrimitiveProps } from 'reka-ui';
import { HTMLAttributes } from 'vue';
import { dialogContentBodyVariants } from '.';

const {
  class: propsClass,
  disableRuiClass,
  ...props
} = defineProps<PrimitiveProps & { class?: HTMLAttributes['class']; disableRuiClass?: boolean }>();
</script>

<template>
  <Primitive :class="cn(dialogContentBodyVariants({ disableRuiClass }), propsClass)" v-bind="props">
    <slot />
  </Primitive>
</template>
