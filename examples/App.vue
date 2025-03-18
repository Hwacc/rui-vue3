<script lang="tsx" setup>
import { Button } from '@/components/button';
import { TooltipProvider } from '@/components/tooltip';

import ButtonExample from './buttons/index.vue';
import VTitleExample from './v-title/index.vue';
import InputExample from './input/index.vue';
import SwitchExample from './switch/index.vue';
import CheckboxExample from './checkbox/index.vue';
import RadioExample from './radio/index.vue';
import SliderExample from './slider/index.vue';
import TabsExample from './tabs/index.vue';
import CollapsibleExample from './collapsible/index.vue';
import DialogExample from './dialog/index.vue';

import { ref } from 'vue';
const compSize = ref<'default' | 'sm' | 'lg'>('default');
</script>

<template>
  <TooltipProvider>
    <div class="flex items-center gap-2">
      <Button
        size="sm"
        @click="() => (compSize === 'default' ? (compSize = 'sm') : (compSize = 'default'))"
      >
        Change Size
      </Button>
      <div class="test-block p-1!">Current Size: {{ compSize }}</div>
    </div>
    <div class="content flex-col-c gap-4 pb-[5rem]">
      <ButtonExample />
      <VTitleExample />
      <InputExample />
      <SwitchExample />
      <CheckboxExample />
      <RadioExample />
      <SliderExample />
      <TabsExample />
      <CollapsibleExample />
      <DialogExample />
    </div>
  </TooltipProvider>
</template>

<style scoped>
.content {
  min-height: 100vh;
  line-height: 1.1;
}
</style>
