<script setup lang="ts">
import { ScrollArea, ScrollFloatingArea } from '@/core/components/scroll-area';
</script>

<template>
  <div class="flex items-center gap-5">
    <ScrollArea class="h-50 w-100" :scroll-hide-delay="100000">
      <div class="flex flex-col w-200 h-200 bg-white">
        <div
          v-for="i in 10"
          class="w-full h-20 flex items-center"
          :style="{ backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` }"
        >
          <div>Normal Scroll #{{ i }}</div>
        </div>
      </div>
    </ScrollArea>

    <ScrollFloatingArea class="h-50 w-100" :scroll-hide-delay="1000000">
      <div class="flex flex-col w-200 h-200 bg-white">
        <div
          v-for="i in 10"
          class="w-full h-20 flex items-center"
          :style="{ backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` }"
        >
          <div :class="`whitespace-nowrap ${i == 1 && 'absolute'}`">
            A long textA long textA long textA long textA long textA long textA long textA long
            textA long textA long textA long textA long textA long textA long textA long text
          </div>
        </div>
      </div>
    </ScrollFloatingArea>
  </div>
</template>
