<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@/components/button';
import { Camera, Star } from 'lucide-vue-next';

const switcherState = ref(false);
</script>

<template>
  <div class="container flex flex-col items-center gap-4">
    <div class="flex items-center gap-4">
      <Button>primary</Button>
      <Button size="lg">large</Button>
      <Button size="sm">small</Button>
      <Button disabled>Disable</Button>
      <Button :limitWidth="false">B</Button>
    </div>
    <div class="flex items-center gap-4">
      <Button type="normal">normal</Button>
      <Button type="normal" size="lg">large</Button>
      <Button type="normal" size="sm">small</Button>
      <Button type="normal" disabled>Disable</Button>
    </div>
    <div class="flex items-center gap-4">
      <Button type="outline">outline</Button>
      <Button type="outline" size="lg">large</Button>
      <Button type="outline" size="sm">small</Button>
      <Button type="outline" disabled>Disable</Button>
    </div>
    <div class="flex items-center gap-4">
      <Button type="text">text</Button>
      <Button type="text" size="lg">large</Button>
      <Button type="text" size="sm">small</Button>
      <Button type="text" disabled>Disable</Button>
    </div>
    <div class="flex items-center gap-4">
      <Button type="icon"><Camera /></Button>
      <Button type="icon" size="lg"><Camera /></Button>
      <Button type="icon" size="sm"><Camera /></Button>
      <Button type="icon" disabled><Camera /></Button>
    </div>
    <div class="flex items-center gap-4">
      <Button type="icon" tooltip="camera">
        <Camera />
      </Button>
      <Button type="icon" size="lg">
        <template #default>
          <Camera />
        </template>
        <template #tooltip>
          <span>custome tooltip</span>
        </template>
      </Button>
      <Button
        type="icon"
        size="sm"
        tooltip="camera"
        :tooltipContentProps="{ align: 'end', side: 'bottom' }"
      >
        <Camera />
      </Button>
      <Button type="icon" disabled tooltip="camera"><Camera /></Button>
    </div>
    <div class="flex items-center gap-4">
      <Button type="switcher" :checked="switcherState" @click="switcherState = !switcherState">
        <Star :class="[switcherState && 'fill-hff']" />
        <span>Favorite</span>
      </Button>
      <Button
        type="switcher"
        size="lg"
        :checked="switcherState"
        @click="switcherState = !switcherState"
      >
        <Star :class="[switcherState && 'fill-hff']" />
        <span>Favorite</span>
      </Button>
      <Button
        type="switcher"
        size="sm"
        :checked="switcherState"
        tooltip="Favorite"
        @click="switcherState = !switcherState"
      >
        <Star :class="[switcherState && 'fill-hff']" />
        <span>Favorite</span>
      </Button>
      <Button type="switcher" :checked="switcherState" disabled>
        <Star :class="[switcherState && 'fill-hff']" />
        <span>Favorite</span>
      </Button>
    </div>
  </div>
</template>
