import { createApp, defineComponent, nextTick, ref, watch } from 'vue';
import {
  Dialog,
  DialogContent,
  DialogContentBody,
  DialogFooter,
  DialogHeader,
} from '@/components/dialog';

export const useDialog = () => {
  const open = ref(false);
  const modalRef = ref<{ $el: HTMLDivElement } | null>(null);
  const openDialog = () => {
    const DialogComponent = defineComponent({
      name: 'Dialog',
      setup() {
        return () => (
          <Dialog v-model={[open.value, 'open']}>
            <DialogContent class='w-[400px]' ref={modalRef}>
              <DialogHeader>Dialog Header</DialogHeader>
              <DialogContentBody>
                <p class='h-[2000px]'>Really long dialog content.</p>
              </DialogContentBody>
              <DialogFooter />
            </DialogContent>
          </Dialog>
        );
      },
    });
    // create a dialog
    let dialogRoot: HTMLDivElement | null = document.createElement('div');
    const dialogApp = createApp(DialogComponent);
    dialogApp.mount(dialogRoot);
    open.value = true;
    watch(open, async (value) => {
      if (!value) {
        await nextTick();
        modalRef.value?.$el?.addEventListener('animationend', () => {
          dialogApp.unmount();
          dialogRoot = null;
        });
      }
    });
    const close = () => {
      open.value = false;
    };
    return [close];
  };
  return [openDialog];
};
