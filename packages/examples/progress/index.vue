<script setup lang="tsx">
import { Progress, CircleProgress } from '@/components/progress';
import { onMounted, ref } from 'vue';

const progressValue = ref(30);

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
    <Progress class="w-100" :modelValue="progressValue" variant="default" />
    <Progress class="w-100" :modelValue="progressValue" variant="robbin" />
    <Progress class="w-100" :modelValue="progressValue" variant="transfer" /> 
    <div class="flex-c gap-4">
      <CircleProgress :modelValue="progressValue" />
      <CircleProgress type="arc" :modelValue="progressValue" />
      <CircleProgress
        type="arc"
        :strokeWidth="4"
        variant="transfer"
        :modelValue="progressValue"
      />
    </div>
  </div>
</template>
