<script lang="ts">
export interface HotkeyProps {
  hotkey: string | string[];
  disabled: boolean;
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui';

const {} = defineProps({});
</script>

<template>
  <div>
    <Primitive as="span" class="outline-2">
      
    </Primitive>
  </div>
</template>
