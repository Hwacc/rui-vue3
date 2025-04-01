<script setup lang="ts">
import { Switch } from '@/core/components/switch';
import { ref } from 'vue';

const switcherState = ref(false);
</script>

<template>
  <div class="container flex flex-col items-center gap-4">
    <p class="test-block">Switch status: {{ switcherState ? 'on' : 'off' }}</p>
    <div class="flex gap-4 items-center">
      <Switch v-model:checked="switcherState"></Switch>
      <Switch v-model:checked="switcherState" size="lg"></Switch>
      <Switch v-model:checked="switcherState" size="sm"></Switch>
      <Switch v-model:checked="switcherState" disabled></Switch>
    </div>
  </div>
</template>
