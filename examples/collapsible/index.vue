<script setup lang="ts">
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/collapsible';
</script>

<template>
  <div class="container flex flex-col items-center gap-4">
    <Collapsible>
      <CollapsibleTrigger>trigger</CollapsibleTrigger>
      <CollapsibleContent>
        <p>test</p>
      </CollapsibleContent>
    </Collapsible>
  </div>
</template>
