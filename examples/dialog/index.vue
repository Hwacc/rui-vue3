<script setup lang="tsx">
import { Button } from '@rui/core/components/button'
import {
  Dialog,
  dialog,
  DialogCloseFrom,
  DialogContent,
  DialogContentBody,
  DialogFooter,
  DialogHeader,
  DialogScrollContent,
  DialogTrigger,
} from '@rui/core/components/dialog'
import DialogClose from '@rui/core/components/dialog/DialogClose.vue'

function onContentClose({ from }: { from: DialogCloseFrom | undefined }) {
  console.log('on close from:', from)
}

function onOpenDialogClick() {
  dialog({
    title: 'Dialog Title',
    content: () => {
      return (
        <div class="h-[2000px]">
          <p>Really long dialog content.</p>
        </div>
      )
    },
    onClose: ({ from }) => {
      console.log('on close from:', from)
    },
    footer: () => {
      return (
        <>
          <DialogClose closeFrom={DialogCloseFrom.CancelButton}>
            <Button class="min-w-22.5 uppercase" variant="text" size="sm">
              Cancel
            </Button>
          </DialogClose>
          <Button
            class="min-w-22.5 uppercase"
            size="sm"
            onClick={() => {
              dialog({
                title: 'New Dialog Title',
                content: () => {
                  return <div>New Dialog Content</div>
                },
                onClose: ({ from }) => {
                  console.log('on close from:', from)
                },
              })
            }}
          >
            OK
          </Button>
        </>
      )
    },
  })
}
</script>

<template>
  <div class="container flex justify-center items-center gap-4">
    <Dialog>
      <DialogTrigger><Button>Open Dialog</Button></DialogTrigger>
      <DialogContent class="w-[400px]" @close="onContentClose">
        <DialogHeader>Dialog Header</DialogHeader>
        <DialogContentBody>
          <p class="h-[2000px]">
            Really long dialog content.
          </p>
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
          <p class="h-[2000px]">
            Really long dialog content.
          </p>
        </DialogContentBody>
        <DialogFooter />
      </DialogScrollContent>
    </Dialog>
    <Button @click="onOpenDialogClick">
      Open Dialog by Function
    </Button>
  </div>
</template>
