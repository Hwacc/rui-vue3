<script setup lang="ts">
import { Slider } from '@rui/core/components/slider'
import { ref } from 'vue'

const modelValue = ref([50])
</script>

<template>
  <div class="container flex flex-col items-center gap-4">
    <p class="test-block gap-2">
      slider value: {{ modelValue }}
    </p>

    <div class="w-full flex gap-4">
      <div class="flex-1 border border-hbb rounded p-2 flex flex-col gap-10">
        <Slider v-model="modelValue" :max="100" :step="1" />
      </div>
    </div>
  </div>
</template>
