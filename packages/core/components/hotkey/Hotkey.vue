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
  <div aria-label="test" role="button" tab-index="0" @keydown="() => {}">
    <Primitive as="span" >
      test
    </Primitive>
  </div>
</template>
