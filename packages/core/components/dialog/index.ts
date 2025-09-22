import type { VariantProps } from 'tailwind-variants'
import { PREFIX } from '@rui/core/lib/constants'
import { tv } from '@rui/core/lib/tv'

export { default as Dialog } from './Dialog.vue'
export { default as DialogClose } from './DialogClose.vue'
export { default as DialogContent } from './DialogContent.vue'
export { default as DialogContentBody } from './DialogContentBody.vue'
export { default as DialogBody } from './DialogContentBody.vue'
export { default as DialogFooter } from './DialogFooter.vue'
export { default as DialogHeader } from './DialogHeader.vue'
export { default as DialogScrollContent } from './DialogScrollContent.vue'
export { default as DialogTrigger } from './DialogTrigger.vue'
export { dialog } from './use-dialog'

export enum DialogCloseFrom {
  Overlay = 'overlay',
  CloseButton = 'close-button',
  OKButton = 'ok-button',
  CancelButton = 'cancel-button',
  EscapeKey = 'escape-key',
}

const prefix = `${PREFIX}-dialog`

export const tvDialog = tv(
  {
    slots: {
      root: '',
      overlay: [
        'fixed',
        'inset-0',
        'z-50',
        'data-[state=open]:motion-opacity-in',
        'data-[state=closed]:motion-opacity-out',
      ],
      trigger: '',
      content: [
        'max-w-full',
        'md:max-w-[80%]',
        'z-50',
        'outline-none',
        'border',
        'rounded',
        'data-[state=open]:animate-fade-down-in',
        'data-[state=closed]:animate-fade-down-out',
      ],
      body: ['flex-1', 'p-6', 'overflow-y-auto'],
      header: ['flex', 'items-center', 'justify-between', 'py-2.5', 'px-5', 'text-sm'],
      footer: ['flex', 'items-center', 'justify-end', 'gap-5', 'p-4'],
      close: ['group'],
    },
    variants: {
      variant: {
        default: '',
        scroll: '',
      },
      position: {
        center: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      position: 'center',
    },
    compoundSlots: [
      {
        slots: ['content'],
        variant: 'default',
        class: ['fixed', 'flex', 'flex-col', 'max-h-[80%]'],
      },
      {
        slots: ['content'],
        variant: 'scroll',
        class: ['relative'],
      },
      {
        slots: ['content'],
        variant: 'default',
        position: 'center',
        class: ['left-1/2', 'top-1/2', '-translate-x-1/2', '-translate-y-1/2'],
      },
      {
        slots: ['content'],
        variant: 'scroll',
        position: 'center',
        class: ['mx-auto', 'my-8'],
      },
      {
        slots: ['overlay'],
        variant: 'scroll',
        class: 'overflow-y-auto',
      },
    ],
  },
  {
    slots: {
      root: prefix,
      overlay: `${prefix}-overlay`,
      trigger: `${prefix}-trigger`,
      content: `${prefix}-content`,
      body: `${prefix}-body`,
      header: `${prefix}-header`,
      footer: `${prefix}-footer`,
      close: `${prefix}-close`,
    },
  },
)

export type DialogVariants = VariantProps<typeof tvDialog>
