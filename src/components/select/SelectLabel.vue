<script setup lang="ts">
import type { SelectLabelProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { injectSelectRootContext, SelectLabel } from 'reka-ui';

const props = defineProps<SelectLabelProps & { class?: HTMLAttributes['class'] }>();
const { multiple } = injectSelectRootContext();
</script>

<template>
  <SelectLabel :class="cn('py-1.5 px-2 text-sm font-rob-bold', multiple && 'pl-8', props.class)">
    <slot />
  </SelectLabel>
</template>
