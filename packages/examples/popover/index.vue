<script setup lang="tsx">
import { Button } from '@/components/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow
} from '@/components/popover';
</script>

<template>
  <div class="container flex flex-col items-center gap-4">
    <div class="flex gap-2">
      <Popover>
        <PopoverTrigger trigger="hover" mode="mouse-only">
          <Button as="div">Trigger</Button>
        </PopoverTrigger>
        <PopoverContent :side-offset="20">
          popper content
          <PopoverArrow />
        </PopoverContent>
      </Popover>
    </div>
  </div>
</template>
