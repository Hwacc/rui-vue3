<script setup lang="ts">
import { Switch } from '@rui/core/components/switch'
import { ref } from 'vue'

const switcherState = ref(false)
</script>

<template>
  <div class="container flex flex-col items-center gap-4">
    <p class="test-block">
      Switch status: {{ switcherState ? 'on' : 'off' }}
    </p>
    <div class="flex gap-4 items-center">
      <Switch v-model:checked="switcherState" />
      <Switch v-model:checked="switcherState" size="lg" />
      <Switch v-model:checked="switcherState" size="sm" />
      <Switch v-model:checked="switcherState" disabled />
    </div>
  </div>
</template>
