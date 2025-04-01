<script setup lang="ts">
import { ScrollArea } from '@/core/components/scroll-area';
</script>

<template>
  <div class="flex items-center gap-5">
    <ScrollArea class="h-50 w-100" type="always">
      <div class="flex flex-col w-200 h-200 bg-white">
        <div
          v-for="i in 10"
          class="w-full h-20 flex items-center"
          :style="{ backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` }"
        >
          <div>Reka-UI Scroll #{{ i }}</div>
        </div>
      </div>
    </ScrollArea>
  </div>
</template>
