<script setup lang="ts">
import { Button } from '@/components/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogContentBody,
} from '@/components/dialog';
</script>

<template>
  <div class="container flex items-center gap-4">
    <Dialog>
      <DialogTrigger><Button>Open Dialog</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>Dialog Header</DialogHeader>
        <DialogContentBody>
          <p>Dialog Content</p>
        </DialogContentBody>
        <DialogFooter />
      </DialogContent>
    </Dialog>
  </div>
</template>
