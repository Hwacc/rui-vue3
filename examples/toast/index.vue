<script setup lang="ts">
import { Button } from '@/components/button';
import { toast } from '@/components/toast';

const onOpenToastClick = () => {
  toast({
    title: 'Toast Title',
    description: 'Toast Description',
    duration: 0,
  });
};
</script>

<template>
  <div class="container flex items-center gap-4">
    <Button @click="onOpenToastClick">Open a Toast</Button>
  </div>
</template>
