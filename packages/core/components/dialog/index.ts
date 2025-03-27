import { PREFIX } from '@/lib/constants';
import { cva, VariantProps } from 'class-variance-authority';

export { default as Dialog } from './Dialog.vue';
export { default as DialogClose } from './DialogClose.vue';
export { default as DialogContent } from './DialogContent.vue';
export { default as DialogFooter } from './DialogFooter.vue';
export { default as DialogHeader } from './DialogHeader.vue';
export { default as DialogScrollContent } from './DialogScrollContent.vue';
export { default as DialogTrigger } from './DialogTrigger.vue';
export { default as DialogContentBody } from './DialogContentBody.vue';
export { dialog } from './use-dialog';

export enum DialogCloseFrom {
  Overlay = 'overlay',
  CloseButton = 'close-button',
  OKButton = 'ok-button',
  CancelButton = 'cancel-button',
  EscapeKey = 'escape-key',
}

const prefix = `${PREFIX}-dialog`;
export const dialogOverlayVariants = cva([
  'fixed',
  'inset-0',
  'z-50',
  'data-[state=open]:animate-in',
  'data-[state=open]:fade-in',
  'data-[state=closed]:animate-out',
  'data-[state=closed]:fade-out',
  `${prefix}-overlay`,
]);
export type DialogOverlayVariantsProps = VariantProps<typeof dialogOverlayVariants>;

export const dialogContentVariants = cva(
  [
    'fixed',
    'flex',
    'flex-col',
    'max-h-[80%]',
    'max-w-full',
    'md:max-w-[80%]',
    'z-50',
    'outline-none',
    'border',
    'rounded',
    'data-[state=open]:animate-fade-down-in',
    'data-[state=closed]:animate-fade-down-out',
    `${prefix}-content`,
  ],
  {
    variants: {
      position: {
        center: ['left-1/2', 'top-1/2', '-translate-x-1/2', '-translate-y-1/2'],
      },
    },
  }
);
export type DialogContentVariantsProps = VariantProps<typeof dialogContentVariants>;

export const DialogScrollContentVariants = cva([
  'relative',
  'max-w-full',
  'md:max-w-[80%]',
  'mx-auto',
  'my-8',
  'z-50',
  'outline-none',
  'border',
  'rounded',
  'data-[state=open]:animate-fade-down-in',
  'data-[state=closed]:animate-fade-down-out',
  `${prefix}-content_scroll`,
]);
export type DialogScrollContentVariantsProps = VariantProps<typeof DialogScrollContentVariants>;

export const dialogCloseDefaultClass = [
  'size-4',
  'text-xs',
  'disabled:pointer-events-none',
  `${prefix}-close`,
];

export const dialogContentCloseDefaultClass = [
  'absolute',
  'pr-2',
  'pt-2',
  'right-0',
  'top-0',
  'group',
  `${prefix}-close_content`,
];

export const dialogContentBodyDefaultClass = ['flex-1', 'p-6', 'overflow-y-auto', `${prefix}-body`];

export const dialogHeaderClass = [
  'flex',
  'items-center',
  'justify-between',
  'py-2.5',
  'px-5',
  'text-sm',
  `${prefix}-header`,
];

export const dialogFooterClass = [
  'flex',
  'items-center',
  'justify-end',
  'gap-5',
  'p-4',
  `${prefix}-footer`,
];
