<script setup lang="ts">
import { cn } from '@/lib/utils';
import type { CollapsibleRootEmits, CollapsibleRootProps } from 'reka-ui';
import { CollapsibleRoot, useForwardPropsEmits } from 'reka-ui';
import { computed, HTMLAttributes } from 'vue';
import { collapsibleVariants } from '.';

const { class: propsClass, ...props } = defineProps<
  CollapsibleRootProps & {
    class?: HTMLAttributes['class'];
  }
>();
const emits = defineEmits<CollapsibleRootEmits>();

const classNames = computed(() => {
  return cn(collapsibleVariants(), propsClass);
});
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <CollapsibleRoot v-slot="{ open }" v-bind="forwarded" :class="classNames">
    <slot :open="open" />
  </CollapsibleRoot>
</template>
