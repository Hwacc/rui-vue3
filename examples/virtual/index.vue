<script setup lang="ts">
import type { LoadingStateHandler } from '@rui/add-ons/components/virtual'
import { faker } from '@faker-js/faker'
import {
  VirtualGrid,
  VirtualInfiniteLoading,
  VirtualList,
  VirtualListItem,
} from '@rui/add-ons/components/virtual'
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

let requestCount = 0
async function loadMore($state: LoadingStateHandler) {
  $state.loading()
  await new Promise(resolve => setTimeout(resolve, 1000))
  asyncSentenceList.value.push(
    ...Array.from({ length: 1 })
      .fill(0)
      .map(() => faker.lorem.sentence(5)),
  )
  console.log('requestCount', requestCount)
  $state.error()
  requestCount++
  if (requestCount >= 5)
    $state.error()
}
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
        class="flex-1 h-[400px] overflow-x-hidden"
        :gap="20"
        :data-source="longSentenceList"
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
        class="flex-1 h-[400px] overflow-x-hidden"
        :gap="20"
        :data-source="asyncSentenceList"
      >
        <VirtualListItem
          v-slot="{ data }"
          class="w-full wrap-break-word overflow-hidden"
          dynamic
        >
          <div>{{ data }}</div>
        </VirtualListItem>
        <VirtualInfiniteLoading @infinite="loadMore" />
      </VirtualList>
    </div>
    <div class="flex w-full items-center gap-4">
      <VirtualGrid
        class="flex-1 h-[400px] overflow-x-hidden"
        :data-source="longNameList"
        :row="4"
        :column="2"
      >
        <VirtualListItem
          v-slot="{ data }"
          class="w-full wrap-break-word overflow-hidden"
          dynamic
        >
          <div>{{ data }}</div>
        </VirtualListItem>
      </VirtualGrid>
    </div>
  </div>
</template>
