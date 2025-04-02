import { PREFIX } from '@/core/lib/constants';
import { cva, VariantProps } from '@/core/lib/cva';

export { default as ScrollArea } from './ScrollArea.vue';
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
        vertical: ['h-full', 'p-px'],
        horizontal: ['flex-col', 'p-px'],
      },
      size: {
        base: '',
        sm: '',
        tiny: '',
      },
    },
  },
  {
    className: `${prefix}-track`,
  }
);
export type ScrollBarVariants = VariantProps<typeof scrollBarVariants>;

export const scrollThumbVariants = cva(['relative', 'flex-1', 'rounded-full'], undefined, {
  className: `${prefix}-thumb`,
});


