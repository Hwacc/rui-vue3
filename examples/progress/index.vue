<script setup lang="tsx">
import { CircleProgress, Progress } from '@rui/core/components/progress'
import { onMounted, ref } from 'vue'

const progressValue = ref(30)

// onMounted(() => {
//   setInterval(() => {
//     progressValue.value = progressValue.value + 5;
//     if (progressValue.value > 100) {
//       progressValue.value = 0;
//     }
//   }, 1000);
// });
</script>

<template>
  <div class="container flex-col-c gap-4">
    <Progress class="w-100" :model-value="progressValue" variant="default" />
    <Progress class="w-100" :model-value="progressValue" variant="robbin" />
    <Progress class="w-100" :model-value="progressValue" variant="transfer" />
    <div class="flex-c gap-4">
      <CircleProgress :model-value="progressValue" />
      <CircleProgress type="arc" :model-value="progressValue" />
      <CircleProgress
        type="arc"
        :stroke-width="4"
        variant="transfer"
        :model-value="progressValue"
      />
    </div>
  </div>
</template>
