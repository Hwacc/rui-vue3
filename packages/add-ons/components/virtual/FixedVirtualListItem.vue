<script lang="ts" generic="T" setup>
import { defineProps, defineSlots } from 'vue'

const { data } = defineProps<{ data?: T }>()
defineSlots<{ default: { data: T } }>()
</script>

<template>
  <div v-bind="$attrs">
    <slot :data="data" />
  </div>
</template>
