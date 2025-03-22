<script setup lang="tsx">
import { Button } from '@/components/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogContentBody,
  DialogCloseFrom,
  DialogScrollContent,
  dialog,
} from '@/components/dialog';
import DialogClose from '@/components/dialog/DialogClose.vue';

const onContentClose = ({ from }: { from: DialogCloseFrom | undefined }) => {
  console.log('on close from:', from);
};

const onOpenDialogClick = () => {
  dialog({
    title: 'Dialog Title',
    content: () => {
      return (
        <div class='h-[2000px]'>
          <p>Really long dialog content.</p>
        </div>
      );
    },
    onClose: ({ from }) => {
      console.log('on close from:', from);
    },
    footer: () => {
      return (
        <>
          <DialogClose closeFrom={DialogCloseFrom.CancelButton}>
            <Button class='min-w-22.5 uppercase' type='text' size='sm'>
              Cancel
            </Button>
          </DialogClose>
          <Button
            class='min-w-22.5 uppercase'
            size='sm'
            onClick={() => {
              dialog({
                title: 'New Dialog Title',
                content: () => {
                  return <div>New Dialog Content</div>;
                },
                onClose: ({ from }) => {
                  console.log('on close from:', from);
                },
              });
            }}>
            OK
          </Button>
        </>
      );
    },
  });
};
</script>

<template>
  <div class="container flex justify-center items-center gap-4">
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
    <Button @click="onOpenDialogClick">Open Dialog by Function</Button>
  </div>
</template>
