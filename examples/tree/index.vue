<script setup lang="ts">
import { Tree } from '@rui/core/components/tree'
import { Tree as TreeEx } from '@rui/core/components/tree-ex'
import { ref } from 'vue'

const data = ref([
  {
    title: 'node-1',
    key: 'node-1',
    myChildren: [
      {
        title: 'node-1-1',
        key: 'node-1-1',
        myChildren: [
          {
            title: 'node-1-1-1',
            key: 'node-1-1-1',
            checked: false,
          },
          {
            title: 'node-1-1-2',
            key: 'node-1-1-2',
            checked: true,
          },
          {
            title: 'node-1-1-3',
            key: 'node-1-1-3',
            checked: true,
          },
        ],
      },
      {
        title: 'node-1-2',
        key: 'node-1-2',
        myChildren: [
          {
            title: 'node-1-2-1',
            key: 'node-1-2-1',
          },
          {
            title: 'node-1-2-2',
            key: 'node-1-2-2',
          },
        ],
      },
      {
        title: 'node-1-3',
        key: 'node-1-3',
        myChildren: [
          {
            title: 'node-1-3-1',
            key: 'node-1-3-1',
          },
          {
            title: 'node-1-3-2',
            key: 'node-1-3-2',
          },
        ],
      },
    ],
  },
  {
    title: 'node-2',
    key: 'node-2',
    myChildren: [
      {
        title: 'node-2-1',
        key: 'node-2-1',
        myChildren: [
          {
            title: 'node-2-1-1',
            key: 'node-2-1-1',
          },
          {
            title: 'node-2-1-2',
            key: 'node-2-1-2',
          },
        ],
      },
    ],
  },
])
</script>

<template>
  <div class="container flex flex-col items-center gap-4">
    <TreeEx
      :data="data"
      :field="{
        id: 'key',
        children: 'myChildren',
      }"
    />
  </div>
</template>
