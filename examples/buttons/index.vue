<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/core/components/button'
import { Camera, Star } from 'lucide-vue-next'

const switcherState = ref(false)
</script>

<template>
  <div class="container flex flex-col items-center gap-4">
    <div class="flex items-center gap-4">
      <Button ripple>primary</Button>
      <Button size="lg">large</Button>
      <Button size="sm">small</Button>
      <Button disabled>Disable</Button>
      <Button :limitWidth="false">B</Button>
    </div>
    <div class="flex items-center gap-4">
      <Button variant="normal" ripple>normal</Button>
      <Button variant="normal" size="lg">large</Button>
      <Button variant="normal" size="sm">small</Button>
      <Button variant="normal" disabled>Disable</Button>
    </div>
    <div class="flex items-center gap-4">
      <Button variant="outline" ripple>outline</Button>
      <Button variant="outline" size="lg">large</Button>
      <Button variant="outline" size="sm">small</Button>
      <Button variant="outline" disabled>Disable</Button>
    </div>
    <div class="flex items-center gap-4">
      <Button variant="text" ripple>text</Button>
      <Button variant="text" size="lg">large</Button>
      <Button variant="text" size="sm">small</Button>
      <Button variant="text" disabled>Disable</Button>
    </div>
    <div class="flex items-center gap-4">
      <Button variant="icon" ripple><Camera /></Button>
      <Button variant="icon" size="lg"><Camera /></Button>
      <Button variant="icon" size="sm"><Camera /></Button>
      <Button variant="icon" disabled><Camera /></Button>
    </div>
    <div class="flex items-center gap-4">
      <Button variant="icon" tooltip="camera">
        <Camera />
      </Button>
      <Button variant="icon" size="lg">
        <template #default>
          <Camera />
        </template>
        <template #tooltip>
          <span>custome tooltip</span>
        </template>
      </Button>
      <Button
        variant="icon"
        size="sm"
        tooltip="camera"
        :tooltipContentProps="{ align: 'end', side: 'bottom', sideOffset: 6 }"
      >
        <Camera />
      </Button>
      <Button variant="icon" disabled tooltip="camera"><Camera /></Button>
    </div>
    <div class="flex items-center gap-4">
      <Button
        variant="switch"
        :checked="switcherState"
        @click="switcherState = !switcherState"
      >
        <Star :class="[switcherState && 'fill-hff']" />
        <span>Favorite</span>
      </Button>
      <Button
        variant="switch"
        size="lg"
        :checked="switcherState"
        @click="switcherState = !switcherState"
      >
        <Star :class="[switcherState && 'fill-hff']" />
        <span>Favorite</span>
      </Button>
      <Button
        variant="switch"
        size="sm"
        :checked="switcherState"
        tooltip="Favorite"
        @click="switcherState = !switcherState"
      >
        <Star :class="[switcherState && 'fill-hff']" />
        <span>Favorite</span>
      </Button>
      <Button variant="switch" :checked="switcherState" disabled>
        <Star :class="[switcherState && 'fill-hff']" />
        <span>Favorite</span>
      </Button>
    </div>
  </div>
</template>
