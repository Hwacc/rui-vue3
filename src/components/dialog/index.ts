import { cva, VariantProps } from 'class-variance-authority';

export { default as Dialog } from './Dialog.vue';
export { default as DialogClose } from './DialogClose.vue';
export { default as DialogContent } from './DialogContent.vue';
export { default as DialogFooter } from './DialogFooter.vue';
export { default as DialogHeader } from './DialogHeader.vue';
export { default as DialogScrollContent } from './DialogScrollContent.vue';
export { default as DialogTrigger } from './DialogTrigger.vue';
export { default as DialogContentBody } from './DialogContentBody.vue';

export const dialogOverlayVariants = cva([
  'fixed',
  'inset-0',
  'z-50',
  'bg-black/80',
  'data-[state=open]:animate-in',
  'data-[state=closed]:animate-out',
  'data-[state=closed]:fade-out-0',
  'data-[state=open]:fade-in-0',
]);
export type DialogOverlayVariantsProps = VariantProps<typeof dialogOverlayVariants>;

export const dialogContentVariants = cva(
  [
    'fixed',
    'z-50',
    'outline-none',
    'border',
    'border-h00',
    'bg-h1a',
    'rounded',
    'animate-duration-300',
    'animate-ease-out',
    'animate-fill-both',
    'data-[state=open]:animate-fade-down',
    'data-[state=closed]:uti-animate-fade-down-out',
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

export const dialogCloseDefaultClass = [
  'size-3',
  'text-xs',
  'text-h88',
  'hover:text-hff',
  'group-hover:text-hff',
  'disabled:pointer-events-none',
];

export const dialogContentBodyDefaultClass = ['p-6'];

export const dialogHeaderClass = [
  'flex',
  'items-center',
  'justify-between',
  'py-2.5',
  'px-5',
  'bg-h22',
  'font-rob-bold',
  'text-sm',
];

export const dialogFooterClass = ['flex', 'items-center', 'justify-end', 'gap-5', 'p-4', 'bg-h16'];
