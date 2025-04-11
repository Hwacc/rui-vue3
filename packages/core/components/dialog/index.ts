import { PREFIX } from '@/core/lib/constants'
import { VariantProps } from 'class-variance-authority'
import { cva } from '@/core/lib/cva'

export { default as Dialog } from './Dialog.vue'
export { default as DialogClose } from './DialogClose.vue'
export { default as DialogContent } from './DialogContent.vue'
export { default as DialogFooter } from './DialogFooter.vue'
export { default as DialogHeader } from './DialogHeader.vue'
export { default as DialogScrollContent } from './DialogScrollContent.vue'
export { default as DialogTrigger } from './DialogTrigger.vue'
export { default as DialogContentBody } from './DialogContentBody.vue'
export { dialog } from './use-dialog'

export enum DialogCloseFrom {
  Overlay = 'overlay',
  CloseButton = 'close-button',
  OKButton = 'ok-button',
  CancelButton = 'cancel-button',
  EscapeKey = 'escape-key'
}

const prefix = `${PREFIX}-dialog`
export const dialogOverlayVariants = cva(
  [
    'fixed',
    'inset-0',
    'z-50',
    'data-[state=open]:animate-in',
    'data-[state=open]:fade-in',
    'data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out'
  ],
  undefined,
  { className: `${prefix}-overlay` }
)
export type DialogOverlayVariantsProps = VariantProps<
  typeof dialogOverlayVariants
>

export const dialogContentVariants = cva(
  [
    'relative',
    'max-w-full',
    'md:max-w-[80%]',
    'z-50',
    'outline-none',
    'border',
    'rounded',
    'data-[state=open]:animate-fade-down-in',
    'data-[state=closed]:animate-fade-down-out'
  ],
  {
    variants: {
      variant: {
        default: ['fixed', 'flex', 'flex-col', 'max-h-[80%]'],
        scroll: []
      },
      position: {
        center: ''
      }
    },
    defaultVariants: {
      position: 'center'
    },
    compoundVariants: [
      {
        variant: 'default',
        position: 'center',
        className: [
          'left-1/2',
          'top-1/2',
          '-translate-x-1/2',
          '-translate-y-1/2'
        ]
      },
      {
        variant: 'scroll',
        position: 'center',
        className: ['mx-auto', 'my-8']
      }
    ]
  },
  { className: `${prefix}-content` }
)
export type DialogContentVariantsProps = VariantProps<
  typeof dialogContentVariants
>

export const dialogCloseVariants = cva(
  ['group'],
  undefined,
  { className: `${prefix}-close` }
)

export const dialogContentBodyVariants = cva(
  ['flex-1', 'p-6', 'overflow-y-auto'],
  undefined,
  {
    className: `${prefix}-body`
  }
)

export const dialogHeaderVariants = cva(
  ['flex', 'items-center', 'justify-between', 'py-2.5', 'px-5', 'text-sm'],
  undefined,
  { className: `${prefix}-header` }
)

export const dialogFooterVariants = cva(
  ['flex', 'items-center', 'justify-end', 'gap-5', 'p-4'],
  undefined,
  { className: `${prefix}-footer` }
)
