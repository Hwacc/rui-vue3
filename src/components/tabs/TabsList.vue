<script setup lang="ts">
import type { TabsListProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { TabsList } from 'radix-vue';
import { computed, onMounted, unref, watchEffect } from 'vue';
import { tabsListVariants } from '.';
import { injectTabsContext } from './Tabs.vue';

const { class: propsClass, ...props } = defineProps<
  TabsListProps & { class?: HTMLAttributes['class'] }
>();

onMounted(() => {
  console.log('tablistRef');
});

const { value, initTabList, triggers } = injectTabsContext();
initTabList();

watchEffect(
  () => {
    const val = unref(value);
    const currentIndex = triggers.findIndex((item) => item.value === val);
    if (currentIndex === -1) return;
    const parentRect = triggers[currentIndex]?.el?.parentElement?.getBoundingClientRect();
    const prevRect = triggers[currentIndex - 1]?.el?.getBoundingClientRect();
    const curRect = triggers[currentIndex]?.el?.getBoundingClientRect();
    const nextRect = triggers[currentIndex + 1]?.el?.getBoundingClientRect();

    if (!parentRect || !curRect) return;
    const deltaX = curRect.x - parentRect.x;
    console.log('deltaX', deltaX, parentRect.x);
    // 完全在左边
    if (deltaX <= 0) {
      console.log('total left');
      triggers[currentIndex]?.el?.parentElement?.scrollBy({
        left: prevRect ? -(Math.abs(deltaX) + curRect.width) - prevRect.width / 2 : -9999,
        behavior: 'smooth',
      });
    }
    // 在左边包含但显示不全
    else if (deltaX < 0 && Math.abs(deltaX) <= curRect.width) {
      console.log('partial left');
      triggers[currentIndex]?.el?.parentElement?.scrollBy({
        left: prevRect ? deltaX - prevRect.width / 2 : -curRect.width,
        behavior: 'smooth',
      });
    } else if (deltaX > 0 && prevRect && deltaX < prevRect.width / 2) {
      // 包含但是上一个显示不够
      console.log('include but prev not enough');
      triggers[currentIndex]?.el?.parentElement?.scrollBy({
        left: -(prevRect.width / 2 - deltaX),
        behavior: 'smooth',
      });
    }
    // 完全在右边
    else if (deltaX >= parentRect.width) {
      console.log('total right');
      triggers[currentIndex]?.el?.parentElement?.scrollBy({
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
      triggers[currentIndex]?.el?.parentElement?.scrollBy({
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
      triggers[currentIndex]?.el?.parentElement?.scrollBy({
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

<script lang="ts">
export default {
  name: 'CustomTabsList',
};
</script>

<template>
  <TabsList v-bind="props" :class="classNames" ref="tablistRef">
    <slot />
  </TabsList>
</template>
