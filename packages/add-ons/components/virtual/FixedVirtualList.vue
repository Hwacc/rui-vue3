<script lang="ts" generic="T" setup>
import type { VirtualListProps } from '.'
import { FixedVirtualListImpl, VirtualRoot } from '.'

const props = defineProps<VirtualListProps<T>>()
</script>

<template>
  <VirtualRoot>
    <FixedVirtualListImpl v-bind="{ ...props, ...$attrs }">
      <slot />
    </FixedVirtualListImpl>
  </VirtualRoot>
</template>
