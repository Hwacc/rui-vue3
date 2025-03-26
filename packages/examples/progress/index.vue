<script setup lang="tsx">
import { Progress } from '@/components/progress';
</script>

<template>
  <div class="container flex flex-col items-center gap-4">
    <Progress :modelValue="50" />
    <Progress :modelValue="100" />
    <Progress :modelValue="0" />
  </div>
</template>
