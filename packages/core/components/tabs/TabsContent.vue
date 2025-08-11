<script setup lang="ts">
import type { TabsContentProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { TabsContent } from 'reka-ui';
import { computed, ref, watch } from 'vue';
import { injectTabsContext } from './Tabs.vue';
import { tvTabs } from '.';

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<TabsContentProps & { class?: HTMLAttributes['class']; unstyled?: boolean }>();

const { index } = injectTabsContext();

const direction = ref(0);
watch(index, (newIndex, oldIndex) => {
  direction.value = newIndex - oldIndex;
});

const classNames = computed(() => {
  return tvTabs().content({
    prev: direction.value < 0,
    next: direction.value > 0,
    unstyled,
    class: propsClass,
  });
});
</script>

<template>
  <TabsContent
    :class="classNames"
    v-bind="props"
  >
    <slot />
  </TabsContent>
</template>
