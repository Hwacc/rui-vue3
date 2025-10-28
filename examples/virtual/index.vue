<script setup lang="ts">
import { faker } from '@faker-js/faker'
import { VirtualList, VirtualListItem } from '@rui/add-ons/components/virtual'
import { ref } from 'vue'

const longNameList = ref(
  Array.from({ length: 1000 })
    .fill(0)
    .map(() => faker.person.fullName()),
)
const longSentenceList = ref(
  Array.from({ length: 100 })
    .fill(0)
    .map(() => faker.lorem.sentence({ min: 20, max: 70 })),
)
const asyncSentenceList = ref(
  Array.from({ length: 10 })
    .fill(0)
    .map(() => faker.lorem.sentence({ min: 20, max: 70 })),
)
</script>

<template>
  <div class="container flex flex-col items-center gap-4">
    <div class="flex w-full items-center gap-4">
      <VirtualList
        class="flex-1 h-[400px]"
        :data-source="longNameList"
      >
        <VirtualListItem v-slot="{ data, index }">
          {{ `${data} @ ${index}` }}
        </VirtualListItem>
      </VirtualList>
      <VirtualList
        class="flex-1 h-[100px]"
        :data-source="longNameList"
        horizontal
        :estimate-size="() => 100"
      >
        <VirtualListItem v-slot="{ data, index }">
          {{ `${data} @ ${index}` }}
        </VirtualListItem>
      </VirtualList>
    </div>
    <div class="flex w-full items-center gap-4">
      <VirtualList
        class="flex-1 h-[400px]"
        :gap="20"
        :data-source="longSentenceList"
        :ui="{
          viewport: {
            class: 'overflow-x-hidden',
          },
        }"
      >
        <VirtualListItem
          v-slot="{ data }"
          class="w-full wrap-break-word overflow-hidden"
          dynamic
        >
          <div>{{ data }}</div>
        </VirtualListItem>
      </VirtualList>
      <VirtualList
        class="flex-1 h-[400px]"
        :gap="20"
        :data-source="asyncSentenceList"
        :ui="{
          viewport: {
            class: 'overflow-x-hidden',
          },
        }"
      >
        <template #default>
          <VirtualListItem
            v-slot="{ data }"
            class="w-full wrap-break-word overflow-hidden"
            dynamic
          >
            <div>{{ data }}</div>
          </VirtualListItem>
        </template>
      </VirtualList>
    </div>
  </div>
</template>
