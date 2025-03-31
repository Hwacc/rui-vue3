import { PREFIX } from '@/lib/constants';
import { VariantProps } from 'class-variance-authority';
import { cva } from '@/lib/cva';

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
export const dialogOverlayVariants = cva(
  [
    'fixed',
    'inset-0',
    'z-50',
    'data-[state=open]:animate-in',
    'data-[state=open]:fade-in',
    'data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out',
  ],
  { variants: {} },
  {
    className: `${prefix}-overlay`,
    compound: [
      {
        disableRuiClass: false,
        className: ['bg-rui-dialog-overlay', 'data-[type=scroll]:webkit-scrollbar-self'],
      },
    ],
  }
);
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
  ],
  {
    variants: {
      position: {
        center: ['left-1/2', 'top-1/2', '-translate-x-1/2', '-translate-y-1/2'],
      },
    },
  },
  {
    className: `${prefix}-content`,
    compound: [
      {
        disableRuiClass: false,
        className: ['bg-rui-dialog', 'border-rui-dialog-border', 'webkit-small-scrollbar'],
      },
    ],
  }
);
export type DialogContentVariantsProps = VariantProps<typeof dialogContentVariants>;

export const DialogScrollContentVariants = cva(
  [
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
  ],
  { variants: {} },
  {
    className: `${prefix}-scroll-content`,
    compound: [
      {
        disableRuiClass: false,
        className: ['bg-rui-dialog', 'border-rui-dialog-border', `${prefix}-content_scroll`],
      },
    ],
  }
);
export type DialogScrollContentVariantsProps = VariantProps<typeof DialogScrollContentVariants>;

export const dialogCloseVariants = cva(
  ['group'],
  {
    variants: {
      position: {
        abs: ['absolute', 'pr-2', 'pt-2', 'right-0', 'top-0'],
      },
    },
  },
  {
    className: `${prefix}-close`,
    compound: [
      {
        disableRuiClass: false,
        className: ['text-rui-close', 'hover:text-rui-close-hover'],
      },
    ],
  }
);

export const dialogContentBodyVariants = cva(['flex-1', 'p-6', 'overflow-y-auto'], undefined, {
  className: `${prefix}-body`,
});

export const dialogHeaderVariants = cva(
  ['flex', 'items-center', 'justify-between', 'py-2.5', 'px-5', 'text-sm'],
  { variants: {} },
  {
    className: `${prefix}-header`,
    compound: [
      {
        disableRuiClass: false,
        className: ['bg-rui-dialog-header', 'font-rob-bold'],
      },
    ],
  }
);

export const dialogFooterVariants = cva(
  ['flex', 'items-center', 'justify-end', 'gap-5', 'p-4'],
  { variants: {} },
  {
    className: `${prefix}-footer`,
    compound: [
      {
        disableRuiClass: false,
        className: ['bg-rui-dialog-footer'],
      },
    ],
  }
);
