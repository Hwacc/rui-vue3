<script setup lang="ts">
import type { TabsContentProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { TabsContent } from 'reka-ui';
import { computed, ref, watch } from 'vue';
import { tabsContentVariants } from '.';
import { injectTabsContext } from './Tabs.vue';

const { index } = injectTabsContext();

const { class: propsClass, ...props } = defineProps<
  TabsContentProps & { class?: HTMLAttributes['class'] }
>();

const direction = ref(0);
watch(index, (newIndex, oldIndex) => {
  direction.value = newIndex - oldIndex;
});

const classNames = computed(() => {
  return cn(
    tabsContentVariants({
      prev: direction.value < 0,
      next: direction.value > 0,
    }),
    propsClass
  );
});
</script>

<template>
  <TabsContent :class="classNames" v-bind="props">
    <slot />
  </TabsContent>
</template>
