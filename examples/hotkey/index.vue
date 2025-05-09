<script setup lang="ts">
import { Hotkey } from '@rui/core/components/hotkey'
import { useMessage } from '@rui/core/components/message'
import { ref, watch } from 'vue'

const hotkey = ref('')

const { message } = useMessage()
const onChange = (codes: string[]) => {
  if (codes.length === 0) {
    message({
      title: 'Deleted',
      variant: 'warning'
    })
    return
  }
  message({
    title: 'Set success',
    variant: 'success'
  })
}
</script>

<template>
  <div>
    <Hotkey v-model:hotkey="hotkey" @change="onChange" class="w-[250px]" />
    <Hotkey v-model:hotkey="hotkey" @change="onChange" class="w-[250px]" />
  </div>
</template>
