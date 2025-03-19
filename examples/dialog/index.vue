<script setup lang="ts">
import { Button } from '@/components/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogContentBody,
  DialogCloseFrom,
  DialogScrollContent
} from '@/components/dialog';

const onContentClose = ({ from }: { from: DialogCloseFrom | undefined }) => {
  console.log('on close from:', from);
};
</script>

<template>
  <div class="container flex items-center gap-4">
    <Dialog>
      <DialogTrigger><Button>Open Dialog</Button></DialogTrigger>
      <DialogContent class="w-[400px]" @close="onContentClose">
        <DialogHeader>Dialog Header</DialogHeader>
        <DialogContentBody>
          <p class="h-[2000px]">Really long dialog content.</p>
        </DialogContentBody>
        <DialogFooter />
      </DialogContent>
    </Dialog>
    <Dialog>
      <DialogTrigger><Button>Open No Header Dialog</Button></DialogTrigger>
      <DialogContent @close="onContentClose">
        <DialogContentBody>
          <p>Dialog Content</p>
        </DialogContentBody>
        <DialogFooter />
      </DialogContent>
    </Dialog>
    <Dialog>
      <DialogTrigger><Button>Open Overlay Scroll Dialog</Button></DialogTrigger>
      <DialogScrollContent @close="onContentClose">
        <DialogContentBody>
          <p class="h-[2000px]">Really long dialog content.</p>
        </DialogContentBody>
        <DialogFooter />
      </DialogScrollContent>
    </Dialog>
  </div>
</template>
