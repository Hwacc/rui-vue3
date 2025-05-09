<script setup lang="ts">
import { Skeleton } from '@rui/core/components/skeleton'
</script>

<template>
  <div class="container flex justify-center items-center gap-4">
    <Skeleton class="size-10" />
    <Skeleton class="size-10" shape="circle" />
    <Skeleton class="size-10" variant="wave" />
    <Skeleton class="size-10" variant="wave" shape="circle" />
  </div>
</template>
