<script setup lang="tsx">
import { Progress } from '@/components/progress';
import { onMounted, ref } from 'vue';

const progressValue = ref(0);

onMounted(() => {
  setInterval(() => {
    progressValue.value = progressValue.value + 5;
    if (progressValue.value > 100) {
      progressValue.value = 0;
    }
  }, 1000);
});
</script>

<template>
  <div class="container flex-col-c gap-4">
    <Progress class="w-100" :modelValue="progressValue" indicatorType="default" />
    <Progress class="w-100" :modelValue="progressValue" indicatorType="robbin" />
    <Progress class="w-100" :modelValue="progressValue" indicatorType="transfer" />
  </div>
</template>
