<script setup lang="ts">
import { Hotkey } from '@rui/core/components/hotkey'
import { useMessage } from '@rui/core/components/message'
import { ref, watch } from 'vue'

const hotkey = ref('')

const { message } = useMessage()
function onChange(codes: string[]) {
  if (codes.length === 0) {
    message({
      title: 'Deleted',
      variant: 'warning',
    })
    return
  }
  message({
    title: 'Set success',
    variant: 'success',
  })
}
</script>

<template>
  <div>
    <Hotkey v-model:hotkey="hotkey" class="w-[250px]" @change="onChange" />
    <Hotkey v-model:hotkey="hotkey" class="w-[250px]" @change="onChange" />
  </div>
</template>
