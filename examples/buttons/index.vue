<script setup lang="ts">
import { Button } from '@rui/core/components/button'
import { Icon } from '@rui/core/components/icon'
import { ref } from 'vue'

const switcherState = ref(false)
</script>

<template>
  <div class="container flex flex-col items-center gap-4">
    <div class="flex items-center gap-4">
      <Button ripple>
        primary
      </Button>
      <Button size="lg">
        large
      </Button>
      <Button size="sm">
        small
      </Button>
      <Button disabled>
        Disable
      </Button>
      <Button :limit-width="false">
        B
      </Button>
    </div>
    <div class="flex items-center gap-4">
      <Button variant="normal" ripple>
        normal
      </Button>
      <Button variant="normal" size="lg">
        large
      </Button>
      <Button variant="normal" size="sm">
        small
      </Button>
      <Button variant="normal" disabled>
        Disable
      </Button>
    </div>
    <div class="flex items-center gap-4">
      <Button variant="outline" ripple>
        outline
      </Button>
      <Button variant="outline" size="lg">
        large
      </Button>
      <Button variant="outline" size="sm">
        small
      </Button>
      <Button variant="outline" disabled>
        Disable
      </Button>
    </div>
    <div class="flex items-center gap-4">
      <Button variant="text" ripple>
        text
      </Button>
      <Button variant="text" size="lg">
        large
      </Button>
      <Button variant="text" size="sm">
        small
      </Button>
      <Button variant="text" disabled>
        Disable
      </Button>
    </div>
    <div class="flex items-center gap-4">
      <Button variant="icon" ripple>
        <Icon icon="lucide:camera" />
      </Button>
      <Button variant="icon" size="lg">
        <Icon icon="lucide:camera" />
      </Button>
      <Button variant="icon" size="sm">
        <Icon icon="lucide:camera" />
      </Button>
      <Button variant="icon" disabled>
        <Icon icon="lucide:camera" />
      </Button>
    </div>
    <div class="flex items-center gap-4">
      <Button variant="icon" tooltip="camera">
        <Icon icon="lucide:camera" />
      </Button>
      <Button variant="icon" size="lg">
        <template #default>
          <Icon icon="lucide:camera" />
        </template>
        <template #tooltip>
          <span>custome tooltip</span>
        </template>
      </Button>
      <Button
        variant="icon"
        size="sm"
        tooltip="camera"
        :tooltip-content-props="{ align: 'end', side: 'bottom', sideOffset: 6 }"
      >
        <Icon icon="lucide:camera" />
      </Button>
      <Button variant="icon" disabled tooltip="camera">
        <Icon icon="lucide:camera" />
      </Button>
    </div>
    <div class="flex items-center gap-4">
      <Button
        variant="switch"
        :checked="switcherState"
        @click="switcherState = !switcherState"
      >
        <Icon :class="[switcherState && '[&>path]:fill-hff']" icon="lucide:star" />
        <span>Favorite</span>
      </Button>
      <Button
        variant="switch"
        size="lg"
        :checked="switcherState"
        @click="switcherState = !switcherState"
      >
        <Icon :class="[switcherState && '[&>path]:fill-hff']" icon="lucide:star" />
        <span>Favorite</span>
      </Button>
      <Button
        variant="switch"
        size="sm"
        :checked="switcherState"
        tooltip="Favorite"
        @click="switcherState = !switcherState"
      >
        <Icon :class="[switcherState && '[&>path]:fill-hff']" icon="lucide:star" />
        <span>Favorite</span>
      </Button>
      <Button variant="switch" :checked="switcherState" disabled>
        <Icon :class="[switcherState && '[&>path]:fill-hff']" icon="lucide:star" />
        <span>Favorite</span>
      </Button>
    </div>
  </div>
</template>
