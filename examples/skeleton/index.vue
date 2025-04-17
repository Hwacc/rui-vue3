<script setup lang="ts">
import { Skeleton } from '@/core/components/skeleton'
</script>

<template>
  <div class="container flex justify-center items-center gap-4">
    <Skeleton class="size-10" />
    <Skeleton class="size-10" shape="circle" />
  </div>
</template>
