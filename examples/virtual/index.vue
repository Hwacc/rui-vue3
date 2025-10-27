<script setup lang="ts">
import { FixedVirtualList, FixedVirtualListItem } from '@rui/add-ons/components/virtual'
import { ref } from 'vue'

const longList = ref(Array.from({ length: 1000 }).fill(0).map((_, i) => i))

console.log('longList', longList.value)
</script>

<template>
  <div class="container flex flex-col items-center gap-4">
    <FixedVirtualList :data-source="longList">
      <FixedVirtualListItem v-slot="{ data }">
        {{ data }}
      </FixedVirtualListItem>
    </FixedVirtualList>
  </div>
</template>
