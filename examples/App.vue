<script lang="ts" setup>
import type { ToastPosition } from '@rui/core/components/toast'
import { Button } from '@rui/core/components/button'
import { Config } from '@rui/core/config'

import { ref } from 'vue'
import ButtonExample from './buttons/index.vue'
import CheckboxExample from './checkbox/index.vue'
import CollapsibleExample from './collapsible/index.vue'
import DialogExample from './dialog/index.vue'
import DropdownExample from './dropdown/index.vue'
import HotkeyExample from './hotkey/index.vue'
import InputExample from './input/index.vue'
import PopoverExample from './popover/index.vue'
import ProgressExample from './progress/index.vue'
import RadioExample from './radio/index.vue'
import ScrollAreaExample from './scroll-area/index.vue'
import SelectExample from './select/index.vue'
import SeparatorExample from './separator/index.vue'
import SheetExample from './sheet/index.vue'
import SkeletonExample from './skeleton/index.vue'
import SliderRekaExample from './slider-reka/index.vue'
import SliderExample from './slider/index.vue'
import SwitchExample from './switch/index.vue'
import TabsExample from './tabs/index.vue'
import TagsInputExample from './tags-input/index.vue'
import ToastExample from './toast/index.vue'

import VLazyExample from './v-lazy/index.vue'
import VTitleExample from './v-title/index.vue'

const compSize = ref<'base' | 'sm' | 'lg'>('base')
const toastPosition = ref<ToastPosition>('bottom-right')
</script>

<template>
  <Config
    :toaster="{
      position: toastPosition,
      duration: 5000,
    }"
  >
    <div class="flex items-center gap-2">
      <Button
        :size="compSize"
        @click="() => (compSize === 'base' ? (compSize = 'sm') : (compSize = 'base'))"
      >
        Change Size
      </Button>
      <div class="test-block p-1!">
        Current Size: {{ compSize }}
      </div>
    </div>
    <div class="content flex-col-c gap-4 pb-[5rem]">
      <ButtonExample />
      <VTitleExample />
      <InputExample />
      <SwitchExample />
      <CheckboxExample />
      <RadioExample />
      <SliderExample />
      <SliderRekaExample />
      <TabsExample />
      <CollapsibleExample />
      <DialogExample />
      <ToastExample v-model="toastPosition" />
      <DropdownExample />
      <SelectExample />
      <PopoverExample />
      <ProgressExample />
      <ScrollAreaExample />
      <TagsInputExample />
      <HotkeyExample />
      <SeparatorExample />
      <SheetExample />
      <SkeletonExample />
      <VLazyExample />
    </div>
  </Config>
</template>

<style scoped>
.content {
  min-height: 100vh;
  line-height: 1.1;
}
</style>
