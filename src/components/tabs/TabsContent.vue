<script setup lang="ts">
import type { TabsContentProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { TabsContent } from 'radix-vue';
import { computed } from 'vue';
import { tabsContentVariants } from '.';

const { class: propsClass, ...props } = defineProps<
  TabsContentProps & { class?: HTMLAttributes['class'] }
>();

const classNames = computed(() => {
  return cn(tabsContentVariants(), propsClass);
});
</script>

<template>
  <TabsContent :class="classNames" v-bind="props">
    <slot />
  </TabsContent>
</template>
