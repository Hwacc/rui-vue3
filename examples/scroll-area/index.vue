<script setup lang="ts">
import { ScrollArea as PerfectScrollArea } from '@rui/add-ons/components/scroll-area'
import { ScrollArea } from '@rui/core/components/scroll-area'
import { ref } from 'vue'

const speedRef = ref(1)
</script>

<template>
  <div class="flex items-center gap-5">
    <ScrollArea class="h-50 w-100" type="always">
      <div class="flex flex-col w-200 h-200">
        <div
          v-for="i in 10"
          :key="i"
          class="w-full h-20 flex items-center"
          :style="{ backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` }"
        >
          <div>Reka-UI Scroll #{{ i }}</div>
        </div>
      </div>
    </ScrollArea>

    <button
      @click="
        () => {
          speedRef = 2;
        }
      "
    >
      Click
    </button>
    <PerfectScrollArea class="h-50 w-100" size="base" :wheel-speed="speedRef" swipe-easing>
      <div class="flex flex-col w-200 h-200">
        <div
          v-for="i in 10"
          :key="i"
          class="w-full h-20 flex items-center"
          :style="{ backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` }"
        >
          <div>Reka-UI Scroll #{{ i }}</div>
        </div>
      </div>
    </PerfectScrollArea>
  </div>
</template>
