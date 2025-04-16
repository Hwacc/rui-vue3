<script setup lang="ts">
import { Button } from '@/core/components/button'
import { Sheet, SheetContent, SheetTrigger } from '@/core/components/sheet'
</script>

<template>
  <div class="container flex flex-col items-center gap-4">
    <Sheet>
      <SheetTrigger><Button as="div">Open Sheet</Button></SheetTrigger>
      <SheetContent>Sheet Content</SheetContent>
    </Sheet>
  </div>
</template>
