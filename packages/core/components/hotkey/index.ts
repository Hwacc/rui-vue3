import type { VariantProps } from 'tailwind-variants';
import { PREFIX } from '@rui/core/lib/constants';
import { tv } from '@rui/core/lib/tv';
import { tvInput } from '../input';

export { default as Hotkey } from './Hotkey.vue';

const prefix = `${PREFIX}-hotkey`;

const { root, inner } = tvInput();
export const tvHotkey = tv(
  {
    slots: {
      root: [root(), 'relative'],
      inner: [inner()],
    },
    variants: {
      size: {
        base: '',
        sm: '',
        lg: '',
      },
    },
    defaultVariants: { size: 'base' },
    compoundSlots: [
      {
        slots: ['root'],
        size: 'base',
        class: root({ size: 'base' }),
      },
      {
        slots: ['root'],
        size: 'sm',
        class: root({ size: 'sm' }),
      },
      {
        slots: ['root'],
        size: 'lg',
        class: root({ size: 'lg' }),
      },
      {
        slots: ['inner'],
        size: 'base',
        class: inner({ size: 'base' }),
      },
      {
        slots: ['inner'],
        size: 'sm',
        class: inner({ size: 'sm' }),
      },
      {
        slots: ['inner'],
        size: 'lg',
        class: inner({ size: 'lg' }),
      },
    ],
  },
  {
    slots: {
      root: [`${PREFIX}-input`, prefix],
      inner: [`${PREFIX}-input-inner`, `${prefix}-inner`],
    },
  }
);
export type HotkeyVariants = VariantProps<typeof tvHotkey>;
