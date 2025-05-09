<script setup lang="tsx">
import { Button } from '@rui/core/components/button';
import { RadioGroup, RadioGroupItem } from '@rui/core/components/radio-group';
import { toast, ToastPosition } from '@rui/core/components/toast';
import { message } from '@rui/core/components/message';
import { Smile } from 'lucide-vue-next';

const { modelValue } = defineProps<{
  modelValue: ToastPosition;
}>();
const emits = defineEmits<{
  'update:modelValue': [ToastPosition];
}>();

const onOpenToastClick = () => {
  toast({
    variant: 'error',
    title: 'Toast Title',
    description: 'Toast Description',
    duration: 0,
  });
};

const onOpenRenderToastClick = () => {
  toast({
    variant: 'success',
    title: 'Toast Title',
    description: () => <p>The VNode Description</p>,
  });
};

const onOpenMessageClick = () => {
  message({
    variant: 'success',
    title: 'Message Content',
  });
};

const onOpenCustomMessageClick = () => {
  message({
    title: 'Custom Message Content',
    icon: () => <Smile class={'size-5'} />,
    duration: 0
  }) 
}
</script>

<template>
  <div class="container flex flex-col items-center gap-4">
    <RadioGroup
      class="flex-c flex-wrap gap-2"
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
    <div class="flex-c flex-wrap items-center gap-2">
      <Button @click="onOpenToastClick">Open a Toast</Button>
      <Button @click="onOpenRenderToastClick">Open a Render Toast</Button>
      <Button @click="onOpenMessageClick">Open a Message</Button>
      <Button @click="onOpenCustomMessageClick">Open a CustomIcon Message</Button>
    </div>
  </div>
</template>
