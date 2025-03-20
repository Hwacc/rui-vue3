<script setup lang="ts">
import { Button } from '@/components/button';
import { RadioGroup, RadioGroupItem } from '@/components/radio-group';
import { toast, ToastPosition } from '@/components/toast';

const { modelValue } = defineProps<{
  modelValue: ToastPosition;
}>();
const emits = defineEmits<{
  'update:modelValue': [ToastPosition];
}>();

const onOpenToastClick = () => {
  toast({
    title: 'Toast Title',
    description: 'Toast Description',
    duration: 0,
  });
};
</script>

<template>
  <div class="container flex flex-col items-center gap-4">
    <RadioGroup
      class="flex gap-2"
      :model-value="modelValue"
      @update:model-value="(val) => emits('update:modelValue', val as ToastPosition)"
    >
      <p>Toast Position:</p>
      <RadioGroupItem value="top-left" label="Top Left" />
      <RadioGroupItem value="top-center" label="Top Center" />
      <RadioGroupItem value="top-right" label="Top Right" />
      <RadioGroupItem value="center" label="Center" />
      <RadioGroupItem value="bottom-left" label="Bottom Left" />
      <RadioGroupItem value="bottom-center" label="Bottom Center" />
      <RadioGroupItem value="bottom-right" label="Bottom Right" />
    </RadioGroup>
    <Button @click="onOpenToastClick">Open a Toast</Button>
  </div>
</template>
