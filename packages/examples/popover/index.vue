<script setup lang="tsx">
import { Button } from '@/components/button';
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow } from '@/components/popover';
</script>

<template>
  <div class="container flex flex-col items-center gap-4">
    <div class="flex gap-2">
      <Popover default-open>
        <PopoverTrigger trigger="click" mode="mouse-only">
          <Button as="div">Trigger</Button>
        </PopoverTrigger>
        <PopoverContent class="flex flex-col items-center">
          popper content
          <Button>Im a Button in Content</Button>
          <PopoverArrow />
        </PopoverContent>
      </Popover>
    </div>
  </div>
</template>
