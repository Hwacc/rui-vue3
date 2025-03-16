<script setup lang="ts">
import type { TabsListProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { TabsList } from 'reka-ui';
import { computed, onMounted, unref, watchEffect } from 'vue';
import { tabsListVariants } from '.';
import { injectTabsContext } from './Tabs.vue';

const { class: propsClass, ...props } = defineProps<
  TabsListProps & { class?: HTMLAttributes['class'] }
>();

const { value, initTabList, tabsTriggers } = injectTabsContext();

onMounted(() => {
  initTabList();
});

watchEffect(
  () => {
    const currentIndex = tabsTriggers.findIndex((item) => item.value === unref(value));
    if (currentIndex === -1) return;
    const parentRect = tabsTriggers[currentIndex]?.el?.parentElement?.getBoundingClientRect();
    const prevRect = tabsTriggers[currentIndex - 1]?.el?.getBoundingClientRect();
    const curRect = tabsTriggers[currentIndex]?.el?.getBoundingClientRect();
    const nextRect = tabsTriggers[currentIndex + 1]?.el?.getBoundingClientRect();

    if (!parentRect || !curRect) return;
    const deltaX = curRect.x - parentRect.x;
    // 完全在左边
    if (deltaX <= 0) {
      console.log('total left');
      tabsTriggers[currentIndex]?.el?.parentElement?.scrollBy({
        left: prevRect ? -(Math.abs(deltaX) + curRect.width) - prevRect.width / 2 : -9999,
        behavior: 'smooth',
      });
    }
    // 在左边包含但显示不全
    else if (deltaX < 0 && Math.abs(deltaX) <= curRect.width) {
      console.log('partial left');
      tabsTriggers[currentIndex]?.el?.parentElement?.scrollBy({
        left: prevRect ? deltaX - prevRect.width / 2 : -curRect.width,
        behavior: 'smooth',
      });
    } else if (deltaX > 0 && prevRect && deltaX < prevRect.width / 2) {
      // 包含但是上一个显示不够
      console.log('include but prev not enough');
      tabsTriggers[currentIndex]?.el?.parentElement?.scrollBy({
        left: -(prevRect.width / 2 - deltaX),
        behavior: 'smooth',
      });
    }
    // 完全在右边
    else if (deltaX >= parentRect.width) {
      console.log('total right');
      tabsTriggers[currentIndex]?.el?.parentElement?.scrollBy({
        left: nextRect ? deltaX - parentRect.width + curRect.width + nextRect.width / 2 : 9999,
        behavior: 'smooth',
      });
    }
    // 在右边包含但显示不全
    else if (
      deltaX < parentRect.width &&
      curRect.width + curRect.x > parentRect.width + parentRect.x
    ) {
      console.log('partial right');
      tabsTriggers[currentIndex]?.el?.parentElement?.scrollBy({
        left: nextRect ? parentRect.width - deltaX + nextRect.width / 2 : curRect.width,
        behavior: 'smooth',
      });
    } else if (
      deltaX < parentRect.width &&
      nextRect &&
      nextRect.x - parentRect.x + nextRect.width / 2 > parentRect.width
    ) {
      // 包含但是下一个显示不够
      console.log('include but next not enough');
      tabsTriggers[currentIndex]?.el?.parentElement?.scrollBy({
        left: nextRect.width / 2 - (parentRect.width - (nextRect.x - parentRect.x)),
        behavior: 'smooth',
      });
    }
  },
  {
    flush: 'post',
  }
);

const classNames = computed(() => {
  return cn(tabsListVariants(), propsClass);
});
</script>

<template>
  <TabsList v-bind="props" :class="classNames">
    <slot />
  </TabsList>
</template>
