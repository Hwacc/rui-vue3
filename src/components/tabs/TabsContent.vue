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

const isPrev = ref(false);
const isNext = ref(false);
watch(index, (newIndex, oldIndex) => {
  if (newIndex - oldIndex > 0) {
    isPrev.value = false;
    isNext.value = true;
  } else if (newIndex - oldIndex < 0) {
    isPrev.value = true;
    isNext.value = false;
  }
});

const classNames = computed(() => {
  return cn(
    tabsContentVariants({
      prev: isPrev.value,
      next: isNext.value,
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
