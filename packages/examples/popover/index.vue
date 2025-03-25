<script setup lang="tsx">
import { Button } from '@/components/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  useGraceArea,
} from '@/components/popover';
import { ref, watch } from 'vue';

const Aref = ref<HTMLElement | null>(null);
const Bref = ref<HTMLElement | null>(null);

const { isPointerInTransit } = useGraceArea(Aref, Bref);
watch(isPointerInTransit, (v) => {
  console.log('isPointerInTransit', v);
});
</script>

<template>
  <div class="container flex flex-col items-center gap-4">
    <div class="flex gap-2">
      <Popover>
        <PopoverTrigger trigger="click">
          <Button as="div">Trigger</Button>
        </PopoverTrigger>
        <PopoverContent>
          popper content
          <PopoverArrow />
        </PopoverContent>
      </Popover>

      <div class="flex items-center gap-4">
        <div ref="Aref" class="flex-c size-10 bg-hbb">A</div>
        <div ref="Bref" class="flex-c size-20 bg-hbb">B</div>
      </div>
    </div>
  </div>
</template>
