<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogContentBody,
  DialogFooter,
  DialogHeader,
} from '@rui/core/components/dialog'

const emits = defineEmits<{
  close: []
}>()
</script>

<template>
  <Dialog @update:open="(isOpen) => !isOpen && emits('close')">
    <DialogContent class="w-[400px]">
      <DialogHeader>Dialog Header</DialogHeader>
      <DialogContentBody>
        <p class="h-[2000px]">
          Really long dialog content.
        </p>
      </DialogContentBody>
      <DialogFooter />
    </DialogContent>
  </Dialog>
</template>
