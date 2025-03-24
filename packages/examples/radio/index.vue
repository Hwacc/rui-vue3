<script setup lang="ts">
import { RadioGroup, RadioGroupItem } from '@/components/radio-group';
import { ref } from 'vue';

const radioGroupState = ref('1');
</script>

<template>
  <div class="container flex flex-col items-center gap-4">
    <p class="test-block">Radio status: {{ radioGroupState }}</p>
    <RadioGroup v-model="radioGroupState" default-value="1" class="flex items-center gap-2">
      <RadioGroupItem id="1" value="1" label="Default Style" />
      <RadioGroupItem id="2" value="2" type="checkbox" label="Checkbox Style" />
      <RadioGroupItem id="3" value="3" type="checkbox" disabled label="Disabled Style" />
    </RadioGroup>
  </div>
</template>
