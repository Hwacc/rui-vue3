import { PREFIX } from '@/lib/constants';
import { cva, VariantProps } from '@/lib/cva';

export { default as ScrollArea } from './ScrollArea.vue';
export { default as ScrollFloatingArea } from './ScrollFloatingArea.vue';
export { default as ScrollBar } from './ScrollBar.vue';

const prefix = `${PREFIX}-scroll-area`;
export const scrollAreaVariants = cva(['relative', 'overflow-hidden'], undefined, {
  className: prefix,
});

export const scrollBarVariants = cva(
  ['flex', 'touch-none', 'select-none', 'transition-colors'],
  {
    variants: {
      orientation: {
        vertical: ['h-full', 'w-2.5', 'border-l', 'border-l-transparent', 'p-px'],
        horizontal: ['h-2.5', 'flex-col', 'border-t', 'border-t-transparent', 'p-px'],
      },
    },
  },
  {
    className: `${prefix}-track`,
  }
);

export const scrollThumbVariants = cva(
  ['relative', 'flex-1', 'rounded-full'],
  {
    variants: {
      size: {
        default: '',
        sm: '',
        tiny: '',
      },
    },
  },
  {
    className: `${prefix}-thumb`,
  }
);

export type ScrollThumbVariants = VariantProps<typeof scrollThumbVariants>;
